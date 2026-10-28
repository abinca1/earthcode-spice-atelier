import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/earthcode/Hero";
import { Chronicle } from "@/components/earthcode/Chronicle";
import { Showcase } from "@/components/earthcode/Showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Earthcode Naturals — The Monarchs of Spice" },
      {
        name: "description",
        content:
          "Single-origin Green Cardamom and Black Pepper from one estate. The Queen of Spices meets Black Gold — hand-graded, sealed in glass within hours of harvest.",
      },
      {
        property: "og:title",
        content: "Earthcode Naturals — The Monarchs of Spice",
      },
      {
        property: "og:description",
        content:
          "Single-origin Green Cardamom and Black Pepper from one estate. The Queen of Spices meets Black Gold.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 sm:px-10">
      <a href="/" className="flex items-baseline gap-2">
        <span className="font-sans text-sm font-semibold uppercase tracking-[0.35em] text-emerald-deep">
          Earthcode
        </span>
        <span className="font-serif text-sm italic text-gold">Naturals</span>
      </a>
      <nav className="hidden items-center gap-8 font-sans text-[11px] uppercase tracking-[0.3em] text-emerald-deep/80 sm:flex">
        <a href="#chronicle" className="transition-colors hover:text-gold">
          Chronicle
        </a>
        <a href="#shop" className="transition-colors hover:text-gold">
          Collection
        </a>
      </nav>
      <a
        href="#shop"
        className="rounded-full border border-emerald-deep/25 px-5 py-2 font-sans text-[11px] uppercase tracking-[0.25em] text-emerald-deep transition-colors hover:border-gold hover:text-gold"
      >
        Reserve
      </a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-obsidian px-6 py-20 text-center sm:px-12">
      <div className="relative z-10">
        <p className="font-serif text-3xl leading-snug text-silk sm:text-5xl">
          Sourced from a single estate.
        </p>
        <p className="text-gold-gradient font-serif text-3xl italic leading-snug sm:text-5xl">
          Bottled for monarchs.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 font-sans text-[10px] uppercase tracking-[0.3em] text-silk/50">
          <span>Idukki, Kerala</span>
          <span>Lampong, Sumatra</span>
          <span>Est. 2026</span>
        </div>
        <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.25em] text-silk/30">
          © 2026 Earthcode Naturals — Single-Origin Spice Atelier
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="bg-silk font-sans antialiased">
      <Nav />
      <Hero />
      <Chronicle />
      <Showcase />
      <Footer />
    </div>
  );
}
