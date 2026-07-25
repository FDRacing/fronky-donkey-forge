import { Link } from "@tanstack/react-router";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, setOpen, updateQuantity, removeItem, subtotal, count } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-md">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold">Bag ({count})</h2>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-lg font-semibold">Your bag is empty.</p>
            <p className="text-sm text-muted-foreground">
              Once you add something, it will show up here.
            </p>
            <Button onClick={() => setOpen(false)} asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <Link
                      to="/product/$id"
                      params={{ id: item.productId }}
                      onClick={() => setOpen(false)}
                      className="shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-24 w-24 rounded-md bg-secondary object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold leading-tight">{item.name}</div>
                          <div className="mt-1 text-xs text-muted-foreground">Size {item.size}</div>
                        </div>
                        <div className="text-sm font-semibold">${(item.price * item.quantity).toFixed(0)}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            aria-label="Decrease quantity"
                            className="p-2 hover:bg-accent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            className="p-2 hover:bg-accent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          aria-label="Remove item"
                          className="p-2 text-muted-foreground hover:text-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border p-4">
              <div className="mb-1 flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="mb-4 flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-muted-foreground">Calculated at checkout</span>
              </div>
              <Button asChild size="lg" className="w-full rounded-full">
                <Link to="/cart" onClick={() => setOpen(false)}>
                  Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
