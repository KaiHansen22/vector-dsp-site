---
title: "Multiband Reverb: How to Split Reverb by Frequency"
description: ""
date: 2026-10-30
---

# Multiband Reverb: How to Split Reverb by Frequency

![Engineer routing frequency bands for reverb](https://media.babylovegrowth.ai/blog-images/organization-30746/1793206145305_Engineer-routing-frequency-bands-for-reverb.jpeg)

Multiband reverb means splitting a signal into two or more frequency bands and giving each band its own reverb, or its own reverb settings, before the bands are summed again. It is not the same as putting an EQ on a reverb return. An EQ shapes one reverb after the fact. A multiband setup lets the low band have a short, tight tail while the highs bloom for three seconds. We build and test frequency-specific tools for a living, so this guide covers what happens inside the signal path, how to choose crossover points, how to route it in any DAW, and what can go wrong.

## TL;DR

- Multiband reverb splits the input into bands and runs a separate reverb (or separate decay settings) on each, so lows, mids and highs can behave differently.
- Start with two bands and one crossover somewhere between 150 and 300 Hz. Short, dark reverb below, longer and brighter above.
- Build it with parallel aux tracks, or with a single insert that can run lanes per band. Check the sum for phase cancellation at the crossover.
- Most mixes need less of this than you think. One or two shared reverbs still glue a mix together, and a filtered reverb return solves many problems.
- Never judge the result in solo. Judge it against the full mix, with the reverb level matched on and off.

## Table of Contents

- [What multiband reverb actually is](#what-multiband-reverb-actually-is)
- [How the band splitting works under the hood](#how-the-band-splitting-works-under-the-hood)
- [When multiband reverb earns its place](#when-multiband-reverb-earns-its-place)
- [Choosing crossover points and band settings](#choosing-crossover-points-and-band-settings)
- [How to build multiband reverb in your DAW](#how-to-build-multiband-reverb-in-your-daw)
- [Problems to watch for](#problems-to-watch-for)
- [Our perspective](#our-perspective)
- [One way to do it with a single insert](#one-way-to-do-it-with-a-single-insert)
- [Frequently asked questions](#frequently-asked-questions)
- [Sources](#sources)

## What multiband reverb actually is

A conventional reverb treats the whole spectrum as one thing. Every frequency you send in decays according to the same room model, and the only frequency control you get is a damping or tone knob. That is usually enough, but it has a built-in compromise. If you want a long, lush tail on a vocal, the low-mid energy in that tail piles up and clouds the mix. If you cut the lows to clean that up, you can lose the weight of the room.

Multiband reverb removes the compromise by dividing the job. [MusicRadar describes the idea](https://www.musicradar.com/how-to/14-tips-to-help-you-do-more-with-reverb-applying-different-reverbs-to-different-frequency-bands-can-open-up-all-sorts-of-intriguing-possibilities) as applying different reverbs to different frequency bands: you split the signal across separate auxiliary tracks using low-pass and high-pass filters, then put a reverb on each track.

There is also a research angle. Julius O. Smith at Stanford's CCRMA notes that [perceptual studies indicate reverberation time should be adjustable independently in at least three frequency bands](https://ccrma.stanford.edu/~jos/pasp/Multiband_Delay_Filter_Design.html). That is why many high-end algorithmic reverbs expose separate low and high decay multipliers. Real rooms decay unevenly: air and soft furnishings absorb highs faster than lows, so a believable space already has frequency-dependent decay. A multiband approach just puts that control in your hands, and lets you push past what a real room would do.

### How it differs from reverb plus EQ

| Approach | What it controls | What it cannot do |
|---|---|---|
| EQ before the reverb | Which frequencies enter the reverb | Change how long each band rings |
| EQ after the reverb | Tone of the finished tail | Change decay time per band, or the space itself |
| Damping or decay multipliers inside a reverb | Rough low and high decay | Use different room types per band |
| Multiband reverb | Separate reverb or settings per band | Nothing, but it costs more setup and risks phase issues |

If you want to hear the difference, put a wide reverb on a snare. With EQ only, the tail gets thinner as you cut lows. With a split, you can keep a short, punchy low band that adds body without adding length, and let the upper band ring out.

## How the band splitting works under the hood

A multiband effect needs a crossover: a set of filters that divide the spectrum so the bands add back up to something close to the original. The research literature describes a typical implementation. In CCRMA's Faust example, [Butterworth lowpass and highpass filters are arranged in a dyadic tree](https://ccrma.stanford.edu/~jos/pasp/FDN_Reverberators_Faust.html): the spectrum is split at the highest crossover frequency, and the lower region is split again, and so on. That same example controls reverberation time independently in five bands, then sums them.

![Dyadic crossover splits feeding five reverb bands](https://media.babylovegrowth.ai/blog-images/organization-30746/1793206176440_Dyadic-crossover-splits-feeding-five-reverb-bands.jpeg)

Two practical consequences follow.

**Filters shift phase.** Every crossover filter delays different frequencies by different amounts. The Faust documentation points out that filter-bank splitting introduces dispersion, and that causal, delay-equalized filters let the bands sum without phase-cancellation artifacts at band edges, though [dispersion can still affect the sound of the reverb](https://ccrma.stanford.edu/~jos/pasp/FDN_Reverberators_Faust.html). A broader review of filter banks adds that they can show [aliasing, amplitude and phase distortion](http://www.systems.caltech.edu/dsp/ppv/papers/ProcIEEEmultirateTUTExtra.pdf), which good designs work to cancel.

**Phase behavior is a design choice, not a free lunch.** Minimum-phase filters keep latency low, but they are not delay-free: they still have group delay, and it varies with frequency. Linear-phase crossovers keep the bands aligned at the cost of more latency and some pre-ringing. We wrote up the trade-off in our piece on [linear phase crossovers and their latency](https://vector-dsp.com/blog/linear-phase-crossover/). With reverb the stakes are lower than with a compressor on a bass, because a reverb tail is diffuse by nature. Even so, if your dry signal also passes through the split, alignment matters a lot.

## When multiband reverb earns its place

We would rather tell you when not to use it. Sound On Sound reports that [professional mixers often use one or two global reverbs](https://www.soundonsound.com/techniques/how-use-reverb-pro-part-2?amp=) so a mix feels like it sits in a single acoustic space, adding specific reverbs only when an instrument needs a distinct effect. That is good advice. A mix where every band has a different room sounds like several unrelated places stitched together.

So where does a split actually help?

1. **Lead vocal with a long tail.** You want air and length in the highs, but almost nothing below the low-mids. This is the classic case. We go deeper in our post on [frequency selective reverb starting around 80 to 120 Hz](https://vector-dsp.com/blog/frequency-selective-reverb/).
2. **Drum bus or snare room.** Short, dense reverb on the lows keeps the kick and snare body solid. A longer, brighter plate on the top end adds sizzle without smearing the attack.
3. **Pads and synths in sound design.** Here you are not trying to be realistic. A long, cavernous high band over a tight low band gives a shimmering wash that never muddies the bass.
4. **Dense arrangements.** When many instruments compete in the 200 to 500 Hz area, reverb tails there are the first thing to clog the mix. Removing or shortening that band's reverb clears space.
5. **Crowded low end in electronic music.** Reverb under about 150 Hz rarely helps. It mostly makes the kick and bass less defined.

If you mix in a room with a hybrid setup, the same logic applies to hardware and software alike. A studio that handles tracking and mixing, such as the one behind these [professional analog mixing services](https://zenviewstudios.fr/single-post/services-de-mixage-analogique-professionnel-l-art-du-son-authentique), still faces the question of when a shared mix reverb is enough and when a dedicated, band-specific one earns its place.

## Choosing crossover points and band settings

There is no universal crossover. Material decides. But there are sensible starting points, and they come from how the mix behaves rather than from a magic number.

### Start with two bands

One crossover is easier to hear and easier to keep in phase. Pick a point, then audition it by soloing the reverb return only and sweeping the crossover until the low band stops sounding boomy and the high band stops sounding thin.

General starting ranges, which we use as a first guess and then adjust by ear:

| Source | Crossover to try | Low band | High band |
|---|---|---|---|
| Lead vocal | 150 to 250 Hz | Very short or off | Longer plate, bright |
| Snare | 200 to 400 Hz | Short room, low level | Medium plate |
| Acoustic guitar | 200 to 300 Hz | Short | Medium hall |
| Pad or synth | 300 to 600 Hz | Short, dark | Long, wide |
| Full drum bus | 120 to 200 Hz | Almost dry | Short ambience |

Numbers like these mirror what a lot of engineers recommend. A processing guide, for instance, suggests that [in mastering a common split is around 100 to 200 Hz for the low end and 2 to 5 kHz for the high end](https://www.numberanalytics.com/blog/mastering-multiband-processing), though it varies with the material. For reverb you generally work lower on the high split, since the goal is shaping tails rather than correcting the whole spectrum.

### Add a third band only when you hear a reason

Three bands make sense when the low-mids and the top need different treatment. A typical split: below 200 Hz nearly dry, 200 Hz to 4 kHz a medium reverb, above 4 kHz a longer, brighter tail. Beyond three bands you are doing sound design, not mixing. Smith's research suggests three bands is the point where independent decay control matters perceptually, so there is rarely a mixing reason to go further.

### Settings that matter per band

- **Decay time.** Lows shorter, highs longer is the natural direction and nearly always sounds right. Inverting it (long lows, short highs) sounds unnatural but is useful for special effects.
- **Pre-delay.** Keep it the same across bands unless you want a smeared, spread effect. Mismatched pre-delay is a common reason a split reverb sounds wrong.
- **Level.** Set each band's level against the full mix. Bring up the reverb until you can hear it, then back it off a little.
- **Width.** Mono or narrow lows, wide highs. That keeps the mix translating on small speakers.

On the filter side, a related trick is to prepare the reverb's input. As one mixing resource explains, [reverb tends to add low end that muddies the mix, and high end that exaggerates sibilance](https://www.mixinglessons.com/eq-reverb/), so filtering the signal on its way into the reverb keeps those frequencies from being sent in the first place. That is the simplest form of band control, and it is worth trying before building a full split.

## How to build multiband reverb in your DAW

You do not need special software. This is the routing version, which works in any DAW.

1. **Create one aux or FX track per band.** Name them clearly: Verb Low, Verb High.
2. **Send the source to each aux.** Use pre-fader sends if you want the reverb level to stay independent of the dry fader, which is usually the case for vocals.
3. **Filter each aux.** On Verb Low, put a low-pass at your crossover point. On Verb High, put a high-pass at the same frequency. Use matching slopes, and start with 12 dB per octave. Steeper slopes separate bands more cleanly but shift phase more.
4. **Insert a reverb after each filter.** Set it to 100 percent wet. Give the low band a short, dark room and the high band your longer plate or hall.
5. **Match levels and listen.** Mute each aux in turn. If the sum sounds hollow or comb-filtered near the crossover, flip the polarity on one reverb return and compare. Reverb is decorrelated enough that this usually matters less than on dry splits, but check.
6. **Optionally filter after the reverb too.** A gentle high-pass on the low band's output or a low-pass on the high band's output stops reverb energy from spilling across the crossover.

If you want a refresher on phase problems when you split a signal, we cover them in [a DAW-agnostic guide to frequency splitting](https://vector-dsp.com/blog/split-frequencies-in-daw/). For the parallel setup itself, our [five-step parallel routing walkthrough](https://vector-dsp.com/blog/parallel-effects-routing/) covers sends, naming and gain staging.

### Keep the dry signal out of the split

It is tempting to split the whole channel and run it all through a crossover. For reverb that is rarely needed. Keep the dry track untouched and only split the *send*. That way the crossover's phase shift never touches your dry signal, and the band split only affects the wet component.

## Problems to watch for

**Phase at the crossover.** Because filters shift phase, bands can partly cancel near the crossover frequency. With reverb returns this usually shows up as a slight hollow spot. Sweep the crossover slightly or change the slope.

**Pumping and ducking confusion.** If your reverb seems to breathe unnaturally, check whether you have dynamics processing on the return, such as a compressor or a ducker. Breathing is a dynamics effect. If you want the reverb to get out of the way of the dry vocal, use deliberate sidechain control, as in our walkthrough on [reverb ducking with sidechain EQ](https://vector-dsp.com/blog/reverb-ducking/).

**Latency.** Linear-phase splitting adds latency. Reverb returns are not timing-critical in the way a dry kick is, but it matters if you are printing in real time or monitoring through the effect. Plan for it, and compensate in your DAW.

**Too many spaces.** The most common failure is not technical. The reverb in each band is fine alone, but together they make the vocal sound detached from the mix. Return to the advice about shared reverbs: let a global reverb carry the main sense of space, and use the band-split reverb as a targeted fix.

**Aliasing in nonlinear stages.** If your chain includes saturation or other nonlinear processing in any band, aliasing can show up as inharmonic grit in the highs. We explain how to catch it in our [aliasing test and fix guide](https://vector-dsp.com/blog/avoid-aliasing-in-plugins/). Filter-bank design reviews flag the same family of errors, particularly where [decimation can introduce aliasing that must be canceled](http://www.systems.caltech.edu/dsp/ppv/papers/ProcIEEEmultirateTUTExtra.pdf).

![Problems to watch for — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1793206193584_Problems-to-watch-for-overview-diagram.jpeg)

## Our perspective

We are a small design studio, and we keep coming back to one conviction: frequency is the most useful axis for deciding what an effect should do. Time-based effects are the clearest example. A reverb, a delay, a chorus, they all behave differently in the lows than in the highs, and a single set of controls forces a compromise.

That is why we think of multiband reverb less as a special plugin and more as a pattern. Split, treat each band for what it needs, and sum. You can do it with sends, with a delay or reverb that has built-in band controls, or with a multi-lane insert. The pattern is the same one we describe for [multiband delay](https://vector-dsp.com/blog/multiband-delay/) and [frequency specific delay](https://vector-dsp.com/blog/frequency-specific-delay/): keep the lows tight, let the highs travel.

We also have a firm opinion on restraint. The best use of this technique is the one nobody notices. If the listener hears the split, you have gone too far. A vocal that sits in the mix with a tail that feels airy but never muddy is the whole goal, and often that takes a single crossover and a few dB of difference in decay time.

If you take one habit from us, make it this: set the crossover by ear on the reverb return, then check it in the full mix with the level of the reverb matched against the bypassed version. Louder always sounds better, and matching levels is the only way to be honest about it.

> *— Kai*

## One way to do it with a single insert

If you prefer not to build aux routing for every track, ToneLab, our multi-effects plugin, runs parallel effects in lanes within a single insert, with EQ targeting per lane, so you can aim a reverb at the band you choose and keep the rest of the signal clean. It is a one-time purchase at [$73.99 on our pricing page](https://vector-dsp.com/pricing), and a free demo is available.

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

## Frequently asked questions

### Is multiband reverb the same as a reverb with a built-in EQ?

No. A built-in EQ shapes the tone of one reverb, so every band still decays in the same room model. A multiband reverb runs separate reverbs or decay settings per band, so you control how long each region rings, not just how loud it is.

### Where should I put the crossover for a vocal reverb?

Try somewhere between 150 and 250 Hz, then adjust by ear on the reverb return. The aim is a low band that is very short or off, and a high band with the tail you want. If the vocal sounds thin, lower the crossover or let a little low band through.

### Does multiband reverb cause phase problems?

It can, because every crossover filter shifts phase. Research on filter banks shows that [delay-equalized designs let bands sum without cancellation at the band edges](https://ccrma.stanford.edu/~jos/pasp/FDN_Reverberators_Faust.html). In practice, split only the send, match slopes on both bands, and check the sum for hollow spots.

### Do I need multiband reverb on every track?

No. Many mixes work best with one or two shared reverbs that give the whole mix a single space. Use a band-split reverb only on elements that need it, such as a lead vocal, a snare or a wide pad.

## Sources

- [MusicRadar: 14 tips to help you do more with reverb](https://www.musicradar.com/how-to/14-tips-to-help-you-do-more-with-reverb-applying-different-reverbs-to-different-frequency-bands-can-open-up-all-sorts-of-intriguing-possibilities)
- [Stanford CCRMA: Multiband Delay-Filter Design](https://ccrma.stanford.edu/~jos/pasp/Multiband_Delay_Filter_Design.html)
- [Stanford CCRMA: FDN Reverberators in Faust](https://ccrma.stanford.edu/~jos/pasp/FDN_Reverberators_Faust.html)
- [Multirate digital filters, filter banks, polyphase networks (Caltech)](http://www.systems.caltech.edu/dsp/ppv/papers/ProcIEEEmultirateTUTExtra.pdf)
- [Sound On Sound: How To Use Reverb Like A Pro, Part 2](https://www.soundonsound.com/techniques/how-use-reverb-pro-part-2?amp=)
- [Number Analytics: Mastering Multiband Processing](https://www.numberanalytics.com/blog/mastering-multiband-processing)
- [Mixing Lessons: How to EQ your Reverb](https://www.mixinglessons.com/eq-reverb/)

## Recommended

- [80–120 Hz Vocal Start: Frequency Selective Reverb for Engineers](https://vector-dsp.com/blog/frequency-selective-reverb/)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw/)
- [Frequency Specific Delay: Keep Repeats Out of the Low End](https://vector-dsp.com/blog/frequency-specific-delay/)
- [Multiband Delay: How It Works and How to Use It in a Mix](https://vector-dsp.com/blog/multiband-delay/)
