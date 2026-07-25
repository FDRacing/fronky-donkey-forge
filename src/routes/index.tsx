import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fronky Donkey Racing — Dirtbike Apparel Built to Send It" },
      {
        name: "description",
        content:
          "Race jerseys, MX pants, helmets, boots, and lifestyle gear from Fronky Donkey Racing. Ride hard, look sharp.",
      },
      { property: "og:title", content: "Fronky Donkey Racing" },
      {
        property: "og:description",
        content: "Premium dirtbike apparel and protection engineered for real riders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.slice(0, 3);
  const collections = [
    { title: "Riding Gear", desc: "Jerseys built for the send.", to: "/shop" as const, img: products[0].image },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-black">
        <img
          src={heroImage}
          alt="Dirtbike rider mid-air jump"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-16 md:px-8 md:pb-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Fall Collection '26
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
            Ride Loud.
            <br />
            Land Clean.
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80 md:text-lg">
            Race-tested dirtbike apparel engineered for the send. From the gate drop to the podium.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/shop">Shop Collection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white bg-transparent px-8 text-white hover:bg-white hover:text-black"
            >
              <Link to="/shop">Explore</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1600px] px-4 py-16 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Featured</h2>
          <Link to="/shop" className="text-sm font-semibold underline underline-offset-4">
            Shop All
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
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
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Just In
                  </div>
                  <div className="mt-1 text-base font-semibold">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.category}</div>
                </div>
                <div className="text-base font-semibold">${p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-[1600px] px-4 pb-16 md:px-8">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">Shop By Category</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-secondary"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-black uppercase text-white">{c.title}</h3>
                <p className="mt-1 text-sm text-white/80">{c.desc}</p>
                <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black">
                  Shop
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="bg-primary py-4 text-primary-foreground">
        <div className="flex gap-12 overflow-hidden whitespace-nowrap px-4 text-sm font-bold uppercase tracking-widest md:text-base">
          <span>Free shipping over $150</span>
          <span>•</span>
          <span>Team Rider Program</span>
          <span>•</span>
          <span>Race-tested gear</span>
          <span>•</span>
          <span>Ride Loud. Land Clean.</span>
        </div>
      </section>
    </div>
  );
}
