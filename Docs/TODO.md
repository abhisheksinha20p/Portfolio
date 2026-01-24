# Project Roadmap & TODO

## Phase 1: Setup & Infrastructure
- [x] **Initialize Project**
    - [x] Create Vite + React + TypeScript project
    - [x] Clean up default template files
    - [x] Initialize Git repository
- [x] **Dependencies**
    - [x] Install Tailwind CSS, PostCSS, Autoprefixer
    - [x] Install Framer Motion (Animations)
    - [x] Install Lucide React (Icons)
    - [x] Install React Router DOM (Navigation)
- [x] **Configuration**
    - [x] Configure `tailwind.config.js` (Theme colors: Dark `#0B0B0E`, Accents)
    - [x] Configure Fonts (Inter/Google Fonts)
    - [x] Setup `index.css` for global styles & base glassmorphism utility classes

## Phase 2: Core Components & Layout
- [x] **Navigation & Layout**
    - [x] Create `Navbar` component (Sticky, Glassmorphism)
    - [x] Create `Footer` component
    - [x] Create `Layout` wrapper (Main content area)
    - [x] Implement Mobile Menu (Hamburger toggle)
- [x] **UI Components (Reusable)**
    - [x] `Button` (Primary/Secondary styles)
    - [x] `SectionHeading` (Standardized typography)
    - [x] `Card` (Glassmorphism base style)
    - [x] `ThemeToggle` (Removed for Dark-only aesthetic)

## Phase 3: Sections Implementation
- [x] **Hero Section**
    - [x] Background animation (subtle particles or gradient)
    - [x] Typography & CTA alignment
    - [x] Initial entrance animations
- [x] **About Section**
    - [x] Split layout implementation (Text + Visual)
    - [x] Timeline/Card for Education
- [x] **Skills Section**
    - [x] Data structure for skills
    - [x] Skill Cards Grid
    - [x] Hover effects
- [x] **Services Section**
    - [x] Service Cards (Backend, API, Mobile)
    - [x] Icon integration
- [x] **Projects Section**
    - [x] Featured Project Card (Vera) layout
    - [x] Tech stack badges
    - [x] Project links (GitHub/Demo)
- [x] **Contact Section**
    - [x] Contact Form UI (Name, Email, Message)
    - [x] Social Links (GitHub, LinkedIn, Email)
    - *Note: Backend integration for form is Phase 2*

## Phase 4: Polish & Review
- [x] **Responsiveness Check**
    - [x] Mobile (375px)
    - [x] Tablet (768px)
    - [x] Desktop (1024px+)
- [x] **Accessibility**
    - [x] Check contrast ratios
    - [x] Verify keyboard navigation
- [x] **SEO Basics**
    - [x] Meta title & description
    - [x] Favicon update

## Phase 5: Visual Redesign ("MILEZ" Aesthetic)
- [x] **Setup & Global Styles**
    - [x] Add `Playfair Display` font
    - [x] Update `tailwind.config.js` (Colors, Fonts)
    - [x] Create Noise Texture Overlay in `index.css`
- [ ] **Component Overhaul**
    - [x] Redesign **Hero Section** (Cinematic, Editorial)
    - [x] Redesign **Navbar** (Minimal, Split)
    - [x] Update **Cards** (Sharper, Darker)
    - [ ] Update **Typography** (Serif Headings)

## Phase 6: Deployment (Later)
- [ ] Dockerfile creation
- [ ] GitHub Actions workflow
- [ ] Deploy to Vercel/AWS
