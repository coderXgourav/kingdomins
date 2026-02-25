import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, Bed, Bath, Maximize, MoreHorizontal, TrendingUp, Eye, Building2, Landmark, Crown, X } from "lucide-react";
import { properties, cities, formatPrice, Property } from "@/data/properties";
import Globe from "@/components/Globe";
import PropertyModal from "@/components/PropertyModal";

interface PropertiesPageProps {
  currency: string;
}

// Cluster data derived from properties
function getClusters(props: Property[]) {
  const cityGroups: Record<string, Property[]> = {};
  props.forEach((p) => {
    if (!cityGroups[p.city]) cityGroups[p.city] = [];
    cityGroups[p.city].push(p);
  });

  return Object.entries(cityGroups).map(([city, items]) => {
    const sold = Math.floor(Math.random() * 60) + 60;
    const available = items.length * 5 - sold;
    const occupancy = Math.floor((sold / (sold + Math.max(available, 1))) * 100);
    return {
      city,
      name: items[0].title.split(" ").slice(0, 2).join(" ") + " " + city,
      unitsSold: sold,
      availableUnits: Math.max(available, 2),
      occupancy,
      properties: items,
      image: items[0].image,
    };
  });
}

const filterCategories = {
  Residential: {
    icon: Building2,
    desc: "Premium living spaces across global cities",
    subtypes: [
      { label: "Luxury Apartments", desc: "High-end city living" },
      { label: "Penthouses", desc: "Top-floor exclusivity" },
      { label: "Villas", desc: "Spacious private estates" },
      { label: "Townhouses", desc: "Classic urban charm" },
      { label: "Branded Residences", desc: "Developer signature homes" },
      { label: "Waterfront Homes", desc: "Beachfront & marina living" },
      { label: "Gated Community", desc: "Secure family compounds" },
    ],
  },
  Investment: {
    icon: TrendingUp,
    desc: "High-yield assets & growth opportunities",
    subtypes: [
      { label: "Off-Plan Projects", desc: "Early-stage pricing advantage" },
      { label: "High-Yield Rentals", desc: "Strong rental returns" },
      { label: "Capital Appreciation", desc: "Long-term value growth" },
      { label: "Pre-Launch", desc: "Exclusive first-mover access" },
      { label: "Fractional Ownership", desc: "Shared luxury investment" },
      { label: "Holiday Homes", desc: "Income + personal use" },
    ],
  },
  Commercial: {
    icon: Landmark,
    desc: "Business & retail opportunities",
    subtypes: [
      { label: "Office Spaces", desc: "Grade A offices" },
      { label: "Retail Units", desc: "High-footfall locations" },
      { label: "Mixed-Use", desc: "Residential + commercial" },
      { label: "Hospitality", desc: "Hotels & serviced apartments" },
      { label: "Warehouses", desc: "Logistics & storage" },
      { label: "Business Parks", desc: "Corporate campuses" },
    ],
  },
  "Ultra-Premium": {
    icon: Crown,
    desc: "The world's most exclusive properties",
    subtypes: [
      { label: "Signature Collection", desc: "One-of-a-kind masterpieces" },
      { label: "Private Estates", desc: "Sprawling luxury compounds" },
      { label: "Ultra-Luxury Mansions", desc: "Landmark residences" },
      { label: "Landmark Developments", desc: "Iconic architectural projects" },
    ],
  },
} as const;

type FilterCategory = keyof typeof filterCategories;

