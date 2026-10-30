# Foundations and Frontiers of Watermarking — Tutorial Website

Static website for the *Foundations and Frontiers of Watermarking* tutorial. Each edition lives in its own
folder, and an edition dropdown in the navigation bar switches between them.

| Edition | Date & place | Folder | URL |
|---|---|---|---|
| **ACM Multimedia 2026** (default) | Sat, Nov 14, 2026 · 2:00 – 6:00 PM · Bora-Bora I, Rio de Janeiro | `acmmm2026/` | <https://vishal3477.github.io/watermarking-tutorial/acmmm2026/> |
| CVPR 2026 | Thu, Jun 4, 2026 · 1:00 – 5:00 PM · Mile High 2B, Denver | `cvpr2026/` | <https://vishal3477.github.io/watermarking-tutorial/cvpr2026/> |

The site root, <https://vishal3477.github.io/watermarking-tutorial/>, opens the default edition.

`cvpr2026/` is a copy of the original CVPR 2026 site with the edition dropdown added. The original site
remains unchanged at <https://vishal3477.github.io/watermarking-cvpr2026/> (repository
`vishal3477/watermarking-cvpr2026`), where the QR codes in the CVPR 2026 slides point.

## Structure

```
watermarking-tutorial/
├── index.html      # Redirects to the default edition
├── editions.css    # Edition dropdown, shared by all editions
├── editions.js     # Edition dropdown behavior (close on outside click / Escape)
├── acmmm2026/      # ACM MM 2026 edition: index.html, styles.css, script.js, assets/
├── cvpr2026/       # CVPR 2026 edition:   index.html, styles.css, script.js, assets/
├── LICENSE
└── README.md
```

## Local preview

Plain static HTML/CSS/JS — no build step. Serve the repository root so the shared files resolve:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

GitHub Pages serves the `main` branch from the repository root (**Settings → Pages → Deploy from a branch →
`main` / (root)**). Pushing to `main` publishes the site within a few minutes.

## Adding an edition or changing the default

1. Copy an existing edition folder (for example `acmmm2026/`) to a new folder and edit its content.
2. Add the new edition to the `<details class="edition-switcher">` menu in **every** edition's
   `index.html`, mark the page's own entry with `aria-current="page"`, and move the "Latest" badge.
3. In the root `index.html`, point the redirect (script and `meta refresh`), `canonical`, and `og:` tags at
   the new folder.

## Editing an edition

Most copy lives in each edition's `index.html`:

- **Schedule:** `<ol class="schedule">` items. In `acmmm2026/`, keep the `<time datetime>` values in sync.
- **Speakers:** `<article class="speaker-card">` blocks.
- **Reading list:** `<ul class="paper-list">` entries, grouped by session.
- **Slides / materials:** in `acmmm2026/`, swap each `<span class="status-pill">` in the “Talk slides” list
  for `<a class="slide-link" href="…" target="_blank" rel="noopener">View slides</a>`; once DOI
  `10.1145/3767308.3836606` resolves, turn the “Tutorial summary” card into a link to it. In `cvpr2026/`,
  slides are linked from the Materials section.

ACM MM 2026 content sources: date, time, and room from the official programme
(<https://2026.acmmm.org/site/programme.html>); talk order and durations from the submitted MM ’26 proposal.
The organizers later lengthened both panels to 30 minutes and replaced the two 10-minute breaks with a
single 10-minute break; closing remarks are folded into Panel II so the session ends at 6:00 PM.

## Tutorial topics

- Classical watermarking foundations (spread spectrum, QIM, informed embedding, security)
- Modern learned watermarking (encoder–decoder, perceptual & adversarial training) — hands-on Colab at ACM MM
- Multimodal and generative watermarking (image, audio, video, 3D; Stable Signature, Tree-Ring, Gaussian Shading)
- Robustness benchmarking with WAVES
- Real-world authenticity: C2PA, Content Credentials, SynthID, watermark coexistence
- Downstream applications and proactive schemes

## Speakers

- Dr. Vishal Asnani — Adobe Research
- Dr. Shruti Agarwal — Adobe Research
- Prof. Mauro Barni — University of Siena (ACM MM 2026)
- Prof. Benedetta Tondi — University of Siena
- Dr. Pierre Fernandez — Meta FAIR
- Prof. Furong Huang — University of Maryland

## Contact

Questions: <vasnani@adobe.com>
