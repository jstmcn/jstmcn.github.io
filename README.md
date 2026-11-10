# Justine Mico San Jose — Portfolio

Static site: HTML5, CSS3 and vanilla JavaScript. No build step.

## Run locally
Open `index.html` in a browser, or serve the folder:
    python -m http.server 8000   →   http://localhost:8000

## Deploy
Upload the whole folder to GitHub Pages, Netlify or Vercel (static). No config needed.

## Things to fill in
1. `js/main.js` → `SITE.cv` (email and GitHub are set; the Download CV button appears once the CV path is set;
   email/GitHub cards appear automatically once these are set; put the CV PDF in `assets/`).
2. Certificates → save scans in `assets/certificates/`, then set `data-cert="assets/certificates/<file>"`
   on the matching `.award` card in `index.html`.
3. Search for `[Add` / `[Confirm` / `[Insert` in `index.html` and `projects/capstone.html` for your
   role, project status and individual capstone contributions.
4. Events Place Booking System screenshots → `assets/projects/booking/` (see the case-study template `#case-01`).

## Structure
    index.html                 Home: hero, about, journey, education, achievements, skills,
                               projects (with expandable case studies), capstone, internship,
                               community, interests, contact
    projects/capstone.html     ArcadeCode capstone case study (sections A–I)
    projects/cloudswyft.html   CloudSwyft internship case study
    css/style.css              Design tokens + components
    css/responsive.css         Tablet / phone layouts
    js/main.js                 Site config, icon sprite, navigation, back-to-top, contact
    js/interactions.js         Reveals, timeline, skills tabs, case studies, lightbox, easter egg
    assets/                    images, capstone, projects, community, personal, certificates, icons
