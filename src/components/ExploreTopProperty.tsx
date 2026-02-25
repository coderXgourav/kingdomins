import { useState } from "react";
import { MapPin, Bed, Bath, Maximize, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { properties, formatPrice, Property } from "@/data/properties";
import PropertyModal from "./PropertyModal";

interface ExploreTopPropertyProps {
  currency: string;
  language?: string;
}

export default function ExploreTopProperty({ currency, language = "en" }: ExploreTopPropertyProps) {
  const featured = properties.slice(0, 3);
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  return (
    <section className="py-24 px-6 lg:px-10 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight">
            Explore Top<br />
            <span className="italic text-gradient-steel">Properties</span>
          </h2>
        </div>
        <div className="max-w-sm">
          <p className="font-body text-muted-foreground text-sm mb-5">
            We blend design, technology, and trust to connect people with spaces they'll love.
          </p>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-kingdom-gold text-background font-body font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            View All
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((property, idx) => (
          <div
            key={property.id}
            onClick={() => setModalProperty(property)}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] block cursor-pointer"
            style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.12}s forwards`, opacity: 0 }}
          >
            <img
              src={property.image}
              alt={property.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

            {/* Content at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between mb-3">
                <h3 className="font-display text-lg text-primary-foreground font-semibold leading-tight">
                  {property.title.length > 20 ? property.title.substring(0, 20) + "…" : property.title}
                </h3>
                <span className="font-display text-lg text-primary-foreground font-semibold">
                  {formatPrice(property.price, currency)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/80 text-xs font-body mb-2">
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" />
                  {property.bedrooms} Bed
                </span>
                <span className="text-primary-foreground/40">|</span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" />
                  {property.bathrooms} Bath
                </span>
                <span className="text-primary-foreground/40">|</span>
                <span className="flex items-center gap-1">
                  <Maximize className="w-3.5 h-3.5" />
                  {property.area.toLocaleString()} sq ft
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-primary-foreground/70 text-xs font-body">
                <MapPin className="w-3.5 h-3.5" />
                {property.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PropertyModal
        property={modalProperty}
        currency={currency}
        onClose={() => setModalProperty(null)}
      />
    </section>
  );
}
