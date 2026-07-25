import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Heart, Truck, RotateCcw, Shield } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Fronky Donkey Racing" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Fronky Donkey Racing` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.name} — Fronky Donkey Racing` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState<string | null>(null);
  const { addItem, setOpen } = useCart();
  const navigate = useNavigate();

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = (buyNow = false) => {
    if (!size) {
      toast.error("Please select a size first.");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
    });
    if (buyNow) {
      navigate({ to: "/cart" });
    } else {
      toast.success(`${product.name} added to bag`);
      setOpen(true);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-8">
        <nav className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="aspect-square overflow-hidden rounded-md bg-secondary md:col-span-2">
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="md:sticky md:top-20 md:self-start">
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">
              {product.category}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-base text-muted-foreground">{product.tagline}</p>
            <div className="mt-4 text-2xl font-semibold">${product.price}</div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Select Size</span>
                <button className="text-xs underline underline-offset-2">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-md border py-3 text-sm font-medium transition-colors ${
                      size === s
                        ? "border-foreground ring-1 ring-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                onClick={() => handleAdd(false)}
                size="lg"
                className="w-full rounded-full text-base"
              >
                Add to Bag
              </Button>
              <Button
                onClick={() => handleAdd(true)}
                size="lg"
                variant="outline"
                className="w-full rounded-full text-base"
              >
                Buy Now
              </Button>
              <button className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4" /> Favorite
              </button>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-foreground/80">
              {product.description}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
              <div>
                <Truck className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-2 text-xs font-medium">Free shipping $150+</div>
              </div>
              <div>
                <RotateCcw className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-2 text-xs font-medium">60-day returns</div>
              </div>
              <div>
                <Shield className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-2 text-xs font-medium">Race warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8">
        <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((p) => (
            <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="group">
              <div className="aspect-square overflow-hidden rounded-md bg-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-sm font-semibold">${p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
