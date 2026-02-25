import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import clientDubai from "@/assets/client-dubai.jpg";
import clientNY from "@/assets/client-newyork.jpg";
import clientWoman from "@/assets/client-woman.jpg";

const testimonials = [
  {
    quote:
      "The entire process was flawless. Their attention to detail and understanding of modern aesthetics is second to none. We found our dream home faster than we ever thought possible.",
    name: "Ahmed Al Maktoum",
    role: "Property Investor, Dubai",
    avatar: clientDubai,
    imageLeft: property1,
    imageRight: property2,
  },
  {
    quote:
      "Kingdom International made our investment journey seamless. Their market knowledge across Dubai and London gave us unparalleled access to off-market opportunities.",
    name: "James Whitfield",
    role: "Private Equity Director, New York",
    avatar: clientNY,
    imageLeft: property3,
    imageRight: property1,
  },
  {
    quote:
      "From initial consultation to closing, the team delivered exceptional service. Their discretion and professionalism set the standard in luxury real estate.",
    name: "Amira Johnson",
    role: "Family Office Manager, London",
    avatar: clientWoman,
    imageLeft: property2,
    imageRight: property3,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 px-6 lg:px-10 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-10 sm:mb-14">
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-tight">
          Our Clients<br />
          Speak <span className="italic text-gradient-steel">Boldly.</span>
        </h2>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left image */}
        <div className="md:col-span-3">
          <div className="rounded-2xl overflow-hidden aspect-square">
            <img
              src={t.imageLeft}
              alt="Property showcase"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* Quote */}
        <div className="md:col-span-6">
          <span className="font-display text-3xl sm:text-5xl text-accent/40 leading-none block mb-4">"</span>
          <p className="font-body text-foreground text-base sm:text-lg leading-relaxed mb-8">
            "{t.quote}"
          </p>
          <div className="flex items-center gap-3">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
            <div>
              <p className="font-body text-sm font-semibold text-foreground">{t.name}</p>
              <p className="font-body text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="md:col-span-3 hidden md:block">
          <div className="rounded-2xl overflow-hidden aspect-square">
            <img
              src={t.imageRight}
              alt="Property showcase"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
