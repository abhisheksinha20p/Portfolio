# Design system

Portfolio of Abhishek Sinha, a web and mobile engineer who takes products to production.
The look borrows from his flagship app, Vera (a calm daily planner): cool, quiet surfaces,
one teal action colour, and type doing the heavy lifting. One bold moment per page; the rest stays quiet.

Tokens live as CSS variables in `src/index.css` and are exposed to Tailwind in `tailwind.config.js`.
Pages use the names, never raw values.

## Colour

| Token | Light | Dark | Role |
|---|---|---|---|
| `paper` | `#F3F5F4` | `#0E1513` | Page background (cool mineral white / pine black) |
| `surface` | `#FFFFFF` | `#15201D` | Raised panels: resume sheet, form, menus |
| `ink` | `#10201C` | `#E6EDEA` | Body text and headings |
| `muted` | `#55665F` | `#93A39C` | Secondary text, dates, captions |
| `line` | `#D9E0DC` | `#25322E` | Borders and row dividers |
| `primary` | `#0F766E` | `#4FD1BE` | Buttons, links, current state (Vera's teal) |
| `on-primary` | `#FFFFFF` | `#061A17` | Text on primary |

Each project also carries its own tint (Vera teal, ClientFlow blue), used only inside that project.
All text pairs meet WCAG AA (4.5:1, large text 3:1).

## Typography

- **Bricolage Grotesque** (600–800) for display: the hero name, page titles, project names.
- **Geist** (400–600) for everything else.
- Scale: 14 / 16 / 18 / 22 / 30 / 44 / clamp(3.5rem, 8vw, 6rem) page title / clamp(4rem, 12vw, 10rem) hero name.
- Sentence case everywhere. No all-caps labels, no monospace labels, lines under ~70 characters.

## Spacing and shape

- 4px base scale; sections 96–128px apart on desktop, 64px on mobile; content width 72rem.
- Radius by hierarchy: chips 6px, buttons 10px, panels 16px, screenshots 20px, phone 36px.
- One shadow, only under product screenshots and the phone.

## Components

- **Buttons**: primary (teal fill), quiet (outline). Hover darkens or tints; focus shows a 2px teal ring.
- **Links**: underlined, teal on hover; external links carry a small ↗.
- **Navigation**: sticky solid bar; a pill glides to the hovered link and rests on the current page.
- **Rows, not card grids**: skills, ideas and the page index are divided rows.
- **Timeline**: experience only (it is a real sequence).

## Motion

- One load sequence on the home hero (name, then text, then phone).
- The phone and screenshots drift slightly with scroll and settle at an angle.
- Page changes cross-fade (View Transitions). Everything stops under reduced motion.

## Imagery

Real product screenshots only: Vera screens in a phone frame, project boards in a rounded frame.
Icons from lucide, used sparingly.
