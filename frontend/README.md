# Frontend

Vue 3 with Composition API, Vue Router, Vue I18n, and Vite. This is a static site with no API dependency.

## Structure

```text
src/
  assets/         Hero images, shared styles, and design tokens
  components/     Home, layout, and mentorship components
  composables/    useSiteContent: reactive localized content
  config/         Social links and slideshow configuration
  content/        English/Serbian profile and mentorship records
  i18n/           Language registration and preference handling
  locales/        English/Serbian UI translations
  router/         Locale-aware routes and metadata
  views/          HomeView and ProgramsView
  App.vue         Application shell
  main.js         Bootstrap
public/           Favicon and static host SPA redirects
tests/            Language and content regression checks
```

## Conventions

Use PascalCase for Vue components, camelCase for JS modules, and lowercase directories. Use @/ for src imports, props/events between components, and scoped component styles. Theme tokens live in assets/styles/tokens.css. Headings use Anton; body copy uses DM Sans.

## Content and languages

Edit content/en.json and content/sr.json for the trainer profile and mentorship records. UI labels remain in locales/en.json and locales/sr.json. These are different types of content, both owned by the frontend. useSiteContent exposes computed profile/programs; switching locale changes them synchronously without fetching.

Keep program IDs and type fields identical across languages: online contains Basic and Premium, personal contains the 1:1 offering. Basic contains eleven benefits; Premium adds nutrition-habit guidance and a monthly 30-minute video consultation. Prices are intentionally omitted.

URLs use /en and /sr with optional /programs. Explicit locale URLs win over saved preferences, then browser language, then English. Serbian uses Latin script. Unknown content locales fall back to English. Adding a language requires content, UI translations, locale registration, route support, and a language-switch option.

## Slideshow and contact

Add numbered photos under assets/images/hero. Photos rotate every five seconds, pause on hover or when the tab is hidden, and respect reduced-motion preferences. Failed images are skipped. Images fill a stable frame with cropping. Changing photos requires a production rebuild.

MentorshipContact provides Instagram DM and email choices. The email subject uses the selected package and language. Messages are sent by the visitor's external app, never by this website.

## Commands and hosting

Run pnpm dev, pnpm build, pnpm preview, pnpm test, pnpm format, or pnpm format:check from this directory. The root PowerShell scripts now run only the frontend. Deploy dist with an SPA fallback; public/_redirects covers Cloudflare Pages. No runtime secrets or server services are needed. The root README contains deployment settings.
