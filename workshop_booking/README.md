# FOSSEE Workshop Booking — UI/UX Enhancement

> **Python Screening Task Submission**
> Redesigning the FOSSEE Workshop Booking portal for performance, modern UI, responsiveness, accessibility, and SEO using React.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Design Principles](#design-principles)
3. [Responsiveness Strategy](#responsiveness-strategy)
4. [Trade-offs: Design vs Performance](#trade-offs-design-vs-performance)
5. [Biggest Challenge](#biggest-challenge)
6. [Visual Showcase — Before & After](#visual-showcase--before--after)
7. [Tech Stack](#tech-stack)
8. [Setup Instructions](#setup-instructions)
9. [Project Structure](#project-structure)

---

## Project Overview

The original FOSSEE Workshop Booking site is a functional Django-template driven portal. The goal of this task was to redesign its UI/UX from the ground up — targeting students on mobile devices — using React, without touching the backend's core logic.

**What was done:**
- Replaced all Django template pages with a React 19 SPA (Vite-powered)
- Implemented a dark-mode design system with consistent tokens
- Made every page fully mobile-first and responsive
- Added role-based routing (coordinator vs instructor)
- Built reusable components: Navbar (mobile hamburger), WorkshopCard, StatusBadge, Toast, Footer

---

## Design Principles

### 1. Mobile-First by Default
The target users are students, most of whom access the portal on phones. Every layout decision started at `320px` wide and scaled up — not the reverse.

### 2. Visual Hierarchy
The original site presented information in flat, unstyled lists. The redesign uses card-based layouts, bold headings, muted secondary text, and colour-coded status badges so users can scan a page and immediately understand what matters.

### 3. Consistency via a Design System
Rather than writing ad-hoc styles per page, a single set of CSS variables and utility classes was defined in `index.css`. Every page draws from the same colour palette, spacing scale, and font stack — making the UI feel cohesive and maintainable.

### 4. Feedback and Affordance
Every interactive element gives feedback: buttons animate on hover, a toast notification system confirms actions (booking submitted, login failed, signed out), and form validation errors are surfaced inline. Users are never left wondering whether their action worked.

### 5. Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`) used throughout
- All form inputs have associated `<label>` elements
- Colour contrast ratios meet WCAG AA (light text on dark surfaces)
- Focus rings are visible on keyboard navigation

---

## Responsiveness Strategy

| Technique | Detail |
|---|---|
| **Mobile-first Tailwind breakpoints** | All layouts default to single-column stacks; `md:` and `lg:` classes add complexity for wider screens |
| **CSS Grid + Flexbox** | Cards grid from 1 → 2 → 3 columns as viewport expands |
| **Hamburger navigation** | Navbar collapses to an icon on `< md` screens; the full menu is behind a slide-in drawer |
| **Fluid typography** | `clamp()` sizing for headings so text scales naturally between 320 px and 1440 px |
| **Touch-target sizing** | All buttons and links are at least `44 × 44 px` (Apple HIG / WCAG 2.5.5) |
| **No horizontal scroll** | All containers use `max-w-screen` and `overflow-x-hidden`; tested down to 320 px |

---

## Trade-offs: Design vs Performance

### Animations vs Render Speed
Smooth micro-animations (fade-up on card entry, shimmer skeletons during loading) improve perceived performance and polish. However, they use `@keyframes` CSS animations (GPU-composited), not JavaScript, so there is zero JS execution cost after initial parse.

**Trade-off accepted:** Slight CSS bundle increase (~1 KB) in exchange for a noticeably more premium feel.

### Google Fonts vs System Fonts
`Inter` is loaded from Google Fonts. This adds one external request and a small render-blocking risk. This was mitigated with `display=swap` so text is shown immediately in the fallback font and Inter swaps in seamlessly.

**Trade-off accepted:** 1 network request for a significant readability and brand-consistency improvement.

### Dark Mode Only vs Adaptive Theme
A system-adaptive theme (`prefers-color-scheme`) was considered but would have doubled the colour-token count. Since the target demographic (students, primarily mobile) shows a strong preference for dark UIs, and the original site has no theme at all, dark-only was chosen.

**Trade-off accepted:** Slightly less flexible than an adaptive theme, but zero theme-switching complexity and a consistently polished experience.

### Mock Data vs Live API
The React frontend currently uses a local `mockData.js` file. This was a deliberate trade-off to allow the UI to be evaluated without running the full Django stack. Every page is structured so replacing a mock import with a `fetch()` / `useEffect()` call is a minimal, localised change.

---

## Biggest Challenge

### Keeping Inputs Visible in Dark Mode

The single most time-consuming issue was browser autocomplete behaviour. Browsers (especially Chrome) inject their own background colour (`rgb(232, 240, 254)` — a bright blue-white) into form fields that have been auto-filled. This completely broke the dark design.

**Approach:**
1. Identified the problem as the `-webkit-autofill` pseudo-class overriding all CSS.
2. The fix is a known hack — use an inset `box-shadow` of the desired background colour; browsers honour this even during autofill, while respecting the text colour set via `-webkit-text-fill-color`.
3. Supplemented with `caret-color` and `!important` overrides so no Tailwind reset could strip them.
4. Added `color-scheme: dark` on `<html>` so native date-picker and select dropdowns also render in dark mode.

```css
/* src/index.css — the autofill fix */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #1e293b inset !important;
  -webkit-text-fill-color: #f1f5f9 !important;
  caret-color: #f1f5f9 !important;
}
```

This one snippet unlocked reliable, dark, always-visible form inputs across all browsers — a deceptively simple solution to a stubborn cross-browser issue.

---

## Visual Showcase — Before & After

### Login Page

| Before | After |
|:---:|:---:|
| ![Before — Login](docs/screenshots/before/before_1.png) | ![After — Login](docs/screenshots/after/after_1.png) |

---

### Workshop Listing

| Before | After |
|:---:|:---:|
| ![Before — Listing](docs/screenshots/before/before_2.png) | ![After — Listing](docs/screenshots/after/after_2.png) |

---

### Dashboard / Status Page

| Before | After |
|:---:|:---:|
| ![Before — Dashboard](docs/screenshots/before/before_3.png) | ![After — Dashboard](docs/screenshots/after/after_3.png) |

---

### Registration / Forms

| Before | After |
|:---:|:---:|
| ![Before — Register](docs/screenshots/before/before_4.png) | ![After — Register](docs/screenshots/after/after_4.png) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Bundler / Dev Server | Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 + custom CSS design system |
| Typography | Inter (Google Fonts) |
| Backend (unchanged) | Django 3.0.7, SQLite |

---

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for backend, optional for UI review)

### Run the Frontend (UI only — no backend needed)

```bash
# 1. Clone the repository
git clone https://github.com/FOSSEE/workshop_booking
cd workshop_booking/frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# Open http://localhost:5173
```

**Demo role switching:**
- Login with any username → Coordinator view
- Login with a username containing `"instructor"` → Instructor view
- Or append `?role=instructor` to the URL

---

### Run the Backend (Django)

```bash
# From the repo root
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS / Linux

pip install -r requirements.txt

cp .sampleenv .env
# Edit .env — add SECRET_KEY and email settings

python manage.py migrate
python manage.py runserver
# API available at http://127.0.0.1:8000
```

---

## Project Structure

```
workshop_booking/
├── docs/
│   └── screenshots/
│       ├── before/          # Original Django-template screenshots
│       └── after/           # Redesigned React SPA screenshots
├── frontend/                # React SPA (this is the submission)
│   └── src/
│       ├── components/      # Navbar, Footer, WorkshopCard, StatusBadge, Toast
│       ├── data/            # mockData.js (swap with API calls)
│       ├── pages/           # LoginPage, RegisterPage, Dashboards, etc.
│       ├── App.jsx          # Root component + client-side router
│       ├── index.css        # Dark-mode design system (tokens, animations)
│       └── main.jsx         # React entry point
├── workshop_app/            # Django core app (unchanged)
├── teams/                   # Django user/profile app (unchanged)
├── statistics_app/          # Django analytics app (unchanged)
├── manage.py
├── requirements.txt
└── README.md
```




