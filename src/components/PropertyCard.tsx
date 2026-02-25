import { MapPin, Bed, Maximize, TrendingUp } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  currency: string;
  onClick?: () => void;
}

export default function PropertyCard({ property, currency, onClick }: PropertyCardProps) {
  return (
    <div
      onClick={onClick}
      className="group block rounded-2xl overflow-hidden bg-card border border-border hover-lift cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-body font-semibold backdrop-blur-sm">
            {property.city}
          </span>
          {property.status === "off-plan" && (
            <span className="px-3 py-1 rounded-full bg-kingdom-gold/90 text-background text-[10px] uppercase tracking-wider font-body font-semibold backdrop-blur-sm">
              Off-Plan
            </span>
          )}
        </div>

        {/* ROI badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full glass text-[10px] font-body font-semibold text-primary">
            <TrendingUp className="w-3 h-3" />
            {property.roi}% ROI
          </div>
        </div>

        {/* View Details overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-body font-semibold">
            View Details →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-xl font-display font-semibold text-foreground mb-2">
          {formatPrice(property.price, currency)}
        </div>
        <h3 className="font-body text-sm font-medium text-foreground mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs font-body">{property.location}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            {property.bedrooms} Beds
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5" />
            {property.area.toLocaleString()} sqft
          </div>
          <div className="ml-auto text-primary font-medium capitalize">{property.type}</div>
        </div>
      </div>
    </div>
  );
}
