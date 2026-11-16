# Arizona Lifts website

Static marketing site for Kristina Arizanović (personal trainer). Vue 3 + Vite + Vue Router + Vue I18n (EN/SR, Serbian in Latin script). No backend at runtime; `backend/` holds only stale build output (bin/obj). Hosted on Cloudflare Pages.

## Commands (run in `frontend/`)

pnpm is not on PATH on this machine; npm works the same.

- Install: `npm install`
- Dev: `npm run dev` (Vite on 127.0.0.1:5173). Root `Start-Dev.ps1` does the same.
- Build: `npm run build` → `frontend/dist`. Root `Build.ps1` does the same.
- Test: `npm test` (node:test over `tests/*.test.mjs`: locale key parity, content, SEO)
- Format: `npm run format` / `npm run format:check` (Prettier)
- No typecheck or lint step. Deploy `frontend/dist` with SPA fallback (`public/_redirects`).

## Layout

- `src/views/JourneyView.vue` renders Home, Programs and Transformations as one long scrolling page; the nav highlights the section in view.
- `src/components/{home,layout,programs,transformations,common}` — PascalCase components, scoped styles.
- `src/config/site.js` — social and contact links. `src/config/socialPosts.js` — the 3 Instagram + 3 TikTok posts shown in the home "Latest" section.
- `src/content/*.json` — profile, programs, coaching copy per language. `src/locales/{en,sr}.json` — UI strings.
- `src/assets/styles/tokens.css` — colour tokens; headings Anton, body DM Sans.
- `frontend/README.md` has more detail on content and language rules.

## Rules

- Every UI string goes in both `locales/en.json` and `locales/sr.json` with identical keys (a test enforces this).
- Program IDs and types must match across languages; prices are intentionally omitted.
- No runtime secrets or server services.

## Social feed section

`SocialFeed.vue` + `SocialPostCard.vue` show posts from `config/socialPosts.js` (id, date, short caption without hashtags). They are hand-picked, never fetched: Instagram has no tokenless API for an account's latest posts. Each card is a self-hosted cover + caption text; the Instagram/TikTok iframe loads only on click (no third-party requests, cookies or layout shift on page load). `tests/social.test.mjs` checks the data, posters and locale keys.

Updating a post: change its entry, add `public/images/social/ig-<id>.webp` or `tt-<id>.webp` (540x960 WebP, ~25-60 KB), run `npm test`.

- Finding the latest posts: logged-out tiktok.com profile pages fail to list videos, but `https://www.tiktok.com/embed/@arizonalifts` has the latest videos in its page JSON (`id`, `desc`, `coverUrl`). Instagram's profile grid works logged out; the cover is the `<video poster>` on `/p/<code>/embed/captioned/`. Both need a real browser; plain curl gets no captions.
- Dates come from the IDs: TikTok `id >> 32` = unix seconds; Instagram shortcode decoded base64 (`A-Za-z0-9-_`) `>> 23` + 1314220021721 = ms.
- No image tool is in the project. Convert covers with `sharp` installed in a scratch folder, not as a project dependency (the lockfile is pnpm, and pnpm is not installed here).
- Instagram iframes use `/p/<code>/embed/?cr=1&v=14&wp=540`; without those params the embed never posts its `MEASURE` height message.
- TikTok uses `/player/v1/<id>?autoplay=1` (9:16, same size as the cover).

## SEO

- `index.html` holds static Open Graph tags (share image `public/og-image.jpg`, 1200x630) and JSON-LD (WebSite + Person with `sameAs` to the social profiles). Crawlers for link previews don't run JS, so these stay in English for both languages.
- `src/seo/metadata.js` sets title, description, canonical and hreflang (en, sr, x-default) at runtime. The sitemap and robots.txt are emitted by `build/seo.js`.
