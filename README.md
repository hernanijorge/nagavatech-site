# NagavaTech — nagavatech.tech

Static site (HTML5 + CSS + vanilla JS, no build step, no framework) for NagavaTech —
apps and hardware (mini PCs, laptops). PCB/circuit-board visual identity, bilingual
EN (default) / PT toggle.

## Where it's actually deployed

This repo was built to go on Hostinger shared hosting (`public_html`), per the
original brief. **That hosting doesn't exist on this account** — only a VPS running
Easypanel (same server as the `ingles-na-pratica` and other projects). So the live
site runs as a tiny **nginx Docker container** on that VPS instead:

- `Dockerfile` + `nginx.conf` — builds a static nginx image serving this folder.
- Deployed as a new service inside an existing Easypanel project (free plan caps at
  3 projects, already in use by `google-alerts` / `nyt` / `opendoor`).
- DNS for `nagavatech.tech` (already registered and active on this Hostinger
  account) needs to be pointed at the VPS IP for the real domain to work; until
  then the site is reachable at whatever `*.easypanel.host` subdomain Easypanel
  assigns the service.

Because of this, **`contact.php` and `.htaccess` are not active** on the live site
(no PHP, no Apache) — they're kept in this repo so the project is portable to real
Apache/PHP hosting later, exactly as originally specced. The live contact form
instead falls back to a `mailto:` link (see "Contact form" below).

## Structure

```
index.html, apps.html, hardware.html, about.html, contact.html,
privacy.html, terms.html, 404.html
css/style.css        — all styling (PCB/circuit theme, responsive, no build)
js/i18n.js            — EN/PT dictionary + language toggle (localStorage)
js/main.js            — nav, catalog rendering, WhatsApp links, contact form
data/products.json    — product catalog (see "Editing products" below)
assets/img/           — logo, favicon, product placeholder SVGs, og-image
contact.php            — PHP mail() handler, for real PHP hosting only (inactive here)
.htaccess               — Apache config, for real Apache hosting only (inactive here)
Dockerfile, nginx.conf   — what actually serves the site in production
.dockerignore            — keeps brand-board.jpg (internal reference image, has
                            personal contact info from the business card) and the
                            raw source PNG/JPG out of the published image
```

## Editing products

Edit `data/products.json` directly — no rebuild needed, it's fetched at runtime by
`js/main.js`. Each product:

```json
{
  "id": "unique-id",
  "category": "apps" | "hardware",
  "subcategory": "free-text-used-as-filter-chip",
  "name": { "en": "...", "pt": "..." },
  "description": { "en": "...", "pt": "..." },
  "specs": { "en": ["...", "..."], "pt": ["...", "..."] },
  "price": 99.9,
  "currency": "USD",
  "price_note": { "en": "per seat / month", "pt": "por usuário / mês" },
  "image": "assets/img/placeholder-app.svg",
  "payment_link": ""
}
```

- **Buy button**: if `payment_link` is set (a Stripe/PayPal Payment Link URL), it opens
  that link. If left empty (`""`), it opens WhatsApp with the product name pre-filled.
- **Images**: drop a new SVG/PNG/JPG into `assets/img/` and point `image` at it. No
  particular size required — thumbnails are capped by CSS (`.product-card .thumb`).

## Editing text / translations

All UI copy lives in `js/i18n.js` as a `key: value` dictionary under `en` and `pt`.
Elements in the HTML reference a key via `data-i18n="the.key"` (text content) or
`data-i18n-placeholder="the.key"` (input placeholder). To change copy, edit the
value in `js/i18n.js` — don't edit the HTML text directly, it gets overwritten by
the i18n script on page load.

The legal pages (`privacy.html`, `terms.html`) are **plain English prose, not
translated** — translating full legal text was out of scope for v1.

## Logo / brand assets

- `assets/img/logo-dark.png` — your original raster logo (charcoal).
- `assets/img/logo.svg` — a hand-recreated SVG version (approximate, not pixel-for-
  pixel identical to the PNG) using `currentColor`, for anywhere a single-file
  vector logo is needed (e.g. favicon generators, social previews).
