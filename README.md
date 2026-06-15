# 🏛️ 3D Art History Gallery

An immersive, first-person 3D art gallery built with Next.js, Three.js, and Tailwind CSS. Walk through five interconnected corridors spanning five centuries of art history, each housing AI-generated paintings in the style of their era.

## ✨ Features

- 🚶 First-person navigation with pointer lock controls
- 🖼️ 5 themed corridors: Renaissance, Baroque, Romantic, Impressionism, Modern Art
- 🎨 28 AI-generated paintings with historical context
- 🔍 Click any painting to view full detail and read its history
- 🗺️ Era indicator and corridor minimap

## 🎮 Controls

| Key | Action |
|-----|--------|
| `W / A / S / D` or Arrow Keys | Walk through the gallery |
| `Mouse` | Look around |
| `Click` | Lock cursor / Select painting |
| `ESC` | Release cursor / Close painting |

## 🛠️ Tech Stack

- **Next.js** — React framework
- **Three.js** — 3D rendering
- **Tailwind CSS** — Styling
- **Shadcn/ui** — UI components
- **Prisma + SQLite** — Database
- **Bun** — Package manager & runtime

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed

### Install & Run

```bash
# Install dependencies
bun install

# Set up environment
echo DATABASE_URL="file:./dev.db" > .env

# Push database schema
bun run db:push

# Start dev server
bunx next dev -p 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
