# Project-Wide UI Style Guide
CODEX MUST READ THIS BEFORE ANY CHANGES TO UI/UX
## Dark Premium Liquid Sport Design System

> **Codex instruction:** Every UI/UX change in this project must follow this design system unless the user explicitly says otherwise.
>
> The goal is not to copy a single reference image pixel-for-pixel. The goal is to make the whole app feel like the same premium dark fitness product: glossy, athletic, cinematic, liquid-glass, and motivational.

---

# 1. Design Direction

## Core Identity

Build the entire project with a **dark premium sport + liquid glass** visual language.

The app should feel like:

- a high-end calisthenics / fitness progression app
- a futuristic sports dashboard
- a luxury smartwatch fitness interface
- a cinematic dark training HUD
- a motivational performance tracker

The visual mood should be:

- powerful
- elite
- focused
- energetic
- modern
- athletic
- premium
- high-tech

Use **dark polished surfaces**, **soft cinematic glow**, **layered depth**, and **controlled neon accents**.

Avoid making the UI look like a generic admin dashboard, flat SaaS interface, childish game UI, or harsh cyberpunk neon screen.

---

# 2. Global Visual Principles

## Must Follow

1. **Dark first**
   - The entire app should sit on a very dark background.
   - Use near-black blue/charcoal tones, not pure gray.

2. **Liquid glass surfaces**
   - Cards, modals, nav bars, panels, and important controls should feel like glossy dark glass.
   - Use layered gradients, reflection layers, subtle borders, inner shadows, and backdrop blur.

3. **Glow only for attention**
   - Glow should not be everywhere.
   - Glow should guide the user toward active states, progress, selected tabs, current nodes, CTA buttons, and important achievements.

4. **Tier-based color accents**
   - Different workout levels may use different colors.
   - The color can change by context, but the behavior must remain consistent: active = illuminated, inactive = muted.

5. **Athletic typography**
   - Titles should feel strong, condensed, slightly italic, uppercase, and premium.
   - Body text should remain clean and readable.

6. **Progression clarity**
   - The user should always understand current level, completed items, locked items, next goal, and long-term target.

---

# 3. Color System

## Base Palette

Use these as global defaults:

```css
:root {
  --bg-main: #05080d;
  --bg-deep: #020508;
  --surface-base: #0b1017;
  --surface-raised: #111923;
  --surface-glass: rgba(16, 22, 30, 0.72);

  --border-soft: rgba(255, 255, 255, 0.07);
  --border-medium: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.18);

  --text-main: #f5f7fa;
  --text-secondary: #a7b0bd;
  --text-muted: #66707d;
  --text-disabled: #454d58;

  --accent-main: #ff7a1a;
  --accent-glow: #ff9a4a;
  --accent-deep: #ff5c00;
}
```

## Tier Colors

Use these for progression systems:

```css
:root {
  --tier-beginner: #9cff2e;
  --tier-intermediate: #28a8ff;
  --tier-pro: #d85cff;
  --tier-master: #ffb21f;

  --tier-beginner-rgb: 156, 255, 46;
  --tier-intermediate-rgb: 40, 168, 255;
  --tier-pro-rgb: 216, 92, 255;
  --tier-master-rgb: 255, 178, 31;
}
```

## Color Usage Rules

- Orange is the default global action color.
- Green, blue, purple, and gold are reserved for skill tiers or contextual achievement states.
- Do not randomly color icons.
- When a component belongs to a tier, its icon, active node, small glow, progress indicator, and active underline should use the same tier color.
- Inactive UI should stay dark, muted, and low contrast.
- Active UI should be brighter, glossy, elevated, and softly glowing.

---

# 4. Background System

The app background should feel deep and cinematic, not flat.

Recommended global background:

```css
.app-shell {
  min-height: 100vh;
  color: var(--text-main);
  background:
    radial-gradient(circle at 18% 8%, rgba(255, 122, 26, 0.10), transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(40, 168, 255, 0.08), transparent 30%),
    radial-gradient(circle at 50% 100%, rgba(216, 92, 255, 0.06), transparent 34%),
    linear-gradient(180deg, #071018 0%, #020508 52%, #010204 100%);
}
```

