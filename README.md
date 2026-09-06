# Arizona Lifts

Vue 3 + Vite frontend and ASP.NET Core / C# .NET 10 API. Two responsive pages: trainer introduction and programs/mentorship. Includes mobile navigation, expandable program descriptions, accessible error/retry/loading states, Instagram links, and automatic copyright year.

## Run locally

Requirements: .NET 10 SDK, Node.js 22.12+ (or supported newer LTS), and pnpm or npm.

Run `./Start-Dev.ps1` in PowerShell. Open http://127.0.0.1:5173. The API listens on http://127.0.0.1:5080; Vite proxies `/api` to it. Ctrl+C stops development. Scripts also recognize Codex's bundled pnpm on this machine.

Alternatively, in separate terminals:

```powershell
dotnet run --project backend/ArizonaLifts.Api
```

```powershell
cd frontend
pnpm install
pnpm dev
```

## Production

Run `./Build.ps1`. This builds Vue, copies static assets to the API's wwwroot, and publishes a single ASP.NET application in `publish/`. From that directory run `dotnet ArizonaLifts.Api.dll --urls http://localhost:5080`. The .NET application serves both the website (including direct `/programs` requests) and API. Deploy behind an HTTPS reverse proxy or to a .NET-compatible host. No cloud deployment is configured.

## Content to finalize

The Instagram profile could not be read automatically. Program names, features, and descriptions are proposed content, not verified offers. Confirm these with the trainer before publishing. There are no invented prices, qualifications, testimonials, or availability claims. The motivation line is draft site copy, not an attributed quote from the trainer.

- Add the trainer's authorized portrait to `frontend/public/images/trainer.jpg` and change the image src in Home.vue to `/images/trainer.jpg`. Update its alt text and remove the stock-photo caption in `frontend/src/Home.vue`.
- Edit introduction, quote, attribution, and program records in `backend/ArizonaLifts.Api/Data/site.json`; restart the API after changes.
- Replace the draft availability note in Programs.vue after confirming offers.
- Instagram is the only supplied social account. Add other verified links in `frontend/src/App.vue`.
- Fonts load from Google Fonts and have local fallbacks. The temporary stock photograph loads from Pexels; replace it with a local trainer portrait.

Stock photo: Scott Webb, [Woman Holding Dumbbells](https://www.pexels.com/photo/woman-holding-dumbbells-136410/), [Pexels license](https://www.pexels.com/license/). The pictured athlete is not represented as Arizona Lifts.

## API

- `GET /api/health` — health status
- `GET /api/site` — introduction and motivational copy
- `GET /api/programs` — program cards
- `GET /api/programs/{id}` — individual program; 404 for unknown IDs

Content is read from the JSON file at startup. The frontend does not silently substitute fake API results. No database, payment processing, or contact-data collection is included; program inquiries open Instagram.

## Verification status

Builds and runtime checks have not completed: the execution environment failed permission refresh, dependency installation was blocked, and .NET restore reported an environment path error. Run the included scripts in your normal PowerShell environment to install and verify.
