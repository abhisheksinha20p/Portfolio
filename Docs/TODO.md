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
- [ ] **UI Components (Reusable)**
    - [ ] `Button` (Primary/Secondary styles)
    - [ ] `SectionHeading` (Standardized typography)
    - [ ] `Card` (Glassmorphism base style)
    - [ ] `ThemeToggle` (Light/Dark mode switcher)

## Phase 3: Sections Implementation
- [x] **Hero Section**
    - [x] Background animation (subtle particles or gradient)
    - [x] Typography & CTA alignment
    - [x] Initial entrance animations
- [ ] **About Section**
    - [ ] Split layout implementation (Text + Visual)
    - [ ] Timeline/Card for Education
- [ ] **Skills Section**
    - [ ] Data structure for skills
    - [ ] Skill Cards Grid
    - [ ] Hover effects
- [ ] **Services Section**
    - [ ] Service Cards (Backend, API, Mobile)
    - [ ] Icon integration
- [ ] **Projects Section**
    - [ ] Featured Project Card (Vera) layout
    - [ ] Tech stack badges
    - [ ] Project links (GitHub/Demo)
- [ ] **Contact Section**
    - [ ] Contact Form UI (Name, Email, Message)
    - [ ] Social Links (GitHub, LinkedIn, Email)
    - *Note: Backend integration for form is Phase 2*

## Phase 4: Polish & Review
- [ ] **Responsiveness Check**
    - [ ] Mobile (375px)
    - [ ] Tablet (768px)
    - [ ] Desktop (1024px+)
- [ ] **Accessibility**
    - [ ] Check contrast ratios
    - [ ] Verify keyboard navigation
- [ ] **SEO Basics**
    - [ ] Meta title & description
    - [ ] Favicon update

## Phase 5: Deployment (Later)
- [ ] Dockerfile creation
- [ ] GitHub Actions workflow
- [ ] Deploy to Vercel/AWS
