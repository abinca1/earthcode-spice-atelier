import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import cardamomPod from "@/assets/cardamom-pod.png";
import pepperCluster from "@/assets/pepper-cluster.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const LUXURY_SPRING = { type: "spring", stiffness: 80, damping: 20 } as const;

const LINE_1 = "The Monarchs of Spice:";
const LINE_2 = "Cardamom & Black Gold";

function SplitLine({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={cn("block", className)}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "118%" }}
            animate={{ y: "0%" }}
            transition={{ ...LUXURY_SPRING, delay: delay + i * 0.028 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const isMobile = useIsMobile();
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    setPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });

  // Cardamom and pepper drift along opposite vectors.
  const podX = useTransform(smx, [-1, 1], [-38, 38]);
  const podY = useTransform(smy, [-1, 1], [-26, 26]);
  const pepperX = useTransform(smx, [-1, 1], [32, -32]);
  const pepperY = useTransform(smy, [-1, 1], [22, -22]);
  const copyX = useTransform(smx, [-1, 1], [-10, 10]);

  const parallaxOn = !isMobile && pointerFine;

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (!parallaxOn) return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="grain relative min-h-[100svh] overflow-hidden bg-silk"
    >
      {/* Emerald curtain — the page fades out of it on load */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-emerald-deep"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.35, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Ambient glow behind the pod */}
      <motion.div
        aria-hidden
        className="absolute -bottom-[10%] right-[4%] size-[52vw] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--emerald-glow) 40%, transparent), transparent 65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 1.15, duration: 1.6 }}
      />

      {/* Floating spice visuals */}
      <div aria-hidden className="absolute inset-0 z-0">
        {/* Black peppercorn branch drops from the top right */}
        <motion.div
          className="absolute right-[7%] top-[14%] sm:right-[8%]"
          style={{ x: pepperX, y: pepperY }}
        >
          <motion.img
            src={pepperCluster}
            alt=""
            width={1024}
            height={1024}
            className="h-auto w-[26vw] max-w-[300px] rotate-[9deg] drop-shadow-2xl sm:w-[19vw]"
            initial={{ y: -780, opacity: 0, rotate: 26 }}
            animate={{ y: 0, opacity: 1, rotate: 9 }}
            transition={{ ...LUXURY_SPRING, delay: 0.95 }}
          />
        </motion.div>

        {/* Gigantic cardamom pod slides in from the left */}
        <motion.div
          className="absolute bottom-[3%] right-[4%] sm:bottom-[7%] sm:right-[5%]"
          style={{ x: podX, y: podY }}
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={cardamomPod}
              alt=""
              width={1024}
              height={1024}
              className="h-auto w-[62vw] drop-shadow-2xl sm:w-[34vw]"
              initial={{ x: -740, opacity: 0, rotate: -20 }}
              animate={{ x: 0, opacity: 1, rotate: -5 }}
              transition={{ ...LUXURY_SPRING, delay: 0.72 }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Copy block */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-6 pb-24 pt-32 sm:px-14 lg:max-w-3xl lg:px-16"
        style={{ x: copyX }}
      >
        <motion.p
          className="font-sans text-[11px] uppercase tracking-[0.45em] text-emerald-deep/70 sm:text-xs"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...LUXURY_SPRING, delay: 0.65 }}
        >
          Earthcode Naturals · Single Origin · Est. 2026
        </motion.p>

        <h1 className="mt-7 font-serif text-[clamp(2.5rem,5.2vw,4.8rem)] leading-[1.05] text-emerald-deep">
          <span className="sr-only">The Monarchs of Spice: Cardamom and Black Gold</span>
          <span aria-hidden>
            <SplitLine text={LINE_1} delay={0.95} />
            <SplitLine text={LINE_2} delay={1.35} className="italic" />
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-md text-sm leading-relaxed text-emerald-deep/75 sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...LUXURY_SPRING, delay: 1.7 }}
        >
          Two spices. One estate. Hand-graded at dawn, sealed in glass within
          hours of harvest — the Queen of Spices and Black Gold, exactly as the
          plantations intended.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...LUXURY_SPRING, delay: 1.85 }}
        >
          <a
            href="#chronicle"
            className="rounded-full bg-emerald-deep px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-silk transition-colors hover:bg-emerald-glow"
          >
            The Chronicle
          </a>
          <a
            href="#shop"
            className="rounded-full border border-emerald-deep/30 px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-emerald-deep transition-colors hover:border-gold hover:text-gold"
          >
            Shop the Monarchs
          </a>
        </motion.div>

        <motion.dl
          className="mt-14 flex flex-wrap gap-x-12 gap-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.9 }}
        >
          {[
            ["8 mm", "Queen-grade pods"],
            ["570 g/L", "Pepper density"],
            ["1,100 m", "Single-estate altitude"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-2xl text-emerald-deep sm:text-3xl">{value}</dd>
              <dd className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-emerald-deep/60">
                {label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-emerald-deep/60">
            Scroll
          </span>
          <motion.span
            className="block h-10 w-px origin-top bg-gold"
            animate={{ scaleY: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
