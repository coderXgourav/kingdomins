import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react";
import { events } from "@/data/events";

const categoryColor: Record<string, string> = {
  Exhibition: "bg-kingdom-gold/20 text-kingdom-gold",
  Seminar: "bg-blue-500/20 text-blue-400",
  Networking: "bg-emerald-500/20 text-emerald-400",
  Launch: "bg-purple-500/20 text-purple-400",
};

export default function EventsSection() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-2">
              Upcoming Events
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-lg">
              Join us at exclusive property exhibitions, investment seminars, and networking events worldwide.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-kingdom-gold hover:underline shrink-0"
          >
            View All Events <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <article
              key={event.id}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:border-kingdom-gold/40 transition-colors duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span
                  className={`absolute top-3 left-3 text-[11px] font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${categoryColor[event.category]}`}
                >
                  {event.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-base text-foreground leading-snug mb-3 line-clamp-2 group-hover:text-kingdom-gold transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-body text-xs">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-body text-xs">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-body text-xs line-clamp-1">{event.location}, {event.city}</span>
                  </div>
                </div>

                <p className="font-body text-xs text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
