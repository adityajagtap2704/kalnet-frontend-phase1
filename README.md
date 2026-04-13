# Kalnet Frontend Phase 1

A modern Next.js landing page and corporate website for a technology services provider. This project showcases service offerings, courses, team testimonials, FAQ, newsletter signup, and an interactive design system powered by Tailwind CSS, Framer Motion, Redux, and Zustand.

## 🚀 Project Overview

The frontend is built with:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Redux Toolkit + React Redux
- Zustand for UI state

This app is structured as a marketing website for a technology company, with pages for:
- Home
- About
- Services
- Courses
- Contact
- Dashboard and auth flows

## ✨ Main Features

- Responsive multi-section homepage
- Services preview with dynamic data
- FAQ section and testimonials
- Newsletter signup call to action
- Client-side animations and smooth scrolling
- Theme toggle and UI state management
- Fully typed TypeScript components
- Jest testing support

## 📁 Key Structure

- `src/app/` - Next.js app routes and pages
- `src/components/` - reusable UI and section components
- `src/data/` - service, course, navigation, team, testimonial data
- `src/hooks/` - custom React hooks
- `src/lib/` - utilities, API helpers, validators
- `src/store/` - Redux and Zustand state management
- `src/types/` - shared TypeScript interfaces

## ⚙️ Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Run tests:

```bash
npm run test
```

## ✅ Day 1–7 Plan

### Day 1 — Project Setup & Architecture
- Initialize the Next.js + TypeScript project
- Install Tailwind CSS, PostCSS, and Framer Motion
- Define folder structure for pages, components, data, hooks, and store
- Create the main homepage route and layout

### Day 2 — Landing Page Sections
- Build hero section with headline and CTA
- Add services preview cards
- Implement stats and testimonials sections
- Add FAQ and newsletter sections

### Day 3 — Data & Content
- Add structured data for services, courses, team, testimonials, and navigation
- Connect sections to data files for maintainability
- Create reusable card and layout components
- Build the services page and details route

### Day 4 — UI State & Interactions
- Add theme toggle UI and store logic
- Build mobile menu and responsive navigation
- Implement scroll animations and reveal effects
- Add form validation for contact/signup forms

### Day 5 — Auth & Dashboard Flow
- Create login/signup pages and forms
- Add Redux Toolkit auth slice and Zustand UI store
- Build dashboard layout and protected route structure
- Connect auth state with UI behavior

### Day 6 — Testing & Cleanup
- Add unit and component tests with Jest
- Validate page rendering and utility functions
- Remove unused code and simplify styles
- Improve accessibility and responsiveness

### Day 7 — Final Review & Deployment
- Perform a full UI walkthrough on desktop and mobile
- Optimize images and performance
- Fix any layout or style issues
- Prepare for deployment and update documentation

## 📌 Notes

- `.gitignore` already includes build and dependency ignores such as `node_modules/`, `.next/`, `dist/`, `build/`, `.env`, and `*.log`.
- Keep large files out of Git and avoid committing environment files.

## 💡 Future Improvements

- Add a real contact form integration
- Add dynamic CMS-backed content
- Add multilingual support
- Add server-side data fetching for services and courses

---

Made for the Kalnet frontend Phase (1) project.

---

## ✅ Self-Review Checklist (PR Submission)

### TypeScript
- [x] `tsconfig.json` has `"strict": true`
- [x] `npx tsc --noEmit` passes with zero errors
- [x] No `any` types except where explicitly required by third-party library constraints
- [x] All props, state, and function return types are explicitly typed
- [x] Generics used in `ApiResponse<T>`, `Validator<T>`, `pick<T,K>`, `omit<T,K>`
- [x] Enums used — `CourseLevel`

### Pages & Rendering Strategy
- [x] `/` (Home) — SSR (no `"use client"` at page level)
- [x] `/about` — SSR server component, interactive parts in `AboutClient.tsx`
- [x] `/services` — SSR (no `"use client"` at page level)
- [x] `/services/[slug]` — SSG via `generateStaticParams()`
- [x] `/courses` — SSR server component, Redux-connected part in `CoursesClient.tsx`
- [x] `/contact` — SSR (no `"use client"` at page level)
- [x] `/login` — SSR (no `"use client"` at page level)
- [x] `/signup` — SSR (no `"use client"` at page level)
- [x] `/dashboard` — SSR server component, auth-connected part in `DashboardClient.tsx`
- [x] No page file is CSR-only

### State Management
- [x] Redux Toolkit — `authSlice` (login, signup, logout, async thunks)
- [x] Redux Toolkit — `coursesSlice` (loadCourses, setFilter, async thunk)
- [x] Zustand — `useUIStore` (theme, mobile menu, modals, toasts)
- [x] Zustand — `useFormStore` (contact form field state)
- [x] Both Redux and Zustand used in the same project

### API Integration
- [x] `fetchServices`, `fetchServiceBySlug`, `fetchCourses`, `fetchTestimonials`, `fetchTeam`
- [x] `loginUser`, `signupUser`, `submitContactForm`
- [x] Generic `ApiResponse<T>` wrapper with typed success/error handling
- [x] Async/await with proper error boundaries throughout

### Responsive Design
- [x] Mobile-first Tailwind CSS — no custom CSS written
- [x] Breakpoints: `sm:`, `md:`, `lg:` used consistently
- [x] Dark/light theme toggle implemented and persisted to localStorage

### Testing
- [x] Jest + React Testing Library configured
- [x] 256 tests across 38 test suites — all passing
- [x] Coverage: Statements 83% | Branches 75% | Functions 83% | Lines 83%
- [x] All thresholds exceed 70% minimum
- [x] Tests cover: UI components, hooks, Redux slices, Zustand stores, API, validators, utils, sections, layout

### Code Quality
- [x] No unused imports or dead code
- [x] Path aliases configured (`@/*`)
- [x] Components split by concern: `ui/`, `features/`, `sections/`, `layout/`, `animations/`
- [x] Loading and error boundaries implemented (`loading.tsx`, `error.tsx`, `not-found.tsx`)

