# VisioReach Concepts – Portfolio Website

A premium, modern personal portfolio website for a creative web developer and digital brand.

## 🚀 Tech Stack
- HTML5 (semantic markup, SEO meta tags, Open Graph)
- CSS3 (CSS variables, glassmorphism, animations, fully responsive)
- Vanilla JavaScript (no dependencies required)

## 📁 Folder Structure
```
portfolio/
├── index.html          ← Main HTML file
├── style.css           ← All styles & responsive breakpoints
├── script.js           ← All interactivity & animations
└── assets/
    ├── icons/
    │   └── favicon.svg
    ├── images/         ← Add your real photos here
    └── fonts/          ← Optional local fonts
```

## ✨ Features
- Sticky navbar with hide-on-scroll & hamburger menu
- Typing text animation in hero
- Smooth scroll reveal animations
- Animated skill bars
- Counter animations on stats
- Project filter (All / Web / E-commerce / UI)
- Auto-sliding testimonials with swipe support
- Vertical journey timeline
- Contact form with validation
- WhatsApp CTA button
- Back-to-top button
- Cursor glow effect (desktop)
- Mouse parallax on hero orbs
- SEO & Open Graph meta tags
- SVG favicon

## 🌐 Deploying to Vercel
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Select the repo → Deploy (no build settings needed)

## 🌐 Deploying to GitHub Pages
1. Push to GitHub
2. Go to repo → Settings → Pages
3. Set source: `main` branch / `root` folder → Save

## 🎨 Customization
- Colors: edit CSS variables in `:root {}` at the top of `style.css`
- Content: update text, links, and project info in `index.html`
- Images: replace `.project-img-placeholder` divs with real `<img>` tags
- WhatsApp: replace `2348000000000` with your real number
- Email: replace `hello@visioreachconcepts.com` with your real email

## 📝 To Add Real Profile Image
Replace the `.about-img-placeholder` div in `index.html`:
```html
<img src="assets/images/profile.jpg" alt="VisioReach Concepts – Profile" />
```

## 📦 No build tools needed — pure HTML/CSS/JS, open index.html directly.
