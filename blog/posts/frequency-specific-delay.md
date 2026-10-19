---
title: "Frequency Specific Delay: Keep Repeats Out of the Low End"
description: "How to confine delay to the frequency range you choose: filtered sends, filters in the feedback loop, and band splits, plus the phase traps to avoid."
date: 2026-10-19
---

# Frequency Specific Delay: Keep Repeats Out of the Low End

Frequency specific delay means the repeats only carry the part of the spectrum you choose, while the dry signal stays full range. It is the simplest fix for the most common delay complaint: the effect sounds great soloed and turns to mush in the mix.

The reason is physical. Low-frequency repeats are long waveforms with a lot of energy, and they land on top of the next notes, the kick and the bass. High-frequency repeats can do the opposite and pile up sibilance and pick noise. Keep the repeats in the band where they add space and leave everything else alone.

## Contents

- [Quick start](#quick-start)
- [Method 1: Filter the delay return](#method-1-filter-the-delay-return)
- [Method 2: Filter inside the feedback loop](#method-2-filter-inside-the-feedback-loop)
- [Method 3: Delay only one band of the source](#method-3-delay-only-one-band-of-the-source)
- [Phase: why parallel beats in-line splitting](#phase-why-parallel-beats-in-line-splitting)
- [Settings that help in a dense mix](#settings-that-help-in-a-dense-mix)
- [Doing it in one insert](#doing-it-in-one-insert)
- [FAQ](#faq)

## Quick start

Put the delay on a send, then filter the return:

| Source | High-pass the repeats | Low-pass the repeats |
|---|---|---|
| Lead vocal | 200–400 Hz | 5–8 kHz |
| Electric guitar | 250–500 Hz | 4–6 kHz |
| Synth lead or pluck | 150–300 Hz | 8–10 kHz |
| Snare | 300–600 Hz | 6–8 kHz |

These are starting points, not rules. Set them with the full mix playing, not soloed: raise the high-pass until the low end stops blurring, then back it off a touch.

## Method 1: Filter the delay return

This works in every DAW. Create an aux or return track, put your delay on it at 100% wet, and add an EQ with a high-pass and low-pass filter. Send the source to it.

**Before or after the delay?** If the delay is clean and linear (no saturation, modulation or ducking), an EQ before it and an EQ after it give the same result, because linear processes can be reordered. The order matters once the delay reacts to its input:

- **EQ before the delay** when the delay saturates, ducks or modulates. Those stages respond to whatever enters, so feeding them a filtered signal stops low end from driving the saturation or triggering the ducking.
- **EQ after the delay** when you want to shape the whole return, including any character the delay adds.

## Method 2: Filter inside the feedback loop

Many delays have high-cut and low-cut controls inside the feedback path. Here the filter runs again on every pass, so the first repeat is filtered once, the second twice, and so on. Each repeat gets narrower and darker, which is why tape and analog-style delays fade so naturally.

Use it alongside Method 1, not instead of it. A feedback filter changes how the repeats *evolve*. A filter on the return decides where *all* of them sit. A gentle feedback low-pass with a firmer return high-pass is a reliable combination for vocals.

## Method 3: Delay only one band of the source

Sometimes you want only part of the sound to echo, like the pick attack of a guitar or the air on a vocal. Then you send just that band to the delay:

1. Duplicate the source, or create a send.
2. Band-pass the copy to the range you want, such as 1–5 kHz for guitar attack.
3. Put the delay after the band-pass, 100% wet.
4. Blend the return under the untouched original.

In Ableton, use an Audio Effect Rack with a chain whose EQ Eight has a low cut and a high cut set to your band. In Reaper, a band splitter on a separate track works. Our guide to [splitting frequencies in any DAW](/blog/split-frequencies-in-daw/) walks through the routing.

## Phase: why parallel beats in-line splitting

There are two ways to build Method 3, and they behave differently:

- **In-line split:** run the source itself through a crossover, delay one band and sum the bands back. Crossover filters shift phase around the split frequency. Even well-matched crossovers that sum flat in level still rotate phase, so the dry signal no longer matches the original exactly. You can hear it as a hollow spot near the crossover, especially on bass and kick. (More in [frequency crossovers without phase shift](/blog/frequency-crossover-without-phase-shift/).)
- **Parallel band:** leave the dry signal untouched and add a filtered, delayed copy next to it. The dry path gets no crossover, so its phase is unchanged. Only the effect is band-limited.

Unless you have a reason to rebuild the dry signal, use the parallel version. It is also how [parallel effects routing](/blog/parallel-effects-routing/) works in general.

## Settings that help in a dense mix

- **Duck the return.** Repeats that drop while the vocal sings and rise in the gaps add space without crowding the lyric. See [ducking delay](/blog/ducking-delay/).
- **Keep width above the low end.** Ping-pong or wide stereo delays are safest when the return is high-passed, so the low end stays centered and mono-compatible.
- **Match the band to the delay time.** Short slapback (60–120 ms) tolerates more low-mids. Long, rhythmic repeats usually need a higher high-pass because each repeat overlaps more of the next phrase.
- **Pair it with reverb the same way.** If the delay sits in the mids, a [frequency selective reverb](/blog/frequency-selective-reverb/) in a similar band keeps the space consistent.

## Doing it in one insert

Every method above needs a send, an EQ and a delay per sound, and that becomes a lot of routing across a session. We built [ToneLab](/tonelab) so that each effect lane has its own EQ nodes that decide which frequencies reach the effect, running in parallel with the dry signal. Shape the nodes into a band-pass on the delay lane and only that range gets repeats.

Here is the delay lane from our walkthrough (8:03–8:51):

<div style="position:relative;width:100%;aspect-ratio:16/9;margin:24px 0;">
<iframe src="https://www.youtube-nocookie.com/embed/31v26sNm1Us?start=483&end=531&rel=0" title="ToneLab walkthrough: delay lane" style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:8px;" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The [free demo](/tonelab#demo) has every feature, so you can try it on your own session.

## FAQ

**Is frequency specific delay the same as multiband delay?**
They overlap. Frequency specific delay usually means delaying one chosen range. Multiband delay usually means splitting the signal into several bands, each with its own delay time or feedback. A multiband delay can do frequency specific delay, but you don't need one for it.

**What frequency should I high-pass my delay at?**
Start around 200–400 Hz for vocals and 250–500 Hz for guitars, then adjust with the full mix playing. The right setting is the lowest one where the low end stays clear.

**Should I EQ before or after the delay?**
For a clean, linear delay it makes no difference. If the delay saturates, ducks or modulates, EQ before it so low end doesn't drive those stages.

**Why does my delay sound muddy even with a high-pass?**
Check the feedback. High feedback with long delay times stacks many repeats on top of each other. Lower the feedback, add a feedback-loop low-pass, or duck the return.
