# Per a Karoline 🍊

A birthday gift for Karoline: an interactive page that unveils a day in Valencia on
**Saturday 7 November 2026** – the *My First Paella* workshop (Ruzafa market, tapas, cooking)
and dinner at Living Bakkali at 20:30.

(Previously her Christmas gift – the Disney London weekend lives in the git history.)

## Flow

1. **Cover** – azulejo arch with a countdown teaser; tap the wax seal to open.
2. **Scratch card** – scratch the tile to reveal the date.
3. **Quiz** – guess what we're cooking.
4. **The day** – six chapters; the sky moves from morning sun to night as you go.
5. **Programme** – live countdown, timeline, route map, ticket link (QR) and calendar file.

Returning visitors get a "skip to the programme" link (stored in `localStorage`).

## Develop

```bash
cd birthday-gift
npm install
npm run dev     # open http://localhost:5173/#itinerary (or #journey-3, #quiz …) to jump to a stage
npm run build
```

- Plan, places and copy: `src/data/day.ts`
- Walking routes (pre-fetched from OSRM / routing.openstreetmap.de): `src/data/routes.json`
- Photos are from Wikimedia Commons, credited in `src/data/credits.json` and on the page.
