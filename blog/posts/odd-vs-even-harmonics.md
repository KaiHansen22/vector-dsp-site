---
title: "Odd vs Even Harmonics: What They Sound Like and How to Use Them"
description: ""
date: 2026-10-22
---

# Odd vs Even Harmonics: What They Sound Like and How to Use Them

![Audio test bench for harmonic distortion analysis](https://media.babylovegrowth.ai/blog-images/organization-30746/1792496652575_Audio-test-bench-for-harmonic-distortion-analysis.jpeg)

Even harmonics (2nd, 4th, 6th) are whole-number multiples of the fundamental that stack up in octaves, so they tend to read as thicker and warmer. Odd harmonics (3rd, 5th, 7th) add the fifths, thirds and sevenths on top, so they tend to read as edgier, more hollow or more aggressive. Which one you get depends on the symmetry of the curve that bends your signal. This guide covers the math in plain terms, what each sounds like, how to choose between them on a real mix, and where they go wrong.

## TL;DR

- Odd harmonics are 3f, 5f, 7f and so on. Even harmonics are 2f, 4f, 6f. The fundamental is 1f.
- A symmetric curve (clipping both halves of the wave the same way) makes only odd harmonics. An asymmetric curve adds even ones.
- Even harmonics are usually described as warm, odd as edgy. That is a tendency, not a law, and level and frequency range change it.
- Choose by job: even for thickness and weight, odd for bite and presence, and keep them out of ranges where they muddy the mix.
- Judge by ear at matched loudness. A distortion percentage tells you very little.

## Table of Contents

- [What odd and even harmonics are](#what-odd-and-even-harmonics-are)
- [Where each kind comes from: symmetry](#where-each-kind-comes-from-symmetry)
- [What they sound like in a mix](#what-they-sound-like-in-a-mix)
- [Why the percentage on the spec sheet misleads you](#why-the-percentage-on-the-spec-sheet-misleads-you)
- [Odd and even harmonics are not the only problem: aliasing](#odd-and-even-harmonics-are-not-the-only-problem-aliasing)
- [Our perspective: put the harmonics where they belong](#our-perspective-put-the-harmonics-where-they-belong)
- [One way to do it: per-band saturation in a single insert](#one-way-to-do-it-per-band-saturation-in-a-single-insert)
- [A practical workflow you can try today](#a-practical-workflow-you-can-try-today)
- [Where the rules of thumb break](#where-the-rules-of-thumb-break)
- [FAQ](#faq)
- [Sources](#sources)

## What odd and even harmonics are

A harmonic is an integer multiple of a fundamental frequency. [Per TechTarget's definition](https://www.techtarget.com/whatis/definition/harmonic), the second harmonic of a signal with fundamental f sits at 2f, the third at 3f, and so on. Odd harmonics are the odd multiples; even harmonics are the even ones.

Take an A at 100 Hz for simple numbers:

| Harmonic | Frequency | Parity | Relationship to the fundamental |
|---|---|---|---|
| 1st | 100 Hz | odd (the fundamental) | unison |
| 2nd | 200 Hz | even | one octave up |
| 3rd | 300 Hz | odd | octave plus a fifth |
| 4th | 400 Hz | even | two octaves up |
| 5th | 500 Hz | odd | two octaves plus a major third |
| 6th | 600 Hz | even | two octaves plus a fifth |
| 7th | 700 Hz | odd | a seventh that sits flat of the equal-tempered note |

The pattern is the whole story for your ears. The 2nd and 4th are pure octaves of the note you played. They reinforce it without adding a new pitch name. The 3rd and 5th add a fifth and a major third, which still sound consonant at low levels. The 7th lands somewhere that does not match any note on a piano, which is one reason strong upper odd harmonics start to sound harsh or reedy.

## Where each kind comes from: symmetry

You do not choose harmonics directly. You choose a transfer curve, and the curve decides.

The key test is symmetry. If the curve treats the positive and negative halves of the waveform identically (an odd function, in math terms), it generates only odd harmonics. [The Stanford CCRMA notes on enhancing even harmonics](https://ccrma.stanford.edu/~jos/pasp/Enhancing_Even_Harmonics.html) state that a cubic nonlinearity, and any odd distortion law, produces only odd-numbered harmonics, as in a square wave. The classic example is a symmetric hard clipper: flatten both peaks equally and you build toward a square wave.

![Symmetry determines odd and even harmonic output](https://media.babylovegrowth.ai/blog-images/organization-30746/1792496695456_Symmetry-determines-odd-and-even-harmonic-output.jpeg)

That square wave is the textbook odd-only signal. [The Feynman Lectures](https://www.feynmanlectures.caltech.edu/I_50.html) work through the Fourier series of a square wave and find only odd harmonics, with amplitudes in inverse proportion to their frequency. So the 3rd is a third as loud as the fundamental, the 5th a fifth, and so on. The ideal series falls off slowly, which is why a clipped signal sounds bright and buzzy.

To get even harmonics, you break the symmetry. Three common ways:

1. **Asymmetric clipping.** Compress or clip the top of the wave more than the bottom. Single-ended tube stages and many transformer and tape behaviors are often described this way, though real devices vary by design and drive level.
2. **A bias or DC offset before the nonlinearity.** [The CCRMA cubic distortion page](https://ccrma.stanford.edu/realsimple/faust_strings/Cubic_Nonlinear_Distortion.html) describes using a simple input offset to break the odd symmetry and bring in even harmonics, and notes that a DC blocker was needed afterward.
3. **A square-law term.** [The same CCRMA material](https://ccrma.stanford.edu/~jos/pasp/Enhancing_Even_Harmonics.html) discusses adding a squared component, which is the textbook route to a 2nd harmonic.

A warning on that second item: an offset that goes into a nonlinearity leaves DC at the output. Block it, or you will waste headroom and may hear a thump when you bypass the plugin.

### A note on "tape adds odd harmonics"

You will see forum arguments about whether tape is an odd or even generator. The honest answer is that it depends on the machine, bias, level and the signal itself. A symmetric curve gives odd; an asymmetric one gives both. Treat any device label as a starting hypothesis and check with a spectrum analyzer and a sine wave.

## What they sound like in a mix

The commonly repeated rule is that even harmonics are warm and odd harmonics are edgy. It holds up often enough to be a useful starting point, and the reasons are musical. Even harmonics are octaves, so they fuse with the note. Odd harmonics bring in non-octave intervals, and the higher ones are increasingly dissonant.

[The CCRMA material](https://ccrma.stanford.edu/~jos/pasp/Enhancing_Even_Harmonics.html) notes that for tube distortion simulation it has been argued that some even-order content improves results. The same logic is why a pure cubic curve can feel brittle.

Here is how that plays out by source:

- **Bass and kick.** A 2nd harmonic on a 50 Hz fundamental lands at 100 Hz, which small speakers reproduce far better than 50 Hz. You hear more note without adding low-end energy you can't play back. Odd harmonics here (150 Hz, 250 Hz) can sound hollow or nasal.
- **Vocals.** Light even-order content adds body. Odd content around the 3rd to 7th harmonic lands in the presence range and can add cut, or sibilance and grit if you push it.
- **Guitars and synths.** Odd-heavy distortion gives the classic fuzz or square-ish bite. Mixed content fills out chords.
- **Drum bus and mix bus.** Small amounts of either mostly act as glue and density. Heavy odd content on a full mix shows up as harshness first.

Level matters as much as parity. A small amount of any harmonic can fade into the signal; a large amount of either becomes obvious distortion. There is also a real masking effect: harmonics sit under the louder fundamentals and neighbors, so a 2nd harmonic that is audible on a solo bass may disappear in a dense mix.

## Why the percentage on the spec sheet misleads you

Total harmonic distortion (THD) lumps every harmonic into one number. [HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Audio/amp.html) notes that high-fidelity amplifiers are commonly specified by their total harmonic distortion, and that harmonic distortion arises when a component clips the waveform peaks. The number tells you nothing about which harmonics are present or where.

That matters because the same percentage can sound very different. A figure dominated by a 2nd harmonic behaves nothing like one dominated by a 7th. Frequency range matters too. [A paper on loudspeaker modeling from CCRMA's Yeh](https://ccrma.stanford.edu/~dtyeh/papers/yeh08_dafx_cab.pdf) reports that notable harmonic distortion in the speaker it studied appears mainly at low frequencies, where cone displacement is large. So one percentage at 80 Hz and the same percentage at 8 kHz are different events.

The practical habit: open a spectrum analyzer, feed a steady sine, and look at the stack of peaks. Read the shape, not the total.

## Odd and even harmonics are not the only problem: aliasing

In a digital plugin, harmonics above the Nyquist frequency fold back into the audible range as inharmonic tones. This is aliasing, and it is the quickest way to make "warm" saturation sound cheap. Hard, asymmetric clipping creates a lot of high-order content, so it is the worst offender, and odd-heavy curves with slow rolloff can alias too.

We wrote a hands-on method for catching this with a single steady tone in [our 993 Hz aliasing test](https://vector-dsp.com/blog/avoid-aliasing-in-plugins/). If a saturator seems to add "grit" that doesn't follow the note, test before you blame the genre.

## Our perspective: put the harmonics where they belong

Most of the debate over odd and even harmonics treats the signal as one block. That is where we think it goes wrong. A full-range saturator applies one curve to everything, so the kick's low end and the vocal's air get the same treatment, and the harmonics generated by the bass land on top of the midrange.

Think about what happens at the harmonic level. Drive a mix with a strong 60 Hz bass note through a saturator. The 3rd harmonic is 180 Hz and the 5th is 300 Hz, right in the low-mid region many engineers spend their time cleaning up. The harmonic content you wanted for "character" is now building mud.

So we work in three steps:

1. **Decide the job for each range.** Low end: a touch of even content for translation on small speakers. Mids: very little, because that is where masking is worst. Highs: light odd content if you want bite, but watch sibilance.
2. **Split by frequency, not by guess.** Process the ranges separately, with phase-coherent crossovers, so the harmonics you create stay in the range you intended. Our notes on [splitting frequencies in a DAW without phase problems](https://vector-dsp.com/blog/split-frequencies-in-daw/) cover the setup.
3. **Blend in parallel, and meter honestly.** Saturation raises level, and louder sounds better. Match the processed path to the dry one before judging, using the approach in [our parallel chain metering guide](https://vector-dsp.com/blog/metering-parallel-chains/).

One caution on loudness. Adding harmonics changes the waveform, and peaks can go up or down depending on the curve and the drive. Do not assume saturation makes something louder at the same peak level. Measure the peak and the loudness separately.

A related point on order of operations: whether saturation belongs before or after compression changes how the harmonics interact with gain reduction. We tested that in [our saturation before compression piece](https://vector-dsp.com/blog/saturation-before-compression/). And if you hear pumping after a multiband setup, look at the compressor's attack, release and detector, because pumping comes from dynamics processing, not from the filters that split the bands.

We are a small design studio, and this is the thinking behind how we build: the harmonic character of a processor matters less than controlling where it lands.

> *— Kai*

## One way to do it: per-band saturation in a single insert

If you would rather not build the split, the parallel path and the level match by hand in your DAW, ToneLab, [our $73.99 one-time plugin](https://vector-dsp.com/pricing), lets you run effects in separate lanes, each targeted at its own frequency range, inside one insert. You could, for example, put a gentle asymmetric curve on the low lane and keep the upper lanes clean or lightly odd. A free demo is available, so you can test it on your own material first. It is one route to the technique; the same result is possible with a manual split in any DAW.

## A practical workflow you can try today

Use a single sine wave and a spectrum analyzer first, then a real source.

1. **Learn your tool.** Feed a 100 Hz sine into your saturator at moderate drive. Look at the peaks at 200, 300, 400 and 500 Hz. If only 300 and 500 appear, the curve is symmetric. If 200 and 400 show up too, it is asymmetric.
2. **Check for DC.** If the output meter shows an offset, or the waveform sits off center, add a high-pass or DC blocker.
3. **Match levels.** Set the processed signal to the same loudness as the bypassed one before comparing.
4. **Start with the low end.** Add a small amount of even-order saturation to bass and kick and check on a small speaker or earbuds.
5. **Add odd content last, and sparingly.** If a part needs bite, push it only in the range where it needs it.
6. **Keep it in parallel.** Blending the processed signal with the dry one lets you keep transients and dial in only the harmonic weight you want. Our [parallel routing steps](https://vector-dsp.com/blog/parallel-effects-routing/) and the notes on [phase in parallel EQ](https://vector-dsp.com/blog/parallel-eq/) help avoid cancellation. If your processing involves delay, [protect mono compatibility](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/).
7. **Check in mono, then flip polarity on the wet path.** If the sound thins out dramatically, you have a phase problem, not a harmonic one.

## Where the rules of thumb break

- **Even is not always pleasant.** A strong 2nd and 4th on a low sustained note can make it boomy or sound like a doubled octave.
- **Odd is not always harsh.** Low-level odd content on a bass can add clarity.
- **Real gear mixes both.** Most analog stages produce a blend that changes with level. Describing them as purely odd or purely even is a simplification.
- **Speakers distort too.** The speaker you monitor on adds its own nonlinearity, mostly at low frequencies where the cone moves a lot, as the [loudspeaker modeling paper](https://ccrma.stanford.edu/~dtyeh/papers/yeh08_dafx_cab.pdf) describes. Check your decisions on a second system.
- **Intermodulation is a different animal.** When two unrelated frequencies mix, the products are not harmonically related to either. That is why heavy saturation on a full mix, with many notes at once, sounds muddier than the same drive on one instrument. Splitting by range reduces how much of this you create.

## FAQ

### Are even harmonics better than odd harmonics?

Neither is better in general. Even harmonics are octave-related, so they tend to sound warm and supportive. Odd harmonics bring in fifths and thirds and higher dissonant partials, which suit parts that need bite. Pick by the job and the frequency range.

### Which harmonics does a square wave contain?

Only odd ones. [A perfect square wave](https://www.feynmanlectures.caltech.edu/I_50.html) contains the fundamental plus the 3rd, 5th, 7th and so on, with amplitudes falling in proportion to 1/n. Even harmonics showing up in a measured square wave point to asymmetry in the signal or the device.

### How do I add even harmonics to a symmetric distortion?

Break the symmetry before the nonlinearity. [A small DC offset at the input](https://ccrma.stanford.edu/realsimple/faust_strings/Cubic_Nonlinear_Distortion.html) or an asymmetric curve works, and you should follow it with a DC blocker. Check the result on a sine wave and a spectrum analyzer.

### Can you hear 1% THD?

It depends on which harmonics make up the 1% and where they sit in frequency. A low-order harmonic can be masked by the signal, while higher-order content in a quiet passage may stand out. The single percentage cannot tell you, so look at the spectrum and listen at matched levels.

### Why does my saturator sound harsh even at low drive?

Two common causes are strong odd content in the upper mids and aliasing from a plugin that doesn't handle high-order harmonics well. Run a steady tone through it and look for peaks that don't sit on the harmonic series. If you see them, that is aliasing.

## Sources

- [Enhancing Even Harmonics, CCRMA, Stanford](https://ccrma.stanford.edu/~jos/pasp/Enhancing_Even_Harmonics.html)
- [Cubic Nonlinear Distortion, CCRMA, Stanford](https://ccrma.stanford.edu/realsimple/faust_strings/Cubic_Nonlinear_Distortion.html)
- [Loudspeaker modeling paper, Yeh, CCRMA](https://ccrma.stanford.edu/~dtyeh/papers/yeh08_dafx_cab.pdf)
- [The Feynman Lectures on Physics, Vol. I, Ch. 50: Harmonics](https://www.feynmanlectures.caltech.edu/I_50.html)
- [What Is Harmonic? WhatIs, TechTarget](https://www.techtarget.com/whatis/definition/harmonic)
- [Audio Amplifiers, HyperPhysics](http://hyperphysics.phy-astr.gsu.edu/hbase/Audio/amp.html)

## Recommended

- [2–4 dB Test: When Engineers Should Use Saturation Before Compression](https://vector-dsp.com/blog/saturation-before-compression/)
- [Parallel EQ: Three DAW Routes, but Phase Comes First](https://vector-dsp.com/blog/parallel-eq/)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw/)
- [Avoid Mono Collapse: Sample Delay Parallel Processing for Producers](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/)
