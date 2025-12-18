# BuildVision Homepage

A marketing homepage for BuildVision built with Next.js 15, featuring an AutoCAD-inspired desktop metaphor.

## Features

- **CAD Workstation Aesthetic**: Blueprint grid backgrounds, window chrome, command line interface
- **Interactive Tool Icons**: Wireframe SVG icons with hover effects and detail panels
- **Responsive Design**: Desktop metaphor on large screens, card grid on mobile
- **Smooth Animations**: Framer Motion powered interactions and transitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG wireframe icons
- **Language**: TypeScript

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and CAD theme
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main homepage
├── components/
│   ├── icons/
│   │   └── ToolIcons.tsx    # Wireframe SVG icons
│   ├── CommandLine.tsx      # Bottom command bar
│   ├── CTA.tsx              # Call to action section
│   ├── Desktop.tsx          # Desktop metaphor wrapper
│   ├── DetailPanel.tsx      # Sliding tool detail panel
│   ├── FiveAuthorities.tsx  # Ontology section
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Hero section
│   ├── HowItWorks.tsx       # Workflow section
│   ├── Integration.tsx      # Hub-and-spoke diagram
│   ├── MenuBar.tsx          # CAD-style menu bar
│   ├── SocialProof.tsx      # Testimonials and metrics
│   ├── ToolGrid.tsx         # Tools grid layout
│   ├── ToolIcon.tsx         # Individual tool icon
│   └── WhoItsFor.tsx        # Persona section
└── lib/
    └── tools-data.ts        # Tool definitions and categories
```

## Brand Colors

- Primary Blue: `#4A3AFF`
- Dark Background: `#06042E`
- Category Colors:
  - AI/Automation: Purple (`#A78BFA`)
  - Engineering: Cyan (`#22D3EE`)
  - Workflow: Green (`#4ADE80`)
  - Analytics: Blue (`#60A5FA`)

## License

Private - BuildVision, Inc.
