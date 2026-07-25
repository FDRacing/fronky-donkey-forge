import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Fronky Donkey Racing" },
      { name: "description", content: "Review your Fronky Donkey Racing bag and check out." },
      { property: "og:title", content: "Your Bag — Fronky Donkey Racing" },
      { property: "og:description", content: "Review your bag and check out." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">Time to gear up. Head to the shop and find your fit.</p>
        <Button asChild size="lg" className="mt-6 rounded-full px-8">
          <Link to="/shop">Shop the Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12">
      <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">Bag</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 py-6">
              <Link
                to="/product/$id"
                params={{ id: item.productId }}
                className="shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-32 w-32 rounded-md bg-secondary object-cover md:h-40 md:w-40"
                />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold">{item.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">Size {item.size}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      aria-label="Decrease quantity"
                      className="p-2 hover:bg-accent"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      className="p-2 hover:bg-accent"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-md border border-border bg-secondary/40 p-6 lg:sticky lg:top-20">
          <h2 className="text-lg font-bold">Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            size="lg"
            className="mt-6 w-full rounded-full text-base"
            onClick={() => {
              toast.success("Checkout coming soon!");
              clear();
            }}
          >
            Checkout
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
