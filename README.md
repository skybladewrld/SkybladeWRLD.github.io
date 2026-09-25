# SkybladeWRLD.github.io

Lorenzo’s personal website in plain HTML, CSS, and JavaScript.

## Pages
- `index.html`: introduction and profile.
- `about.html`: a little about Lorenzo and getting into homelabs.
- `setup.html`: the actual setup photo.
- `interests.html`: soccer, FPV, and homelab.

Navigation looks like tabs; each tab is a real page, so links, browser history, and navigation without JavaScript work normally. Each page ends with a next-page button.

## Editing
Shared colors, spacing, typography, and layout live in `style.css`. Shared navigation and metadata are written into each HTML file. `script.js` only supports links from the original single-page version.

The setup photo is resized for the web with embedded metadata removed. The share image is a JPEG version of the same photo. Space Grotesk is hosted locally under the license in `assets/space-grotesk-LICENSE.txt`; there are no external font requests, trackers, or runtime dependencies.

No build step is required. GitHub Pages serves the `main` branch from the root folder. Canonical, sharing, and sitemap URLs target https://skybladewrld.github.io/ and become usable after publication.