Use ambient background lights sparingly. They should support depth, not distract.

---

# 5. Liquid Glass Surface Recipe

Every important card or panel should use layered gradients instead of a flat fill.

## Base Glass Panel

```css
.glass-panel {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.14),
      rgba(255, 255, 255, 0.035) 34%,
      rgba(5, 8, 13, 0.92) 100%
    ),
    linear-gradient(
      135deg,
      rgba(24, 32, 42, 0.96),
      rgba(6, 8, 12, 0.98)
    );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(255, 255, 255, 0.04),
    0 18px 45px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(18px);
}

.glass-panel::before {
  content: "";
  position: absolute;
  left: 5%;
  right: 5%;
  top: 5%;
  height: 36%;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.035)
  );
  pointer-events: none;
}
```

## Active Glass Panel

Use this when a card is selected, current, or important:

```css
.glass-panel.is-active {
  border-color: rgba(var(--active-rgb), 0.34);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 0 28px rgba(var(--active-rgb), 0.18),
    0 22px 55px rgba(0, 0, 0, 0.60);
}
```

## Important

Avoid:

- thick saturated borders
- full-card neon glow
- flat gray panels
- pure black cards with no depth
- huge blur blooms

The liquid glass look comes from **layering**, not from simply adding transparency.

---

# 6. Typography

## Recommended Fonts

Use one of these font combinations:

```css
font-family: "Rajdhani", "Inter Tight", "Inter", system-ui, sans-serif;
```

Other acceptable heading fonts:

- Bebas Neue
- Rajdhani
- Orbitron, only for small labels or HUD-like numbers
- Exo 2
- Inter Tight

## Heading Style

```css
.heading-sport {
  font-weight: 800;
  font-style: italic;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 0.95;
}
```

## Small Label Style

```css
.label-hud {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
```

## Body Text

```css
.body-copy {
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--text-secondary);
  line-height: 1.45;
}
```

## Text Rules

- Use uppercase for titles, nav labels, badges, tier names, and important metrics.
- Use normal sentence case for descriptions and helper text.
- Avoid excessive text glow.
- Use contrast and spacing instead of heavy shadows.

---

# 7. Spacing, Radius, and Layout

## Spacing Scale

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
  --space-3xl: 48px;
}
```

## Radius Scale

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-2xl: 30px;
  --radius-pill: 999px;
}
```

## Layout Rules

- Use dense but breathable dashboards.
- Align everything precisely.
- Keep progress cards wide and cinematic on desktop.
- Use responsive stacking on mobile.
- Avoid tiny cramped text.
- Avoid random spacing values.

---

# 8. Buttons

## Primary Button

Use for main actions such as Start Workout, Complete Set, Save, Continue.

```css
.btn-primary {
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.04) 32%),
    linear-gradient(180deg, #ff9a4a, #ff6a00);
  color: #120701;
  font-weight: 900;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow:
    0 0 18px rgba(255, 122, 26, 0.38),
    0 12px 26px rgba(0, 0, 0, 0.45);
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.06);
  box-shadow:
    0 0 26px rgba(255, 122, 26, 0.48),
    0 16px 34px rgba(0, 0, 0, 0.52);
}

.btn-primary:active {
  transform: translateY(0);
  filter: brightness(0.96);
  box-shadow:
    0 0 12px rgba(255, 122, 26, 0.26),
    0 8px 18px rgba(0, 0, 0, 0.45);
}
```

## Secondary Button

```css
.btn-secondary {
  border-radius: 999px;
  border: 1px solid rgba(255, 122, 26, 0.28);
  background: rgba(12, 16, 22, 0.74);
  color: var(--text-main);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.btn-secondary:hover {
  border-color: rgba(255, 122, 26, 0.46);
  box-shadow: 0 0 16px rgba(255, 122, 26, 0.16);
}
```

## Disabled Button

- Low opacity
- No glow
- Muted text
- Do not use bright borders

---

# 9. Inputs and Forms

## Input Style