- The header/footer/hero logo actually used on every page is **inline SVG markup**
  (the circular "N" + circuit nodes) pasted directly into each HTML file, colored
  via CSS `color` on the parent element — that's what makes it switch between
  charcoal (header, light background) and white (footer/hero, dark background)
  with zero JS. If you want to adjust the mark's shape, search any page for
  `class="logo-mark"` and edit the `<path>`/`<circle>` coordinates — you'll need to
  repeat the edit across all pages (no build step means no shared partial).
- `assets/img/favicon.svg` is a bolder, simplified version of the mark (thicker
  strokes) on a dark rounded square, for legibility at tiny sizes. Modern browsers
  support SVG favicons directly; for full compatibility (older Safari, Windows
  tiles) export `favicon.svg` to PNG at 32×32, 180×180 (apple-touch-icon) and
  512×512 using any favicon generator, and add the corresponding `<link>` tags.
- `assets/img/og-image.svg` is a 1200×630 social-share card. **Most crawlers
  (Facebook, LinkedIn, X/Twitter) do not render SVG `og:image` reliably** — export
  it to a 1200×630 PNG and update the `og:image` meta tag in every page's `<head>`
  before relying on rich link previews.
- `assets/img/brand-board.jpg` is your reference sheet (kept for my own context
  while building this) — it shows a business card with a **different** phone,
  email and domain (`nagavatec.com`) than what's used on the site. You confirmed
  keeping the original data (nagavatech.tech / nagatech@gmail.com / +1 339 600-8241)
  — this file is excluded from the deployed Docker image via `.dockerignore` since
  it has personal contact info on it, but it's still in the repo for reference.

## Contact form

`contact.html` posts to `/contact.php` (for real PHP hosting) but the live site has
no PHP, so `js/main.js` intercepts the submit, validates client-side (including the
`company_website` honeypot field), and opens the visitor's email client via a
`mailto:nagatech@gmail.com` link with the message pre-filled. If you move to real
PHP hosting later, `contact.php` is ready to use as-is (reads `$_POST`, validates,
calls `mail()`).

## Deploying

**Current setup (VPS / Easypanel, what's actually live):** push to the repo's `main`
branch; Easypanel is configured to build this `Dockerfile` directly from the git
source (static sites build in seconds, no GHCR pipeline needed, unlike the Next.js
apps on this server). Click "Deploy" in the Easypanel service after a push — like
the other services on this server, pushing does not auto-deploy.

**Classic Hostinger `public_html` (as originally specced, not currently used):**
upload every file in this folder except `Dockerfile`, `nginx.conf`, `.dockerignore`
and `README.md` to `public_html` via File Manager or FTP. `.htaccess` and
`contact.php` will then actually work (real Apache + PHP). Point the domain's
nameservers/DNS at that hosting instead of the VPS.

## Testing `contact.php` (only relevant on real PHP hosting)

1. Upload `contact.php` alongside the rest of the site.
2. Submit the form on `/contact.html` with a real email in the `To:` field pointed
   at `nagatech@gmail.com` — confirm delivery (check spam folder; shared hosting
   `mail()` deliverability varies, consider SPF/DKIM for the domain if emails don't
   arrive).
3. Submit with the hidden `company_website` field filled (e.g. via browser dev
   tools) and confirm no email is sent — that's the honeypot working.

## What still needs filling in

- Real product catalog, prices and `payment_link` Stripe/PayPal URLs in
  `data/products.json` (currently 3 apps + 4 hardware items with placeholder
  pricing/specs).
- Export `favicon.svg` and `og-image.svg` to PNG for full favicon/social-preview
  compatibility (see "Logo / brand assets" above).
- DNS for `nagavatech.tech` pointed at the VPS (or at Hostinger hosting, if that
  route is chosen later).
- Testimonials on the homepage are placeholders (`home.testimonials.*` in
  `js/i18n.js`) — swap in real customer quotes when available.
- `about.html` stats (`2+ years`, `100%`, `24h`) are placeholders — confirm or
  adjust the actual numbers.
