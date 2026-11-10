---
title: "Psychoacoustic Bass Enhancement: Make Low End Translate"
description: ""
date: 2026-11-10
---

# Psychoacoustic Bass Enhancement: Make Low End Translate

![Producer checking bass on compact playback speaker](https://media.babylovegrowth.ai/blog-images/organization-30746/1794102023178_Producer-checking-bass-on-compact-playback-speaker.jpeg)

Psychoacoustic bass enhancement makes bass audible on speakers that can't reproduce it. It does this by adding harmonics of the low notes, and your brain infers the missing fundamental from them. You get the sense of depth without pushing more sub energy into a driver that can't move that much air. This guide covers why it works, how the processing is built, and how to apply it in a mix without turning the low end to mud.

## TL;DR

- Your hearing reconstructs a low pitch from its harmonics, so a bass note can feel present even when the fundamental is weak or filtered out.
- The classic chain is: isolate the lows, generate harmonics with a nonlinear stage, filter and blend them back in, usually with the original lows reduced.
- It helps most on small speakers and earbuds. It can sound boxy or distorted if the harmonics sit too high or the source is dense.
- Work on single sources like kick and bass, keep the harmonic band narrow, and check in mono and at low volume.
- You can build a simple version yourself with parallel saturation and EQ, no dedicated "bass enhancer" required.

## Table of Contents

- [What psychoacoustic bass enhancement is, and why it works](#what-psychoacoustic-bass-enhancement-is-and-why-it-works)
- [How the processing is built](#how-the-processing-is-built)
- [Where it helps, and where it doesn't](#where-it-helps-and-where-it-doesnt)
- [Setting it up in a mix](#setting-it-up-in-a-mix)
- [Building it with parallel saturation and EQ](#building-it-with-parallel-saturation-and-eq)
- [Artifacts to listen for](#artifacts-to-listen-for)
- [Room and listening level change what you hear](#room-and-listening-level-change-what-you-hear)
- [Our perspective](#our-perspective)
- [One way to do it in your own session](#one-way-to-do-it-in-your-own-session)
- [FAQ](#faq)
- [Sources](#sources)

## What psychoacoustic bass enhancement is, and why it works

The effect rests on the missing fundamental, also called virtual pitch. When a sound contains a series of overtones that are whole-number multiples of a base frequency, listeners hear the pitch of that base even if it is absent. The brain uses the spacing of the overtones to work out the pitch.

This is not a new trick. Pipe-organ builders have used it for centuries to suggest very long pipes that would have been too costly to build, as [Sound on Sound notes in its guide to enhancement plug-ins](https://www.soundonsound.com/techniques/choosing-using-enhancement-plug-ins).

In audio software, the idea is straightforward. MathWorks describes the approach in its documentation: [a nonlinear device shifts low-frequency content up into higher frequencies by generating harmonics](https://www.mathworks.com/help/audio/ug/psychoacoustic-bass-enhancement-for-band-limited-signals.html). The perceived pitch of the original is preserved through virtual pitch, even though the output contains no real low-frequency energy at that pitch.

So you have a kick or bass line with a 45 Hz fundamental that a laptop speaker can't produce. Give the listener 90 Hz, 135 Hz and 180 Hz in the right proportions, and the ear still places the note down at 45 Hz.

![Missing 45 Hz fundamental inferred from harmonics](https://media.babylovegrowth.ai/blog-images/organization-30746/1794102043271_Missing-45-Hz-fundamental-inferred-from-harmonics.jpeg)

### Why it matters to a mixing engineer

Most listening happens on phones, laptops, Bluetooth speakers and earbuds. Many of these roll off well above the frequencies where your sub-bass lives. Boosting the 40 to 60 Hz region with an EQ does nothing on those systems, and on full-range systems it eats headroom and can cause trouble in the room.

Harmonics land in a region the small speaker can reproduce. That is the whole value: you move the information to where it can be heard.

## How the processing is built

Virtual bass algorithms differ in detail, but most follow the same skeleton. A [UC San Diego paper on low-complexity virtual bass](https://cseweb.ucsd.edu/~marora/files/papers/13868.pdf) describes it clearly: extract the low-frequency signal below the speaker cutoff, generate harmonics from it, and add those to the original signal, which is usually high-pass filtered above the cutoff.

1. **Split.** A low-pass path takes the bass region. A high-pass path carries everything else.
2. **Generate.** A nonlinear stage creates harmonics from the low band.
3. **Shape.** A filter keeps the useful harmonics and removes the rest.
4. **Recombine.** The shaped harmonics are blended back with the dry signal.

### Nonlinear devices

The nonlinear device is the heart of the chain. The same paper explains that full-wave rectification produces harmonics at 2f, 4f, 6f and so on. Only even harmonics appear, so the perceived pitch is 2f rather than f. That is an octave up, which is why simple rectifier designs can make a bass line sound like it moved.

Waveshapers and saturators generate both even and odd harmonics depending on the curve. If you want to understand how the two families sound and why that choice changes the result, our post on [odd versus even harmonics](https://vector-dsp.com/blog/odd-vs-even-harmonics/) goes through it with examples.

A tidy rule from the same paper: a harmonic shaping low-pass at around 300 Hz keeps at least the first two harmonics present for all bass frequencies, which is enough for the bass perception. Raising the cutoff beyond 300 Hz gives a much sharper timbre that can sound distorted.

### Phase vocoders

An alternative to a nonlinear device is a phase vocoder, which shifts frequencies in the spectral domain. Bai and Lin's [AES paper on virtual bass synthesis](https://secure.aes.org/forum/pubs/journal/?elib=13888) adjusts the magnitude of generated harmonics using a model of equal-loudness contours, and reports effective bass impression with acceptable quality in listening tests.

Academic work also combines methods. A [hybrid system by Mu, Gan and Tan](https://ieeexplore.ieee.org/document/6287837) splits the signal into transient and steady-state parts, applies a nonlinear device and a phase vocoder to the separate parts, and evaluates the result with MUSHRA listening tests. The point for you as a mixer: transients and sustained tones respond differently to harmonic generation, so a single approach rarely handles a kick and a sub synth equally well.

### Why this differs from boosting sub-bass

A sub boost adds real low-frequency energy. That requires gain, and the UCSD paper notes that pushing low-frequency energy this way can mean excessive gain and speaker overload. Harmonic enhancement relies on perception instead of excursion. On a full-range system, the two can complement each other. On a small one, only the harmonic approach does anything.

## Where it helps, and where it doesn't

Paul White's [review of a well-known bass enhancer](https://www.soundonsound.com/reviews/waves-maxxbass-101-102) in Sound on Sound found the effect most evident on smaller speakers, where it helps bass elements stand out. He does not recommend applying it to studio monitors. That fits how you'd expect it to work: if your monitors already reproduce the fundamental, you are layering harmonics onto something already present.

In a mix, that translates into a few cases:

- **A bass line that disappears on phones.** The notes are there on your monitors but vanish on small speakers.
- **A kick that has weight but no definition at low level.** Harmonics give the ear something to latch on to.
- **A sub synth carrying the whole low end.** A pure sine has no harmonics, so small speakers get nothing.

It is a poor fit for a full mix bus, where many sources overlap and the generated harmonics intermodulate. The UCSD paper reports slight distortion with multiple bass instruments, which it attributes to intermodulation distortion from the nonlinear operation. A review of a sub-bass generator from Sound on Sound makes a related point: [that kind of processing works best on individual tracks such as kick drum or bass synth](https://www.soundonsound.com/reviews/waves-submarine), and unwanted artifacts often appear on a full mix.

## Setting it up in a mix

Here is a workflow that holds up whether you use a dedicated enhancer or build the chain from ordinary parts.

### 1. Decide what the fundamental range is

Find the lowest notes that matter and the point where your target playback system rolls off. Phones and tiny speakers often give up well before 100 Hz. Sound on Sound's [Better Bass article](https://www.soundonsound.com/techniques/better-bass) says bass harmonic synthesizers are particularly effective at adapting deep material for limited-range systems that roll off around 80 Hz.

### 2. Place the harmonic band above the roll-off

Dedicated enhancers usually have a frequency control tied to the speaker cutoff. White's review suggests the setting should normally sit between 75 and 90 percent of the cutoff frequency, though he found around 60 percent sounded more natural than 90 percent on smaller speakers. Setting it too high gave a noticeably boxy sound. Take that as a starting point to adjust by ear, not a rule.

### 3. Keep the harmonic range narrow

Two or three harmonics is enough. Anything past roughly 300 Hz in the generated content starts to read as distortion rather than bass, per the UCSD findings above. Use a steep low-pass after the generator so the grit stays out of the mids where vocals and guitars live.

### 4. Reduce the original lows only if you have a reason

Some enhancers let you attenuate the original fundamental. That can help on material with heavy sub content headed for small systems. For a mix that must also work on full-range systems, leave the fundamental alone and add the harmonics on top. Removing real low end from a club-bound mix to flatter a phone speaker is a poor trade.

### 5. Blend in parallel

Process a copy and blend it under the dry signal. This keeps the original transient intact and lets you dial in how much implied weight you want. If you're new to the idea, our piece on [parallel processing without mono collapse](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/) covers why sample-level timing between the paths matters.

### 6. Check in mono

Bass should sit in the center. Generated harmonics from a stereo source can widen or smear. Sum to mono and confirm the low end does not thin out. If it does, process a mono-summed bass path and keep stereo content out of the generator.

## Building it with parallel saturation and EQ

You don't need a dedicated tool to try the principle. The manual version is a parallel saturation path with tight EQ.

1. Duplicate the bass or kick track, or send it to a parallel path.
2. Put a saturator on the path. Gentle curves create low-order harmonics.
3. EQ before the saturator to restrict what feeds it. A band covering the low-bass fundamentals works well, so the nonlinearity works on the notes you want enhanced and not on the whole spectrum.
4. EQ after the saturator to remove the lowest region and anything above the harmonics you want, so only the 2nd to 4th harmonics remain.
5. Blend under the dry track until the notes read on a small speaker at low volume.

One caution on levels. Saturation adds harmonics, and those harmonics add peaks of their own. Don't assume a path that feels louder is free of consequences: watch your headroom as you blend.

The same logic applies to the other effects you might reach for around the low end. Our guides on [frequency-specific delay](https://vector-dsp.com/blog/frequency-specific-delay/) and [frequency-selective effects with proportional Q](https://vector-dsp.com/blog/frequency-selective-effects/) show how to keep reverb and delay out of the region where you've just built clarity. Reverb tails under about 150 Hz tend to cloud exactly the harmonics you are trying to make readable.

## Artifacts to listen for

Harmonic generation is a distortion process by design, so watch for the side effects:

- **Boxiness.** Too much energy in the low mids, often from setting the frequency control too high.
- **Intermodulation.** Several bass sources feeding the same generator produce extra tones that sound gritty or smeared.
- **Timing smear on transients.** The UCSD paper reports that on sudden increases in bass amplitude, such as a bass drum, phase distortion made the generated bass seem time-misaligned with the high-pass signal. If your kick feels late or soft after enhancement, compare the processed and dry paths with the polarity flipped to see where they diverge, and keep the blend modest.
- **Octave confusion.** Even-harmonic-only generators make a pitch seem an octave higher, which can change the character of a bass line.

## Room and listening level change what you hear

What you judge in the studio depends on the room and the volume. Sound on Sound explains that at low volume we lose sensitivity to the lowest and highest frequencies and the sound seems mid-heavy. At around 80 to 85 dB SPL we hear it as close to flat, which is why [85 dB SPL is often considered a good monitoring level](https://www.soundonsound.com/techniques/choosing-using-enhancement-plug-ins). Bass and treble enhancers exist partly to compensate for this and for the limits of small speakers.

That has a practical consequence: check your enhancement at several levels. A setting that sounds right at 85 dB can sound thin at a whisper, and the reverse. Room modes matter as well. If your low end swings from note to note, [subwoofer placement and room balance](https://blog.jupiterav.ca/blog/subwoofer-placement) will affect what you think the bass is doing before any plugin enters the picture. Fix that first, so you aren't compensating for the room with harmonics.

A tilt EQ is a good reference tool here for matching tonal balance between passes. Our post on [tilt EQ and checking the bypass](https://vector-dsp.com/blog/tilt-eq/) walks through level-matched comparison, which is the only fair way to judge whether the enhancement is helping or just sounding bigger.

## Our perspective

> We think the most useful way to treat psychoacoustic bass is as a frequency-specific problem, not a global effect. The harmonics you want live in one narrow band, tied to one source. The moment the processing spills across the whole spectrum, you are back to muddy lows and harsh mids.
>
> That is how we approach design at Vector DSP. We prefer tools that let you aim an effect at a specific region, shape what feeds it, and shape what comes out, instead of one big knob that treats the whole signal the same. Parallel, band-targeted processing keeps the dry signal intact and gives you control over where the added character lives.
>
> Our advice to mixing engineers: build the enhancement from parts you understand first. Know which harmonics you are adding, which band they sit in, and how they behave in mono. Once you can hear each piece, any dedicated enhancer becomes easier to set, and you can tell when it is helping.
>
> *Kai*

## One way to do it in your own session

If you want a ready-made place to try the parallel, band-targeted approach, ToneLab gives you five parallel lanes: chorus, distortion, reverb, delay and saturation. Each lane has its own EQ. The saturation lane with its EQ focused on the bass region is one way to do the manual technique above, and the other lanes keep their own EQs so their effects stay out of the low end. It is a one-time license at $73.99, and you can try a free demo first. See what we're building at [Vector DSP](https://vector-dsp.com).

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

## FAQ

### Does psychoacoustic bass enhancement add real bass?

No. It adds harmonics of the bass notes, and your hearing infers the lower pitch from them. The output contains none of the low-frequency energy at the original pitch, as the [MathWorks documentation](https://www.mathworks.com/help/audio/ug/psychoacoustic-bass-enhancement-for-band-limited-signals.html) explains. That is why it works on small speakers and does little for a system that already reproduces the fundamental.

### Should I use it on my studio monitors?

Usually not as a monitoring crutch. Paul White advises against applying the effect to studio monitors in his review. Use it on individual sources such as kick or bass when you want them to translate, and check the result on both full-range and small systems.

### Can I put it on the master bus?

It is risky. Harmonic generators work best on single sources, and on full mixes they tend to produce audible artifacts, as the Sound on Sound review of a sub-bass generator notes. Intermodulation between several bass-heavy elements is the likely cause. Treat the kick and bass separately.

### Why does my enhanced bass sound boxy?

The harmonics probably sit too high. A frequency control set near the top of the suggested range, or a shaping filter reaching well past 300 Hz, pushes energy into the low mids. Lower the frequency setting, narrow the harmonic band and reduce the blend.

### Is it the same as saturation?

They overlap. Saturation creates harmonics through a nonlinear curve, and psychoacoustic enhancement is a deliberate use of that process aimed at a band of bass notes with filters before and after it. A saturator with careful EQ can approximate the idea.

## Sources

- [Choosing & Using Enhancement Plug-ins, Sound on Sound](https://www.soundonsound.com/techniques/choosing-using-enhancement-plug-ins)
- [Psychoacoustic Bass Enhancement for Band-Limited Signals, MathWorks](https://www.mathworks.com/help/audio/ug/psychoacoustic-bass-enhancement-for-band-limited-signals.html)
- [Low Complexity Virtual Bass Enhancement Algorithm, UC San Diego](https://cseweb.ucsd.edu/~marora/files/papers/13868.pdf)
- [Synthesis and Implementation of Virtual Bass System, AES Journal](https://secure.aes.org/forum/pubs/journal/?elib=13888)
- [Hybrid psychoacoustic bass enhancement, IEEE](https://ieeexplore.ieee.org/document/6287837)
- [Waves MaxxBass 101 & 102 review, Sound on Sound](https://www.soundonsound.com/reviews/waves-maxxbass-101-102)
- [Waves Submarine review, Sound on Sound](https://www.soundonsound.com/reviews/waves-submarine)
- [Better Bass, Sound on Sound](https://www.soundonsound.com/techniques/better-bass)
- [Subwoofer placement: how to get balanced bass](https://blog.jupiterav.ca/blog/subwoofer-placement)

## Recommended

- [Frequency Specific Delay: Keep Repeats Out of the Low End](https://vector-dsp.com/blog/frequency-specific-delay/)
- [Producers and Engineers: Frequency Selective Effects With Proportional Q](https://vector-dsp.com/blog/frequency-selective-effects/)
- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression/)
- [Multiband Sidechain Compression: Set It Up and Use It](https://vector-dsp.com/blog/multiband-sidechain-compression/)
