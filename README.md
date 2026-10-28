# Earthcode Spice Atelier

Create an ultra-premium, luxury D2C e-commerce landing page for a single-origin spice brand named "Earthcode Naturals", focusing exclusively on two crown jewel products: Green Cardamom (The Queen of Spices) and Black Pepper (Black Gold). The UX/UI must look like an award-winning Awwwards site with flawless, high-performance scroll animations.

### 1. LUXURY VISUAL SYSTEM
- Palette: Deep Emerald Green (#0E3A2F) representing fresh cardamom pods, Charcoal Obsidian Black (#1A1A1A) representing wrinkled peppercorns, accented with rich Warm Gold (#D4AF37) and a luxurious textured Off-White silk backdrop (#FDFBF7).
- Typography: High-fashion elegant serif (Cormorant Garamond) for dramatic editorial headlines; minimal, spaced geometric sans (Plus Jakarta Sans) for interactive UI data elements.
- Assets: Expect transparent, high-definition floating assets of cracked cardamom pods with visible black seeds, and individual textured black peppercorns.

### 2. HERO SECTION & SIGNATURE ENTRANCE ANIMATION
- Split view layout. On page load, run a staggered orchestration: The screen fades from a solid Emerald curtain to the Off-White layout.
- Simultaneously, a gigantic high-def visual of a glowing Green Cardamom Pod slides in from the left, and a clustered branch of Black Peppercorns drops gracefully from the top right. 
- Apply a subtle, perpetual mouse-tracking parallax effect: Moving the cursor pushes the cardamom and pepper in opposite, tiny floating vector paths (using Framer Motion useMotionValue and useTransform).
- Text reveal: The headline "The Monarchs of Spice: Cardamom & Black Gold" splits by character and lifts up smoothly using a custom spring ease transition.

### 3. THE "DEEP SENSORY" CHRONICLE SECTION (SCROLL-DRIVEN PARALLAX)
- As the user scrolls into this section, use a sticky-scroll container that pins the viewport.
- Section 1: "The Queen (Cardamom)". The background smoothly transitions from Off-White to Deep Emerald Green. A massive structural card fades up showing the flavor profile (Camphor, Citrus, Herbal). As the user continues scrolling, a pod dynamically "cracks open" via an animated image-clip mask overlay, revealing the inner seeds.
- Section 2: "Black Gold (Pepper)". The screen seamlessly transitions from Emerald into a rich Charcoal Black canvas. Typography lights up in brushed gold. Individual peppercorns scatter down the screen like a slow-motion cascade triggered exactly by the user's scroll velocity (using useScroll and useVelocity).

### 4. DUAL-PRODUCT INTERACTIVE SHOWCASE
- A gorgeous, split horizontal block dividing the screen perfectly into two dynamic halves: [Left: Cardamom Shop] | [Right: Pepper Shop].
- Hovering over the Cardamom side causes the panel to smoothly expand its width to 60vw while shrinking Pepper to 40vw, accompanied by a rich green gradient glow. Inside, a floating luxury spice jar spins 45 degrees along its Y-axis.
- Hovering over the Pepper side expands it to 60vw, shifting the color palette to deep charcoal, and rotating the pepper jar.
- Both panels include a floating, sleek "Quick Add" CTA that reveals an animated price tag ($24.00) on hover, fading smoothly into a loading spinner when clicked.

### 5. TECHNICAL INSTRUCTIONS
- Built strictly with React, Tailwind CSS, and Framer Motion. 
- Do NOT use heavy WebGL or Three.js. Achieve 3D depth entirely through CSS 3D perspective transforms (`perspective: 1000px`), layered absolute positioning, parallax translation scroll hooks, and smooth Framer Motion spring setups (`stiffness: 80, damping: 20`).
- Ensure full responsiveness. On mobile devices, disable intensive mouse-tracking and gracefully degrade the split-width expansions into beautiful touch-swipe cards.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ef47b702-061e-45b6-9f95-c041c34a9102).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
