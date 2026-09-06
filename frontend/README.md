# Frontend

Vue 3 single-file components with the Composition API and Vite. JavaScript is used consistently throughout.

## Structure

```text
src/
  assets/styles/main.css     Shared theme, layout, and responsive styles
  components/
    home/HomeHero.vue        Home page hero
    layout/                 SiteBrand, SiteHeader, SiteFooter
    programs/ProgramCard.vue Program presentation and toggle event
  config/site.js            Shared social links
  router/index.js           Named routes, lazy page imports, page titles
  services/
    http.js                 HTTP transport and timeout handling
    siteService.js          Trainer profile access
    programService.js       Program access
  views/                    HomeView and ProgramsView route components
  App.vue                   Application shell
  main.js                   Application bootstrap
public/                     Files served unchanged, including favicon/images
```

## Conventions

- Use PascalCase and multiword names for Vue files, camelCase for JavaScript modules, and lowercase directory names.
- Views own page loading, retry, and selection state. Components receive data through props and report actions through events.
- Keep API endpoint knowledge in services; components should not call fetch directly. A future static content migration can replace the service implementation without changing components.
- Use the configured `@/` alias for imports from src and relative imports for immediate siblings.
- Keep shared CSS in assets/styles. Put new component-specific styles in scoped SFC style blocks when they do not depend on shared selectors. Existing CSS stays global to preserve the design during this refactor.
- Keep deployable, unprocessed files in public; put imported assets in src/assets.
- Introduce composables when stateful logic is actually shared. Add feature directories or a store when the application needs them, rather than creating empty abstractions now.

## Commands

- `pnpm dev`: development server; /api requests proxy to the .NET API on port 5080.
- `pnpm build`: production frontend build.
- `pnpm format`: format source and configuration.
- `pnpm format:check`: check formatting without editing.

The repository-root Start-Dev.ps1 and Build.ps1 remain the combined frontend/backend entry points. This refactor preserves the .NET API integration.

## Languages

English and Serbian Latin use Vue I18n. UI messages are in `src/locales/en.json` and `sr.json`; shared language configuration is in `src/i18n/locale.js`. Use translation keys in components, never HTML inside translation values. Run `pnpm test` to check key coverage and language preference behavior.

URLs identify the language: `/en`, `/sr`, `/en/programs`, `/sr/programs`. Explicit URLs take precedence over remembered or browser preferences. The header switch preserves the current page, query, and hash. Opening `/` or the old `/programs` path chooses the remembered language, then browser language, then English. Serbian uses Latin script (`sr-Latn`). Page titles, descriptions, and the document language update after navigation.

The API accepts `?locale=en` or `?locale=sr` for site, programs, and individual programs. English content remains in `backend/ArizonaLifts.Api/Data/site.json`; Serbian is in `site.sr.json`. Unknown or omitted locales fall back to English. Restart the API after editing these files. Locale changes cancel obsolete requests to avoid displaying stale-language data.

Adding a language requires a message catalog, locale registration in i18n, route pattern and switch option updates, and a matching API content file registered at startup. Preserve program IDs across translations. Both small UI catalogs ship together; lazy loading can be added if catalogs grow substantially.

Hosting still uses the existing .NET service. Publish Vue into wwwroot and preserve the SPA fallback for direct language URLs. No additional service is required. If the backend is removed later, replace the service functions with static localized content. Separate language URLs are shareable, but prerendering/SSR and canonical/hreflang metadata should be added if multilingual search indexing becomes a requirement; this client-rendered implementation does not promise independent SEO indexing.

## Visual theme

The desert-and-rose palette lives in `src/assets/styles/tokens.css`. Use semantic CSS variables for new components: light sand and pink for surfaces, plum and muted rose for text. Shared styles and the language switch consume the same tokens.

Headings (h1-h6), the wordmark, section labels, and display titles use Anton at its native 400 weight. Body text remains DM Sans. Font stacks are centralized in tokens.css, with system fallbacks; Google Fonts loads with display=swap and includes Serbian Latin coverage.

## Mentorship content

Basic and Premium mirror the trainer-supplied reference, with Serbian and English content in the API locale files. Basic has eleven benefits; Premium includes Basic plus nutrition-habit guidance and a monthly 30-minute video consultation. Prices, payment charges, and pricing dates are intentionally omitted. The reference image itself is not embedded because it contains prices.

The programs page groups API records by the language-independent `type` field: `online` shows Basic and Premium first; `personal` shows the 1:1 offering below. Keep this field and program IDs consistent across locale files.

## Mentorship contact choices

Each card uses MentorshipContact.vue: a native keyboard-accessible disclosure with an Instagram DM link and a mailto link. Contact destinations live in config/site.js. Email subjects use the current language and selected package name. The visitor sends the message in Instagram or their email application; the website does not transmit messages or collect contact data.
