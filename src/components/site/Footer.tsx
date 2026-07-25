import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <div className="text-lg font-black uppercase tracking-tight">
            Fronky<span className="text-primary">Donkey</span> Racing
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Dirtbike apparel built for riders who send it.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider">Shop</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Riding Gear</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Protection</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">Lifestyle</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider">Support</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shipping & Returns</li>
            <li>Size Guide</li>
            <li>Contact Us</li>
            <li>Warranty</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-wider">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li>
            <li>Team Riders</li>
            <li>Sponsorship</li>
            <li>Press</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-8">
          <div>© {new Date().getFullYear()} Fronky Donkey Racing. All rights reserved.</div>
          <div className="flex gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
