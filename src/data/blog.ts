import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Emerging Real Estate Markets in the UAE for 2025",
    excerpt: "Discover the fastest-growing neighborhoods offering high ROI and luxury living experiences.",
    category: "Market Insights",
    date: "Feb 12, 2025",
    image: property1,
  },
  {
    id: "2",
    title: "How to Secure Your First Investment Property Abroad",
    excerpt: "A step-by-step guide to navigating international real estate investments with confidence.",
    category: "Investment Guide",
    date: "Jan 28, 2025",
    image: property2,
  },
  {
    id: "3",
    title: "The Rise of Smart Homes: What Buyers Want in 2025",
    excerpt: "Explore the technology trends shaping modern luxury residences around the globe.",
    category: "Lifestyle",
    date: "Jan 15, 2025",
    image: property3,
  },
  {
    id: "4",
    title: "Dubai Marina vs Downtown: Where Should You Invest?",
    excerpt: "A comparative analysis of two of Dubai's most sought-after real estate destinations.",
    category: "Market Insights",
    date: "Dec 20, 2024",
    image: property4,
  },
  {
    id: "5",
    title: "Understanding Off-Plan Properties: Risks and Rewards",
    excerpt: "Everything you need to know before purchasing an off-plan property in the Middle East.",
    category: "Investment Guide",
    date: "Dec 05, 2024",
    image: property5,
  },
  {
    id: "6",
    title: "Interior Design Trends Defining Luxury Living",
    excerpt: "From biophilic design to minimalist aesthetics — what's trending in high-end homes.",
    category: "Lifestyle",
    date: "Nov 18, 2024",
    image: property6,
  },
];