```css
.input-dark {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.34), rgba(255, 255, 255, 0.035)),
    rgba(5, 8, 13, 0.82);
  color: var(--text-main);
  box-shadow:
    inset 0 1px 6px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.input-dark:focus {
  outline: none;
  border-color: rgba(255, 122, 26, 0.62);
  box-shadow:
    0 0 0 2px rgba(255, 122, 26, 0.20),
    0 0 18px rgba(255, 122, 26, 0.16),
    inset 0 1px 6px rgba(0, 0, 0, 0.55);
}
```

## Form Rules

- Inputs should feel inset and mechanical.
- Focus states should glow softly.
- Error states should use orange-red, not default bright red.
- Placeholder text should be muted.

---

# 10. Navigation

## Bottom Navigation / Main Tabs

The nav should feel like a dark glass pill floating above the app.

```css
.bottom-nav {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.025)),
    rgba(8, 12, 18, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 18px 45px rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(18px);
}

.nav-tab {
  border-radius: 999px;
  color: var(--text-muted);
  transition: 180ms ease;
}

.nav-tab.is-active {
  color: var(--text-main);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04)),
    rgba(255, 122, 26, 0.18);
  box-shadow:
    0 0 18px rgba(255, 122, 26, 0.30),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}
```

## Navigation Rules

- Active tab: glowing glass pill.
- Inactive tab: dark, muted, no glow.
- Icons should be outlined and simple.
- Avoid colorful inactive icons.

---

# 11. Cards and Panels

## General Card Rules

Cards should:

- have liquid glass depth
- use thin soft borders
- have a subtle top reflection
- use controlled glow only when active
- use precise spacing and alignment

Avoid:

- flat solid fills
- heavy borders
- random drop shadows
- oversaturated gradients

## Stat Card Pattern

```css
.stat-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.025)),
    rgba(12, 16, 23, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 14px 32px rgba(0, 0, 0, 0.42);
}
```

---

# 12. Progression Card System

This is the most important component family for the fitness progression app.

## Purpose

A progression card should show:

- workout category
- current level
- completed skill count
- percentage progress
- current exercise
- final target exercise
- all progression nodes
- tier labels
- locked and completed states

## Layout

Desktop card should be a wide horizontal row:

```css
.progression-card {
  display: grid;
  grid-template-columns: minmax(260px, 360px) 1fr auto;
  gap: clamp(18px, 2vw, 32px);
  align-items: center;
  min-height: 160px;
  padding: clamp(20px, 2.4vw, 32px);
  border-radius: 30px;
}
```

Recommended sections:

1. Left identity area
   - large glowing icon orb
   - progression title
   - `PROGRESSION` subtitle
   - completed count and percentage pill

2. Middle progress area
   - node row
   - current exercise name
   - final target name
   - divider line
   - tier bar

3. Right action area
   - chevron / arrow
   - subtle glow on hover

## Icon Orb

```css
.icon-orb {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(92px, 9vw, 132px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(var(--tier-rgb), 0.48);
  background:
    radial-gradient(circle at 48% 42%, rgba(var(--tier-rgb), 0.24), rgba(0, 0, 0, 0.80) 66%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
  box-shadow:
    0 0 26px rgba(var(--tier-rgb), 0.34),
    inset 0 0 26px rgba(var(--tier-rgb), 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.icon-orb svg {
  color: rgb(var(--tier-rgb));
  filter: drop-shadow(0 0 10px rgba(var(--tier-rgb), 0.55));
}
```

## Progress Nodes

All nodes must fit in one row, including 13–15 node progressions.

```css
.progress-nodes {
  --node-size: clamp(28px, 3vw, 46px);
  display: grid;
  grid-template-columns: repeat(var(--achievement-count), minmax(0, 1fr));
  gap: clamp(5px, 0.8vw, 12px);
  align-items: center;
}

.progress-node {
  width: min(var(--node-size), 100%);
  max-width: 46px;
  aspect-ratio: 1;
  justify-self: center;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.025)),
    rgba(0, 0, 0, 0.42);
  color: var(--text-muted);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.progress-node.is-completed {
  color: rgb(var(--node-rgb));
  border-color: rgba(var(--node-rgb), 0.48);
  box-shadow:
    0 0 14px rgba(var(--node-rgb), 0.24),
    inset 0 0 14px rgba(var(--node-rgb), 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.progress-node.is-current {
  color: rgb(var(--tier-rgb));
  border-color: rgba(var(--tier-rgb), 0.75);
  box-shadow:
    0 0 22px rgba(var(--tier-rgb), 0.52),
    inset 0 0 18px rgba(var(--tier-rgb), 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.progress-node.is-locked {
  color: rgba(255, 255, 255, 0.34);
  border-color: rgba(255, 255, 255, 0.10);
  background: rgba(0, 0, 0, 0.36);
  box-shadow: none;
}
```

