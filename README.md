# Arizona Lifts

A static Vue 3 / Vite website for Kristina: English and Serbian Latin, online Basic/Premium mentorship, personal 1:1 mentorship, a photo slideshow, and Instagram/email contact links. No .NET SDK, API server, database, or email service is needed.

## Development

Install Node.js 22.12+ (or a compatible newer LTS) and pnpm. From the project root run `./Start-Dev.ps1`, or run these commands:

```powershell
cd frontend
pnpm install
pnpm dev
```

Open http://127.0.0.1:5173. The PowerShell scripts also recognize this machine's bundled Node/pnpm installation. Ctrl+C stops the frontend. Any previously running .NET process can be stopped; the website no longer uses it.

## Build and check

Run `./Build.ps1`, or `pnpm build` inside frontend. The deployable output is `frontend/dist`. Use `pnpm preview` to serve that build locally, `pnpm test` for regression checks, and `pnpm format:check` for formatting validation.

## Edit content

- `frontend/src/content/en.json` and `sr.json`: trainer profile, quote, and all mentorship details.
- `frontend/src/locales/en.json` and `sr.json`: UI labels and messages.
- `frontend/src/config/site.js`: social and contact destinations.
- `frontend/src/assets/images/hero/`: numbered slideshow photos.

Content is bundled at build time. Rebuild and deploy after changes; development updates through Vite. Keep program IDs and types consistent between languages. Prices remain omitted.

## Static hosting

For a Git-connected Cloudflare Pages deployment, use project root `frontend`, build command `pnpm run build`, and output directory `dist`. Use a Node/pnpm version compatible with the lockfile; keep pnpm-workspace.yaml tracked for the esbuild approval. The included public/_redirects file rewrites direct language URLs to index.html. Other static hosts need an equivalent SPA fallback.

Test /en, /sr, /en/programs, and /sr/programs directly, along with mobile navigation, the slideshow, language switching, and contact links. No deployment or Git push is performed by the build scripts. Optimize large source photos before launching publicly.

## Photo attribution

When no local hero images exist, the fallback is Scott Webb's [Woman Holding Dumbbells](https://www.pexels.com/photo/woman-holding-dumbbells-136410/) under the [Pexels license](https://www.pexels.com/license/). Local trainer images replace that fallback automatically. Fonts load from Google Fonts with system fallbacks.
