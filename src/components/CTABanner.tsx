import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import apartment360 from "@/assets/apartment-360.mp4";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden min-h-[500px] flex items-center justify-center">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          src={apartment360}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(214,42%,8%,0.85)] via-[hsl(214,42%,10%,0.6)] to-[hsl(214,42%,10%,0.4)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-24 max-w-2xl mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[hsl(40,54%,97%)] leading-tight mb-4">
          Start Your Journey to<br />
          Smarter <span className="italic">Living</span>
        </h2>
        <p className="font-body text-[hsl(40,54%,80%)] text-sm sm:text-base mb-8 max-w-md mx-auto">
          From modern apartments to luxury estates, your perfect home awaits.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-kingdom-gold text-background font-body font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Explore Homes
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
