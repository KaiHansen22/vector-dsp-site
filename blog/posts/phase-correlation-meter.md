---
title: "Phase Correlation Meter: How to Read It and Fix the Mix"
description: ""
date: 2026-10-25
---

# Phase Correlation Meter: How to Read It and Fix the Mix

![Engineer checking a phase correlation meter](https://media.babylovegrowth.ai/blog-images/organization-30746/1792752219245_Engineer-checking-a-phase-correlation-meter.jpeg)

A phase correlation meter tells you how much your left and right channels have in common. Near +1 means they are almost identical. Around 0 means they are very different, which usually sounds wide. Sitting below 0 for long stretches means parts of your mix may thin out or vanish when summed to mono. That is the whole job of the meter, and the rest of this article is about reading it with judgment instead of fear.

We build audio tools and spend a lot of time inside stereo problems, so this is written from the mix bench: what the needle really measures, what it can't tell you, and what to do when it points the wrong way.

## TL;DR

- The meter runs from -1 to +1. [Sustained readings below zero are the warning sign](https://www.soundonsound.com/sound-advice/q-what-are-my-phase-correlation-meters-telling-me), not brief dips.
- A reading of 0 is not a fault. It usually means a wide stereo image.
- A meter near +1 can just mean a narrow mix. Don't chase it.
- Always confirm with a real mono check, then find which frequency range is causing the trouble.
- Fix phase problems at the source (polarity, delay, widening) instead of masking them on the master.

## Table of Contents

- [What a phase correlation meter actually measures](#what-a-phase-correlation-meter-actually-measures)
- [Why the needle moves slowly](#why-the-needle-moves-slowly)
- [How to read it while you mix](#how-to-read-it-while-you-mix)
- [What the meter can't tell you](#what-the-meter-cant-tell-you)
- [Level and the meter: what to trust](#level-and-the-meter-what-to-trust)
- [Common causes of negative correlation](#common-causes-of-negative-correlation)
- [Fixing it by frequency range](#fixing-it-by-frequency-range)
- [A worked example](#a-worked-example)
- [Perspective: why we think about correlation per band](#perspective-why-we-think-about-correlation-per-band)
- [Doing the technique with ToneLab](#doing-the-technique-with-tonelab)
- [FAQ](#faq)
- [Sources](#sources)

## What a phase correlation meter actually measures

The meter compares the left and right signals over a short window and boils the relationship down to one number. [Sound On Sound's glossary](https://www.soundonsound.com/glossary/phase-correlation-meter) describes the scale as running from +1 to -1 with zero at the center. Here is how the three landmarks read:

| Reading | What it means | What you usually hear |
|---|---|---|
| +1 | Left and right are identical (dual mono) | Narrow, centered, no width |
| 0 | Maximum decorrelation, about a 90 degree average phase difference | Very wide, spacious image |
| -1 | Left and right are polarity inverted (180 degrees) | Cancellation in mono, hollow or vanishing sound |

The middle row surprises many producers. [A reading of 0 does not signal trouble](https://www.soundonsound.com/sound-advice/q-what-are-my-phase-correlation-meters-telling-me). It is the point of greatest divergence between channels, and a genuinely wide mix often lives there. The red zone, below zero, is where you pay attention.

If you want a deeper look at why two channels do not automatically mean a wide mix, we covered it in [dual mono versus stereo](https://vector-dsp.com/blog/dual-mono-vs-stereo/).

## Why the needle moves slowly

Correlation meters typically average over a window of [around 600 milliseconds](https://www.soundonsound.com/sound-advice/q-what-are-my-phase-correlation-meters-telling-me). That is deliberate. A faster meter would twitch on every transient and tell you nothing useful about general mono compatibility.

The practical consequence: a single snare crack or a short stereo sweep can flick the needle into the red and it means very little. What matters is where the meter settles during a verse or a chorus. Watch it for a full section, not a beat.

## How to read it while you mix

Here is the routine we would suggest.

1. **Put the meter on the output.** In Logic Pro, for example, [the Correlation Meter goes on an output channel strip](https://support.apple.com/guide/logicpro/correlation-meter-lgcef24f430f/mac), where it shows whether your stereo mix is wide or closer to mono. Soloing a single stereo track routed to a bus lets you check that element alone.
2. **Play the loudest, widest section.** Choruses and drops are where widening, stereo delays and layered synths pile up.
3. **Note the resting position.** A needle that hovers between about 0 and +1 is generally mono-friendly. One that sits in the negative zone for whole phrases deserves investigation.
4. **Solo suspects.** Mute groups until the reading recovers. Stereo synth pads, widened vocals, chorus and double-tracked guitars are the usual culprits.
5. **Fold to mono and listen.** The meter flags a risk. Your ears decide whether it matters.

### Short dips versus sustained negatives

Brief excursions into the red are [often insignificant in professional mixing](https://www.soundonsound.com/sound-advice/q-what-are-my-phase-correlation-meters-telling-me). A steady negative reading is different: it indicates out-of-phase material that will be attenuated or cancelled in mono. Sound On Sound's mix-check article makes a related point: [a consistently negative reading may reveal problems](https://www.soundonsound.com/sound-advice/10-essential-mix-checks) that a quick mono check misses.

### Don't chase +1

A meter pinned near +1 is not a better mix. It is often a narrow one. The goal is a healthy, moving reading that lets the mix feel wide while staying solid when collapsed. If you push everything toward +1 to keep the needle happy, you throw away the width you were trying to build.

## What the meter can't tell you

The number is a summary, and summaries hide things. Three limits are worth keeping in mind.

**It doesn't say what is wrong.** A reading of -0.4 doesn't tell you whether a pad, a room mic or a widener is responsible. You have to hunt.

**It doesn't hear.** Sound On Sound's Hugh Robjohns is clear that the meter should [not replace auditioning in mono](https://www.soundonsound.com/sound-advice/q-what-are-my-phase-correlation-meters-telling-me), ideally through a single speaker. Mono listening shows what loses impact, and that separates harmless phase variance from real cancellation.

**It sees the whole spectrum at once.** This is the big one. Your kick may be perfectly mono at 60 Hz while a stereo guitar bed at 3 kHz is partly out of phase. The meter blends both into one needle. The bass may look healthy while the highs are in trouble, or the other way around.

![What the meter can't tell you — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792752274843_What-the-meter-can-t-tell-you-overview-diagram.jpeg)

## Level and the meter: what to trust

Correlation is a ratio between two channels, not a loudness reading, so it doesn't depend on how loud the signal is. [Sound On Sound's metering Q&A](https://www.soundonsound.com/sound-advice/metering) notes that professional phase meters hold accurate readings with input levels as low as -20 dBu. In practice that means you don't need to crank your master to get a useful reading.

That said, a meter is only as honest as the signal feeding it. If your source is clipped, noisy or captured at a poor gain, you are measuring problems that began before the mix. Clean capture matters, and techniques like [32-bit float and M/S capture](https://thegurlzofficial.com/ambient-audio-capture) show how recording choices carry into the stereo picture you later meter.

## Common causes of negative correlation

Most bad readings trace back to a short list of causes.

- **Polarity flipped on one channel.** A miswired cable, a flipped plugin switch or a mic recorded out of polarity. The fix is a single click, and it is the first thing to check.
- **Short delays between channels.** Haas-style widening, stereo delay with unequal sides, or a time-offset doubler can make certain frequencies cancel on summing. The comb filtering depends on the delay time, so the damage lands at specific frequencies.
- **Aggressive stereo widening.** Widening tools that boost the side signal push correlation down fast. We discuss a delay-based approach to this in [avoiding mono collapse with sample delay parallel processing](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/).
- **Multi-mic recordings.** Drum overheads and room mics against close mics can cancel in low frequencies when distance is uneven.
- **Parallel chains that aren't aligned.** If you split a signal and process one path with a plugin that adds delay, summing the paths can create the same comb filtering. [Our guide on frequency splitting in a DAW](https://vector-dsp.com/blog/split-frequencies-in-daw/) walks through keeping those paths aligned.

## Fixing it by frequency range

Once the meter and your ears agree there is a problem, the useful question is: in which part of the spectrum?

### Low end: keep it centered

Bass and kick below roughly 120 Hz carry most of the energy in a mix, and cancellation there costs the most. Mono-ing the lows is the standard move. That can be a simple high-pass on the side channel, or a split that lets you narrow only the low band while leaving the rest of the mix wide. Wide low frequencies also cause practical headaches on playback systems, so a centered foundation is rarely a sacrifice.

### Mids: where widening does the damage

Vocals, guitars and synths live here, and this is where heavy widening or mismatched stereo effects tend to produce the sustained negative readings. Try reducing the widener amount on that bus first. If the reading recovers, you have your answer. If not, solo the stereo layers and flip polarity on one side of each, one at a time, listening in mono as you go.

### Highs: width is cheap here, but check it

Air, cymbals and stereo reverb tails are naturally decorrelated. They rarely cause serious mono trouble because they are quiet relative to the body of the mix, but a harsh, phasey sheen in mono often comes from a stereo enhancer working on top frequencies. Pull it back and check.

### Using separate bands for separate jobs

Because the problem is frequency specific, the fix often is too. A multiband correlation meter, which reads several bands separately, can show that the bass is fine and the upper mids are not. That tells you exactly where to apply narrowing, delay changes or EQ. If you are splitting bands to process them separately, a [linear phase crossover](https://vector-dsp.com/blog/linear-phase-crossover/) keeps the band relationships intact at the cost of latency, so plan for it. Minimum-phase filters add group delay too, so every split has a phase price whichever type you choose. That is why checking correlation after any split is worth the thirty seconds.

If you are building parallel EQ routes, read the notes on [parallel EQ and why phase comes first](https://vector-dsp.com/blog/parallel-eq/) before you commit to a routing.

## A worked example

Suppose you have a pop mix whose chorus keeps the meter around -0.3 for most of the section, and in mono the pad and the backing vocals almost disappear.

1. You solo the pad bus. The meter sits near -0.6 on its own, so it is a major contributor.
2. You find a stereo widener at 180 percent on the pad. Dropping it to 120 percent brings the pad bus to about 0.
3. The backing vocals still show negative values. They were doubled with a 15 ms offset between sides. You change the offset to a stereo spread using pan and EQ differences instead of time.
4. The chorus now rests between 0 and +0.5 on the output meter. In mono the pad and the vocals hold their weight.
5. You play the mix in mono on one speaker. The lead vocal and kick are unchanged, the pad is a little narrower in character but fully present.

The numbers here are illustrative, not measured from a specific session. The point is the order of operations: meter, isolate, change one thing, meter again, listen.

## Perspective: why we think about correlation per band

We design plugins around a simple belief: most stereo problems are not whole-mix problems. They are band problems. A kick and bass that need to be centered, a mid-range that benefits from width, and a top end that can be as wide as you like are three different jobs, and one correlation needle averages them into noise.

That is why our work focuses on frequency-specific and parallel processing, where each band or lane gets its own treatment inside one signal path. It is also why we are careful about what splitting does to phase. Any crossover, linear or minimum phase, changes the timing relationship between bands, so you verify after splitting instead of assuming.

Our advice is plain. Use the meter as a smoke detector. When it goes off, find the fire by band, confirm with your ears in mono, and fix it at the source. Don't tune a mix to please a needle.

> *— Kai*

## Doing the technique with ToneLab

If you want to treat bands separately in a single insert, our plugin [ToneLab](https://vector-dsp.com/pricing) runs parallel effect lanes with per-lane EQ targeting, so you can narrow or process one frequency range without touching the rest. It is a one-time purchase at 73.99 USD, and there is a free demo so you can check how it behaves against your own correlation meter.

## FAQ

### What is a good phase correlation reading for a mix?

There is no single target. Readings that hover between 0 and +1 are generally considered mono-compatible, and a wide mix will sit nearer 0. Worry about steady readings below 0, not brief dips.

### Is a reading of 0 bad?

No. Zero means left and right are maximally different, which is typically heard as a very wide image. It is an expected result when the average phase difference is 90 degrees, not a sign of cancellation.

### Where is the correlation meter in Logic Pro?

Logic Pro includes a Correlation Meter that you add to an output channel strip to see the phase relationship of your stereo signal. Logic also bundles it in [MultiMeter](https://support.apple.com/en-gb/guide/logicpro/lgcef24f4a02/12.2/mac/15.6), which combines an analyzer, goniometer and other gauges in one window.

### How do I tell if I have phase issues?

Watch for a sustained negative reading, then fold the mix to mono and listen for elements that get thinner, quieter or hollow. Mute groups to find which bus pulls the meter down, and check polarity and stereo delays first.

### Can I rely on the meter alone?

No. The meter flags risk but can't tell you what you will lose in mono. Use it alongside a mono listening check, preferably on a single speaker.

## Sources

- [Phase Correlation Meter, Sound On Sound glossary](https://www.soundonsound.com/glossary/phase-correlation-meter)
- [Q. What are my phase-correlation meters telling me?, Sound On Sound](https://www.soundonsound.com/sound-advice/q-what-are-my-phase-correlation-meters-telling-me)
- [Metering, Sound On Sound](https://www.soundonsound.com/sound-advice/metering)
- [10 Essential Mix Checks, Sound On Sound](https://www.soundonsound.com/sound-advice/10-essential-mix-checks)
- [Correlation Meter in Logic Pro for Mac, Apple Support](https://support.apple.com/guide/logicpro/correlation-meter-lgcef24f430f/mac)
- [MultiMeter in Logic Pro for Mac, Apple Support](https://support.apple.com/en-gb/guide/logicpro/lgcef24f4a02/12.2/mac/15.6)

## Recommended

- [Meter Parallel Chains: Match Within 0.5 LU, Then Run a Null Test](https://vector-dsp.com/blog/metering-parallel-chains/)
- [Parallel EQ: Three DAW Routes, but Phase Comes First](https://vector-dsp.com/blog/parallel-eq/)
- [Avoid Mono Collapse: Sample Delay Parallel Processing for Producers](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw/)
