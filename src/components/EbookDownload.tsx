import { useState, useRef, useEffect, useCallback } from "react";
import { Download, CheckCircle, TrendingUp, Globe, Shield, ChevronLeft, ChevronRight } from "lucide-react";

const pages = [
  {
    title: "Table of Contents",
    content: ["Dubai Market Overview", "London Prime Hotspots", "Riyadh Vision 2030", "ROI Strategies", "Tax & Legal Guide"],
    type: "toc" as const,
  },
  {
    chapter: "Chapter 1",
    title: "Dubai Market Overview",
    text: "Dubai continues to dominate as the world's fastest-growing luxury real estate market with average ROI of 7-9%. Palm Jumeirah, Downtown Dubai, and Dubai Marina lead the premium segment with consistent capital appreciation.",
    type: "chapter" as const,
  },
  {
    chapter: "Chapter 2",
    title: "London Prime Hotspots",
    text: "Knightsbridge, Belgravia, and Mayfair remain the gold standard for ultra-high-net-worth investors. Post-Brexit adjustments have created unique entry points for international buyers seeking long-term value.",
    type: "chapter" as const,
  },
  {
    chapter: "Chapter 3",
    title: "Riyadh Vision 2030",
    text: "Saudi Arabia's ambitious development plans are creating unprecedented investment opportunities. The King Abdullah Financial District and NEOM project represent generational wealth-building potential.",
    type: "chapter" as const,
  },
];

