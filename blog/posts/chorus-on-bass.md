---
title: "Chorus on Bass: How to Use It Without Losing Your Low End"
description: ""
date: 2026-11-06
---

# Chorus on Bass: How to Use It Without Losing Your Low End

![Bassist playing through a chorus pedal](https://media.babylovegrowth.ai/blog-images/organization-30746/1793805260264_Bassist-playing-through-a-chorus-pedal.jpeg)

Chorus on bass works when the lows stay out of the effect. Keep the fundamental dry and centered, and let only the upper harmonics get delayed and modulated. Then you get the thickness and shimmer without the seasick wobble or the hollow low end in mono. Below are the settings we start from, where chorus belongs in the chain, and a split-band approach that solves the problem at its root.

## TL;DR

- Chorus copies your bass, delays the copy a few milliseconds, wobbles its pitch with a slow oscillator and blends it back in. On low notes, that blend can cancel energy.
- Start slow and shallow: a rate under 1 Hz, low depth, and a wet blend around 20 to 30 percent.
- Keep everything below roughly 80 Hz mono and dry. High-pass the wet copy somewhere between 200 and 400 Hz.
- In a DAW, the cleanest method is to split the bass into bands and chorus only the upper band. A pedal with a crossover does the same thing in hardware.
- Check the result in mono before you commit. If the bass gets weaker, the chorus is reaching too low.

## Table of Contents

- [What chorus actually does to a bass signal](#what-chorus-actually-does-to-a-bass-signal)
- [Why chorus and low frequencies don't get along](#why-chorus-and-low-frequencies-dont-get-along)
- [Starting settings for chorus on bass](#starting-settings-for-chorus-on-bass)
- [Where chorus sits in the signal chain](#where-chorus-sits-in-the-signal-chain)
- [The fix: chorus only the part that can take it](#the-fix-chorus-only-the-part-that-can-take-it)
- [Chorus on bass in a DAW versus a pedal](#chorus-on-bass-in-a-daw-versus-a-pedal)
- [Common problems and quick fixes](#common-problems-and-quick-fixes)
- [Our perspective](#our-perspective)
- [One way to do it in a single plugin](#one-way-to-do-it-in-a-single-plugin)
- [FAQ](#faq)
- [Sources](#sources)

## What chorus actually does to a bass signal

A chorus makes a copy of your signal, delays that copy by a short time, and modulates the delay with a low-frequency oscillator (LFO). The modulation shifts the pitch of the copy up and down slightly. Mixed with the dry signal, you hear something like several players who are almost, but not quite, in tune with each other. [StudyBass describes the delay as roughly 10 to 20 ms](https://www.studybass.com/gear/bass-effects/bass-chorus/), and the pitch drift is what turns a plain doubled sound into a choir-like one.

The classic result is a bass that sounds thicker, a touch wider and a little more animated. [Sound on Sound's bass column](https://www.soundonsound.com/techniques/low-down) calls chorus the classic bass treatment for exactly those reasons: it thickens, adds a bit of pitch wobble and spreads the sound into stereo.

That last point is the catch. Width is what chorus is for, and width on the lowest octaves is what most mixes cannot afford.

## Why chorus and low frequencies don't get along

Three things happen when you chorus a full-range bass.

**The delayed copy cancels the dry signal at certain frequencies.** Mix a signal with a delayed version of itself and you get comb filtering: some frequencies add, others subtract. [MusicProductionWiki's chorus guide](https://musicproductionwiki.com/bible/chorus) notes that on sources with a lot of content below 100 Hz, this can sharply reduce low-end weight, especially when the mix is summed to mono. Because the LFO keeps moving the delay, the cancellation points move too, so the low end seems to breathe in and out.

**Pitch drift on a fundamental sounds out of tune.** A 4-string's low E sits around 41 Hz. A few cents of drift on a guitar's midrange reads as shimmer. On a bass note that defines the chord, it reads as wrong. StudyBass makes the same point: [the bass defines the harmony](https://www.studybass.com/gear/bass-effects/bass-chorus/), so altering its pitch too much can cause problems for the whole band.

**Stereo spread breaks mono compatibility.** If the chorus is stereo, the left and right sides carry different delayed copies. Sum them to mono, on a phone speaker, a club system or a Bluetooth speaker, and the low end can collapse. [Lord Reverb's mono compatibility guide](https://lordreverb.com/mixing/low-end-mono-compatibility/) says that a bass track with a chorus, ensemble or widening plugin in the chain is the usual suspect when low end falls apart in mono. It recommends keeping everything under 80 Hz mono.

None of that means chorus is wrong for bass. It means the effect needs to be told which part of the bass to touch.

![Three ways chorus can affect bass lows](https://media.babylovegrowth.ai/blog-images/organization-30746/1793805330638_Three-ways-chorus-can-affect-bass-lows.jpeg)

## Starting settings for chorus on bass

Every bass and every song is different, so treat these as starting points and adjust by ear and by a mono check. They are drawn from the ranges that bass-focused guides agree on.

| Parameter | Starting range | Why |
|---|---|---|
| Rate | Under 1 Hz (roughly 0.3 to 0.8 Hz) | [Slow LFO speeds keep the effect from sounding like a rotating speaker](https://www.soundonsound.com/techniques/low-down) |
| Depth / width | Low | [Too much detunes the line](https://www.soundonsound.com/techniques/low-down); keep the pitch drift subtle |
| Delay time | Around 8 to 24 ms base | Mid-range chorus delay; longer times detune faster with heavy modulation |
| Wet blend | About 20 to 30 percent | [A 25 percent mix is a common bass starting point](https://www.guitarworld.com/lessons/how-to-use-modulation-pedals-on-bass); 50 percent is often too much |
| Wet high-pass | 200 Hz and up | [Keeps the delayed copy out of the low end](https://musicproductionwiki.com/bible/chorus) |

A few notes on using that table.

**Rate first.** Bass players generally want slower rates than guitarists, because fast wobble on a low note is quickly heard as out of tune. [StudyBass says a very high rate produces a warble](https://www.studybass.com/gear/bass-effects/bass-chorus-settings/) that is too fast to be useful on bass. Set the rate slow, then raise depth until you hear movement, then back off a notch.

**Blend second.** The most common mistake is running chorus at a 50/50 mix because it sounds impressive in solo. In context, a chorus tucked underneath the dry signal does the job. If you can clearly hear the effect on the bass while the full band plays, it is probably too loud.

**Then the low cut.** Everything else is cosmetic if the wet signal still contains the fundamental. High-pass the wet copy and the whole sound tightens.

### Let the song decide

An eighth-note rock line in a dense arrangement can take less chorus than a sparse verse with a walking part. If the bass is carrying the harmony alone, go subtler. If a guitar and keys fill in the chord, you have more room. And bring the effect in at the moment that needs it. [StudyBass lists cutting through the mix, sweetening high-register fills and standing out at the right moment](https://www.studybass.com/gear/bass-effects/bass-chorus-settings/) as the main reasons to use chorus on bass, which suits automation or a send you open for a chorus section.

## Where chorus sits in the signal chain

If you are playing through pedals, the usual logic is to place modulation after dynamics and drive, so the chorus modulates a tone that is already shaped. Compression and any overdrive come first, EQ next, then chorus, then delay and reverb. Putting drive after chorus tends to make the modulation itself sound fuzzy and uneven.

In a DAW the same logic holds, with a mixing twist:

1. Tidy the bass first: EQ and compression to even out levels and remove rumble you don't need.
2. Add chorus on a parallel path or in a split-band setup, so the dry low end never goes through it.
3. Do any stereo-width management after the chorus, so you can control what the effect created.
4. Put reverb or delay on sends rather than in series, so the bass doesn't get washed out.

If you add saturation to the bass as well, you can try it before the chorus, so the modulation acts on the harmonics the distortion created. Those harmonics are exactly the upper material you want the chorus to work on. Our guide to [multiband distortion](https://vector-dsp.com/blog/multiband-distortion-plugin/) covers how to keep the lows clean while the upper band is driven.

## The fix: chorus only the part that can take it

Here is the principle underneath every good bass chorus: split the signal by frequency, leave the lows alone, modulate the rest.

Hardware bass chorus pedals handle this with a crossover or a low filter, so the modulation is applied to the upper range and the fundamentals pass through untouched. [BOSS describes its bass chorus as a split-frequency design](https://www.boss.info/us/products/ceb-3/) that applies chorus to higher frequencies without muddying the lows, and that is the entire idea in one sentence. It is also why a standard guitar chorus can leave bass notes thinner: it has no such split.

You can build the same thing in any DAW:

1. Duplicate the bass track, or use a send, so you have a dry path and a wet path.
2. On the dry path, leave the full signal or low-pass it around 150 to 250 Hz, depending on how much of the low mids you want to remain unmodulated.
3. On the wet path, high-pass at 200 to 400 Hz, then add the chorus at a slow rate and low depth.
4. Blend the wet path in until you feel the thickness, not until you hear the effect.
5. Sum to mono and compare with and without the wet path. The low end should stay at the same level.

If you want the details of the routing, we walk through [a DAW-agnostic frequency split](https://vector-dsp.com/blog/split-frequencies-in-daw/) step by step. And if the wet path is stereo and you want to be sure it doesn't hurt the low end, [sample-delay parallel processing](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/) is a good companion technique for avoiding mono collapse. For a deeper look at why two channels are not the same as real width, see our post on [dual mono versus stereo](https://vector-dsp.com/blog/dual-mono-vs-stereo/).

### A worked example

Say you have a clean electric bass in a pop track, played with fingers, with a bright guitar and a pad around it.

- Dry path: full bass, mono, untouched.
- Wet path: high-pass at 250 Hz, chorus at 0.5 Hz rate, low depth, delay around 12 ms.
- Blend: start with the wet path at around 25 percent and raise it only until the bass feels slightly wider on the notes above the fundamental.
- Check: flip the master to mono. The bass should keep its weight and just lose a bit of sheen.

Now do the same on a slap line. Slap tones have more upper-mid energy, so the wet path gets a lot to work with, and you can often lower the blend. This is also the sound that was heavily associated with the 1980s. [StudyBass points out chorus was hugely popular on slap bass then and can date a recording if overused](https://www.studybass.com/gear/bass-effects/bass-chorus/), so if you want a modern feel, stay subtle and let the dry signal lead.

## Chorus on bass in a DAW versus a pedal

Both routes work, and the choice is mostly about how you record and mix.

**A pedal** gives you the sound while you play. You react to the effect, which changes how you phrase. Many bassists like that. The drawback in a studio is commitment: if you record the chorus onto the track, you can't undo it later, and a stereo chorus recorded in a DI path can bring mono problems into the mix with no way to fix them. A common habit is to record a clean DI, plus a chorused feed if you want it, so there is always a safe option.

**A plugin** lets you decide after the fact. You can automate the blend, change the depth between sections, and, most importantly, filter the wet signal. If your chorus plugin has no crossover of its own, the parallel setup above gives you the same control. That is the main reason many mixing engineers prefer chorus in the box: the choice of which frequencies to affect is yours, and you can make it with the mix playing.

If you are recording yourself, capturing the dry bass and adding chorus during mixing is the more forgiving workflow. If you are playing live, a pedal with a low filter or crossover is the better choice, since you can't fix it later.

![Chorus on bass in a DAW versus a pedal](https://media.babylovegrowth.ai/blog-images/organization-30746/1793805302458_Chorus-on-bass-in-a-DAW-versus-a-pedal.jpeg)

## Common problems and quick fixes

**The bass sounds thin after adding chorus.** The wet signal is canceling the dry signal in the low end. Raise the wet high-pass, lower the blend, or move the chorus to a parallel path.

**It sounds seasick.** Rate or depth is too high. Slow the rate below 1 Hz and cut depth by half.

**The low end disappears on a phone or a club mono system.** Check for stereo width below 80 Hz. [Lord Reverb suggests a Mid/Side EQ that cuts the Side channel below 80 Hz](https://lordreverb.com/mixing/low-end-mono-compatibility/) as a fix, using a steep slope. With a split-band chorus, you should not have the problem to begin with.

**The bass is wide but the mix feels cluttered.** Chorus adds energy around the upper midrange where guitars and vocals live. Pull the wet path's high-pass higher, or cut a little of the wet signal around 1 to 3 kHz, depending on the arrangement.

**It gets lost in the chorus section of the song.** Automate the wet blend up for the first bar of the section and back down. Subtle moves read better than a constant effect.

## Our perspective

> Most chorus advice for bass boils down to "be careful." We would rather say "be specific." The problem was never chorus itself. It is that a single effect is asked to treat 41 Hz and 2 kHz as if they were the same material.
>
> When we design tools, we start from the idea that frequency ranges deserve different treatment. A bass has a foundation that should stay centered, steady and in tune, and an upper range where movement, width and texture are welcome. Once you give each range its own path, you stop trading one for the other.
>
> That is why we favor lane-based, per-band processing inside a single insert. You decide which band gets the modulation, which stays dry, and how much of each reaches the output, without building a multi-track template for every bass. It keeps the signal flow readable, and it keeps mono checks fast.
>
> Whatever tools you use, the habit is worth keeping: split first, then process.
>
> *Kai*

## One way to do it in a single plugin

If you would rather not build parallel tracks for every bass, ToneLab is one way to do this technique: it runs effects in parallel lanes inside one insert, with EQ targeting for each lane, so you can aim modulation at the upper band and leave the lows untouched. It is a one-time license at [$73.99](https://vector-dsp.com/pricing/), and a free demo is available.

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

The same lane idea applies to other time-based effects. Our posts on [frequency-specific delay](https://vector-dsp.com/blog/frequency-specific-delay/) and [multiband delay](https://vector-dsp.com/blog/multiband-delay/) show how to keep repeats out of the low end, which is the same principle you are using here.

## FAQ

### Is chorus on bass a good idea?

Yes, in small doses and with the lows protected. It is not essential the way compression often is, and [many bass players use it on a song or two](https://www.studybass.com/gear/bass-effects/bass-chorus-settings/) while others build a signature tone around it. Used subtly on the upper harmonics, it can help a bass stand out or sound fuller.

### What is the difference between a bass chorus and a regular chorus?

A bass chorus separates the low frequencies from the modulated signal, so the fundamental stays clean and only the higher range is chorused. A regular chorus modulates the whole signal, which can thin out low notes and cause phase cancellation. You can reproduce the bass version with any chorus by high-passing the wet path.

### What chorus settings should I start with on bass?

Try a rate under 1 Hz, low depth, a wet blend around 20 to 30 percent and a high-pass on the wet signal at 200 Hz or higher. Raise depth until you just hear movement, then pull it back slightly. Always check in mono.

### Should bass be in mono?

The low end should be. A common guideline is to keep everything below about 80 Hz mono and keep stereo content between 80 and 250 Hz minimal, [letting width live above that range](https://lordreverb.com/mixing/low-end-mono-compatibility/). That is why chorus works best on the upper part of the bass.

### Can I add chorus to a bass after recording?

Yes. If you record a dry DI track, you can add chorus in the DAW on a parallel path, filter the wet signal and automate the blend. This is safer than printing a stereo chorus into the recording.

## Sources

- [Bass Chorus, StudyBass](https://www.studybass.com/gear/bass-effects/bass-chorus/)
- [Bass Chorus Settings, StudyBass](https://www.studybass.com/gear/bass-effects/bass-chorus-settings/)
- [The Low Down, Sound on Sound](https://www.soundonsound.com/techniques/low-down)
- [Low End Mono Compatibility: 5 Fast Fixes for Phase Loss, Lord Reverb](https://lordreverb.com/mixing/low-end-mono-compatibility/)
- [How to use modulation pedals on bass, Guitar World](https://www.guitarworld.com/lessons/how-to-use-modulation-pedals-on-bass)
- [Chorus: The Producer's Bible, MusicProductionWiki](https://musicproductionwiki.com/bible/chorus)
- [CEB-3 Bass Chorus, BOSS US](https://www.boss.info/us/products/ceb-3/)

## Recommended

- [Frequency Specific Delay: Keep Repeats Out of the Low End](https://vector-dsp.com/blog/frequency-specific-delay/)
- [Reverb Ducking: Sidechain EQ Keeps Depth Without Pumping in Any DAW](https://vector-dsp.com/blog/reverb-ducking/)
- [Ducking Delay: What It Is and How to Set It Up in Any DAW](https://vector-dsp.com/blog/ducking-delay/)
- [Avoid Mono Collapse: Sample Delay Parallel Processing for Producers](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/)
