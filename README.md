<div align="center">

# Om Pandey — 3D Interactive Portfolio

A scroll-driven, 3D interactive portfolio site with a talking avatar guide that presents my skills, projects, and extracurricular work in real time.

**[Live Demo](#) · [Report an Issue](#) · [Contact Me](#contact)**

</div>

---

## Overview

This isn't a static portfolio — it's a guided experience. A 3D avatar walks visitors through the site: standing to present my tech stack and projects, then sitting at a desk under warm lamp light to talk about literature, public speaking, and mentoring work. All speech is captioned live via the Web Speech API, so nothing here depends on audio to be understood.

Built as a personal project to combine my full-stack/web development background with an actual production-shaped 3D application — not a template.

## Preview

<div align="center">

*(screenshots / demo GIF go here — hero scene, tech-stack ring, desk scene)*

</div>

## Features

- 🧑 **3D avatar guide** — rigged humanoid model with idle, gesture, walk, and seated animations, driven by scroll position
- 🗣️ **Synced speech + captions** — Web Speech API text-to-speech with live on-screen captions (mute/replay controls included)
- 🎯 **Scene transitions** — avatar physically moves between a standing "HUD" tech-presentation scene and a seated desk scene with a warm lighting shift for the literature/extracurricular section
- 🧩 **Interactive tech stack** — floating 3D badge ring covering languages, AI/ML, web & backend, cybersecurity, and tooling
- 📁 **Project showcase** — live cards for every real project, each linking directly to its GitHub repo
- ♿ **Accessibility-first** — reduced-motion / low-power toggle swaps the 3D scene for a static portrait + the same captioned copy; captions are never audio-only
- 📱 **Responsive** — dedicated mobile fallback path for lower-end GPUs
- 🎨 **Custom red/black design system** — cyberpunk-leaning HUD aesthetic with a dedicated warm-tone palette for the literature scene

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router), TypeScript |
| 3D Rendering | React Three Fiber, @react-three/drei, Three.js |
| Avatar | Rigged GLB character (Ready Player Me / Mixamo), retargeted Mixamo animation clips |
| Animation & Scroll | Framer Motion, GSAP ScrollTrigger |
| Speech | Web Speech API (SpeechSynthesis) |
| State | Zustand |
| Styling | Tailwind CSS |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/OMPANDEY-ops/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Add the avatar model
# Place your rigged .glb file at:
# public/models/avatar.glb

# Run the dev server
npm run dev
```

Visit `http://localhost:3000` to view it locally.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, metadata, OpenGraph tags
│   └── page.tsx            # Main scroll-driven page
├── src/
│   ├── components/
│   │   ├── 3d/              # Canvas, avatar, tech-stack ring, desk env, lighting, particles
│   │   └── ui/               # Navbar, sections, captions, cursor, loading screen, a11y controls
│   ├── data/
│   │   └── verifiedData.ts   # Single source of truth for all site content
│   ├── services/
│   │   └── ttsService.ts     # Web Speech API integration + viseme callbacks
│   ├── store/
│   │   └── usePortfolioStore.ts  # Zustand store (avatar state, section, captions, a11y)
│   └── types/
│       └── portfolio.ts      # Shared TypeScript interfaces
├── public/
│   └── models/
│       └── avatar.glb        # Rigged 3D avatar asset (not committed — see below)
└── tailwind.config.js
```

> **Note:** The avatar `.glb` file is not committed to this repo (binary assets are kept out of version control / tracked via Git LFS if included). See [Getting Started](#getting-started) for where to place it locally.

## Content Accuracy

All project descriptions, tech stack claims, and extracurricular details in this site are pulled from a single verified data file (`src/data/verifiedData.ts`) and kept intentionally honest:

- **Next.js AI Chatbot** is framed as a deployment/configuration of Vercel's open-source Chat SDK starter, not an original build from scratch.
- **Frontend Clone Suite** (Spotify Clone, CineStream, InstaPulse) is framed as frontend-only learning/practice work using mock data, not production applications.

## Accessibility

- All avatar speech is captioned on-screen by default — never audio-only
- Reduced-motion / low-power toggle disables 3D camera moves and avatar animation, replacing the scene with a static portrait and the same copy
- Keyboard-navigable section nav

## Contact

- **Email:** [ompandey1811@gmail.com](mailto:ompandey1811@gmail.com)
- **Phone:** +91 7646964673
- **LinkedIn:** [linkedin.com/in/om-pandey-789756387](https://www.linkedin.com/in/om-pandey-789756387)
- **GitHub:** [github.com/OMPANDEY-ops](https://github.com/OMPANDEY-ops)

## License

This project is personal portfolio work. Feel free to reference the architecture/approach, but please don't reuse the content, copy, or avatar likeness as your own.
