import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, Search } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/shop", label: "Shop All" },
  { to: "/shop", label: "Riding Gear", search: { category: "Riding Gear" } },
  { to: "/shop", label: "Protection", search: { category: "Protection" } },
  { to: "/shop", label: "Lifestyle", search: { category: "Lifestyle" } },
];

export function Header() {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger aria-label="Open menu" className="p-2">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((n, i) => (
                  <Link
                    key={i}
                    to={n.to}
                    className="rounded-md px-3 py-3 text-lg font-medium hover:bg-accent"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-black uppercase tracking-tight">
            Fronky<span className="text-primary">Donkey</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button aria-label="Search" className="rounded-full p-2 hover:bg-accent">
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Open cart"
            onClick={() => setOpen(true)}
            className="relative rounded-full p-2 hover:bg-accent"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
