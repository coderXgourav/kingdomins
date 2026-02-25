export interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  image: string;
  category: "Exhibition" | "Seminar" | "Networking" | "Launch";
}

export const events: EventItem[] = [
  {
    id: 1,
    title: "Dubai Luxury Property Expo 2025",
    date: "Mar 15, 2025",
    time: "10:00 AM – 6:00 PM",
    location: "Madinat Jumeirah Conference Centre",
    city: "Dubai",
    description: "Explore exclusive off-plan and ready properties from top developers across the UAE.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    category: "Exhibition",
  },
  {
    id: 2,
    title: "London Investment Summit",
    date: "Apr 08, 2025",
    time: "2:00 PM – 7:00 PM",
    location: "The Savoy, Strand",
    city: "London",
    description: "An invite-only gathering for HNW investors exploring prime Central London opportunities.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    category: "Seminar",
  },
  {
    id: 3,
    title: "Istanbul New Developments Launch",
    date: "May 22, 2025",
    time: "11:00 AM – 4:00 PM",
    location: "Four Seasons Bosphorus",
    city: "Istanbul",
    description: "Be among the first to view pre-launch waterfront residences along the Bosphorus.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80",
    category: "Launch",
  },
  {
    id: 4,
    title: "Riyadh Real Estate Networking Night",
    date: "Jun 10, 2025",
    time: "7:00 PM – 10:00 PM",
    location: "Kingdom Centre, Sky Bridge Lounge",
    city: "Riyadh",
    description: "Connect with developers, investors, and advisors shaping Saudi Arabia's property market.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
    category: "Networking",
  },
];
