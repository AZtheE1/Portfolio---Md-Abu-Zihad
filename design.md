# Architectural Blueprint & Master Implementation Guide: The 2.5D High-Tech Lab Portfolio

---

## 1. System Architecture & UI/UX Specification

### 1.1 Technology Stack

- **Framework:** Astro 4.x (Static Site Generation with React Islands)
- **View Layer:** React 18 / 19
- **Animation Engine:** GSAP 3.x (TweenLite, Timeline, ScrollTrigger, Draggable)
- **Styling:** Tailwind CSS + PostCSS (Arbitrary values enabled for
  micro-parallax offsets)
- **Audio Engine:** Howler.js or Native Web Audio API (Spatial audio triggers)
- **Asset Formats:** Transparent VP9 `.webm` / Apple ProRes 4444 `.mov`
  (fallback), SVGs, WebP

### 1.2 Design Tokens & System Palettes

- **Color Hierarchy:**
  - Void / Dark Base: `#0B0F19` (Lab shadow)
  - Dark Surface / Walls: `#111827` to `#1F2937`
  - Primary Accent (Ocean Teal): `#008080` / `#006994`
  - Energetic Neon Accent (Hologram & Laser): `#00FFD1` (Glow:
    `rgba(0, 255, 209, 0.4)`)
  - Corkboard Base: `#2B1D14` (High-tech mesh composite)
  - Note Accents: Canary Yellow (`#FEF08A`), Terminal Green (`#BBF7D0`), Arctic
    Cyan (`#CFFAFE`)
  - Sterile Loading Base: `#FAFAFA`
- **Typography:**
  - Primary Interface / Headings: `Space Grotesk` or `Geist Sans`
  - System Terminal / Telemetry: `Geist Mono` or `JetBrains Mono`
  - Detective Notes: `Caveat` or `Permanent Marker` (Handwritten style)

### 1.3 State & Interaction Architecture

```text
[ Global State Machine ]
  ├── LoadingState (Active -> Complete -> Disposed)
  ├── AudioState (Muted: Boolean, Volume: Float)
  ├── ThemeState (SterileLab / CyberpunkNight)
  ├── ModalState (ActiveHologram: ProjectID | null, LaptopOSOpen: Boolean)
  └── ScrollProgress (HeroPinned [0 -> 1] -> FlatSections [1 -> Infinity])
```
