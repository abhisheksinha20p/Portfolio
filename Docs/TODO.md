# Project Roadmap & TODO

## Phase 1: Setup & Infrastructure
- [ ] **Initialize Project**
    - [ ] Create Vite + React + TypeScript project
    - [ ] Clean up default template files
    - [ ] Initialize Git repository
- [ ] **Dependencies**
    - [ ] Install Tailwind CSS, PostCSS, Autoprefixer
    - [ ] Install Framer Motion (Animations)
    - [ ] Install Lucide React (Icons)
    - [ ] Install React Router DOM (Navigation)
- [ ] **Configuration**
    - [ ] Configure `tailwind.config.js` (Theme colors: Dark `#0B0B0E`, Accents)
    - [ ] Configure Fonts (Inter/Google Fonts)
    - [ ] Setup `index.css` for global styles & base glassmorphism utility classes

## Phase 2: Core Components & Layout
- [ ] **Navigation & Layout**
    - [ ] Create `Navbar` component (Sticky, Glassmorphism)
    - [ ] Create `Footer` component
    - [ ] Create `Layout` wrapper (Main content area)
    - [ ] Implement Mobile Menu (Hamburger toggle)
- [ ] **UI Components (Reusable)**
    - [ ] `Button` (Primary/Secondary styles)
    - [ ] `SectionHeading` (Standardized typography)
    - [ ] `Card` (Glassmorphism base style)
    - [ ] `ThemeToggle` (Light/Dark mode switcher)

## Phase 3: Sections Implementation
- [ ] **Hero Section**
    - [ ] Background animation (subtle particles or gradient)
    - [ ] Typography & CTA alignment
    - [ ] Initial entrance animations
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
