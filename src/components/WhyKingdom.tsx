import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2, suffix: "B+", prefix: "$", label: "Transaction Volume" },
  { value: 5, suffix: "", prefix: "", label: "Global Markets" },
  { value: 150, suffix: "+", prefix: "", label: "Exclusive Partnerships" },
  { value: 98, suffix: "%", prefix: "", label: "Client Satisfaction" },
];

function AnimatedCounter({ value, prefix, suffix, inView }: { value: number; prefix: string; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground">
      {prefix}{count}{suffix}
    </span>
  );
}

interface WhyKingdomProps {
  language?: string;
}

export default function WhyKingdom({ language = "en" }: WhyKingdomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Where Vision
              <br />
              Meets <span className="italic text-gradient-steel">Value</span>
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed max-w-lg">
              Kingdom International connects discerning investors with strategically positioned
              real estate across the world's most dynamic markets. Our proprietary market intelligence
              and exclusive developer network ensure every investment is optimized for maximum returns.
            </p>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center"
                style={{ animation: inView ? `fadeInUp 0.6s ease-out ${idx * 0.15}s forwards` : "none", opacity: inView ? undefined : 0 }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} inView={inView} />
                <div className="font-body text-xs text-muted-foreground mt-2 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
