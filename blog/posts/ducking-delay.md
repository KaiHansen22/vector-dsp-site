---
title: "Ducking Delay: What It Is and How to Set It Up in Any DAW"
description: ""
date: 2026-10-18
---

# Ducking Delay: What It Is and How to Set It Up in Any DAW

![Producer setting up vocal ducking delay](https://media.babylovegrowth.ai/blog-images/organization-30746/1792168787805_Producer-setting-up-vocal-ducking-delay.jpeg)

A ducking delay is a delay whose repeats get quieter while the dry source is playing and rise into the gaps once the phrase ends. You get the sense of space without the echoes smearing the words. You can build one in any DAW with a return track, a compressor on that return, and a sidechain feed from the dry vocal or instrument.

This guide covers what the effect does, the exact routing, starting settings worth trying, the mistakes that make it sound wrong, and the point where automatic ducking stops being the best tool.

## TL;DR

- A ducking delay turns the echoes down while the source is present and lets them swell afterward, so vocals stay clear and the space still shows up.
- Routing is the whole trick: the delay sits on a return at 100% wet, a compressor goes after it, and the dry track feeds that compressor's sidechain.
- A documented starting point is a 2:1 ratio, about 150 ms release and 8 to 10 dB of reduction while the singer is singing. Treat it as a starting point and finish by ear.
- On busy or fast vocals, automating the send or copying only selected words to the delay can beat automatic ducking.
- Full-band ducking can make the delay vanish. Frequency-targeted processing keeps it audible.

## Table of Contents

- [What a ducking delay actually does](#what-a-ducking-delay-actually-does)
- [Build a ducking delay in any DAW](#build-a-ducking-delay-in-any-daw)
- [Starting settings for a vocal](#starting-settings-for-a-vocal)
- [Mistakes that make it sound wrong](#mistakes-that-make-it-sound-wrong)
- [When automation beats automatic ducking](#when-automation-beats-automatic-ducking)
- [The full-band problem and a frequency-aware fix](#the-full-band-problem-and-a-frequency-aware-fix)
- [Our perspective: duck the right frequencies, not the whole effect](#our-perspective-duck-the-right-frequencies-not-the-whole-effect)
- [Ducking reverb, and other places the same trick works](#ducking-reverb-and-other-places-the-same-trick-works)
- [Pedal, plugin or DAW return: which route fits](#pedal-plugin-or-daw-return-which-route-fits)
- [Where ToneLab fits](#where-tonelab-fits)
- [FAQ](#faq)
- [Sources](#sources)

## What a ducking delay actually does

A normal delay repeats everything you feed it at a fixed level. On a lead vocal, that means the tail of one word lands on top of the next. [Sound On Sound's mix review column](https://www.soundonsound.com/people/mix-review-0518) points out that an obvious echo can hide the intelligibility of a word because recirculating phonemes of earlier words pile up, especially when lyrics are delivered quickly.

A ducking delay solves that by putting a dynamics processor on the repeats only. [Fender describes the result](https://www.fender.com/tone/tips/delay/ducking-delay) as an echo that sits softly behind the main note and swells when playing stops. [LANDR's explainer](https://blog.landr.com/what-is-ducking/) frames it the same way: a dynamics processor working on the delay repeats only, not on the source.

It is not a separate kind of echo. The delay itself can be tape-style, digital, ping-pong or anything else. "Ducking" describes what happens to its level.

Why it works: the dry signal stays focused and upfront, while the delay supplies feel in the gaps. Matt Houghton makes this point in [Sound On Sound's side-chaining feature](https://www.soundonsound.com/techniques/side-chaining), and it is the reason this move shows up on pop, rock, hip-hop and worship vocals alike.

![What a ducking delay actually does — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792168885586_What-a-ducking-delay-actually-does-overview-diagram.jpeg)

## Build a ducking delay in any DAW

The steps below work in Logic, Ableton Live, Cubase, Pro Tools, Reaper, Studio One and FL Studio. Menu names differ, but the signal flow is identical. [LANDR](https://blog.landr.com/what-is-ducking/) and [Sound On Sound](https://www.soundonsound.com/techniques/side-chaining) both describe this same FX-channel arrangement.

1. **Create a return (aux) track** and insert a delay on it.
2. **Set the delay to 100% wet.** The return should carry only repeats, because the dry vocal is already on its own track.
3. **Insert a compressor after the delay** on that same return.
4. **Send the dry vocal to the delay return.** This is your normal send.
5. **Route the dry vocal to the compressor's sidechain input.** Many DAWs let you pick the vocal track as the sidechain source in the compressor's own menu. Others need a second send aimed at the sidechain bus.
6. **Lower the threshold** until the compressor clamps down while the vocal plays, then adjust ratio, attack and release until the repeats duck during the phrase and recover afterward.

In the Cubase example on Sound On Sound, [the second send is routed to the delay's side-chain input](https://www.soundonsound.com/techniques/cubase-vocal-delay-treatments) to create the ducked effect. Some delay plugins have ducking built in, so check before you build the chain by hand.

### Get the order right

The most common setup error is putting the compressor in the wrong place. The compressor must process the wet delay return, while the dry vocal feeds its detector. [LANDR's explainer](https://blog.landr.com/what-is-ducking/) notes that if the compressor sits before the delay, it mostly changes the source dynamics rather than ducking the repeats.

![Correct and incorrect ducking delay routing](https://media.babylovegrowth.ai/blog-images/organization-30746/1792168842534_Correct-and-incorrect-ducking-delay-routing.jpeg)

A quick check: solo the return and play the song. If the repeats dip every time the vocal sings, the routing is right. If you hear nothing change, the sidechain is not receiving the vocal.

### Give each source its own return

Sound On Sound warns that a return dedicated to one source works better than a global return shared by several instruments. If a guitar and a vocal share one ducked return, the compressor reacts to whichever the detector hears, and the other source gets pumped delay it never asked for. Make one return per ducked source. If you are not sure how your DAW handles sends and returns, our guide to [parallel effects routing in any DAW](https://vector-dsp.com/blog/parallel-effects-routing/) walks through the basics.

## Starting settings for a vocal

There are no universal numbers, but you need somewhere to begin. A [Sound On Sound Logic tutorial](https://www.soundonsound.com/techniques/logic-dynamics-processing-reverbdelay) shows how to emulate a classic hardware ducking-delay effect, and its settings are a sensible first try for a vocal.

| Control | Starting point | What it does |
|---|---|---|
| Ratio | 2:1 | Gentle, so repeats dip rather than disappear |
| Attack | Zero or the plugin default | Lets the compressor react as the vocal starts |
| Release | About 150 ms | Sets how fast the delay returns after a phrase |
| Threshold | Adjust for 8 to 10 dB of reduction | The example reached that amount while the vocalist sang |

Those figures come from one tutorial's example. Adjust for the source level, tempo, delay time and how transparent you want the effect to be.

### Release is the musical control

Release decides whether the effect feels natural. Too short, and the delay pumps audibly or reappears between syllables. Too long, and the repeats arrive late or stay hidden. Start near 150 ms, then listen to the end of a phrase and adjust until the first echo blooms right where the vocalist breathes. A slower song with long phrases usually wants a longer release. A fast, dense verse wants less.

### Match delay time to tempo

The compressor timing and the delay time interact. A quarter-note delay at 90 BPM places the first repeat about 667 ms after the word, which gives the compressor plenty of time to recover. An eighth-note delay at the same tempo lands at about 333 ms, so a long release can bury it. Set the delay to a tempo-synced value first, then tune the release.

## Mistakes that make it sound wrong

- **The delay never comes back.** The threshold is too low or the release too long, so the compressor holds down the repeats even in the gaps.
- **You hear pumping.** Release is too short or ratio too high. Back off the ratio before anything else.
- **The effect reacts to breaths and bleed.** The detector hears everything on the sidechain feed. Clean the source with a gate, or use the post-edit vocal as the trigger. Our walkthrough on [frequency-dependent gating](https://vector-dsp.com/blog/frequency-dependent-gating/) covers one way to keep a detector from reacting to noise.
- **Sends sit post-fader when you wanted pre-fader.** If you ride the vocal fader, the delay level moves with it. Our piece on [pre-fader versus post-fader sends](https://vector-dsp.com/blog/pre-fader-vs-post-fader/) shows how to test which one you have.
- **You can't hear the delay at all in the full mix.** The effect is working, but the ducking depth is too deep. Aim for a dip, not a mute.

## When automation beats automatic ducking

Automatic ducking is not always the most transparent option. For a busy or fast vocal, experienced mixers often automate the send or copy only selected words to a delay track. That gives phrase-level control and avoids the detector reacting to breaths, consonants, bleed or unrelated material, as described in [Sound On Sound's Cubase vocal delay article](https://www.soundonsound.com/techniques/cubase-vocal-delay-treatments).

Mike Senior adds in the [side-chaining feature](https://www.soundonsound.com/techniques/side-chaining) that selective automation or copying only final words can be more controllable than automatic ducking when the production demands precise throws.

A practical rule:

- **Use ducking** when phrases are regular, the vocal is clean, and you want a hands-off result that follows the performance.
- **Use automation or copied words** when you want a specific echo on a specific word, like the last line of a chorus.
- **Combine them** by ducking the whole track gently and riding the send for the moments that matter.

## The full-band problem and a frequency-aware fix

Traditional ducking has a limitation. It turns down the entire delay, even when only certain frequencies actually conflict with the dry signal. John Walden raised this point in a [2025 Sound On Sound review](https://www.soundonsound.com/reviews/izotope-cascadia), noting that frequency-aware processing can keep the delay present while dynamically clearing only the bands the dry signal occupies.

You can approximate that idea without special tools. Filter the delay return so the low end and the harshest upper mids are out of the way before the compressor, or use a dynamic EQ on the return and trigger it from the vocal. A vocal usually concentrates its energy in a range that the repeats can easily crowd, so carving that area in the delay while leaving the highs open often keeps the echo audible with less ducking. We cover a related approach for reverb in [frequency-selective reverb for vocals](https://vector-dsp.com/blog/frequency-selective-reverb) and the general idea in [frequency-selective effects with proportional Q](https://vector-dsp.com/blog/frequency-selective-effects/).

## Our perspective: duck the right frequencies, not the whole effect

We build audio plugins around one conviction: an effect should act where the problem is and leave the rest alone. Ducking a delay by 8 to 10 dB across the whole spectrum is a blunt tool for a problem that usually lives in a few bands. The vocal's body and presence collide with the repeats. The air above them and the weight below them rarely do.

That is why we think in lanes. In ToneLab, a single insert splits effects into parallel lanes, and each lane has its own EQ targeting, so an effect can be aimed at the part of the spectrum where you want it. For delay and reverb work, that means you decide which frequency range of the effect is heard, instead of squashing the entire tail every time the singer opens their mouth. Our own tools are built in C++ with JUCE, with real-time, low-latency processing as a design constraint, because anything that sits on a vocal chain has to behave while you are tracking and mixing.

And we also say this plainly: no tool replaces listening. If a ducked return pumps, fix the release before you touch anything else. If a phrase needs one big echo throw, automate it. The best ducking delay is the one you stop noticing until the track would feel dry without it.

> *— Kai*

## Ducking reverb, and other places the same trick works

Ducking reverb uses the identical principle: compress the reverb return from the dry source, so the reverb blooms after the phrase rather than masking its attack. [Sound On Sound's side-chaining feature](https://www.soundonsound.com/techniques/side-chaining) lists other classic uses too: vocals against delay, dialogue against music, and kick against bass. Sidechain compression can also be used creatively for groove and pumping. It is not limited to corrective mixing.

The [Splice delay primer](https://splice.com/blog/effects-101-delays-explained/) describes the delay duck as a way to automate a delay's level so it is heard after a vocal phrase ends, which is the same idea in one sentence. For reverb specifically, [Music Guy Mixing's sidechain reverb article](https://www.musicguymixing.com/sidechain-reverb/) goes through typical setups.

## Pedal, plugin or DAW return: which route fits

There is no best delay for every producer. Choose by the job:

- **A hardware pedal with a ducking mode** suits live playing, where you want one box and no computer. Many multi-effect delay pedals include a ducking type.
- **A DAW return plus a compressor** gives the most routing control and costs nothing extra. It is the right default for mixing.
- **A frequency-aware plugin** is the better pick when full-band ducking makes the delay disappear and you want it to stay audible.

Playing live on a church stage, or running a worship band where volunteers handle the gear? Getting the basics right, like [tuning silently onstage](https://blog.song7.io/blog/worship-band-tuner), matters before any delay trick, and a simple hardware ducking mode is easier to manage there than a laptop chain.

## Where ToneLab fits

If you want to aim effects at specific frequency ranges rather than the whole signal, ToneLab is our multi-lane parallel effects plugin with per-lane EQ targeting. It runs as VST3, AU and AAX on Windows and macOS, and it costs [$73.99 as a one-time license](https://vector-dsp.com/pricing), with minor version updates included. A free demo is available, so you can try it on your own vocal chain before buying. You can read more on the [ToneLab product page](https://vector-dsp.com/).

## FAQ

### Is a ducking delay the same as sidechaining a delay?

In practice, yes. A ducking delay is a delay whose repeats are turned down by a compressor that is triggered by the dry source. Some plugins and pedals build this in as a "ducking" mode. In a DAW you set up the same behavior with a sidechain.

### Should I use ducking on every vocal?

No. Ducking helps when the effect should stay audible but yield foreground space, such as vocals against delay. On a sparse arrangement or a slow ballad, a plain delay may sound better. On a fast, busy vocal, automating the send or copying selected words often gives more control.

### What is a ducking reverb?

It is the same idea applied to reverb. You compress the reverb return from the dry source, so the reverb stays low while the vocal is singing and blooms afterward. The reverb no longer masks the attack of the words.

### What settings should I start with?

Try a 2:1 ratio, the default or zero attack, and roughly 150 ms release. Set the threshold for about 8 to 10 dB of gain reduction while the vocal is singing, as in [a Sound On Sound Logic tutorial](https://www.soundonsound.com/techniques/logic-dynamics-processing-reverbdelay). Then adjust by ear to the song's tempo and phrasing.

### Why can't I hear my delay after ducking?

Usually the threshold is too low, the ratio too high or the release too long, so the compressor keeps the repeats down even in the gaps. Check that the compressor sits after the delay on the return, then raise the threshold and shorten the release.

## Sources

- [Fender: Ducking Delay](https://www.fender.com/tone/tips/delay/ducking-delay)
- [LANDR: What is Ducking in Music Production?](https://blog.landr.com/what-is-ducking/)
- [Sound On Sound: Side-chaining](https://www.soundonsound.com/techniques/side-chaining)
- [Sound On Sound: Logic Dynamics Processing With Reverb/Delay](https://www.soundonsound.com/techniques/logic-dynamics-processing-reverbdelay)
- [Sound On Sound: Cubase Vocal Delay Treatments](https://www.soundonsound.com/techniques/cubase-vocal-delay-treatments)
- [Sound On Sound: The Mix Review](https://www.soundonsound.com/people/mix-review-0518)
- [Sound On Sound: iZotope Cascadia review](https://www.soundonsound.com/reviews/izotope-cascadia)
- [Splice: Effects 101, Delays Explained](https://splice.com/blog/effects-101-delays-explained/)
- [Music Guy Mixing: How to Use Sidechain Reverb](https://www.musicguymixing.com/sidechain-reverb/)

## Recommended

- [Parallel Effects Routing for Producers: 5 Step DAW Setup, Per Lane Tips](https://vector-dsp.com/blog/parallel-effects-routing)
- [Pre Fader vs. Post Fader: Test Sends in Any DAW or Console](https://vector-dsp.com/blog/pre-fader-vs-post-fader)
- [Frequency Dependent Gating: 5 Setup Steps for Mixes](https://vector-dsp.com/blog/frequency-dependent-gating)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw)
