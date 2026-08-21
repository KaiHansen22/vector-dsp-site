# Testimonial collection — ToneLab homepage wall

**Goal:** 5+ real, named quotes with a *specific outcome*, a first name, a role/genre, and a photo.
**Hard rule:** nothing goes on the site that a real person didn't say and approve. The section in `index.html` stays commented out until the quotes exist.

---

## Why the wording of the ask matters

If you ask "can you give me a testimonial?", you get "great plugin, love it!" — which is worthless. It's interchangeable with every other plugin's homepage and a skeptical buyer discounts it instantly.

What converts is a **specific outcome**: what they stopped doing, or what stayed clean that used to smear. "Kept my 808s clean while drowning the pad in reverb" beats "amazing plugin" by a mile, because only someone who actually used it could have written it.

So the ask has to hand them the shape of the answer. Every message below does that with a question they can answer in one line.

---

## Already in hand

**Paul Clasen — LIVE.** *"This is my new favorite delay plugin! It lets you get so accurate with what signal is actually getting delayed."*
Credited "Designed ToneLab's factory presets · @poi_sounds" — the strongest attribution of anyone on this list. Card also links to his walkthrough at `/tonelab.html#demo`.
*Aug 13:* shipped with the **second sentence only** — as the page's only quote, "favorite delay plugin" would have miscategorised a five-lane multi-FX as a delay plugin.
*Aug 21:* **first sentence restored.** Jason's quote now carries the multi-FX framing, so the miscategorisation risk is gone and Paul's line reads warmer at full length.

**Jason Shablik — LIVE (Aug 21 2026).** *"A little chorus in the mids, distortion at the top, delay in a couple of different frequency bands. Something like that used to take multiple sends, EQs, and plugins. Vector DSP lets me do it all in a single plugin. Simplifying execution without compromising my ideas."*
All four sentences kept — every one is load-bearing. Note he says **"Vector DSP" where he means ToneLab**; left verbatim, correcting it would need his sign-off. Credited "Sound designer & audio post engineer · jasonsound.com" (role from his own LinkedIn headline; linked to his site rather than @jasonsound on Instagram because the site was verifiable). Photo `wall/jason.jpg`, cropped from the half-body shot he sent.

**Wall layout:** `#users` on `index.html` has three modes in CSS — `.wall-feature` (1 quote), `.wall-duo` (2 quotes, current), `.wall-grid` + `.wall-card` (3+). One more lands and it moves to `.wall-grid`.

---

## The five v1.0 testers

These people already ran ToneLab on real material before launch and sent bug reports. They're the warmest possible asks, and they've each earned a message that isn't a template.

### Jason Shablik
> Jason — ToneLab's been out a few months now and I'm finally building the part of the site that shows it working for actual people rather than just me describing it.
>
> You ran it before it was ready to be run on anything. Would you be up for one line I can put on the homepage? The thing I'm after isn't praise — it's the specific thing it let you do, or stop doing. Something like "kept my 808s clean while the pad drowned in reverb." Whatever the real version of that was for you.
>
> If you're in, I'd need: the line, how you want to be credited (first name + what you do / what you make), and a photo — anything you'd be happy having on a website, doesn't need to be a headshot.
>
> Totally fine to say no, and fine to send me something and change your mind later.

### James Hansen
> James — building out the ToneLab site properly and I want real users on it instead of just my own copy.
>
> Could I get one line from you? Not "it's great" — the specific thing it did in a session. What it let you stop setting up by hand, or what stayed clean that normally wouldn't. One sentence is plenty.
>
> Plus how you want to be credited and a photo if you're willing.

### Laura Taylor
> Laura — you caught things in ToneLab before launch that I'd have shipped without you. I'm adding a section to the site with real users on it and I'd like you to be one of them.
>
> What I'm looking for is one line about the specific thing it did on real material — what it let you stop building by hand, or what stayed clean that usually smears. Your actual words, not marketing.
>
> If you're up for it: the line, how you'd like to be credited (first name + role or genre), and a photo you're happy to have public.

### Shawn Coleman
> Shawn — ToneLab's site is getting a real overhaul and the thing it's missing is people who've actually used it.
>
> Would you write me one line? Ideally the specific outcome rather than a compliment — the move it made possible, or the problem it took off your plate. And how you'd like to be credited, plus a photo if you're willing.

### Paul Clasen
> Paul — adding a section to the ToneLab site showing what it does for real users, and you were running it before it was finished.
>
> One line, if you're up for it — the specific thing it did in a session rather than a general "it's good." Plus how you want to be credited and a photo.

---

## Instagram demo commenters

Lower hit rate, so send more of them. Reply publicly to the comment first, then DM — the public reply makes the DM expected rather than cold.

**Public reply:**
> appreciate that — dropping you a DM

**DM:**
> Hey — you commented on the ToneLab demo a while back. I'm building out the site with real users on it instead of just my own copy, and I'd love a line from you if you've had it in a session.
>
> Not looking for a compliment — the useful version is the specific thing it did. What it let you stop setting up by hand, or what stayed clean that normally wouldn't. One sentence.
>
> If you're in: the line, your first name + what you make, and a photo you're fine having on a website. And if you haven't actually run it, say so and I'll send you the free demo, no strings.

---

## Following up on a vague answer

Most people will come back with "sounds great, really useful." Don't use it — go one round deeper:

> That's kind of you — can I push you for the specific version? Like, what were you working on when you had it open, and what did it actually change about that session? Even something small and unglamorous is more useful to me than a compliment.

---

## What you need back from each person

Collect all five before building the section:

- [ ] The quote, verbatim — do not tidy it up. Their grammar is the proof it's real.
- [ ] First name (surname optional, their call)
- [ ] Role / genre — "mix engineer," "trap producer," "records post at home"
- [ ] Photo — any resolution, I'll crop and grade to match the site
- [ ] **Explicit permission** to use name, quote and photo on vector-dsp.com

That last one is not a formality. Keep the message where they said yes.

---

## Rules for what goes on the page

1. **Verbatim, always.** Trim length with an ellipsis if you must, never rewrite. Changing the words makes it your claim, not theirs.
2. **No invented quotes, ever** — including "representative" or "example" ones as placeholders on a live page. Fabricated endorsements are deceptive under FTC endorsement rules, and if a real customer spots one the damage isn't recoverable.
3. **Disclose the free licenses — once, in the section intro.** Every beta tester got a free license, which is a material connection under FTC endorsement rules. It's handled by the section sub-line ("All beta testers received a free license"), so individual cards don't need a badge. If someone outside the tester group is ever given something in exchange for a quote, that one gets its own note on the card.
4. **Real faces only.** No stock photos, no AI-generated portraits. The whole point of the section is that these are real people.
5. **Keep the receipts.** Save each permission message somewhere you can find it later.

---

## Turning it on

1. Drop the photos in `/wall/` as `firstname.jpg`
2. In `index.html`, find `TESTIMONIAL WALL — audit item #9`
3. Replace the placeholder cards with the real quotes, names and roles
4. Delete the `<!--` and `-->` wrapping the section
5. Add `"wall"` to the passthrough list in `.eleventy.js` so the photos ship
6. Rebuild and check the grid at mobile width before pushing

The section sits between Products and Technology, so a visitor hits the product, then the proof, then the engineering.
