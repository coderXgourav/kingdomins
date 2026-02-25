import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight } from "lucide-react";
import worldMap from "@/assets/world-map.png";

// Accurate positions on a Mercator-style world map image
// x% from left, y% from top — calibrated to the generated map
const cityData = [
  { name: "London", x: 48.5, y: 24, roi: "4.2%", districts: "Mayfair, Knightsbridge, Belgravia", listings: 42 },
  { name: "Dubai", x: 61.5, y: 44, roi: "8.5%", districts: "Palm Jumeirah, Downtown, Marina", listings: 67 },
  { name: "Riyadh", x: 59, y: 42, roi: "7.9%", districts: "KAFD, DQ, Al Olaya", listings: 31 },
  { name: "New York", x: 25, y: 28, roi: "5.1%", districts: "Manhattan, Brooklyn, Tribeca", listings: 53 },
  { name: "Istanbul", x: 54, y: 27, roi: "6.8%", districts: "Bebek, Besiktas, Nisantasi", listings: 28 },
];

interface GlobalMapProps {
  language?: string;
}

export default function GlobalMap({ language = "en" }: GlobalMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="italic text-gradient-steel">Global</span> Reach
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            Five strategic markets. One unified investment platform.
          </p>
        </div>

        {/* Map container */}
        <div className="relative rounded-3xl overflow-hidden border border-border">
          {/* Real world map image */}
          <img
            src={worldMap}
            alt="World map"
            className="w-full h-auto block"
            loading="lazy"
          />

          {/* Connection lines SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 567" preserveAspectRatio="none">
            {cityData.map((city, i) =>
              cityData.slice(i + 1).map((city2) => (
                <line
                  key={`${city.name}-${city2.name}`}
                  x1={city.x * 10}
                  y1={city.y * 5.67}
                  x2={city2.x * 10}
                  y2={city2.y * 5.67}
                  stroke="hsl(196, 24%, 46%)"
                  strokeOpacity="0.12"
                  strokeWidth="0.8"
                  strokeDasharray="4,4"
                />
              ))
            )}
          </svg>

          {/* City pins */}
          {cityData.map((city) => (
            <div
              key={city.name}
              className="absolute cursor-pointer"
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Outermost ring - slow pulse */}
              <div className="absolute -inset-4 rounded-full bg-primary/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />

              {/* Middle ring - medium pulse */}
              <div className="absolute -inset-2 rounded-full bg-primary/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]" />

              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-full bg-primary/30 animate-[pulse_2s_ease-in-out_infinite]" />

              {/* Core pin dot */}
              <div className="relative w-3.5 h-3.5 rounded-full bg-primary border-2 border-primary-foreground/40 shadow-[0_0_15px_hsl(196_24%_46%/0.6)] z-10" />

              {/* City label */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                <span className="text-[11px] font-body font-semibold text-foreground tracking-wider bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border/50">
                  {city.name}
                </span>
              </div>

              {/* Hover card */}
              {hoveredCity === city.name && (
                <div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-strong rounded-xl p-5 min-w-[230px] z-30 shadow-xl shadow-background/40"
                  style={{ animation: "fadeInUp 0.3s ease-out forwards" }}
                >
                  <div className="font-display text-lg text-foreground mb-2">{city.name}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-sm font-body text-primary font-semibold">Avg ROI: {city.roi}</span>
                  </div>
                  <div className="text-xs font-body text-muted-foreground mb-3">{city.districts}</div>
                  <Link
                    to="/properties"
                    className="flex items-center gap-1 text-xs font-body text-primary hover:text-foreground transition-colors"
                  >
                    View {city.listings} listings <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
