import jersey from "@/assets/jersey.jpg";
import pants from "@/assets/pants.jpg";
import helmet from "@/assets/helmet.jpg";
import gloves from "@/assets/gloves.jpg";
import boots from "@/assets/boots.jpg";
import hoodie from "@/assets/hoodie.jpg";
import cap from "@/assets/cap.jpg";

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
  {
    id: "trailblazer-pants",
    name: "Trailblazer MX Pants",
    tagline: "Abrasion-resistant riding pants",
    category: "Riding Gear",
    price: 149,
    image: pants,
    sizes: ["28", "30", "32", "34", "36", "38"],
    description:
      "Reinforced leather knee panels, four-way stretch at the crotch, and low-profile ratchet closure. Race fit tailored to work over knee braces.",
  },
  {
    id: "apex-helmet",
    name: "Apex Pro Helmet",
    tagline: "MIPS-equipped off-road helmet",
    category: "Protection",
    price: 349,
    image: helmet,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Aggressive aero shell with MIPS rotational impact protection. Twelve intake and eight exhaust vents keep temps down when the pace goes up.",
  },
  {
    id: "grip-gloves",
    name: "Grip Race Gloves",
    tagline: "Single-layer palm for max feel",
    category: "Riding Gear",
    price: 39,
    image: gloves,
    sizes: ["S", "M", "L", "XL"],
    description:
      "Silicone print on fingertips for brake and clutch control. Stretch mesh top hand and pre-curved fit for zero fatigue.",
  },
  {
    id: "iron-boots",
    name: "Iron Range Boots",
    tagline: "Track-ready protection all season",
    category: "Protection",
    price: 429,
    image: boots,
    sizes: ["8", "9", "10", "11", "12", "13"],
    description:
      "Four alloy buckles, medial burn guard, and dual-compound rubber sole. Broken-in feel from day one.",
  },
  {
    id: "donkey-hoodie",
    name: "Signature Donkey Hoodie",
    tagline: "Heavyweight fleece pullover",
    category: "Lifestyle",
    price: 89,
    image: hoodie,
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "450 gsm brushed fleece with our signature donkey mark. Dropped shoulder, ribbed cuffs, built to live in on and off the track.",
  },
  {
    id: "paddock-cap",
    name: "Paddock Snapback",
    tagline: "Six-panel structured cap",
    category: "Lifestyle",
    price: 34,
    image: cap,
    sizes: ["One Size"],
    description:
      "Cotton twill with embroidered script logo and flat brim. Snap closure fits all pit crews.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
