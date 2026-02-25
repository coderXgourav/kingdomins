import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, slidesToScroll: 1 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-card py-20 sm:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-2">From Our Blog</h2>
            <p className="font-body text-muted-foreground text-sm max-w-md">
              Expert advice, market analysis, and lifestyle inspiration for discerning property seekers.
            </p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[45%] lg:basis-[31%] group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-[4/3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-kingdom-gold text-primary-foreground font-body text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground mb-2">{post.date}</p>
                <h3 className="font-display text-lg text-foreground leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-kingdom-gold group-hover:underline">
                  Read More <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
