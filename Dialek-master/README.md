# DIALEK. — _det klink good_

A one-page parallax website for the Limburgs-dialect event **DIALEK.**, built
from the original Instagram poster (_Unne bandoavend in 't plat — 6 meert 2026,
De Azijnfabriek, Remunj_).

## Features

- **Parallax everywhere** — a fixed vintage sky (gradient + film grain) with
  three cloud layers that drift at different depths on scroll, plus
  pointer-driven drift and per-section parallax.
- **Bungelende vlaai** — the slice of _vlaai_ hangs from a string and swings
  like a pendulum (`bungel` + `vlaai-sway` keyframes), pivoting from where the
  string is tied.
- **Staggered text** — the title splits into characters and the subtitles into
  words, each revealing with a cascading delay; remaining sections stagger in
  on scroll via `IntersectionObserver`.
- Responsive, and respects `prefers-reduced-motion`.

## Image assets

The imagery is cut directly from the poster photo (no drawn vlaai):

- `assets/vlaai.webp` — the pie slice, background removed via
  connected-component color keying.
- `assets/cloud.webp` — a soft cloud puff, blue keyed to transparent and
  feathered for seamless parallax tiling.

## Run

Just open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

Files: `index.html`, `styles.css`, `script.js`, `assets/`.