export default function PropertiesPage({ currency }: PropertiesPageProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"cluster" | "apartments">("cluster");
  const [activeCategory, setActiveCategory] = useState<FilterCategory | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  const [hoveredSubtype, setHoveredSubtype] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    const city = searchParams.get("city");
    if (q) setSearchQuery(q);
    if (city) setActiveFilter(city);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (selectedCountry && p.city !== selectedCountry) return false;
      if (activeFilter === "For Sale" && p.category !== "buy") return false;
      if (activeFilter === "For Rent" && p.category !== "rent") return false;
      if (activeFilter === "Under Construction" && p.status !== "off-plan") return false;
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      // Subtype filtering maps to property types loosely
      if (selectedSubtype) {
        const sub = selectedSubtype.toLowerCase();
        const matchesType = p.type.toLowerCase().includes(sub.split(" ")[0].toLowerCase());
        const matchesTitle = p.title.toLowerCase().includes(sub.split(" ")[0].toLowerCase());
        if (!matchesType && !matchesTitle) {
          // For categories, do broad matching
          if (activeCategory === "Investment" && p.status !== "off-plan" && p.category !== "rent") return false;
          if (activeCategory === "Ultra-Premium" && p.price < 5000000) return false;
          if (activeCategory === "Commercial") return false; // no commercial in data
        }
      } else if (activeCategory) {
        if (activeCategory === "Residential") {
          // show all residential types
        } else if (activeCategory === "Investment") {
          if (p.status !== "off-plan" && p.category !== "rent" && p.roi < 7) return false;
        } else if (activeCategory === "Commercial") {
          return false; // no commercial properties in sample data
        } else if (activeCategory === "Ultra-Premium") {
          if (p.price < 5000000) return false;
        }
      }
      return true;
    });
  }, [activeFilter, searchQuery, activeCategory, selectedSubtype, selectedCountry]);

  const clusters = useMemo(() => getClusters(filtered), [filtered]);

  useEffect(() => {
    if (filtered.length > 0 && !selectedProperty) {
      setSelectedProperty(filtered[0]);
      setSelectedImageIdx(0);
    }
  }, [filtered, selectedProperty]);

  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  const selectProperty = (p: Property) => {
    setSelectedProperty(p);
    setSelectedImageIdx(0);
  };

  return (
    <main className="pt-20 pb-16 lg:pb-0 min-h-screen bg-background">
      <div className="h-[calc(100vh-5rem)] flex flex-col">

        <div className="flex-1 flex overflow-hidden">
          {/* LEFT PANEL — Property List */}
          <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 lg:border-r border-border flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <h2 className="font-display text-lg text-foreground">Property List</h2>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 pb-3">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-background">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your property"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm font-body text-foreground placeholder:text-muted-foreground/60"
                />
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Country Filter */}
            <div className="px-5 pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                {[
                  { city: null, flag: "🌍", label: "All" },
                  { city: "Dubai", flag: "🇦🇪", label: "UAE" },
                  { city: "London", flag: "🇬🇧", label: "UK" },
                  { city: "Riyadh", flag: "🇸🇦", label: "KSA" },
                  { city: "Turkey", flag: "🇹🇷", label: "Turkey" },
                ].map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setSelectedCountry(c.city)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all whitespace-nowrap border ${
                      selectedCountry === c.city
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                    }`}
                  >
                    <span className="text-sm">{c.flag}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 pb-2">
              {/* Category toggle bar */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/50 border border-border">
                {(Object.keys(filterCategories) as FilterCategory[]).map((cat) => {
                  const Icon = filterCategories[cat].icon;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        if (isActive) {
                          setActiveCategory(null);
                          setSelectedSubtype(null);
                        } else {
                          setActiveCategory(cat);
                          setSelectedSubtype(null);
                        }
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-[10px] font-body font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{cat}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active category description */}
              {activeCategory && (
                <p className="text-[10px] font-body text-muted-foreground mt-2 px-1">
                  {filterCategories[activeCategory].desc}
                </p>
              )}

              {/* Subtypes — slide open */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  activeCategory ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                {activeCategory && (
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {filterCategories[activeCategory].subtypes.map((sub) => (
                      <div key={sub.label} className="relative group">
                        <button
                          onClick={() => setSelectedSubtype(selectedSubtype === sub.label ? null : sub.label)}
                          onMouseEnter={() => setHoveredSubtype(sub.label)}
                          onMouseLeave={() => setHoveredSubtype(null)}
                          className={`px-2.5 py-1.5 rounded-md text-[10px] font-body font-medium transition-all duration-150 border ${
                            selectedSubtype === sub.label
                              ? "bg-accent text-accent-foreground border-accent shadow-sm"
                              : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
                          }`}
                        >
                          {sub.label}
                        </button>
                        {/* Hover tooltip */}
                        {hoveredSubtype === sub.label && (
                          <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 rounded-md bg-foreground text-primary-foreground text-[9px] font-body whitespace-nowrap shadow-lg pointer-events-none">
                            {sub.desc}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active filter chip */}
              {(activeCategory || selectedSubtype) && (
                <div className="flex items-center gap-2 mt-2">
                  {activeCategory && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-body font-semibold">
                      {activeCategory}
                      {!selectedSubtype && (
                        <button onClick={() => { setActiveCategory(null); setSelectedSubtype(null); }}>
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  )}
                  {selectedSubtype && (
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-body font-semibold">
                      {selectedSubtype}
                      <button onClick={() => setSelectedSubtype(null)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Status filter tabs */}
            <div className="px-5 pb-3 flex items-center gap-2">
              {["All", "For Sale", "For Rent", "Under Construction"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-md text-xs font-body font-medium transition-colors ${
                    activeFilter === filter
                      ? "text-foreground font-semibold border-b-2 border-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Scrollable property list */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-4">
              {filtered.map((property) => (
                <div
                  key={property.id}
                  className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedProperty?.id === property.id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30"
                  }`}
                  onClick={() => selectProperty(property)}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-24 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">{property.type}</p>
                    <p className="font-body text-sm font-semibold text-foreground truncate">{property.title}</p>
                    <p className="text-xs text-accent font-body font-bold mt-1">{formatPrice(property.price, currency)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-body">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{property.location}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setModalProperty(property); }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-body font-semibold hover:bg-primary/90 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="font-body text-muted-foreground text-sm">No properties match your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL — Map + Detail */}
          <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 flex">
              {/* Globe */}
              <div className="flex-1 relative bg-background">
                <Globe
                  selectedCountry={selectedCountry}
                  onSelectCountry={(city) => {
                    setSelectedCountry(city);
                    const cityProps = properties.filter((p) => p.city === city);
                    if (cityProps.length > 0) selectProperty(cityProps[0]);
                  }}
                  selectedCity={selectedProperty?.city}
                />
                {selectedProperty && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground/90 backdrop-blur-sm text-primary-foreground shadow-xl z-10">
                    <img
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-body text-sm font-semibold">{selectedProperty.title.split(" ").slice(0, 3).join(" ")}</p>
                      <p className="font-body text-[10px] text-primary-foreground/60">{selectedProperty.city}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Detail card */}
              {selectedProperty && (
                <div className="w-80 xl:w-96 border-l border-border flex flex-col overflow-y-auto">
                  {/* Main image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={selectedProperty.images[selectedImageIdx] || selectedProperty.image}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image thumbnails */}
                  <div className="flex gap-2 p-3">
                    {selectedProperty.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIdx(i)}
                        className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIdx === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Property info */}
                  <div className="px-5 pb-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="font-body text-base font-semibold text-foreground">{selectedProperty.title}</h3>
                        <p className="text-xs font-body text-muted-foreground mt-0.5">{selectedProperty.location}</p>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="p-3 rounded-xl border border-border text-center">
                        <Bed className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground font-body">Bedrooms</p>
                        <p className="font-body text-lg font-bold text-foreground">{selectedProperty.bedrooms}</p>
                      </div>
                      <div className="p-3 rounded-xl border border-border text-center">
                        <Bath className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground font-body">Bathrooms</p>
                        <p className="font-body text-lg font-bold text-foreground">{selectedProperty.bathrooms}</p>
                      </div>
                      <div className="p-3 rounded-xl border border-border text-center">
                        <Maximize className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-[10px] text-muted-foreground font-body">Area</p>
                        <p className="font-body text-sm font-bold text-foreground">{selectedProperty.area.toLocaleString()} sqft</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-between">
                      <span className="text-xs font-body text-muted-foreground">Price</span>
                      <span className="font-display text-lg font-bold text-foreground">{formatPrice(selectedProperty.price, currency)}</span>
                    </div>

                    {/* ROI */}
                    <div className="mt-2 p-3 rounded-xl border border-border flex items-center justify-between">
                      <span className="text-xs font-body text-muted-foreground">Expected ROI</span>
                      <span className="font-body text-sm font-bold text-accent">{selectedProperty.roi}%</span>
                    </div>

                    {/* View Property button */}
                    <Link
                      to={`/property/${selectedProperty.id}`}
                      className="mt-4 w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs tracking-wider uppercase font-body font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Property
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PropertyModal
        property={modalProperty}
        currency={currency}
        onClose={() => setModalProperty(null)}
      />
    </main>
  );
}
