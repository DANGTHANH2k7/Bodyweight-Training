Must read before any changes to UI/UX

# Dark Premium Sport Design System

## Overall Style

A futuristic **dark-premium sports UI system** inspired by:

* high-performance fitness dashboards
* luxury automotive HUD interfaces
* cyberpunk gym aesthetics
* modern smartwatch / fitness tracker UI
* competitive esports overlays

The interface should feel:

* powerful
* elite
* energetic
* athletic
* high-tech
* motivational

Main visual identity:

* matte black surfaces
* glowing orange energy accents
* metallic dark gradients
* subtle neon reflections
* sharp sporty typography
* premium glassmorphism

---

# Color Palette

## Primary Colors

| Role             | Color     |
| ---------------- | --------- |
| Background       | `#06090D` |
| Surface          | `#0F141B` |
| Elevated Surface | `#151C24` |
| Border           | `#252F3D` |
| Primary Accent   | `#FF7A1A` |
| Accent Glow      | `#FF9A4A` |
| Secondary Accent | `#FF5C00` |
| White Text       | `#F5F7FA` |
| Secondary Text   | `#9CA6B5` |
| Disabled Text    | `#5E6775` |

---

# Lighting & Effects

## Glow Style

* Soft orange neon outer glow
* Blur radius: `8px–18px`
* Opacity: `0.25–0.45`
* Applied to:

  * active buttons
  * sliders
  * progress rings
  * active tabs
  * focused inputs

## Shadows

```css
box-shadow:
0 2px 6px rgba(0,0,0,0.4),
0 8px 24px rgba(0,0,0,0.6);
```

## Glass Surface

```css
backdrop-filter: blur(12px);
background: rgba(20,24,30,0.72);
border: 1px solid rgba(255,255,255,0.06);
```

---

# Typography

## Font Style

Recommended fonts:

* Bebas Neue
* Rajdhani
* Orbitron
* Inter Tight
* Exo 2

### Headings

* Bold
* Condensed
* Slight italic
* Uppercase

Example:

```css
font-weight: 800;
letter-spacing: 1px;
text-transform: uppercase;
font-style: italic;
```

### Body Text

* Minimal
* Clean
* Slightly condensed
* Highly readable

---

# Foundations

## Surfaces

### Base Surface

* Flat matte dark panel

### Raised Surface

* Slight glow
* Higher contrast

### Inset Surface

* Inner shadow
* Feels mechanical

### Pressed Surface

* Reduced glow
* Darker pressed depth

---

# Borders & Radius

## Border System

| Type           | Style             |
| -------------- | ----------------- |
| Thin Border    | 1px               |
| Medium Border  | 2px               |
| Glow Border    | Orange neon       |
| Premium Border | Gradient metallic |

## Radius Scale

| Radius | Usage              |
| ------ | ------------------ |
| 6px    | Small controls     |
| 12px   | Cards              |
| 16px   | Panels             |
| 24px   | Premium containers |
| Full   | Pills / badges     |

---

# Buttons

## Primary Button

Visual:

* orange metallic gradient
* neon edge glow
* sporty embossed text

```css
background:
linear-gradient(
180deg,
#FF9A4A,
#FF6A00
);
```

Hover:

* stronger glow
* brighter highlight

Pressed:

* darker orange
* reduced glow

---

## Secondary Button

Visual:

* dark surface
* thin orange border
* subtle glow

---

## Disabled Button

Visual:

* desaturated gray
* low opacity
* no glow

---

# Inputs

## Default Input

* dark inset surface
* gray border

## Focused Input

* orange border glow
* premium highlight edge

```css
border-color: #FF7A1A;
box-shadow:
0 0 0 2px rgba(255,122,26,0.25);
```

## Error Input

* orange-red warning border
* warning icon
* animated subtle pulse

---

# Selection Controls

## Checkbox

* rounded square
* orange glow when checked

## Radio Button

* glowing orange core
* animated activation

## Toggle Switch

OFF:

* matte black

ON:

* bright orange energy track

---

# Sliders

Style:

* thin futuristic track
* glowing orange thumb
* sporty percentage indicator

Thumb:

```css
width: 18px;
height: 18px;
border-radius: 50%;
background: #FF7A1A;
```

---

# Navigation

## Tabs

Active Tab:

* glowing orange pill
* bold white text

Inactive Tab:

* dark matte surface

---

## Pagination

Current page:

* orange square glow
* elevated effect

---

## Step Process

Appearance:

* circular nodes
* connected lines
* active step glows brightly

Used for:

* workout progression
* onboarding
* challenge tracking

---

# Data Display

## Cards

Style:

* dark premium glass
* soft metallic highlight
* orange progress accents

Card Content:

* title
* subtitle
* progress
* stats
* CTA button

---

## List Items

Style:

* compact sporty rows
* avatar support
* hover elevation

---

## Badges

Types:

* performance
* streak
* XP
* elite rank
* workout type

Visual:

* glowing pills
* metallic orange outline

---

# Tables

## Table Header

Style:

* compact
* dark matte
* thin separators

Interactive:

* sortable columns
* filter icon
* hover glow

---

# Feedback Components

## Modal

Visual:

* centered glass panel
* dramatic vignette
* strong CTA buttons

Mood:

* cinematic
* premium

---

## Toast Notifications

Success:

* green + subtle glow

Info:

* blue + clean neon

Warning:

* amber orange

Error:

* aggressive orange-red

---

## Alert Banner

Style:

* glowing warning stripe
* strong contrast
* compact sporty layout

---

# Progress Components

## Circular Progress

Appearance:

* segmented energy ring
* animated glow sweep

Used for:

* workout completion
* stamina
* XP progress

---

## Linear Progress

Style:

* thin orange energy line
* glossy animated fill

---

# Empty States

Style:

* minimal futuristic illustration
* dark metallic placeholders
* subtle glow outlines

Tone:

* motivational
* premium
* non-corporate

---

# Iconography

## Icon Style

Characteristics:

* outlined sporty icons
* geometric
* slightly angular
* glowing active states

Icon sizes:

* 16px
* 20px
* 24px
* 28px

---

# Motion Design

## Animation Style

Motion should feel:

* athletic
* responsive
* energetic

### Hover

```css
transform: translateY(-2px);
transition: 0.2s ease;
```

### Active Glow Pulse

```css
animation: pulse 2s infinite;
```

### Progress Animation

* smooth sweeping gradient
* GPU accelerated

---

# Layout Style

## Grid System

* dense dashboard layout
* balanced spacing
* premium alignment precision

## Spacing Scale

| Size | Value |
| ---- | ----- |
| XS   | 4px   |
| SM   | 8px   |
| MD   | 12px  |
| LG   | 16px  |
| XL   | 24px  |
| XXL  | 32px  |

---

# Sports App Mood Keywords

Use these visual keywords consistently:

* elite athlete
* performance mode
* gym energy
* futuristic sports tech
* tactical fitness
* cyber fitness
* premium strength
* intense focus
* competition
* progression
* motivation
* energy core
* dark luxury
* smart fitness HUD

---

# Ideal Use Cases

Perfect for:

* fitness tracking app
* calisthenics progression app
* workout dashboard
* gym social app
* smartwatch fitness UI
* performance analytics
* health gamification systems
* training planner
* sports coaching dashboard
