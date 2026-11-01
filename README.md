# NUNGSHI WORLD TOUR 2026

React + Vite concert experience designed as an editorial tour publication in
ink black, warm ivory and restrained champagne accents.
Keeps the responsive landing page, city filters and mobile navigation, and adds
a guided journey in `src/ConcertJourney.jsx`:

1. Pick a sample destination and any of 48 seats across Front Row, VIP, Standard,
   and Restricted View. Select again to deselect; choose another to switch.
2. Confirm a virtual ticket. Change your seat before entering if desired.
3. Enter with an audience avatar; stage lights activate and a five-second
   countdown starts. The introduction can be skipped.
4. Watch three performances on the LED screen, with controls and optional audio.
   Missing files show concert artwork and never block progression.
5. Applaud and reveal a humorous audience award. Replay or return to the tour.

Seat prices and destinations are illustrative. This is a client-side experience,
not a payment or real reservation system. State resets on refresh. No secrets,
accounts, analytics, or backend services are required.

## Development

Use Node.js 22 LTS or 24 LTS and npm:

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Vite generates `dist/`. `vercel.json` specifies the Vite framework, build command
and output directory. Public deployment requires separate owner authorization.
Asset URLs are root-relative (`/images/…`, `/videos/…`) for hosting at the domain
root on Vercel. Deploying beneath a subdirectory requires a separate base-path
configuration.

## Videos

The three user-supplied singing videos are included at:

- `public/videos/performance-01.mp4`
- `public/videos/performance-02.mp4`
- `public/videos/performance-03.mp4`

See `public/videos/README.md`. The third film is portrait format and uses
letterboxing to preserve the full frame. The campaign WebP is generated
illustrative artwork of an
anonymous performer, not a photograph of the actual artist; replace it with
approved artist photography when available. Fonts are bundled locally through npm. Animations respect
reduced motion; the timed journey still progresses and can be skipped.

## Validation

Production build and Chromium journey checks at desktop (1440px) and mobile
(390px) cover all 48 seats, deselection, ticket changes, timed entrance, lights,
countdown, missing videos, applause, award variants, replay, navigation and
horizontal overflow. Temporary test MP4 responses verify actual media loading,
sound control and ended-event progression without adding fake performances.
The three original uploaded MP4s were also verified in desktop and mobile
Chromium for decoding, playback, sound controls, and progression from all three
acts into the awards.