## Node Rules

- Current node glows strongest.
- Completed nodes glow softly.
- Locked nodes are muted and dark.
- Completed node color should come from that exercise's own tier.
- Current node and icon orb should use the current/highest achieved tier.
- Do not allow nodes to wrap to a second line.

## Exercise Names

Exercise names must wrap by words and remain readable.

```css
.exercise-name {
  white-space: normal;
  word-break: normal;
  overflow-wrap: anywhere;
  line-height: 1.18;
  color: var(--text-secondary);
}
```

Long words may shrink slightly, but the text must not overflow outside the card.

## Tier Bar

```css
.tier-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.tier-item {
  text-align: center;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.tier-line {
  height: 3px;
  margin-top: 8px;
  border-radius: 999px;
  background: currentColor;
  box-shadow: 0 0 12px currentColor;
  opacity: 0.86;
}
```

Tier order:

1. Beginner — green
2. Intermediate — blue
3. Pro — purple
4. Master — gold/orange

---

# 13. Data-Driven Rendering Rules

Codex should implement styling through data, not hardcoded per-card hacks.

Recommended type:

```ts
type Tier = "beginner" | "intermediate" | "pro" | "master";

type ProgressionExercise = {
  id: string;
  name: string;
  tier: Tier;
  completed: boolean;
  locked: boolean;
};

type Progression = {
  id: string;
  title: string;
  icon: React.ReactNode;
  currentIndex: number;
  total: number;
  currentExercise: string;
  finalExercise: string;
  tier: Tier;
  exercises: ProgressionExercise[];
};
```

When rendering:

```tsx
const percent = Math.round((currentIndex / total) * 100);
```

Set CSS variables per card:

```tsx
style={{
  "--achievement-count": progression.exercises.length,
  "--tier-rgb": tierRgb[progression.tier],
  "--tier-color": tierColor[progression.tier],
} as React.CSSProperties}
```

For each node:

```tsx
style={{
  "--node-rgb": tierRgb[exercise.tier],
  "--node-color": tierColor[exercise.tier],
} as React.CSSProperties}
```

---

# 14. Progress Components

## Circular Progress

Use for workout completion, XP, stamina, streak, and daily goal.

Visual requirements:

- segmented or ring-like
- dark inactive track
- bright active energy stroke
- soft glow only on active stroke
- subtle animation when value changes

## Linear Progress

```css
.linear-progress {
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.linear-progress__fill {
  height: 100%;
  border-radius: inherit;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.16), transparent 24%),
    linear-gradient(90deg, var(--accent-deep), var(--accent-glow));
  box-shadow: 0 0 14px rgba(255, 122, 26, 0.36);
}
```

---

# 15. Badges, Pills, and Metrics

## Badge Style

```css
.badge-glass {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 5px 10px;
  border: 1px solid rgba(var(--badge-rgb), 0.26);
  background: rgba(var(--badge-rgb), 0.08);
  color: rgb(var(--badge-rgb));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
  font-weight: 800;
  letter-spacing: 0.04em;
}
```

Use for:

- XP
- streak
- rank
- percent progress
- workout type
- completed count

---

# 16. Modals, Toasts, and Feedback

## Modal

- Centered glass panel
- Dark vignette background
- Strong primary CTA
- Subtle top reflection
- Rounded 24–30px

## Toast

Toast styles:

- Success: green glow, still dark glass
- Info: blue glow, still dark glass
- Warning: amber/orange glow
- Error: orange-red glow

Do not use default white notification boxes.

---

# 17. Empty States

Empty states should be motivational, not corporate.

Use:

