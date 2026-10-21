# Nikkah Invitation Website — LT. BILAL & DR. MOMINA

A mobile-first, single-page "wow moment" invitation site following the reel's flow, dressed in the couple's story: Pakistani Navy digital camouflage meets the doctor's white coat.

## Concept
- **Cover screen**: a faithful web recreation of the physical card from the photo — left half in Navy camo uniform with gold name plate "LT. BILAL" and naval crest, right half a white doctor's coat with stethoscope and "DR. MOMINA" engraved, with the cream gold-lettered invite insert peeking from the collar. A gold wax-style seal reads **"Tap to Open"**.
- **The opening**: on tap, the two halves of the "jacket" part outward like doors (smooth animation), music fades in, revealing the invitation.
- **Palette**: ivory/cream + navy + gold, elegant serif display type (e.g. Italiana/Cormorant), all tokens in `src/styles.css` (oklch). No hardcoded colors in components.

## Page flow (single route `/`, scrollable, mobile-first)
1. **Reveal / Main invite** — "We're getting married" heart divider, **LT. Bilal** (son of Mr. & Mrs. Rana Muhammad ...) & **Dr. Momina**, elegant entrance animations.
2. **Save the Date** — date/time card inside a heart outline + "SAVE THE DATE" button (downloads calendar invite / Google Calendar link). Dummy date until you confirm the real one.
3. **Scratch to Reveal** — canvas scratch card over a heart; scratching uncovers a sweet message.
4. **Counting Down to Forever** — live countdown (days/hours/minutes/seconds) to the Nikkah.
5. **Program Timeline** — Nikkah ceremony, dinner, etc. (dummy entries).
6. **Venue** — venue name, address, embedded map placeholder + "Open in Maps" link (dummy until confirmed).
7. **RSVP** — name, attending (yes/no), number of guests, message; replies are **saved to the database**.
8. **Footer** — a graceful closing line with the couple's monogram.

## Music
Soft romantic instrumental, downloaded from a royalty-free source and served via CDN asset. Autoplay muted-safe after cover tap, floating mute/unmute button.

## Backend (Lovable Cloud)
- Enable Cloud; `rsvps` table: id, name, attending, guests, message, created_at.
- RLS: public INSERT allowed (invitation guests are anonymous), no public SELECT.
- **Host dashboard at `/admin`**: protected route — you sign in to view all RSVP replies. (You'll create a host account on first visit.)

## Assets to generate
1. Navy digital-camouflage seamless texture (CSS/tile).
2. Stethoscope illustration, transparent PNG.
3. Elegant floral/ivory reveal backdrop.
4. Wax-seal style "Tap to Open" gold emblem.
Plus: background music file (royalty-free download).

## Verification
- Build green + preview check of the full flow: cover tap → reveal → all sections → RSVP submit → row saved in database.
- Small test asserting an RSVP insert is accepted and a blank name is rejected.
- Playwright walkthrough with screenshots of cover, reveal, countdown, RSVP.
