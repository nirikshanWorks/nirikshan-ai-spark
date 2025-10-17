# Nirikshan AI Spark

A modern, responsive business website showcasing AI-powered solutions and expertise. Built with React, TypeScript, Vite, and shadcn/ui components.

## 🚀 Features

- **Modern Tech Stack**: React 18 + TypeScript + Vite for fast development and build times
- **Beautiful UI**: shadcn/ui components with Tailwind CSS styling
- **Responsive Design**: Mobile-first approach with Tailwind CSS utilities
- **Multi-page Navigation**: React Router for seamless page transitions
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query for efficient server state management
- **Charts & Analytics**: Recharts for data visualization
- **Dark Mode**: Next Themes for theme switching
- **Toasts & Notifications**: Sonner for elegant toast notifications
- **ESLint & Code Quality**: Pre-configured ESLint for consistent code style

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── CaseStudyCard.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── IndustryCard.tsx
│   ├── Navigation.tsx
│   ├── ProjectCard.tsx
│   ├── ServiceCard.tsx
│   ├── StatsSection.tsx
│   ├── TeamMemberCard.tsx
│   └── TestimonialCard.tsx
├── pages/               # Page components (route views)
│   ├── Index.tsx       # Home page
│   ├── About.tsx       # About page
│   ├── Expertise.tsx   # Expertise page
│   ├── CaseStudies.tsx # Case studies page
│   ├── Careers.tsx     # Careers page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx
│   ├── use-scroll-animation.tsx
│   └── use-toast.ts
├── lib/                # Utility functions
│   └── utils.ts
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19
- **UI Library**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS 3.4.17
- **Form State**: React Hook Form 7.61.1
- **Validation**: Zod 3.25.76
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0
- **Charts**: Recharts 2.15.4
- **Notifications**: Sonner 1.7.4
- **Icons**: Lucide React 0.462.0
- **Linting**: ESLint 9.32.0

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm/yarn/bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nirikshan-ai-spark
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality and style:

```bash
npm run lint
```

## 📄 Available Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Landing page with hero section and key features |
| About | `/about` | Company information and background |
| Expertise | `/expertise/*` | Services and technical expertise showcase |
| Case Studies | `/case-studies` | Portfolio of completed projects |
| Careers | `/careers` | Job opportunities and team information |
| Contact | `/contact` | Contact form and business information |
| 404 | `*` | Not found page for invalid routes |

## 🎨 Customization

### Colors & Styling

- Tailwind CSS configuration: `tailwind.config.ts`
- CSS variables and custom styles: `src/index.css`
- Component styles are in respective component files

### Adding New Pages

1. Create a new component in `src/pages/YourPage.tsx`
2. Import and add a route in `src/App.tsx`:
```tsx
<Route path="/your-page" element={<YourPage />} />
```

### Adding New Components

1. Create components in `src/components/`
2. For reusable UI components, add them to `src/components/ui/`
3. Import and use in your pages or other components

## 🔧 Configuration Files

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint rules and settings
- `components.json` - shadcn/ui configuration

## 📦 Dependencies Overview

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `shadcn/ui` - High-quality React components
- `lucide-react` - Icon library

### Forms & Validation
- `react-hook-form` - Flexible form management
- `zod` - TypeScript-first schema validation

### State & Data
- `@tanstack/react-query` - Server state management
- `recharts` - Charting library

### Utilities
- `next-themes` - Dark mode support
- `sonner` - Toast notifications
- `date-fns` - Date utilities
- `clsx` - Class name utilities

## 🚀 Performance Optimizations

- Fast build times with Vite
- Code splitting for optimal bundle size
- Tree-shaking support
- Efficient component re-renders
- Lazy loading with React Router

## 📝 Contributing

When contributing to this project:

1. Follow the ESLint configuration
2. Use TypeScript for type safety
3. Use existing UI components from shadcn/ui when possible
4. Keep components focused and reusable
5. Add proper documentation to complex functions

## 📄 License

This project is part of Nirikshan AI Spark. All rights reserved.

---

**Last Updated**: October 2025
