# Cover Page Fixes — LT. UMER & DR. MOMINA

Four changes requested for the main cover page (all in one pass so the card regenerates once, coherently):

## 1. Stethoscope — match your photo
The doctor's-coat half gets a new stethoscope styled exactly like your reference picture: matte dark-grey curved ear tubes forming the Y, a light silver/white long tube, chrome chest piece, draped over the coat the same way.
- Method: AI edit of the existing card image (`imagegen--edit_image`, premium quality) so the Navy digital camo, coat, and layout stay untouched — no regeneration of the whole design.

## 2. Insert card wording — "WEDDING INVITATION"
The cream insert peeking from the collar currently reads "NIKKAH CEREMONY". It will read **"WEDDING INVITATION"** in elegant gold serif lettering (same refined style as now, corrected wording, centered so nothing is lost at the seam).

## 3. Groom's name — Umer
- Gold name plate on the camo half: **LT. UMER**
- Everywhere on the site: "Lt. Bilal" → "Lt. Umer" (cover plate, invite text, page/browser title & share previews, calendar event title, footer monogram **U ♥ M**, scratch-card message "Umer & Momina"). Bride stays Dr. Momina; parents line stays "Mr. & Mrs. Rana Muhammad Ahsan" unless you say otherwise.

## 4. Opening animation — halves slide apart to reveal the full card
New sequence on "Tap to Open":
1. The two halves sit over the **full joined card** (single complete image behind them).
2. On tap, the left half slides off to the left and the right half to the right (smooth, no fade-out — a clean slide).
3. The full card is revealed, pauses briefly, then gracefully lifts (soft scale-up + fade) into the invitation page with the music fading in.

## Files touched
- `src/assets/cover-card.png` — edited (plate, insert, stethoscope); split halves re-cut from it (`cover-left.png`, `cover-right.png`)
- `src/components/invitation/CoverCard.tsx` + `src/styles.css` — new slide-apart-then-reveal animation
- `src/components/invitation/event-details.ts` — groom name
- `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/components/invitation/ScratchReveal.tsx` — name in titles, footer monogram, scratch message

## Verification
- Build green, Playwright walkthrough of the new opening: tap → halves slide → full card revealed → invitation; screenshots at each step, desktop + mobile.