- dark glass placeholder
- subtle outline illustration
- small glowing accent
- short encouraging message
- clear next action

Avoid:

- generic gray icons
- overly cute illustrations
- large empty white space

---

# 18. Iconography

Icon style:

- outlined
- sporty
- geometric
- slightly angular
- simple enough to glow well

Recommended sizes:

- 16px for compact labels
- 20px for controls
- 24px for nav
- 28px+ for feature cards
- 48px+ inside large progression orbs

Rules:

- Inactive icons are muted gray.
- Active icons use the relevant accent/tier color.
- Do not use filled colorful icon packs with random colors.

---

# 19. Motion Design

Motion should feel quick, athletic, and responsive.

## Global Motion

```css
:root {
  --motion-fast: 140ms;
  --motion-normal: 200ms;
  --motion-slow: 320ms;
  --ease-sport: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

## Hover Lift

```css
.hover-lift {
  transition:
    transform var(--motion-normal) var(--ease-sport),
    box-shadow var(--motion-normal) var(--ease-sport),
    border-color var(--motion-normal) var(--ease-sport);
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

## Glow Pulse

Use only for active/current elements.

```css
@keyframes activeGlowPulse {
  0%, 100% {
    box-shadow: 0 0 16px rgba(var(--tier-rgb), 0.30);
  }
  50% {
    box-shadow: 0 0 26px rgba(var(--tier-rgb), 0.52);
  }
}
```

## Motion Rules

- Keep animation subtle.
- Avoid bouncy cartoon motion.
- Avoid constant animation on too many elements.
- Respect reduced motion preferences.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

# 20. Responsive Behavior

## Desktop

- Wide dashboard cards
- Horizontal progression cards
- More visible stats
- Larger icon orbs

## Tablet

- Reduce gaps
- Keep nodes on one row
- Slightly smaller icon orb

## Mobile

- Stack card sections vertically if needed
- Keep the node row single-line by reducing node size/gap
- Maintain liquid glass style
- Avoid hiding critical progression information

Recommended mobile progression layout:

```css
@media (max-width: 760px) {
  .progression-card {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .progress-nodes {
    --node-size: clamp(22px, 7vw, 34px);
    gap: 4px;
  }
}
```

---

# 21. Accessibility

Maintain the style without sacrificing usability.

Rules:

- Text must remain readable on dark backgrounds.
- Do not rely on color alone; use labels, icons, or state changes.
- Focus states must be visible.
- Interactive elements should have clear hit areas.
- Use `aria-label` for icon-only buttons.
- Keep motion optional through reduced-motion support.

---

# 22. Tailwind Implementation Notes

If using Tailwind, map these ideas into reusable classes/components instead of repeating long class strings.

Recommended component utilities:

```txt
app-shell
liquid-card
liquid-card-active
sport-title
hud-label
glass-pill
primary-action
secondary-action
progression-card
progress-node
progress-node-current
progress-node-locked
icon-orb
tier-bar
bottom-nav
nav-tab-active
```

Keep raw arbitrary Tailwind values organized and consistent.

Prefer reusable components:

- `<LiquidCard />`
- `<GlassButton />`
- `<ProgressionCard />`
- `<TierBadge />`
- `<BottomNav />`
- `<MetricCard />`
- `<WorkoutToast />`

---

# 23. Do / Don't

## Do

- Use dark glass surfaces.
- Use layered gradients.
- Add subtle top reflections.
- Use glow only on active states.
- Keep tier colors consistent.
- Make progression states easy to read.
- Keep typography athletic and premium.
- Use smooth, fast interactions.

## Don't

- Do not make the UI flat.
- Do not use white cards.
- Do not use random icon colors.
- Do not glow the entire screen.
- Do not use thick neon borders.
- Do not let node rows wrap.
- Do not cut off long exercise names.
- Do not use overly futuristic unreadable fonts.
- Do not make it look like a generic dashboard template.

---

# 24. Final Product Feeling

The whole project should feel like:

> **A dark futuristic calisthenics training app with glossy liquid-glass cards, cinematic sport lighting, controlled neon progression states, premium athletic typography, and motivational high-performance energy.**

Every UI change should support this feeling.
