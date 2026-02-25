import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  city: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  roi: number;
  status: "ready" | "off-plan";
  category: "buy" | "rent" | "project";
  image: string;
  images: string[];
  description: string;
  completionDate?: string;
  developer?: string;
  features: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    title: "The Residences at One Hyde Park",
    price: 12500000,
    currency: "USD",
    location: "Knightsbridge, London",
    city: "London",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    roi: 5.2,
    status: "ready",
    category: "buy",
    image: property1,
    images: [property1, property5],
    description: "An extraordinary penthouse offering panoramic views across Hyde Park and the London skyline. Features include Italian marble throughout, bespoke joinery, and 24-hour concierge service.",
    developer: "Candy & Candy",
    features: ["Concierge", "Private Gym", "Wine Cellar", "Terrace", "Smart Home"],
  },
  {
    id: "2",
    title: "Palm Jumeirah Signature Villa",
    price: 8750000,
    currency: "USD",
    location: "Palm Jumeirah, Dubai",
    city: "Dubai",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 7,
    area: 12000,
    roi: 7.8,
    status: "ready",
    category: "buy",
    image: property2,
    images: [property2, property6],
    description: "A magnificent beachfront villa on the iconic Palm Jumeirah with private beach access, infinity pool, and unobstructed sea views.",
    developer: "Nakheel",
    features: ["Private Beach", "Infinity Pool", "Staff Quarters", "Cinema Room"],
  },
  {
    id: "3",
    title: "DAMAC Towers — Paramount",
    price: 2400000,
    currency: "USD",
    location: "Business Bay, Dubai",
    city: "Dubai",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 4,
    area: 2800,
    roi: 9.1,
    status: "off-plan",
    category: "project",
    image: property3,
    images: [property3, property1],
    description: "Ultra-luxury branded residences by DAMAC in partnership with Paramount Hotels. Expected completion 2026 with premium amenities.",
    completionDate: "Q4 2026",
    developer: "DAMAC Properties",
    features: ["Branded Residences", "Rooftop Pool", "Spa", "Valet Parking"],
  },
  {
    id: "4",
    title: "Belgravia Georgian Townhouse",
    price: 18000000,
    currency: "USD",
    location: "Belgravia, London",
    city: "London",
    type: "Townhouse",
    bedrooms: 7,
    bathrooms: 6,
    area: 8500,
    roi: 3.8,
    status: "ready",
    category: "buy",
    image: property4,
    images: [property4, property1],
    description: "A meticulously restored Grade II listed Georgian townhouse in the heart of Belgravia. Features original period details with contemporary luxury finishes.",
    features: ["Garden", "Lift", "Staff Quarters", "Wine Cellar", "Garage"],
  },
  {
    id: "5",
    title: "Riyadh Gate Tower Residence",
    price: 1800000,
    currency: "USD",
    location: "King Abdullah Financial District, Riyadh",
    city: "Riyadh",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 3200,
    roi: 8.5,
    status: "off-plan",
    category: "project",
    image: property5,
    images: [property5, property3],
    description: "Premium residences in Riyadh's prestigious financial district. Part of Saudi Vision 2030 development with world-class amenities.",
    completionDate: "Q2 2027",
    developer: "ROSHN",
    features: ["Smart Home", "Concierge", "Business Lounge", "Rooftop Garden"],
  },
  {
    id: "6",
    title: "Bosphorus Waterfront Estate",
    price: 5600000,
    currency: "USD",
    location: "Bebek, Istanbul",
    city: "Turkey",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    area: 6800,
    roi: 6.4,
    status: "ready",
    category: "rent",
    image: property6,
    images: [property6, property2],
    description: "An exceptional waterfront estate on the European shores of the Bosphorus with private jetty, landscaped gardens, and breathtaking strait views.",
    features: ["Waterfront", "Private Jetty", "Garden", "Guest House", "Pool"],
  },
];

export const cities = ["London", "Dubai", "Riyadh", "New York", "Turkey"] as const;
export type City = (typeof cities)[number];

export const propertyTypes = ["Apartment", "Villa", "Penthouse", "Townhouse", "Commercial"] as const;

export const currencies: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  GBP: { symbol: "£", rate: 0.79 },
  AED: { symbol: "د.إ", rate: 3.67 },
  SAR: { symbol: "﷼", rate: 3.75 },
};

export function formatPrice(price: number, currency: string = "USD"): string {
  const curr = currencies[currency] || currencies.USD;
  const converted = Math.round(price * curr.rate);
  if (converted >= 1000000) {
    return `${curr.symbol}${(converted / 1000000).toFixed(1)}M`;
  }
  return `${curr.symbol}${converted.toLocaleString()}`;
}
