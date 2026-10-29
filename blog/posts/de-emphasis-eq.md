---
title: "De-Emphasis EQ: What It Is and How to Use It in a Mix"
description: ""
date: 2026-10-29
---

# De-Emphasis EQ: What It Is and How to Use It in a Mix

![Engineer working with EQ in a control room](https://media.babylovegrowth.ai/blog-images/organization-30746/1793173042302_Engineer-working-with-EQ-in-a-control-room.jpeg)

De-emphasis EQ is a filter that reverses a boost applied earlier in the signal chain, so the audio returns to its original tonal balance. The boost is called pre-emphasis. It was built into radio, vinyl and early CDs to fight noise, and the matching cut on playback is the de-emphasis. The same logic is useful at the mixing desk, and we cover both sides below.

## TL;DR

- De-emphasis is the mirror image of pre-emphasis: boost highs before a noisy stage, cut them by the same curve afterward, and the noise drops while the music stays flat.
- The best-known curve is 75 µs, a first-order corner near 2,122 Hz, used in US FM broadcasting and in the RIAA vinyl playback curve.
- Never apply de-emphasis to audio that was not pre-emphasized. It will sound dull, because you are cutting highs that were never boosted.
- In a mix, you can borrow the idea: boost a band ahead of a compressor so it reacts more to that band, then cut it back after. The cut must mirror the boost.
- Check any pair of mirrored EQs by bypassing the dynamics between them. The chain should sound like nothing is happening.

## Table of Contents

- [What de-emphasis means in audio](#what-de-emphasis-means-in-audio)
- [Pre-emphasis and de-emphasis are a matched pair](#pre-emphasis-and-de-emphasis-are-a-matched-pair)
- [The curves and the numbers behind them](#the-curves-and-the-numbers-behind-them)
- [CDs with pre-emphasis](#cds-with-pre-emphasis)
- [Using the idea in a mix: emphasis before dynamics, de-emphasis after](#using-the-idea-in-a-mix-emphasis-before-dynamics-de-emphasis-after)
- [Keep the chain clean](#keep-the-chain-clean)
- [Our perspective](#our-perspective)
- [One way to do it without the wiring](#one-way-to-do-it-without-the-wiring)
- [FAQ](#faq)
- [Sources](#sources)

## What de-emphasis means in audio

A de-emphasis stage [restores the spectral balance](https://www.soundonsound.com/glossary/de-emphasis) that a pre-emphasis stage changed. That is the whole definition. It is not a creative EQ preset and it has no sound of its own. Its job is to cancel something.

The reason it exists is practical. Noise in many analog and early digital systems sits mostly in the high frequencies, while music has relatively little energy up there. So you lift the highs before the noisy stage (a transmitter, a disc cutter, a tape, an early converter). On the way out, you cut the highs by the same amount. The music returns to flat, and the noise that entered in between gets cut along with the highs.

![Pre-emphasis and de-emphasis reduce high-frequency noise](https://media.babylovegrowth.ai/blog-images/organization-30746/1793173084252_Pre-emphasis-and-de-emphasis-reduce-high-frequency-noise.jpeg)

De-emphasis is also the easier half to build in hardware. It [can be done by attenuation](https://en.wikipedia.org/wiki/Emphasis_(telecommunications)) rather than active amplification, which is why simple passive filters handle it.

## Pre-emphasis and de-emphasis are a matched pair

Think of them as a lock and key. [Analog Devices describes](https://www.analog.com/en/resources/glossary/preemphasis.html) the system as a high-pass filter that boosts higher audio frequencies, and a matching low-pass filter that restores an overall flat response and reduces high-frequency noise. Used on audio that was recorded with pre-emphasis, [de-emphasis greatly improves signal-to-noise ratio](https://www.nrscstandards.org/standards-and-guidelines/documents/standards/nrsc-1-c.pdf).

Three things follow from that:

1. **The curves must match.** A 75 µs boost needs a 75 µs cut. A 50 µs cut on a 75 µs boost leaves a tilt.
2. **The pair only works end to end.** Alone, either half is just a tone control.
3. **Order matters.** The noise or distortion you want to reduce has to be added between the two stages.

If the de-emphasis is badly implemented, it can [introduce distortion](https://www.geeksforgeeks.org/electronics-engineering/pre-emphasis-and-de-emphasis/) of its own, which is one more reason to treat the pair as a system and not as two unrelated EQ moves.

## The curves and the numbers behind them

Emphasis curves are described by time constants, not by the Q and frequency knobs you see on a parametric EQ. A time constant comes from a simple resistor and capacitor network. The relationship to the corner frequency is [τ = 1 / (2 × π × f0)](https://www.dpamicrophones.com/dict/emphasis/). Plug in 75 µs and you get roughly 2,122 Hz.

| System | Time constants or corners | Where it applies |
|---|---|---|
| US FM broadcast | 75 µs de-emphasis, corner near 2,122 Hz | Receiver, matching the transmitter's boost |
| European FM broadcast | 50 µs | Commonly used in Europe |
| RIAA vinyl playback | 3,180, 318 and 75 µs, about 50.05, 500.5 and 2,122 Hz | Phono stage, inverse of the cutting curve |
| US AM (NRSC-1-C) | Pole at 2,122 Hz, zero at 8,700 Hz | Receiver de-emphasis, below 10 kHz |

The sources for those rows: in US FM, the receiver [uses 75 µs de-emphasis](https://www.fmsystems-inc.com/manuals/DE-EMPart.pdf) to match the transmitter and recover a flat response, and a [50 µs figure is common in Europe](https://www.vintagedigital.com.au/glossary/de-emphasis/). The RIAA values are laid out in [Stereophile's RIAA explainer](https://www.stereophile.com/content/cut-and-thrust-riaa-lp-equalization), which also notes that replay EQ is the inverse of the record EQ and that the IEC later added a fourth time constant to the replay curve. The AM figures come from the [NRSC-1-C standard](https://www.nrscstandards.org/standards-and-guidelines/documents/standards/nrsc-1-c.pdf).

Notice how often 2,122 Hz shows up. It is a convention, not a magic frequency, but it explains why de-emphasis sounds like a gentle high shelf-style roll-off that starts in the upper midrange and keeps falling.

### Why this matters if you only mix

You will rarely build a 75 µs filter by hand. But you will meet it when a vinyl transfer, an old broadcast capture or a flagged CD comes into a session. And if you understand it, you understand the most useful trick it teaches: a boost and a cut can be designed as a pair around a process that you want to treat differently.

## CDs with pre-emphasis

This is where most people first search for the term. Some early CDs were mastered with a high-frequency boost. According to one collector's primer, many discs from the first ten years of the format, especially Denon-produced classical releases, used it, and the purpose was to [reduce high-frequency artifacts](https://paoprod.com/projects/album-comparisons/primer-cd-pre-emphasis-hdcd/) typical of early digital-to-analog converters.

The disc tells the player when to correct it. The pre-emphasis state is typically signaled by a [flag in the table of contents and/or in the track subcode](https://deepwiki.com/cdrdao/cdrdao/1.3-toc-file-format), and players use track flags to engage de-emphasis. Ripping software is where it goes wrong: [programs may handle incomplete flag data differently](https://www.fugato.com/pickett/ripping2.shtml), so a rip can come out bright and thin if nothing applied the cut.

How to avoid getting it wrong:

- **Check the flag first.** If your ripper reports a pre-emphasis flag on a track, that track needs de-emphasis. If it reports none, leave it alone.
- **Trust your ears second.** A flagged disc ripped without correction sounds harsh and over-bright. An unflagged disc that you de-emphasize sounds muffled.
- **Never guess by genre or label.** Applying the cut to audio that was not pre-emphasized is the most common mistake, and it is a tonal error you cannot fix by turning the highs back up without adding your own EQ coloration.
- **Correct once, and once only.** Some players and rippers apply it automatically. Applying it again doubles the cut.

If the results are doubtful, compare the track against another release of the same album. The difference between a flat and a de-emphasized version should be audible as a tilt, not as a change in dynamics.

## Using the idea in a mix: emphasis before dynamics, de-emphasis after

Here is the part that matters to us as a mixing-focused design studio. You can borrow the pre/de-emphasis structure to make a single-band compressor or gate react to a specific part of the spectrum, without splitting the signal into bands.

The setup is simple:

1. Put an EQ ahead of the compressor and boost the band you want the compressor to respond to. For a vocal, that might be the harsh upper midrange. For a drum bus, the low end that makes the kick dominate.
2. Put the compressor next. It now sees that band louder, so it reacts to it more strongly.
3. Put a second EQ after the compressor with the mirror image: the same frequency, the same Q, the same amount, but a cut.

With the compressor doing nothing, the two EQs cancel and the signal sounds untouched. With it working, the band you boosted drives more of the gain reduction. That is the same relationship as radio: a boost, a process in the middle, and a cut that undoes the boost.

Two cautions that come from how dynamics processors work:

- **Gain reduction hits the whole signal.** A single-band compressor turns down everything when the boosted band triggers it. The post-EQ restores the tone of that band, but it does not isolate the compression to that band. If you want compression on only one band, you need a split, and we cover that in [our guide to multiband parallel compression](https://vector-dsp.com/blog/multiband-parallel-compression/).
- **Pumping comes from the dynamics stage.** If a mix starts to breathe unpleasantly, look at attack, release, ratio and the detector. That is a compressor behavior. Emphasis EQ changes what the detector hears, not how fast it moves, so retune the compressor and not the EQ.

### A quick test that the pair is honest

Bypass the compressor, or set its ratio to 1:1, and toggle both EQs on and off together. You should hear no difference in tone. If you do, the boost and cut do not mirror each other. Remember that any EQ has phase shift and group delay, including filters people call minimum phase. Group delay is still there, so two different EQ plugins will not cancel perfectly. Using the same plugin with mirrored settings keeps the error small, and our article on [parallel EQ and phase](https://vector-dsp.com/blog/parallel-eq/) explains why phase should be your first check whenever signals are combined.

### Where else the same structure helps

- **Delays and reverbs.** Keeping repeats and tails out of the low end is the same instinct: treat one range differently, then put the balance back. See [frequency-specific delay](https://vector-dsp.com/blog/frequency-specific-delay/) and [reverb ducking with a sidechain EQ](https://vector-dsp.com/blog/reverb-ducking/).
- **Gates.** A gate that opens on a hi-hat bleed in a snare mic can be calmed by emphasizing the snare's body in the detector path. Our walkthrough on [frequency dependent gating](https://vector-dsp.com/blog/frequency-dependent-gating/) shows the setup.
- **Targeted effects.** If you want an effect to hit only the frequencies you choose, [frequency selective effects with proportional Q](https://vector-dsp.com/blog/frequency-selective-effects/) lets you keep the width of each band consistent as you move it.

## Keep the chain clean

A few habits make emphasis tricks safer.

**Watch your gain structure.** A pre-boost of 6 dB on a band raises that band's level into the next plugin. If the next stage is a saturator or a converter-modeled processor, it will react to the boosted level, and the post-cut will not remove any distortion that was generated in the middle. That is intentional in some uses, but know it is happening.

**Split only when you need to.** If you need the dynamics to act on one range only, a real crossover is more precise than a boost and cut. Phase is the thing to protect. Our notes on a [DAW-agnostic frequency split](https://vector-dsp.com/blog/split-frequencies-in-daw/) and on [linear phase crossovers and their latency](https://vector-dsp.com/blog/linear-phase-crossover/) cover both approaches.

**Mind aliasing in nonlinear stages.** If anything in the middle is nonlinear, boosted highs push more energy toward Nyquist. We wrote up a quick check in the [993 Hz aliasing test](https://vector-dsp.com/blog/avoid-aliasing-in-plugins/).

**Know your routing.** Sends, buses and returns are where mirrored EQs usually get separated by accident, leaving one half in place and one half bypassed. A refresher on [audio signal flow basics](https://blog.stagehandprotools.com/posts/understanding-signal-flow-audio-basics-for-stagehands) helps you confirm exactly what each stage hears.

![Keep the chain clean — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1793173122882_Keep-the-chain-clean-overview-diagram.jpeg)

## Our perspective

We are a small design studio, and we like ideas that are old, simple and still correct. Pre-emphasis and de-emphasis is one of them. The engineers who set up FM and vinyl systems did not want a magic filter. They wanted two filters that cancel, with the interesting work happening in between.

We think that is the right model for frequency-specific mixing. Most problems that people try to fix with a multiband plugin are really problems of one range reacting differently from another. Sometimes a clean split is the right answer. Sometimes a mirrored EQ pair around a single-band processor is faster and more transparent. The skill is knowing which, and keeping the pair honest: same frequency, same Q, opposite gain, and a bypass test before you trust it.

What we would not do is use the word de-emphasis loosely. It means undoing a specific boost. If you did not boost it first, you are not de-emphasizing anything, you are just cutting highs.

> *— Kai*

## One way to do it without the wiring

If you would rather not build mirrored EQ pairs by hand, ToneLab is one way to get frequency-targeted processing in a single insert. It runs parallel effect lanes with EQ aimed at each lane, so the effect only touches the range you choose. It is a one-time license at $73.99, and you can try the free demo first on [our pricing page](https://vector-dsp.com/pricing).

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

## FAQ

### What is the difference between pre-emphasis and de-emphasis?

Pre-emphasis boosts certain frequencies, usually highs, before transmission or recording to improve signal-to-noise ratio. De-emphasis is the reciprocal process applied on playback or reception to restore the [original frequency balance](https://en.wikipedia.org/wiki/Emphasis_(telecommunications)). They are designed as a pair and only make sense together.

### Which CDs have pre-emphasis?

Many discs from the first decade of the format used it, with Denon-produced classical releases often cited. The reliable way to know is the flag in the table of contents or track subcode, which a player or ripper reads. Do not apply de-emphasis unless that flag says the audio needs it.

### What de-emphasis time constant is used in the US?

US FM broadcasting uses 75 µs, which corresponds to a first-order corner of about 2,122 Hz. The RIAA vinyl playback curve also includes a 75 µs time constant. Europe commonly uses 50 µs for FM, so the two are not interchangeable.

### Should I put a de-emphasis EQ on my master?

Only if the source material was pre-emphasized and nothing in your playback or import path has already corrected it. For ordinary mixes, the term does not apply, and a high cut on the master is just a tone choice. If you want the concept in a mix, use it as a mirrored boost and cut around a compressor or gate, and verify with a bypass test.

## Sources

- [De-emphasis, Sound On Sound glossary](https://www.soundonsound.com/glossary/de-emphasis)
- [Emphasis (telecommunications), Wikipedia](https://en.wikipedia.org/wiki/Emphasis_(telecommunications))
- [Preemphasis, Analog Devices](https://www.analog.com/en/resources/glossary/preemphasis.html)
- [NRSC-1-C standard, NRSC](https://www.nrscstandards.org/standards-and-guidelines/documents/standards/nrsc-1-c.pdf)
- [Pre-emphasis and De-emphasis, GeeksforGeeks](https://www.geeksforgeeks.org/electronics-engineering/pre-emphasis-and-de-emphasis/)
- [Emphasis, DPA Microphones](https://www.dpamicrophones.com/dict/emphasis/)
- [De-emphasis response table, FM Systems](https://www.fmsystems-inc.com/manuals/DE-EMPart.pdf)
- [De-emphasis, Vintage Digital glossary](https://www.vintagedigital.com.au/glossary/de-emphasis/)
- [Cut and Thrust: RIAA LP Equalization, Stereophile](https://www.stereophile.com/content/cut-and-thrust-riaa-lp-equalization)
- [CD pre-emphasis primer, PAO Productions](https://paoprod.com/projects/album-comparisons/primer-cd-pre-emphasis-hdcd/)
- [TOC file format, cdrdao on DeepWiki](https://deepwiki.com/cdrdao/cdrdao/1.3-toc-file-format)
- [CD Ripping 2, Fugato](https://www.fugato.com/pickett/ripping2.shtml)
- [Audio signal flow basics](https://blog.stagehandprotools.com/posts/understanding-signal-flow-audio-basics-for-stagehands)

## Recommended

- [Tilt EQ for Mix Engineers: Match Levels, Check the Bypass](https://vector-dsp.com/blog/tilt-eq/)
- [Parallel EQ: Three DAW Routes, but Phase Comes First](https://vector-dsp.com/blog/parallel-eq/)
- [Multiband Delay: How It Works and How to Use It in a Mix](https://vector-dsp.com/blog/multiband-delay/)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw/)
