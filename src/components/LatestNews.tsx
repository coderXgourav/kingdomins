import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function LatestNews() {
  const newsItems = blogPosts.slice(0, 3);

  return (
    <section className="bg-background py-20 sm:py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="relative mb-6">
            <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-kingdom-gold/30 to-kingdom-gold/5 blur-sm" />
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight relative">
              Latest<br />News
            </h2>
          </div>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">
            Stay informed with the latest trends, insights, and updates from the world of luxury real estate.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-body text-sm font-medium text-foreground hover:bg-muted transition-colors w-fit">
            View All News
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right column – news list */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group relative bg-muted/50 rounded-xl p-6 flex items-start justify-between gap-4 hover:bg-muted transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-kingdom-gold">
                    {item.category}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="font-display text-lg text-foreground leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-kingdom-gold group-hover:border-kingdom-gold transition-colors">
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
