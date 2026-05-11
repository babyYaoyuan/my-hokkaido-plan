# Trip Data Contract

The maintained content for the GitHub Pages site lives in `assets/trip-data.js`.
That file assigns a single object to `window.TRIP_DATA`; page shells load it before
`assets/app.js`, and the renderer treats it as read-only content.

## Local Commands

```powershell
node scripts/validate-trip-data.mjs
node scripts/smoke-render.mjs
node dev-server.mjs
```

After starting the local server, review:

- `http://127.0.0.1:4173/index.html`
- `http://127.0.0.1:4173/days/day-03.html`
- `http://127.0.0.1:4173/days/day-04.html`
- `http://127.0.0.1:4173/days/day-07.html`

## Top-Level Shape

```js
window.TRIP_DATA = {
  title,
  subtitle,
  navTitle,
  photoGridLabel,
  checklistTitle,
  hero,
  photos,
  overview,
  overviewRoute,
  hotels,
  hotelsNote,
  days,
  checklist,
  sources,
  footerNote
};
```

## `hero`

- `eyebrow`: compact trip context shown above the title.
- `lede`: homepage intro paragraph.
- `metrics`: array of `{ value, text }` summary metrics.
- `primaryAction`: `{ label, href }` for the main homepage action.
- `secondaryAction`: `{ label, href }` for the secondary homepage action.

## `photos`

Each photo item uses:

- `src`: absolute public image URL.
- `label`: visible caption and image alt text.

## `overview`

Each overview card uses:

- `label`: maintenance label for the card topic.
- `value`: visible card heading.
- `text`: visible card body.

## `overviewRoute`

The homepage route map uses:

- `title`: map section heading.
- `text`: map section helper text.
- `points`: array of point objects.
- `legs`: array of route leg objects.

## `hotels`

Each hotel summary uses:

- `area`: location or stay area.
- `date`: stay dates.
- `text`: booking guidance.

`hotelsNote` is the notice shown under the hotel cards.

## `days`

Each day item represents one standalone day page.

Required fields:

- `id`: numeric day id matching `body[data-day]`.
- `file`: static shell path, for example `days/day-03.html`.
- `date`: display date.
- `stay`: overnight stay or travel state.
- `title`: full day title.
- `shortTitle`: compact navigation/card title.
- `theme`: day hero summary.
- `intensity`: effort level.
- `tags`: array of display tags.
- `summary`: day card summary.
- `points`: array of point objects.
- `legs`: array of route leg objects.
- `timeline`: array of timeline objects.
- `food`: array of text cards.
- `shopping`: array of text cards.
- `planB`: array of fallback text cards.
- `alternatives`: optional array of `{ title, text }` cards.

## Points

Point objects are used by route maps and place links:

- `id`: stable identifier within the day or route.
- `name`: display name. Route legs refer to this exact value.
- `lat`: latitude number.
- `lng`: longitude number.
- `query`: Google Maps search query.

## Route Legs

Leg objects are used by text route cards and Google Maps direction links:

- `from`: point name or free-text origin.
- `to`: point name or free-text destination.
- `mode`: `walking`, `transit`, or `driving`.
- `time`: display time.
- `duration`: display duration.
- `note`: practical route note.

Prefer `from` and `to` values that exactly match point names so validation can
confirm route integrity.

## Timeline

Each timeline item uses:

- `time`: visible time label.
- `title`: event title.
- `text`: event description.

## Checklist

`checklist` is an array of text labels. Completion state is stored only in the
visitor's browser `localStorage`; it is never written back to `window.TRIP_DATA`.

## Sources

Each source uses:

- `label`: visible link label.
- `url`: absolute public URL.

`footerNote` is the short note rendered below sources.

## Shared UI Labels

- `navTitle`: compact brand/title text used in the top navigation.
- `photoGridLabel`: accessible label for the homepage photo grid.
- `checklistTitle`: heading for the locally saved checklist.
