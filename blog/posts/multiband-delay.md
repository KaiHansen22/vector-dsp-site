---
title: "Multiband Delay: How It Works and How to Use It in a Mix"
description: ""
date: 2026-10-26
---

# Multiband Delay: How It Works and How to Use It in a Mix

![Producer shaping percussion with multiband delay](https://media.babylovegrowth.ai/blog-images/organization-30746/1792876077314_Producer-shaping-percussion-with-multiband-delay.jpeg)

A multiband delay splits your signal into frequency bands and gives each band its own delay time, level and often pan or feedback. That lets you put long, spacious echoes on the highs while the lows stay short, tight or dry. It is the cleanest fix for the usual delay problem: repeats that pile up in the low end and turn the mix muddy.

Below we cover how the effect works, how it differs from an ordinary delay, five settings to start from, how to build one in a DAW that has no dedicated plugin, and the phase and level traps that catch people.

## TL;DR

- A multiband delay splits the signal into bands and delays each one separately, so repeats can differ by frequency range.
- Its main mixing use is keeping delay out of the low end while the highs get long, wide echoes.
- Short delays on low bands and longer ones on high bands is the classic starting point for leads.
- You can build one without a dedicated plugin using a frequency split, parallel tracks and a delay on each.
- Check the result in mono and with the effect bypassed, because band splitting can shift phase.

## Table of Contents

- [What a multiband delay actually does](#what-a-multiband-delay-actually-does)
- [How it differs from a standard delay](#how-it-differs-from-a-standard-delay)
- [Where multiband delay helps in a mix](#where-multiband-delay-helps-in-a-mix)
- [Building a multiband delay without a dedicated plugin](#building-a-multiband-delay-without-a-dedicated-plugin)
- [Settings to start with](#settings-to-start-with)
- [Keeping it clean: phase, group delay and level](#keeping-it-clean-phase-group-delay-and-level)
- [Choosing a multiband delay tool](#choosing-a-multiband-delay-tool)
- [One way to do it in a single plugin](#one-way-to-do-it-in-a-single-plugin)
- [Our perspective](#our-perspective)
- [FAQ](#faq)
- [Sources](#sources)

## What a multiband delay actually does

A normal delay copies the whole signal and plays it back later. A multiband delay first divides the incoming audio into frequency regions, then runs a separate delay on each region. Craig Anderton describes the general idea of [multiband processing](https://craiganderton.org/multiband-signal-processing/) as splitting a signal into frequency regions and processing each one independently, and notes that software makes this far more practical than it was in hardware.

The idea is older than most plugins. Stanford's CCRMA documents a [multiband delay-line filter](https://ccrma.stanford.edu/~jos/smithbook/Multiband_Delay_Filter_Design.html) for reverberation, where each delay-line output is split into at least three bands and each band's gain is set to get the decay time you want. Reverb designers wanted lows and highs to die away at different rates. Multiband delay applies the same thinking to echoes you can hear as discrete repeats.

The controls that matter are simple:

- **Crossover frequencies:** where one band ends and the next begins.
- **Delay time per band:** often in milliseconds or tempo-synced note values.
- **Level per band:** how loud each band's repeats are.
- **Pan per band:** lets each frequency range sit in a different place in the stereo field.
- **Feedback per band:** how many repeats each band produces, where the design allows it.

## How it differs from a standard delay

With a standard delay, every frequency gets the same time and the same feedback. If you filter the repeats, you can darken them, but the lows and highs still arrive together. A multiband delay changes the timing relationship between bands, not just the tone.

Hardware showed this early. The 480L's multiband program has [six band-pass-tunable voices](https://adn.harmanpro.com/product_documents/documents/1072_1340211830/480L_ClassicCart_Rev0_User_original.pdf), each with level, delay and pan controls, with separate feedback paths on voices 1 and 4. That is a good picture of the architecture: several small delays, each fed by a different slice of the spectrum.

Two practical differences follow.

1. **You can solve problems a filter cannot.** A high-pass filter on the repeats removes lows from the echo. A multiband delay can keep the lows but make them tight and rhythmically different from the highs.
2. **You can create movement.** Different times per band make the echo seem to roll or cascade across the spectrum, which is why sound designers like it on pads, plucks and percussion.

If your main goal is only to keep the low end clean, our post on [frequency-specific delay](https://vector-dsp.com/blog/frequency-specific-delay/) covers the simpler approach of keeping repeats out of the lows.

## Where multiband delay helps in a mix

Sweetwater's Craig Anderton makes the case that multiband delay is [useful when delaying the full spectrum would add mud](https://www.sweetwater.com/insync/multiband-processing-technique-effects/), and that different delay lengths by frequency can fit a track better than single-band processing. Here are the situations where we reach for it.

### Lead vocals and lead synths

Anderton suggests [short delays on the lower bands and long, languid echoes on the high bands](https://craiganderton.org/multiband-signal-processing/) for leads. One example is eighth-note delays on the lowest bands and quarter- or half-note delays higher up. The body of the voice stays focused while the air and sibilance trail off into space.

Start there and adjust by ear: set two or three bands, give the top band the longest time, and keep its level well under the dry signal.

### Delaying only the top

Another approach from the same source is delaying only the upper mids and highs. The low end and low mids stay dry, so the fundamental and weight of the part are never smeared. This works well on guitars, electric pianos and anything with a strong low fundamental.

### Reversing the relationship

Anderton also describes the opposite: longer delays on low bands and shorter on high. It sounds unusual, and that is the point. On a sparse bass-and-drums section, a longer low-band echo can create a pulsing, dub-like tail without cluttering the top. Use it sparingly and check it against the kick and bass.

### Percussion and sound design

On hats and shakers, a very short delay on the highs and a slightly longer one on the mids can widen a loop without changing its groove. For sound design, push the band times far apart, add feedback on one band only, and automate the crossover points for rolling textures.

## Building a multiband delay without a dedicated plugin

Not every DAW has a multiband delay, and you do not need one. The method is the same one you would use for any frequency-specific effect:

1. Duplicate the source track or route it to as many parallel tracks as you want bands.
2. On each parallel track, filter to one range. Use a low-pass on the low band, a band-pass on the middle, and a high-pass on the top.
3. Insert a delay on each, with its own time and feedback.
4. Balance the delayed bands against the dry track.

In practice you will do the last step on sends. MusicRadar notes that using delay on a [send/return](https://www.musicradar.com/music-tech/software-apps/how-to-use-delay-lengthening-vocals-and-melody-lines-and-blotting-out-mistakes-delay-will-fill-out-your-track-making-it-fuller-and-more-professional) keeps a separate delayed signal that you can level, filter and EQ independently, while the dry signal stays at full volume. If the idea of sends and returns still feels fuzzy, a refresher on [audio signal flow basics](https://blog.stagehandprotools.com/posts/understanding-signal-flow-audio-basics-for-stagehands) will help you picture where each signal goes.

Send position matters too. Whether the send taps before or after the fader changes how the echo behaves when you ride the level, and we walk through how to test it in our post on [pre-fader vs. post-fader sends](https://vector-dsp.com/blog/pre-fader-vs-post-fader/).

The weak point of the manual approach is the split itself. If you filter parallel copies of the same signal carelessly, the bands can interact and the sum may not match the original. Our guide to a [DAW-agnostic frequency split](https://vector-dsp.com/blog/split-frequencies-in-daw/) explains how to keep the bands phase-coherent and check the sum.

## Settings to start with

These are starting points, not rules. Tempo, arrangement and the source decide the final values.

| Band | Typical role | Starting delay idea | Level idea |
|---|---|---|---|
| Low | Keep the foundation clear | Short, or no delay at all | Low, or off |
| Mid | Add rhythm and width | Eighth note or a dotted value | Moderate |
| High | Create space and shimmer | Quarter or half note | Moderate to high, but below the dry signal |

A few guidelines that save time:

- **Crossover placement:** put the first split near where the mix starts to feel crowded, often in the low mids, and the second where vocal presence begins. Set them by ear while soloing the wet signal alone.
- **Feedback:** keep it lowest in the low band. Repeats there add up fastest and build energy you will fight later.
- **Pan:** with three bands, try the mids slightly off-center and the highs wider. Leave the low band centered so the low end stays mono-compatible.
- **Sync:** locking times to tempo keeps echoes in the groove. For wider, less obvious effects, nudge one band off the grid.

## Keeping it clean: phase, group delay and level

### Phase and group delay

Every filter that separates bands changes timing slightly, depending on frequency. Stanford's CCRMA defines [group delay](https://ccrma.stanford.edu/~jos/filters/Group_Delay.html) as the time delay experienced by a narrow-band group of sinusoidal components. In plain terms, a crossover can shift some frequencies later than others, even a minimum-phase one. That is separate from the delay you dial in, but it adds to it, and it can soften transients or cause comb filtering when bands recombine.

Two habits help. Flip to mono and listen for hollowness, and bypass the effect to compare against the dry sound at matched level. If the dry signal is part of the output, an uneven band delay can interact with it, so listen to the combination, not only the wet bands.

### Echoes that fight the mix

Even a well-split delay can clutter a vocal, because the echoes arrive while the singer is still singing. Ducking the delay level while the dry signal is active fixes this, and our post on [ducking delay](https://vector-dsp.com/blog/ducking-delay/) shows how to set it up in any DAW. The same logic applies to reverb, where [sidechain EQ ducking](https://vector-dsp.com/blog/reverb-ducking/) keeps depth without dulling the source.

If you hear pumping when you add dynamics to a ducked effect return, look at the compressor or ducker's attack, release and threshold. Pumping is a dynamics behavior, so that is where to fix it.

### Level matching

A multiband delay often sounds better simply because it is louder. Match levels before judging, and check the effect on and off at the same perceived loudness.

## Choosing a multiband delay tool

We will not rank products here, but you can sort tools by type:

- **Dedicated multiband delays:** many fixed bands, each with delay, level and pan. Strong for sound design, sometimes with modulation.
- **DAW-native effects:** some hosts include a multiband delay. Convenient, but the bands and controls are fixed.
- **Modular or build-your-own environments:** maximum freedom, more setup time.
- **Lane-based multiband processors:** you pick which frequency range each effect hears and stack effects in parallel.

Questions to ask before you commit:

- How many bands do you need? Three covers most mixing work, and more suit sound design.
- Does it offer tempo sync and per-band feedback?
- Can you set crossover slopes, or are they fixed?
- Does it run in your DAW on your operating system, and is there a demo you can try on your own material?
- Is the pricing a one-time purchase or a subscription?

Because band splitting is the part that can degrade audio, test any tool with a mono check and a null test against the unprocessed signal.

## One way to do it in a single plugin

If you would rather not build parallel tracks by hand, ToneLab is one option. It is a multi-lane parallel effects processor with per-lane EQ targeting, so a delay in one lane can hear only the frequency range you assign it, all inside a single insert. It is a one-time purchase at [$73.99](https://vector-dsp.com/pricing), and a free demo is available so you can test it on your own sessions. The principle behind that approach is in our post on [frequency-selective effects with proportional Q](https://vector-dsp.com/blog/frequency-selective-effects/).

## Our perspective

We are a small design studio, and we keep coming back to one idea: effects should act where you need them and nowhere else. Most delay problems in a mix are not about the delay at all. They are about a delay hitting frequencies that never needed it, usually the low mids where everything already competes.

![Our perspective — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792876121252_Our-perspective-overview-diagram.jpeg)

A multiband delay is one expression of that idea, but we think the technique matters more than the tool. Once you can hear which band is causing the clutter, you can fix it with a dedicated plugin, with a send and a filter, or with a lane-based processor. The trap we see most often is overdoing it: five bands with five different times sounds impressive in solo and falls apart in context. Start with two or three bands, make one change at a time, and always compare with the effect bypassed at matched level.

The other thing we would say is to respect timing. Band splits introduce their own group delay, and you should hear that, not assume it away. A mono check costs ten seconds and catches most of the damage.

> *— Kai*

## FAQ

### What is a multiband delay used for?

It is used to give different frequency ranges different echo times, so you can keep low frequencies tight while highs get longer, wider repeats. Producers use it on leads, vocals, guitars and percussion to avoid low-end mud. Sound designers also use it for rolling, cascading textures.

### Is a multiband delay the same as a multiband compressor?

No. Both split the signal into bands, but a compressor changes the dynamics of each band, while a delay changes the timing of each band. Any pumping you hear comes from the dynamics processing, not the band split.

### How many bands do I need?

Two or three bands cover most mixing situations: lows, mids and highs. More bands give finer control for sound design, but they are easier to overdo and harder to keep phase-coherent. Start small and add bands only when a specific problem calls for it.

### Can I make a multiband delay in a DAW without a special plugin?

Yes. Route the source to parallel tracks or sends, filter each to a frequency range, and put a separate delay on each. Check the recombined sound in mono and against the dry signal, since the filters can shift phase.

## Sources

- [Multiband Signal Processing, Craig Anderton](https://craiganderton.org/multiband-signal-processing/)
- [Multiband Processing: The Next Big Thing in Effects? (Sweetwater)](https://www.sweetwater.com/insync/multiband-processing-technique-effects/)
- [Multiband Delay-Filter Design (Stanford CCRMA)](https://ccrma.stanford.edu/~jos/smithbook/Multiband_Delay_Filter_Design.html)
- [Group Delay (Stanford CCRMA)](https://ccrma.stanford.edu/~jos/filters/Group_Delay.html)
- [480L Classic Cart Programs user guide](https://adn.harmanpro.com/product_documents/documents/1072_1340211830/480L_ClassicCart_Rev0_User_original.pdf)
- [How to use delay (MusicRadar)](https://www.musicradar.com/music-tech/software-apps/how-to-use-delay-lengthening-vocals-and-melody-lines-and-blotting-out-mistakes-delay-will-fill-out-your-track-making-it-fuller-and-more-professional)

## Recommended

- [Frequency Specific Delay: Keep Repeats Out of the Low End](https://vector-dsp.com/blog/frequency-specific-delay/)
- [Ducking Delay: What It Is and How to Set It Up in Any DAW](https://vector-dsp.com/blog/ducking-delay/)
- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression/)
- [Parallel Effects Routing for Producers: 5 Step DAW Setup, Per Lane Tips](https://vector-dsp.com/blog/parallel-effects-routing/)
