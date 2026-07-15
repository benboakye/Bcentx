# Bcentx V1 Theme and UI Preservation Guide

## Purpose

Preserve the identity, useful UI ideas, and educational feel of Version 1 while rebuilding with Next.js architecture.

## Color Tokens

```css
:root {
  --primary-blue: #1b145e;
  --secondary-blue: #6c757d;
  --light-blue: #e9f5ff;
  --primary-green: #28a745;
  --secondary-green: #218838;
  --light-green: #d4edda;
}
```

Tailwind roles (implemented in `src/app/globals.css`):

| Role | Color | Usage |
|---|---|---|
| Primary brand | `#1b145e` | Header, hero, important headings |
| Action green | `#28a745` | Primary CTAs |
| Action green hover | `#218838` | Button hover |
| Soft blue background | `#e9f5ff` | Page background |
| Soft green | `#d4edda` | Guidance / success accents |
| Neutral gray | `#6c757d` | Secondary text |
| White | `#ffffff` | Cards |
| Near black | `#111827` | Body text |

Later: amber for medium risk, red for high-risk / scam warnings.

## Keep From V1

- Blue header + green accent bar
- Green CTA buttons
- Card-based sections
- Learning Centre concept
- Beginner-friendly tone
- Logo and favicon assets
- Phrases like “Financial Growth, Simplified”

## Improve In V2

- Reusable React components
- Proper route structure and SEO metadata
- Database-driven content
- Risk / disclosure components
- Accessibility and mobile nav (follow-up sprints)

## Copy Direction

Avoid hype. Prefer realistic, cautious language about work, risk, and startup requirements.

## Instruction

Use V1 as visual and content inspiration only. Do not copy static HTML into the final architecture unless converting into clean React components.
