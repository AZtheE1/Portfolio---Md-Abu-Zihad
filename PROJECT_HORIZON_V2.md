# 🌌 Project Horizon: Next-Gen 3D Interactive Portfolio (V2)

<div align="center">

```
  ██████╗  ██████╗  ██████╗ ████████╗███████╗ ██████╗  ██████╗ ██╗     ██╗ ██████╗ 
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██╔════╝ ██║     ██║██╔═══██╗
  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║  ███╗██║     ██║██║   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║   ██║██║     ██║██║   ██║
  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝╚██████╔╝███████╗██║╚██████╔╝
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝  ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
```

![Branch: v2-development](https://img.shields.io/badge/Branch-v2--development-7c3aed?style=for-the-badge&logo=git&logoColor=white)
![Stack: Astro + R3F + Tailwind](https://img.shields.io/badge/Stack-Astro_•_R3F_•_Tailwind-0ea5e9?style=for-the-badge&logo=astro&logoColor=white)
![Status: In-Active-Development](https://img.shields.io/badge/Status-Phase_1_Scaffolding-10b981?style=for-the-badge&logo=statuspage&logoColor=white)
![Preservation: Main Isolated](https://img.shields.io/badge/Main_Branch-Protected_&_Untouched-ef4444?style=for-the-badge&logo=shield&logoColor=white)

<br/>

> **"A seamless fusion of cinematic 3D environment exploration, holographic case studies, and lightning-fast static delivery."**

</div>

---

## 📌 Mission Directives & Guardrails

* 🛡️ **Branch Isolation:** All work lives exclusively on `v2-development`. Never merge into `main` to preserve live GitHub Pages deployment.
* ⚡ **Zero-Friction Initial Load:** Astro Island architecture keeps the core shell instant and accessible.
* 🕶️ **Recruiter First ("Recruiter Mode"):** Instant escape hatch to ultra-clean 2D Markdown-driven case study portfolio under 30 seconds.
* 🕹️ **Cinematic Immersion:** Avatar cursor-tracking head movement, physics-driven "crime scene" board, 3D holographic projection of live projects, and spatial WebAudio.

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph Browser ["Client Shell (Astro SSG Engine)"]
        Nav["Persistent HUD / Mode Switcher"]
        Boot["Retro Terminal Boot Sequence"]
        
        subgraph Mode_3D ["3D Virtual Dimension (R3F Island)"]
            Scene["Room Canvas (@react-three/fiber)"]
            Avatar["Avatar Node (ReadyPlayerMe + Mixamo Rig)"]
            Board["Crime Scene Corkboard (Rapier Physics)"]
            Pins["Sticky Notes & Red String Nodes"]
            Holo["Holographic Portals (<Html> + Bloom VFX)"]
            Audio["Spatial WebAudio Engine"]
            
            Scene --> Avatar
            Scene --> Board
            Board --> Pins
            Pins --> Holo
            Scene --> Audio
        end

        subgraph Mode_2D ["Recruiter Fast Lane (2D Accessible)"]
            MD["src/content/case-studies/*.md"]
            View2D["Accessible Tailwind UI & Bento Grid"]
            MD --> View2D
        end
    end

    Boot -->|Assets Ready| Scene
    Nav -->|Toggle Switch| Mode_2D
    Nav -->|Toggle Switch| Mode_3D
```

---

## 🎯 Feature Matrix & Execution Plan

| Module | Core Experience | Tech / Shader / Pipeline | AI Task | Dev Manual Task |
| :--- | :--- | :--- | :---: | :---: |
| **01. Terminal Boot** | Retro command-line checks while `.glb` streams | Astro + Vanilla JS / CSS scanline | 🤖 Engine | - |
| **02. Avatar & Desk** | Cursor tracking head tilt, desk idle/typing loop | Three.js Bones + Mixamo animations | 🤖 Math & Logic | 🎨 Export GLB |
| **03. Investigation Board** | Corkboard, red strings, Rapier physics sway | `@react-three/rapier` + CameraControls | 🤖 Physics/Zoom | 🎨 Room Model |
| **04. Holographic Portal** | Click note -> Camera zooms -> Floating live preview | `@react-three/drei` `<Html>` + Bloom | 🤖 FX & Shaders | 🔗 Project URLs |
| **05. Spatial Audio** | Positional keyboard typing & electric hum | Three.js `PositionalAudio` | 🤖 Audio Map | 🎵 Sfx Assets |
| **06. Recruiter Mode** | 1-Click fast toggle to 2D accessible interface | Astro Content Collections + Tailwind | 🤖 Full UI Shell | 📝 Case Studies |

---

## 🗺️ Implementation Milestones

```mermaid
gantt
    title V2 Interactive Portfolio Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    Git Branch Verification        :done, p1_1, 2026-09-24, 1d
    Scaffold Astro + Tailwind + R3F :active, p1_2, 2026-09-24, 2d
    Content Collections Setup      :p1_3, after p1_2, 2d
    section Phase 2: Asset Pipeline
    Avatar & Mixamo Rigging        :p2_1, 2026-09-26, 3d
    Blender Room & Lighting Bake   :p2_2, 2026-09-26, 4d
    section Phase 3: 3D Engineering
    Canvas Mount & Model Loader    :p3_1, after p2_2, 3d
    Cursor Tracking & Camera Zoom  :p3_2, after p3_1, 3d
    section Phase 4: Holograms & Audio
    Rapier Physics & Red Strings   :p4_1, after p3_2, 3d
    Hologram Bloom & Audio Panning :p4_2, after p4_1, 3d
    section Phase 5: Fallback & Edge
    Recruiter 2D View Polish       :p5_1, after p4_2, 2d
    Cloudflare / Vercel Edge Deploy:p5_2, after p5_1, 2d
```

---

## ⚡ Active Action Items

- [x] Create and checkout `v2-development` branch
- [x] Generate Animated Horizon PRD & Tracking Document (`PROJECT_HORIZON_V2.md`)
- [ ] Scaffold Astro project with React, Tailwind CSS, and Three.js / R3F dependencies
- [ ] Establish content collection structure in `src/content/case-studies/`
- [ ] Implement Retro Terminal Boot Loader component
- [ ] Create placeholder 3D Room Canvas + 2D Recruiter Switch toggle
