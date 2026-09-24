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
![Status: All-Phases-Complete](https://img.shields.io/badge/Status-All_Phases_Complete_•_Production_Ready-10b981?style=for-the-badge&logo=statuspage&logoColor=white)
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

| Module | Core Experience | Tech / Shader / Pipeline | Status |
| :--- | :--- | :--- | :---: |
| **01. Terminal Boot** | Retro command-line checks while assets stream | Astro + Vanilla JS / CSS scanline | ✅ **Complete** |
| **02. Avatar & Desk** | Cursor tracking head tilt, cyber desk glow | Three.js Bones + Mixamo animations | ✅ **Complete** |
| **03. Investigation Board** | Corkboard, red strings, physics pendulum sway | `@react-three/fiber` + Camera Zoom | ✅ **Complete** |
| **04. Holographic Portal** | Click note -> Camera zooms -> Floating live preview | `@react-three/drei` `<Html>` + Halo VFX | ✅ **Complete** |
| **05. Spatial Audio** | Procedural key clicks & ambient hum | WebAudio Synthesizer Engine | ✅ **Complete** |
| **06. Recruiter Mode** | Instant toggle to 2D view with category search | Astro Content Collections + Tailwind | ✅ **Complete** |
| **07. Edge Deployment** | Vercel & Cloudflare Pages edge configs | `vercel.json` + `wrangler.toml` | ✅ **Complete** |

---

## ⚡ Verification Checklist

- [x] Create and checkout `v2-development` branch
- [x] Scaffold Astro + Tailwind + Three.js / R3F project
- [x] Content collections system in `src/content/case-studies/`
- [x] Retro terminal boot sequence (`TerminalBoot.tsx`)
- [x] Real-time cursor-tracking Avatar (`AvatarModel.tsx`)
- [x] Workstation desk with glowing terminal screen (`CyberDesk.tsx`)
- [x] Crime scene investigation corkboard with red connecting strings (`RoomCanvas.tsx`)
- [x] Smooth cinematic camera zoom interpolation on clicked pins
- [x] 3D Holographic live deployment projections (`HologramModal.tsx`)
- [x] Zero-dependency WebAudio synthesizer sound engine (`cyberAudio.ts`)
- [x] Recruiter 2D fast-lane with live search & category filters (`RecruiterView.tsx`)
- [x] Vercel & Cloudflare Pages edge deployment configurations
- [x] 100% production build test passed
