import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";

const categories = ["All", "Riding Gear", "Protection", "Lifestyle"] as const;

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Fronky Donkey Racing" },
      {
        name: "description",
        content: "Browse jerseys, MX pants, helmets, boots, and lifestyle apparel from Fronky Donkey Racing.",
      },
      { property: "og:title", content: "Shop — Fronky Donkey Racing" },
      { property: "og:description", content: "Every piece of the Fronky Donkey Racing collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
            All Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <Link
            key={p.id}
            to="/product/$id"
            params={{ id: p.id }}
            className="group block"
          >
            <div className="aspect-square overflow-hidden rounded-md bg-secondary">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.category}</div>
              </div>
              <div className="shrink-0 text-sm font-semibold">${p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
