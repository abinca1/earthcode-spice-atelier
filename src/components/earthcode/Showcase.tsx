import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import jarCardamom from "@/assets/jar-cardamom.png";
import jarPepper from "@/assets/jar-pepper.png";
import { LUXURY_SPRING } from "@/components/earthcode/Hero";
import { useIsMobile } from "@/hooks/use-mobile";

type Variant = "emerald" | "gold";

type Panel = {
  id: "cardamom" | "pepper";
  index: string;
  epithet: string;
  name: string;
  latin: string;
  notes: string[];
  weight: string;
  price: string;
  img: string;
  variant: Variant;
};

const PANELS: Panel[] = [
  {
    id: "cardamom",
    index: "N°01",
    epithet: "The Queen of Spices",
    name: "Green Cardamom",
    latin: "Elettaria cardamomum",
    notes: ["Camphor", "Citrus", "Herbal"],
    weight: "50 g · Hand-graded pods",
    price: "$24.00",
    img: jarCardamom,
    variant: "emerald",
  },
  {
    id: "pepper",
    index: "N°02",
    epithet: "Black Gold",
    name: "Black Pepper",
    latin: "Piper nigrum",
    notes: ["Pungent", "Woody", "Fiery"],
    weight: "80 g · Extra Bold berries",
    price: "$24.00",
    img: jarPepper,
    variant: "gold",
  },
];

function QuickAdd({ price, variant }: { price: string; variant: Variant }) {
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const add = () => {
    if (state !== "idle") return;
    setState("loading");
    timers.current.push(
      window.setTimeout(() => {
        setState("added");
        timers.current.push(window.setTimeout(() => setState("idle"), 1600));
      }, 1100)
    );
  };

  const buttonClass =
    variant === "emerald"
      ? "bg-silk text-emerald-deep hover:bg-gold-soft"
      : "bg-gold text-obsidian hover:bg-gold-soft";
  const pillClass =
    variant === "emerald"
      ? "border-gold/50 bg-emerald-deep/70 text-gold-soft"
      : "border-gold/50 bg-obsidian/80 text-gold";

  return (
    <div className="group relative inline-block">
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span
          className={`whitespace-nowrap rounded-full border px-4 py-1.5 font-sans text-xs tracking-[0.25em] ${pillClass}`}
        >
          {price}
        </span>
      </div>
      <motion.button
        type="button"
        onClick={add}
        disabled={state !== "idle"}
        whileTap={{ scale: 0.95 }}
        className={`flex h-12 items-center gap-2 rounded-full px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors ${buttonClass}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              Quick Add
            </motion.span>
          )}
          {state === "loading" && (
            <motion.span
              key="loading"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sealing
            </motion.span>
          )}
          {state === "added" && (
            <motion.span
              key="added"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <Check className="size-4" aria-hidden />
              Added to Vault
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function PanelHeader({ panel }: { panel: Panel }) {
  return (
    <div className="text-center">
      <p className="font-sans text-[11px] uppercase tracking-[0.4em] opacity-75">
        {panel.index} — {panel.epithet}
      </p>
      <h3 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
        {panel.name}
      </h3>
      <p className="mt-2 font-serif text-lg italic opacity-70">{panel.latin}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2.5">
        {panel.notes.map((note) => (
          <span
            key={note}
            className="rounded-full border border-gold/40 px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft"
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function Jar({
  panel,
  active,
}: {
  panel: Panel;
  active: boolean;
}) {
  return (
    <div style={{ perspective: 1000 }}>
      <motion.img
        src={panel.img}
        alt={`Earthcode Naturals ${panel.name} jar`}
        loading="lazy"
        width={1024}
        height={1024}
        animate={{ rotateY: active ? 45 : 0, scale: active ? 1.07 : 1 }}
        transition={LUXURY_SPRING}
        className="h-[30vh] max-h-[330px] w-auto drop-shadow-2xl will-change-transform"
      />
    </div>
  );
}

function PanelBody({ panel, active }: { panel: Panel; active: boolean }) {
  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-between py-8 lg:py-10">
      <PanelHeader panel={panel} />
      <Jar panel={panel} active={active} />
      <div className="flex flex-col items-center gap-3">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-70">
          {panel.weight}
        </p>
        <QuickAdd price={panel.price} variant={panel.variant} />
      </div>
    </div>
  );
}

function DesktopShowcase() {
  const [hovered, setHovered] = useState<Panel["id"] | null>(null);

  return (
    <div className="flex h-[92svh] min-h-[660px] w-full">
      {PANELS.map((panel) => {
        const active = hovered === panel.id;
        const width =
          hovered === null ? "50%" : active ? "62%" : "38%";
        const bg =
          panel.id === "cardamom"
            ? "linear-gradient(160deg, var(--emerald-deep) 0%, color-mix(in oklab, var(--emerald-deep) 70%, black) 100%)"
            : "linear-gradient(160deg, var(--charcoal) 0%, var(--obsidian) 100%)";
        const glow =
          panel.id === "cardamom"
            ? "radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, var(--emerald-glow) 55%, transparent), transparent 70%)"
            : "radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, var(--gold) 22%, transparent), transparent 70%)";

        return (
          <motion.section
            key={panel.id}
            onMouseEnter={() => setHovered(panel.id)}
            onMouseLeave={() => setHovered(null)}
            animate={{ width }}
            transition={LUXURY_SPRING}
            className="relative h-full overflow-hidden text-silk will-change-[width]"
            style={{ background: bg }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{ background: glow }}
              animate={{ opacity: active ? 1 : 0.35 }}
              transition={{ duration: 0.6 }}
            />
            <PanelBody panel={panel} active={active} />
          </motion.section>
        );
      })}
    </div>
  );
}

function MobileShowcase() {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-12">
      {PANELS.map((panel) => {
        const bg =
          panel.id === "cardamom"
            ? "linear-gradient(160deg, var(--emerald-deep) 0%, color-mix(in oklab, var(--emerald-deep) 70%, black) 100%)"
            : "linear-gradient(160deg, var(--charcoal) 0%, var(--obsidian) 100%)";
        return (
          <div
            key={panel.id}
            className="relative flex h-[72vh] min-h-[520px] w-[84vw] shrink-0 snap-center flex-col items-center justify-between overflow-hidden rounded-[2rem] px-6 py-8 text-silk"
            style={{ background: bg }}
          >
            <PanelBody panel={panel} active={false} />
          </div>
        );
      })}
    </div>
  );
}

export function Showcase() {
  const isMobile = useIsMobile();
  return (
    <section id="shop" className="grain relative w-full bg-obsidian">
      {isMobile ? <MobileShowcase /> : <DesktopShowcase />}
    </section>
  );
}
