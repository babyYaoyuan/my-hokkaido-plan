# Migration Notes

## Maintained Experience

The maintained site is the data-driven static experience:

- `index.html`
- `days/day-00.html` through `days/day-08.html`
- `assets/trip-data.js`
- `assets/app.js`
- `assets/site.css`

`assets/trip-data.js` is the content source of truth. The HTML files are route
shells for GitHub Pages and should not duplicate itinerary content.

## Legacy Reference

`hokkaido_2026_06_13_06_20.html` remains in the repository as reference material
for now. It is not linked from the maintained data-driven UI, so the public
experience stays focused on the automatic renderer.

## Content Coverage

The data-driven pages cover:

- Trip title, hero, photos, route strategy, hotels, checklist, and sources.
- Every daily execution card from D0 through D8.
- Daily timelines, route legs, map points, Google Maps direction/search links,
  food notes, shopping notes, Plan B items, and D7 alternatives.
- A homepage overview route and per-day fallback/Leaflet map rendering.

The legacy full HTML guide still has broader long-form sections that are not
rendered as standalone homepage sections yet:

- Detailed transport quick-reference prose.
- Consolidated restaurant list.
- Consolidated shopping/small-store route.
- Rainy-day and fatigue backup pool.
- Budget estimate.

Those topics are partially represented in the current structured daily data,
but not as one-to-one standalone sections. If they become important in the
maintained UI, add new structured top-level arrays to `window.TRIP_DATA` and
render them from `assets/app.js` instead of copying legacy HTML.
