import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import cardamomPod from "@/assets/cardamom-pod.png";
import cardamomOpen from "@/assets/cardamom-open.png";
import pepperScatter from "@/assets/pepper-scatter.png";

type Particle = {
  cx: number;
  cy: number;
  r: number;
  left: number;
  size: number;
  rot: number;
  factor: number;
  s: number;
  e: number;
};

// Crop windows over the scatter asset (1024×1024) — one peppercorn each.
const PARTICLES: Particle[] = [
  { cx: 745, cy: 120, r: 115, left: 68, size: 96, rot: 18, factor: 1.0, s: 0.58, e: 0.82 },
  { cx: 545, cy: 265, r: 85, left: 30, size: 74, rot: -12, factor: 0.7, s: 0.6, e: 0.84 },
  { cx: 867, cy: 262, r: 45, left: 84, size: 46, rot: 40, factor: 1.3, s: 0.62, e: 0.86 },
  { cx: 748, cy: 378, r: 65, left: 52, size: 62, rot: -30, factor: 0.9, s: 0.64, e: 0.88 },
  { cx: 428, cy: 487, r: 95, left: 12, size: 88, rot: 24, factor: 1.1, s: 0.66, e: 0.9 },
  { cx: 668, cy: 537, r: 55, left: 74, size: 54, rot: -22, factor: 0.8, s: 0.68, e: 0.92 },
  { cx: 268, cy: 650, r: 75, left: 40, size: 70, rot: 35, factor: 1.2, s: 0.7, e: 0.94 },
  { cx: 505, cy: 727, r: 50, left: 20, size: 50, rot: -40, factor: 0.6, s: 0.72, e: 0.96 },
  { cx: 185, cy: 915, r: 95, left: 60, size: 86, rot: 15, factor: 1.0, s: 0.74, e: 0.98 },
  { cx: 385, cy: 845, r: 45, left: 88, size: 44, rot: -18, factor: 1.4, s: 0.76, e: 1.0 },
];

function PepperFall({
  p,
  progress,
  boost,
}: {
  p: Particle;
  progress: MotionValue<number>;
  boost: MotionValue<number>;
}) {
  const fall = useTransform(progress, [p.s, p.e], [-340, 1750]);
  const y = useTransform([fall, boost], ([f, b]: number[]) => f + b * p.factor);
  const rotate = useTransform(progress, [p.s, p.e], [p.rot, p.rot + 280]);
  const opacity = useTransform(
    progress,
    [p.s - 0.015, p.s + 0.02, p.e - 0.02, Math.min(p.e + 0.01, 1)],
    [0, 1, 1, 0]
  );
  const k = p.size / (2 * p.r);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute top-0 overflow-hidden will-change-transform"
      style={{
        left: `${p.left}%`,
        y,
        rotate,
        opacity,
        width: p.size,
        height: p.size,
      }}
    >
      <img
        src={pepperScatter}
        alt=""
        className="max-w-none"
        style={{
          width: 1024 * k,
          height: 1024 * k,
          marginLeft: -(p.cx - p.r) * k,
          marginTop: -(p.cy - p.r) * k,
        }}
      />
    </motion.div>
  );
}

export function Chronicle() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Off-white silk → deep emerald → charcoal obsidian.
  const bg = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.66],
    ["#FDFBF7", "#0E3A2F", "#0E3A2F", "#1A1A1A"]
  );

  const queenOpacity = useTransform(scrollYProgress, [0.02, 0.1, 0.42, 0.52], [0, 1, 1, 0]);
  const queenY = useTransform(scrollYProgress, [0.02, 0.1], [70, 0]);

  // The pod cracks open: a clip-mask wipe reveals the seeded interior.
  const crack = useTransform(scrollYProgress, [0.18, 0.36], [100, 0]);
  const crackClip = useMotionTemplate`inset(0% ${crack}% 0% 0%)`;
  const crackHintOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.16, 0.3, 0.36],
    [0, 1, 1, 0]
  );

  const goldOpacity = useTransform(scrollYProgress, [0.56, 0.68, 0.96, 1], [0, 1, 1, 0]);
  const goldY = useTransform(scrollYProgress, [0.56, 0.68], [70, 0]);

  // Scroll velocity drives the slow-motion peppercorn cascade.
  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 80, damping: 20 });
  const boost = useTransform(smoothVelocity, [-0.5, 0, 0.5], [-150, 0, 150]);

  return (
    <section id="chronicle" ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ backgroundColor: bg }} />

        {/* Chapter I — The Queen */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center"
          style={{ opacity: queenOpacity, pointerEvents: "none" }}
        >
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-12">
            <motion.div
              style={{ y: queenY }}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md sm:p-10"
            >
              <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold">
                Chapter I — The Queen
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-silk sm:text-6xl">
                Green Cardamom
              </h2>
              <p className="mt-2 font-serif text-lg italic text-silk/70">
                Elettaria cardamomum
              </p>
              <p className="mt-6 text-sm leading-relaxed text-silk/80">
                Picked before sunrise at 1,100 metres in the Idukki hills, where
                cool mist forces each pod to concentrate its oils. Every capsule
                is graded by hand — only the plump 8 mm queens survive.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {["Camphor", "Citrus", "Herbal"].map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-gold/40 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.3em] text-gold-soft"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="relative mx-auto h-[42vh] w-[42vh] max-w-full sm:h-[50vh] sm:w-[50vh]">
              <img
                src={cardamomPod}
                alt="Closed green cardamom pod"
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
              />
              <motion.img
                src={cardamomOpen}
                alt="Cardamom pod cracked open, revealing black seeds"
                loading="lazy"
                width={1024}
                height={1024}
                style={{ clipPath: crackClip, willChange: "clip-path" }}
                className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
              />
              <motion.p
                aria-hidden
                style={{ opacity: crackHintOpacity }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.35em] text-silk/60"
              >
                Scroll — the pod cracks open
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Peppercorn cascade */}
        <div aria-hidden className="absolute inset-0 z-[5]">
          {PARTICLES.map((p, i) => (
            <PepperFall key={i} p={p} progress={scrollYProgress} boost={boost} />
          ))}
        </div>

        {/* Chapter II — Black Gold */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center"
          style={{ opacity: goldOpacity, pointerEvents: "none" }}
        >
          <motion.div
            style={{ y: goldY }}
            className="mx-auto w-full max-w-4xl px-6 text-center md:px-12"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Chapter II — Black Gold
            </p>
            <h2 className="text-gold-gradient mt-6 font-serif text-[clamp(3.4rem,10vw,8.5rem)] leading-none">
              Black Gold
            </h2>
            <p className="mt-5 font-serif text-xl italic text-gold-soft/90 sm:text-2xl">
              Piper nigrum
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-silk/75">
              Sun-dried for nine days on woven mats until the skins wrinkle into
              obsidian. Dense, fiery, faintly sweet — the berry that once moved
              empires, measured here in grams.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Pungent", "Woody", "Fiery"].map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-gold/40 px-4 py-1.5 font-sans text-[10px] uppercase tracking-[0.3em] text-gold"
                >
                  {note}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Progress rail */}
        <div
          aria-hidden
          className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block"
        >
          <div className="relative h-44 w-px overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="absolute inset-0 origin-top bg-gold"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