export default function EbookDownload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1); // -1 = cover shown
  const [flipProgress, setFlipProgress] = useState(0); // 0-1 for current flip
  const [isFlipping, setIsFlipping] = useState(false);

  // Drag rotation state using refs for smooth 60fps
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 5, y: -12 });
  const targetRotation = useRef({ x: 5, y: -12 });
  const animFrameId = useRef<number>(0);
  const dragDistance = useRef({ x: 0, y: 0 });

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) {
        animFrameId.current = requestAnimationFrame(animate);
        return;
      }

      // Lerp toward target
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.12;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.12;

      containerRef.current.style.transform = `rotateY(${currentRotation.current.y}deg) rotateX(${currentRotation.current.x}deg)`;

      animFrameId.current = requestAnimationFrame(animate);
    };
    animFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId.current);
  }, []);

  // Auto float when not dragging
  useEffect(() => {
    if (isDragging.current) return;
    let floatFrame: number;
    const floatAnimate = () => {
      if (isDragging.current) return;
      const t = Date.now() / 1000;
      targetRotation.current = {
        x: 5 + Math.sin(t * 0.8) * 3,
        y: -12 + Math.sin(t * 0.5) * 4,
      };
      floatFrame = requestAnimationFrame(floatAnimate);
    };
    floatFrame = requestAnimationFrame(floatAnimate);
    return () => cancelAnimationFrame(floatFrame);
  }, [currentPage, isFlipping]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    dragDistance.current = { x: 0, y: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    dragDistance.current = { x: dx, y: dy };
    targetRotation.current = {
      x: 5 - dy * 0.4,
      y: -12 + dx * 0.6,
    };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = dragDistance.current.x;
    // Swipe to flip
    if (dx < -80 && currentPage < pages.length - 1) {
      flipToPage(currentPage + 1);
    } else if (dx > 80 && currentPage > -1) {
      flipToPage(currentPage - 1);
    }
  }, [currentPage]);

  const flipToPage = (page: number) => {
    if (isFlipping) return;
    setIsFlipping(true);
    // Animate flip
    let start: number | null = null;
    const duration = 600;
    const from = currentPage;
    const direction = page > from ? 1 : -1;

    const animateFlip = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setFlipProgress(eased * direction);

      if (progress < 1) {
        requestAnimationFrame(animateFlip);
      } else {
        setCurrentPage(page);
        setFlipProgress(0);
        setIsFlipping(false);
      }
    };
    requestAnimationFrame(animateFlip);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setSubmitted(true);
    }
  };

  const benefits = [
    { icon: TrendingUp, text: "Top 10 high-ROI markets for 2026" },
    { icon: Globe, text: "Insider strategies from Dubai, London & Riyadh" },
    { icon: Shield, text: "Risk-proof your portfolio with expert insights" },
  ];

  const coverFlipDeg = currentPage >= 0 ? -180 : flipProgress < 0 ? 0 : -180 * flipProgress;

  const renderPageContent = (pageIdx: number) => {
    const page = pages[pageIdx];
    if (!page) return null;
    if (page.type === "toc") {
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-center">
          <p className="font-display text-base text-foreground/70 mb-4 text-center">Table of Contents</p>
          <div className="w-8 h-px bg-kingdom-gold/40 mx-auto mb-5" />
          <div className="space-y-3 px-2">
            {page.content.map((item, i) => (
              <div key={item} className="flex items-baseline gap-3 text-xs font-body text-foreground/70">
                <span className="text-kingdom-gold font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{item}</span>
                <span className="text-foreground/30 text-[10px]">{(i + 1) * 12}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="p-6 sm:p-8 h-full flex flex-col justify-center">
        <p className="text-kingdom-gold text-[10px] font-body uppercase tracking-widest mb-1">{page.chapter}</p>
        <p className="font-display text-lg text-foreground/80 italic mb-4">{page.title}</p>
        <div className="w-8 h-px bg-kingdom-gold/30 mb-4" />
        <p className="text-[11px] font-body text-foreground/50 leading-[1.8]">{page.text}</p>
      </div>
    );
  };

  // Which page to show behind cover
  const visiblePage = currentPage >= 0 ? currentPage : 0;

  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto rounded-3xl bg-primary overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 sm:p-12 lg:p-16">
          {/* Left - Copy & Form */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-kingdom-gold/20 text-kingdom-gold text-xs font-body font-semibold uppercase tracking-wider mb-6">
              Free Download — Limited Time
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary-foreground leading-tight mb-4">
              Download Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Free</span>
                <span className="absolute inset-0 bg-kingdom-gold/30 rounded-full -mx-2 -my-0.5 px-2" />
              </span>{" "}
              Investment Guide
            </h2>
            <p className="font-body text-primary-foreground/70 text-sm sm:text-base mb-3 max-w-lg">
              Discover the secrets top investors use to build multi-million dollar property portfolios across the world's fastest-growing markets.
            </p>
            <p className="font-body text-kingdom-gold text-sm font-semibold mb-8">
              Join 2,500+ investors who already downloaded this guide.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-10">
              {benefits.map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <b.icon className="w-4 h-4 text-kingdom-gold shrink-0" />
                  <span className="font-body text-sm text-primary-foreground/80">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 text-primary-foreground font-body text-sm placeholder:text-primary-foreground/40 outline-none focus:border-kingdom-gold/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 text-primary-foreground font-body text-sm placeholder:text-primary-foreground/40 outline-none focus:border-kingdom-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-kingdom-gold text-background font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Get Your Free Copy Now
                </button>
                <p className="text-[11px] text-primary-foreground/30 font-body text-center">
                  No spam. Unsubscribe anytime. Your data is 100% secure.
                </p>
              </form>
            ) : (
              <div className="flex items-center gap-3 p-5 rounded-xl bg-kingdom-gold/10 border border-kingdom-gold/20 max-w-sm">
                <CheckCircle className="w-6 h-6 text-kingdom-gold shrink-0" />
                <div>
                  <p className="font-body text-sm font-semibold text-primary-foreground">You're in!</p>
                  <p className="font-body text-xs text-primary-foreground/60">Check your email for the download link.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right - Interactive 3D Brochure */}
          <div className="flex flex-col items-center justify-center gap-6" style={{ perspective: "1200px" }}>
            <div
              ref={containerRef}
              className="relative w-64 h-80 sm:w-72 sm:h-96 cursor-grab active:cursor-grabbing select-none touch-none"
              style={{ transformStyle: "preserve-3d" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Glow */}
              <div className="absolute -inset-8 bg-kingdom-gold/8 rounded-full blur-3xl pointer-events-none" />

              {/* Back pages stack */}
              {[12, 8, 4].map((z, i) => (
                <div
                  key={z}
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    transform: `translateZ(-${z}px) translateX(${z - 2}px)`,
                    background: `hsl(40 54% ${92 + i * 2}%)`,
                    border: `1px solid hsl(214 15% ${85 + i * 3}%)`,
                  }}
                />
              ))}

              {/* Current page content */}
              <div
                className="absolute inset-0 rounded-lg bg-[hsl(40,54%,96%)] border border-border overflow-hidden pointer-events-none"
                style={{ transform: "translateZ(-1px)" }}
              >
                {renderPageContent(visiblePage)}
                {/* Page number */}
                <div className="absolute bottom-3 right-4 text-[9px] font-body text-foreground/25">
                  {visiblePage + 1} / {pages.length}
                </div>
              </div>

              {/* Flippable pages (from current going backward) */}
              {pages.map((_, idx) => {
                const isFlipped = idx < currentPage || (idx === currentPage && flipProgress < 0);
                const flipDeg = isFlipped ? -180 : 0;
                // Only render pages near current for perf
                if (Math.abs(idx - currentPage) > 2 && idx !== 0) return null;
                return (
                  <div
                    key={`page-${idx}`}
                    className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                    style={{
                      transformOrigin: "left center",
                      transform: `rotateY(${flipDeg}deg)`,
                      transition: isFlipping ? "none" : "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      zIndex: pages.length - idx,
                      background: `hsl(40 54% 96%)`,
                      border: `1px solid hsl(214 15% 88%)`,
                    }}
                  >
                    {renderPageContent(idx)}
                    <div className="absolute bottom-3 right-4 text-[9px] font-body text-foreground/25">
                      {idx + 1} / {pages.length}
                    </div>
                  </div>
                );
              })}

              {/* Front cover */}
              <div
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{
                  transformOrigin: "left center",
                  transform: `rotateY(${coverFlipDeg}deg)`,
                  transition: isFlipping ? "none" : "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  zIndex: 10,
                  boxShadow: "4px 4px 20px hsl(38 60% 52% / 0.15)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(214,42%,15%)] via-[hsl(214,40%,19%)] to-[hsl(214,42%,12%)] border border-kingdom-gold/30">
                  {/* Gold border frame */}
                  <div className="absolute inset-3 border border-kingdom-gold/25 rounded-md" />
                  <div className="absolute inset-5 border border-kingdom-gold/10 rounded-sm" />

                  {/* Corner ornaments */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-kingdom-gold/40" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-kingdom-gold/40" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-kingdom-gold/40" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-kingdom-gold/40" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
                    <span className="text-kingdom-gold/60 text-[10px] font-body uppercase tracking-[0.3em] mb-3">
                      Ultimate Guide
                    </span>
                    <div className="w-10 h-px bg-kingdom-gold/40 mb-4" />
                    <h3 className="font-display text-xl sm:text-2xl text-primary-foreground leading-tight mb-2">
                      Luxury<br />Real Estate<br />
                      <span className="text-kingdom-gold italic">Investment</span>
                    </h3>
                    <div className="w-10 h-px bg-kingdom-gold/40 my-4" />
                    <span className="font-display text-3xl text-kingdom-gold font-semibold">2026</span>
                    <span className="text-primary-foreground/40 text-[9px] font-body uppercase tracking-[0.2em] mt-4">
                      Kingdom International
                    </span>
                  </div>

                  {/* Spine */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-kingdom-gold/30 via-kingdom-gold/10 to-kingdom-gold/30" />

                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-foreground/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
                </div>

                {/* Back of cover (visible when flipped) */}
                <div
                  className="absolute inset-0 bg-[hsl(40,54%,94%)] rounded-lg"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="p-6 h-full flex flex-col items-center justify-center text-center">
                    <p className="text-foreground/40 text-[10px] font-body uppercase tracking-widest mb-4">Kingdom International</p>
                    <div className="w-12 h-px bg-kingdom-gold/30 mb-4" />
                    <p className="font-display text-sm text-foreground/60 italic">
                      "Your gateway to global luxury real estate investment"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => !isFlipping && currentPage > -1 && flipToPage(currentPage - 1)}
                  disabled={currentPage <= -1 || isFlipping}
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-kingdom-gold/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-1.5">
                  {[-1, ...pages.map((_, i) => i)].map((i) => (
                    <button
                      key={i}
                      onClick={() => !isFlipping && flipToPage(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentPage
                          ? "bg-kingdom-gold w-5"
                          : "bg-primary-foreground/15 w-1.5 hover:bg-primary-foreground/30"
                      }`}
                      aria-label={i === -1 ? "Cover" : `Page ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => !isFlipping && currentPage < pages.length - 1 && flipToPage(currentPage + 1)}
                  disabled={currentPage >= pages.length - 1 || isFlipping}
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-kingdom-gold/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-primary-foreground/25 font-body">
                Swipe or use arrows to flip pages
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
