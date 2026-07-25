import jersey from "@/assets/jersey.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: "Riding Gear" | "Protection" | "Lifestyle";
  price: number;
  image: string;
  sizes: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "kickstart-jersey",
    name: "Kickstart Race Jersey",
    tagline: "Lightweight moisture-wicking race top",
    category: "Riding Gear",
    price: 79,
    image: jersey,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Built for hot laps and long moto sessions. Perforated side panels keep airflow moving while the athletic cut stays out of your way when you're pinned.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
