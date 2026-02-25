import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

export default function AboutKingdom() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Top row: headline + video badge */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            Your investment journey,{" "}
            <span className="italic text-gradient-steel">reimagined.</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <img src={property3} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground max-w-[200px]">
              Each listing offers unique features, exceptional quality, and prime locations
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          {/* Large left image */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden relative min-h-[380px] sm:min-h-[460px]">
            <img
              src={property1}
              alt="Kingdom International Real Estate"
              className="w-full h-full object-cover absolute inset-0"
            />
            {/* Small avatar circles */}
            <div className="absolute bottom-4 right-4 flex -space-x-2">
              {[property1, property2, property3].map((img, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Middle card - text */}
          <div className="lg:col-span-4 bg-accent/10 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
              Big things can happen in small spaces.
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-6 max-w-xs">
              With thoughtful design and smart organization, you can maximize every inch, making room for creativity
            </p>
            <Link
              to="/properties"
              className="px-6 py-2.5 rounded-full border border-border text-sm font-body font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Details
            </Link>
          </div>

          {/* Right card - image + pricing */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden flex-1 min-h-[220px] relative">
              <img
                src={property2}
                alt="Modern property"
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-foreground mb-3">
                Pricing Start at $256K
              </p>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-body font-semibold hover:opacity-90 transition-opacity"
              >
                Explore Properties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <p className="font-editorial text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground max-w-4xl leading-snug tracking-tight">
          Kingdom International Real Estate is a globally rooted firm established in London and now operating across Dubai, Riyadh, New York, and Turkey. We specialize in <span className="italic">Property Acquisition & Investment</span>, <span className="italic">Property Management & Development</span>, and bespoke <span className="italic">Design & Financing Solutions</span> — delivering strategic, end-to-end guidance tailored to every client's vision.
        </p>
      </div>
    </section>
  );
}
