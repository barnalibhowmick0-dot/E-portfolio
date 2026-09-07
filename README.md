# Barnali Bhowmick — Geospatial Portfolio

A recruiter-focused interactive portfolio built with React, Three.js/React Three Fiber, Framer Motion and a small Node.js/Express contact API.

## What is included

- Dark, Light, Neural, Matrix and Times visual themes
- Interactive 3D skills globe
- Professional about/education identity section
- Visual experience timeline
- Filterable project showcase
- Project detail modal with GitHub links
- Hands-on field journal placeholders
- Resume and India Space Lab completion letter
- Contact section with mail fallback + optional Node.js SMTP API
- Mobile responsive layout
- GitHub Pages-ready frontend build

## Run locally

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend (optional)
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The current contact form intentionally falls back to a `mailto:` flow so the static GitHub Pages version remains functional. The Node API is ready when you want real form delivery.

## Add your photographs

Put your files in the matching folders and update the data/component paths when you are ready:

- `client/public/images/profile.jpg`
- `client/public/images/experience/`
- `client/public/images/projects/`
- `client/public/images/fieldwork/`

The first version uses labelled placeholders so you can replace them without redesigning the page.

## Resume / certificate

Already included:

- `client/public/documents/Barnali_Resume.pdf`
- `client/public/documents/India_Space_Lab_Completion_Letter.pdf`

## Update content

Most portfolio content lives in:

`client/src/data/content.js`

This is where skills, education, experience, projects and field notes can be updated.

## Build

```bash
cd client
npm run build
```

The production frontend is generated in `client/dist`.

## GitHub Pages

This repository includes a Vite frontend with relative asset paths (`base: './'`). Build the client and publish `client/dist` with GitHub Pages or a static hosting provider.

For a custom domain, add your domain in the hosting provider's Pages settings and create a `CNAME` file if required.

## Important

The frontend and backend are intentionally separated. GitHub Pages can host the frontend, but it cannot run the Express server. If you want a live contact API, deploy `server/` separately and connect it through an environment variable/API URL in a future iteration.
