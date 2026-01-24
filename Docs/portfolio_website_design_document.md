# Design Document – Personal Portfolio Website

**Project:** Portfolio Website for Abhishek Sinha  
**Role:** Freelance Full Stack & Mobile Developer  
**Alignment:** This design document strictly follows the approved **PRD** and **Tech Stack**.

---

## 1. Design Vision & Inspiration

### 1.1 Visual Direction
The visual direction is inspired by the provided **MILEZ** reference images, focusing on:
- High-contrast dark aesthetics
- Editorial, cinematic layouts
- Minimal but expressive typography
- Strong visual storytelling

The portfolio should feel:
- **Premium** (enterprise-ready)
- **Futuristic** (modern engineering mindset)
- **Corporate-minimal** (trust & professionalism)

This is not a generic developer portfolio; it should feel **crafted**, intentional, and architectural.

---

## 2. Core Design Principles

1. **Minimalism over Noise**  
   Every element must have a purpose. No decorative clutter.

2. **Contrast & Hierarchy**  
   Large typography, generous spacing, and contrast-driven layouts.

3. **Motion with Meaning**  
   Animations should guide attention, not distract.

4. **Glassmorphism as an Accent**  
   Glass effects are used sparingly for cards and overlays, never as a base.

5. **Engineering Credibility**  
   The design must visually communicate security, scalability, and precision.

---

## 3. Color System

### 3.1 Base Colors
- **Primary Dark:** Near-black charcoal (#0B0B0E)
- **Secondary Dark:** Soft graphite (#141418)
- **Light Mode Base:** Off-white (#F5F6F8)

### 3.2 Accent Colors
- **Primary Accent:** Electric Blue / Cyan (used for CTAs and highlights)
- **Secondary Accent:** Muted Purple or Teal (used sparingly)

### 3.3 Usage Rules
- Dark mode is the default
- Accent colors only for interaction states
- No more than 2 accent colors per screen

---

## 4. Typography System

### 4.1 Font Choices
- **Primary Font:** Inter (UI, body text)
- **Display Font (Optional):** A refined serif or high-contrast sans for headings

### 4.2 Hierarchy
- H1: Large, editorial, bold
- H2: Strong but restrained
- Body: Clean, readable, slightly spaced
- Meta text: Small, muted, uppercase

Typography should feel **editorial**, similar to the reference images.

---

## 5. Layout & Grid System

### 5.1 Grid
- 12-column desktop grid
- 8-column tablet grid
- Single-column mobile layout

### 5.2 Spacing
- Large vertical spacing between sections
- Clear separation using negative space

Layouts should breathe. Empty space is intentional.

---

## 6. Section-by-Section Design

### 6.1 Hero Section

**Layout:**
- Full viewport height
- Center-aligned content
- Subtle background texture or gradient

**Content Design:**
- Name as dominant visual element
- Role as secondary text
- One-line value proposition
- Two CTAs (Projects, Contact)

**Motion:**
- Slow fade-in
- Subtle vertical motion on load

---

### 6.2 About Section

**Layout:**
- Split layout (text + visual)
- Glassmorphism card for content

**Visuals:**
- Abstract tech imagery or muted photography

**Focus:**
- Professional story
- Education
- Engineering mindset

---

### 6.3 Skills Section

**Layout:**
- Grid of skill cards
- Icons + labels

**Interaction:**
- Hover reveals short descriptions

**Tone:**
- Technical, precise, confident

---

### 6.4 Services Section

**Layout:**
- Three large cards
- Strong titles

**Design:**
- Glass panels
- Minimal icons

**Services:**
- Backend Development
- API Development
- Mobile App Development

---

### 6.5 Projects Section

**Layout:**
- Editorial-style project showcase
- Large visuals
- Minimal text blocks

**Featured Project:**
- Vera – Simple & Productive To-Do App

**Design Approach:**
- Cinematic presentation
- Tech stack badges
- Clear problem → solution narrative

---

### 6.6 Contact Section

**Layout:**
- Calm, minimal closing section
- Centered form

**Design:**
- Glass form container
- Soft borders

**CTA Tone:**
- Professional and inviting

---

## 7. Motion & Interaction Design

- Page transitions using Framer Motion
- Hover states with subtle glow
- Scroll-based reveal animations
- No heavy parallax

Motion should feel **engineered**, not playful.

---

## 8. Dark / Light Mode Strategy

- Dark mode default
- Light mode mirrors structure
- Accent colors remain consistent
- Mode preference stored locally

---

## 9. Technical Alignment

This design is fully compatible with:
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- Docker-based deployment

All effects are achievable without heavy libraries.

---

## 10. Accessibility Considerations

- WCAG contrast compliance
- Keyboard navigable
- Reduced motion preference respected

---

## 11. Future Scalability

Design allows seamless addition of:
- Blog / articles
- Case studies
- Testimonials

---

## 12. Final Design Intent

This portfolio should feel like:
> **A senior engineer’s personal website, not a template.**

It must communicate:
- Trust
- Precision
- Security
- Modern engineering excellence

---

**Status:** Ready for UI implementation