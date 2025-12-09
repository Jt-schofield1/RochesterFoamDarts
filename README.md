# 🎯 Rochester Foam Dart League

A modern, mobile-first website for the Rochester Foam Dart League (Foam Dart Nation Est. 2015).

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

## 🌐 Live Site

**[rochesterfoamdartleague.com](https://rochesterfoamdartleague.com)**

## ✨ Features

- **Modern UI** - Bold, animated design with Framer Motion
- **Mobile-First** - Fully responsive on all devices
- **Digital Waiver System** - Complete waiver form with signature capture
- **Party Booking** - Inquiry form for party packages
- **Newsletter Signup** - Email collection via Formspree
- **SEO Optimized** - Full metadata and OpenGraph tags

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, weekly games, parties, newsletter |
| Parties & Events | `/parties` | Package details, inquiry form |
| Weekly Games | `/weekly-games` | Locations, schedules, pricing |
| Game Modes | `/game-modes` | All available game modes |
| Waiver | `/waiver` | Digital waiver with signature pad |
| Gift Cards | `/gift-cards` | Redirects to Squarespace checkout |

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS + shadcn/ui
- **Animations:** Framer Motion
- **Forms:** Formspree
- **Hosting:** Vercel
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jt-schofield1/RochesterFoamDarts.git

# Navigate to project directory
cd RochesterFoamDarts

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── public/
│   ├── pictures/         # Site images
│   ├── favicon.png       # Favicon
│   └── apple-touch-icon.png
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── parties/
│   │   ├── weekly-games/
│   │   ├── game-modes/
│   │   ├── waiver/
│   │   └── gift-cards/
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── SignaturePad.tsx
│   └── lib/              # Utilities
└── tailwind.config.ts
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Fire Red | `#E62828` | Primary accent |
| Jet Black | `#000000` | Background |
| Charcoal | `#1B1B1B` | Cards, sections |
| White | `#FFFFFF` | Text, contrast |
| Yellow | `#F2FF00` | Highlights |

## 📞 Contact

**Rochester Foam Dart League**
- 📍 75 Barrett Drive P.O. Box 65, Webster, NY 14580
- 📞 (585) 748-8087
- ✉️ parties@rochesterfoamdartleague.com

## 📝 License

This project is proprietary to Rochester Foam Dart League / Foam Dart Nation.

---

Built with ❤️ by [Jt-schofield1](https://github.com/Jt-schofield1)

