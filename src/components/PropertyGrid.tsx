import { useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyModal from "./PropertyModal";
import { properties, cities, Property } from "@/data/properties";
import { t } from "@/lib/i18n";

interface PropertyGridProps {
  currency: string;
  limit?: number;
  language?: string;
}

export default function PropertyGrid({ currency, limit, language = "en" }: PropertyGridProps) {
  const [activeCity, setActiveCity] = useState<string>("All");
  const [modalProperty, setModalProperty] = useState<Property | null>(null);

  const filtered = properties.filter((p) => activeCity === "All" || p.city === activeCity);
  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="py-24 px-6 lg:px-10 max-w-[1440px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
          {t("grid.title1", language)} <span className="italic text-gradient-steel">{t("grid.title2", language)}</span>
        </h2>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          {t("grid.subtitle", language)}
        </p>
      </div>

      {/* Country filter tabs */}
      <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
        {["All", ...cities].map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-6 py-2.5 rounded-full text-xs tracking-wider uppercase font-body font-semibold transition-all ${
              activeCity === city
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((property, idx) => (
          <div key={property.id} style={{ animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`, opacity: 0 }}>
            <PropertyCard
              property={property}
              currency={currency}
              onClick={() => setModalProperty(property)}
            />
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body text-muted-foreground">No properties available in this market yet.</p>
        </div>
      )}

      <PropertyModal
        property={modalProperty}
        currency={currency}
        onClose={() => setModalProperty(null)}
      />
    </section>
  );
}
