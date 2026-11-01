---
title: "Multiband Sidechain Compression: Set It Up and Use It"
description: ""
date: 2026-11-01
---

# Multiband Sidechain Compression: Set It Up and Use It

![Producer setting up multiband sidechain compression](https://media.babylovegrowth.ai/blog-images/organization-30746/1793364000331_Producer-setting-up-multiband-sidechain-compression.jpeg)

Multiband sidechain compression lets one signal, usually a kick, turn down only a chosen frequency range of another signal, usually a bass. The rest of the bass stays untouched. You get the low-end room a normal sidechain gives you, without the whole bass dipping every time the drum hits. Below we cover how it works, how to set it up in a DAW, which settings to start with, and how to keep it from sounding like a mistake.

## TL;DR

- Multiband sidechain compression ducks one frequency band of a track when a second track triggers the detector, so the other bands keep playing at full level.
- For kick and bass, a published example ducks the bass between 20 and 132 Hz with the kick as the external trigger, using a fast attack and quick release ([The Pro Audio Files](https://theproaudiofiles.com/video/how-to-mix-bass-and-kick-with-multiband-sidechain-compression/)).
- Filtering the sidechain input changes what the compressor reacts to, not the tone of the track you hear.
- Audible pumping comes from the dynamics settings (threshold, ratio, attack, release), so fix it there before touching anything else.
- When the clash is narrow, a dynamic EQ or a frequency-specific approach can be more transparent than a wide band.

## Table of Contents

- [What multiband and sidechain compression each do](#what-multiband-and-sidechain-compression-each-do)
- [Setting it up in your DAW](#setting-it-up-in-your-daw)
- [A worked example: kick and bass](#a-worked-example-kick-and-bass)
- [Shaping the detector with sidechain filtering](#shaping-the-detector-with-sidechain-filtering)
- [Avoiding pumping and unnatural movement](#avoiding-pumping-and-unnatural-movement)
- [Multiband sidechain vs. dynamic EQ](#multiband-sidechain-vs-dynamic-eq)
- [Perspective](#perspective)
- [One way to build the parallel side](#one-way-to-build-the-parallel-side)
- [FAQ](#faq)
- [Sources](#sources)

## What multiband and sidechain compression each do

A multiband compressor splits the signal with crossover filters into two or more frequency bands, compresses each band on its own, then sums the bands back together. Because the bands are independent, a loud event in one band need not trigger gain reduction in the others ([Sound On Sound](https://www.soundonsound.com/techniques/multi-band-compression-tips)). That is the whole appeal: you control a frequency-specific problem without pulling the entire spectrum down.

Sidechain compression changes one thing: what the detector listens to. Normally a compressor measures its own input. With an external sidechain, it measures a different track, and the gain reduction is applied to the track the compressor sits on. The classic case is a kick triggering a duck on a bass.

Put the two together and you get a compressor that has separate bands on the audio path and a detector fed by another source. The kick says "now", and only the band you chose gets turned down.

![Multiband audio path with external kick trigger](https://media.babylovegrowth.ai/blog-images/organization-30746/1793364040548_Multiband-audio-path-with-external-kick-trigger.jpeg)

### Why not just sidechain the whole bass?

A full-band duck removes everything in the bass, including the harmonics and upper notes that carry the part's rhythm and melody. On a bass with real midrange content, each kick makes the line vanish for a moment. Kick and bass fight mostly in the lows, so that is the only place you need to make room.

A single-band compressor is still the better choice when you want precise, unified control of a source. Aulart notes that multiband compression is often used for corrective mastering or sound design ([Aulart](https://www.aulart.com/blog/understanding-compression-techniques-sidechain-parallel-and-multiband-compression-using-ableton-live/)). Reach for the multiband version when the problem lives in one range.

## Setting it up in your DAW

Every DAW names things differently, but the chain is always the same. Here is the generic version.

1. **Put a compressor with a sidechain input on the track to be ducked.** For kick and bass, that is the bass track.
2. **Choose the trigger.** Select the kick track as the external source. In Ableton Live, that means selecting the trigger track under Audio From on the compressor on the track you want to duck ([Gear4music](https://www.gear4music.com/blog/how-to-sidechain-in-ableton-live/)).
3. **Turn on the sidechain and set the band.** Ableton's Multiband Dynamics can do multiband sidechaining when its sidechain is enabled, and EQ filters can be applied to the trigger signal ([Gear4music](https://www.gear4music.com/blog/how-to-sidechain-in-ableton-live/)).
4. **Set threshold, ratio, attack and release** so the trigger controls the gain reduction, as Aulart describes for external sidechain compression ([Aulart](https://www.aulart.com/blog/understanding-compression-techniques-sidechain-parallel-and-multiband-compression-using-ableton-live/)).
5. **Solo only the low band's gain reduction** if your plugin lets you, and confirm that the bands above it do not move.

If your compressor has no per-band sidechain, you can still get there with a two-path build: duplicate the bass, split it into a low and a high path, and put an ordinary sidechain compressor on the low path only. The catch is that crossover filters shift phase around the split point, so the two paths need to sum cleanly. We walk through that in [our guide to splitting frequencies in any DAW without phase problems](https://vector-dsp.com/blog/split-frequencies-in-daw/).

### The same idea on other sources

The kick and bass pair is the textbook case, but the routing is general. You can send a vocal to the sidechain of a compressor on a guitar bus and duck only the range where the voice sits, so it pokes through. The same logic applies to ducking reverb tails, which we cover in [our piece on reverb ducking with sidechain EQ](https://vector-dsp.com/blog/reverb-ducking/).

## A worked example: kick and bass

The Pro Audio Files demonstrates the technique with the kick as the external trigger and the bass ducked from 20 to 132 Hz, with fast attack and release times ([The Pro Audio Files](https://theproaudiofiles.com/video/how-to-mix-bass-and-kick-with-multiband-sidechain-compression/)). The same example also sidechains a midrange band to reduce competition with the kick. Use that as a starting map, then adjust by ear for your own kick and bass.

| Setting | Starting point | What you are listening for |
|---|---|---|
| Trigger | Kick, external sidechain | The duck lands exactly on the kick hit |
| Ducked band | Roughly 20 to 132 Hz on the bass | The bass body stays, the low-end clash goes |
| Upper bands | Not sidechained (or lightly, in the mids) | The bass line stays audible between and during kicks |
| Attack | Fast | The bass gets out of the way immediately |
| Release | Quick | The bass can resonate after the kick has passed |
| Ratio and threshold | Set until the gain reduction is a few dB at most, then adjust | The kick feels clearer without a visible hole in the bass |

The fast attack and quick release matter for a reason. As the example puts it, the bass ducks immediately and can resonate once the kick has cleared ([The Pro Audio Files](https://theproaudiofiles.com/video/how-to-mix-bass-and-kick-with-multiband-sidechain-compression/)). A slow release leaves the bass lagging below its natural level after the kick has gone, and that is where the lump or hole appears.

The gain reduction figure is our rule of thumb, not a standard. Start small, bypass often, and push only until the kick reads clearly at your normal listening level.

### Choosing the crossover points

The 20 to 132 Hz range is a sensible first guess, not a law. A kick tuned around 50 Hz and a bass sitting at 40 to 80 Hz need a different top edge than a punchy kick with a click and a bass playing at 100 Hz and above. Two checks help:

- Sweep the crossover while the trigger plays. When the kick's thump emerges and the bass tone does not change character, you are close.
- Move the top edge until the bass note's fundamental stops disappearing on each hit. If the notes sound cut in half, the band is reaching too high.

If the bass is a sampled 808 or a synth with a long glide, the fundamental moves, and a fixed band can catch some notes and miss others. That is a good moment to consider a narrower, more targeted approach (see the dynamic EQ section below).

## Shaping the detector with sidechain filtering

The trigger signal does not have to be the raw kick. Filtering the sidechain input changes what the dynamics processor responds to, without changing the tonality of the signal you hear. Sound On Sound makes the point for high and low cut filters ahead of a sidechain, and recommends key-listen monitoring to tune the filter so it emphasizes wanted triggers and rejects spill ([Sound On Sound](https://www.soundonsound.com/techniques/side-chaining-your-software-studio)).

For kick and bass, filtering the sidechain input to keep only the lows makes the compressor react to the competing low-end frequencies ([Gear4music](https://www.gear4music.com/blog/how-to-sidechain-in-ableton-live/)). That helps when the kick has a loud click or a long tail that would otherwise trip the detector at odd moments.

Keep two things separate in your head:

- **Sidechain EQ** changes what the detector hears. The audio you listen to keeps its tone.
- **EQ in the audio path** changes the actual tone of what is being compressed.

Beginners often reach for the second when they need the first. If you want the compressor to behave differently, filter the detector. If you want the bass to sound different, EQ the bass.

## Avoiding pumping and unnatural movement

Multiband compression changes the relative levels of frequency bands according to their dynamics, and using it well takes experience and a good ear to compensate ([Thomann](https://www.thomannmusic.com/onlineexpert_page_mastering_multi_band_compressors.html)). When the result sounds wrong, the usual suspect is the dynamics processing: threshold too low, ratio too high, or timing that does not match the tempo. Pumping is a dynamics behavior, so fix it with the dynamics controls.

Work through this checklist:

1. **Raise the threshold** until only the loudest kick hits trigger the duck.
2. **Lower the ratio** if the bass sounds like it is being switched on and off. A gentler ratio gives a smoother dip.
3. **Shorten the release** if the bass is still low when the next kick arrives, or lengthen it slightly if you hear a flutter or zipper effect.
4. **Check the attack.** Too slow and the kick's transient is masked before the bass ducks. Too fast on a tonal bass can produce a click.
5. **Listen to the full mix, not solo.** A duck that sounds heavy in solo often disappears under the drums.
6. **Level-match when you bypass.** A louder version always sounds better, so compare at equal level.

The same discipline applies to any other band you add. Each extra band is another detector, another set of timing choices, and another place to over-process.

### Watch the crossover region

Crossover filters split the signal and put the parts back together, which can shift phase near the split point. That is a summing issue, not a pumping issue. If the bass sounds thin or hollow around the crossover frequency even with the compressor bypassed, check the split itself. Our article on [multiband parallel compression with per-band blends](https://vector-dsp.com/blog/multiband-parallel-compression/) covers how to keep the bands honest when you blend them.

## Multiband sidechain vs. dynamic EQ

A dynamic EQ is a band that boosts or cuts only when a level threshold is crossed, and many can take an external sidechain. A multiband compressor works on wider, crossover-defined bands. In practice:

- **Multiband sidechain compression** suits broad, predictable clashes, like the whole low end of a bass under a kick.
- **Dynamic EQ** suits narrow, specific clashes, like one resonant frequency in a guitar bus when a vocal enters.

MusicTech's review of a plugin built for this notes that traditional multiband sidechaining is powerful, while newer tools aim to be more transparent by letting you target specific clashing frequencies rather than broad, rigid bands ([MusicTech](https://musictech.com/reviews/plug-ins/mastering-the-mix-fuser/)). Our view is that both approaches belong in your kit, and the choice follows the shape of the problem: wide band, wide tool; narrow clash, narrow tool.

De-essing is a close relative. A de-esser is a specific form of multiband compression that targets only the frequency range responsible for sibilance in a vocal ([Mastering.com](https://mastering.com/wp-content/uploads/2015/11/6TypesOfCompression.pdf)). The detector is the vocal itself, filtered to the sibilant band, which is the same idea as a filtered sidechain.

Other frequency-specific processors follow the same logic. Gating only the band where noise lives is covered in [our frequency-dependent gating guide](https://vector-dsp.com/blog/frequency-dependent-gating/), and keeping delay repeats out of the low end is in [our frequency-specific delay piece](https://vector-dsp.com/blog/frequency-specific-delay/).

## Perspective

> We design effects around one question: which part of the spectrum actually has the problem? Most mix moves are frequency-specific by nature. A kick clashes with a bass below a couple hundred hertz, a reverb muddies the low mids, a delay builds up in the lows. Treating the whole signal for a problem that lives in one band is the habit we try to design out.
>
> That is why we think in lanes and bands rather than whole-signal processors: each range gets its own treatment, and the ranges that are fine are left alone. Multiband sidechain compression is a good example of the principle. The technique is old and it works, but it asks you to build and balance several moving parts, and every one of them adds a place to lose phase coherence or introduce timing artifacts.
>
> Our approach to real-time DSP is to keep latency low and behavior predictable, so a frequency-specific idea can be tried in seconds rather than rebuilt with duplicate tracks and routing. When the tool gets out of the way, you spend your attention on what you hear, which is the only thing that decides whether a duck is right.
>
> *Kai*

## One way to build the parallel side

Sidechain ducking is only half of a frequency-specific mix. The other half is deciding how much of each band you blend back in. If you want to do the band-split, parallel part inside one insert, [ToneLab](https://vector-dsp.com/pricing/) is one way: it runs multiple parallel effect lanes, each with its own EQ targeting, and it is a one-time $73.99 license with a free demo.

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

You can try the idea on your own bass and drums first with the demo, then decide whether the workflow fits your sessions.

## FAQ

### Can you sidechain just one band of a multiband compressor?

Yes, if the plugin offers per-band sidechain or an external key input with band selection. Ableton's Multiband Dynamics, for example, can do it with its sidechain enabled ([Gear4music](https://www.gear4music.com/blog/how-to-sidechain-in-ableton-live/)). If your compressor cannot, split the track into low and high paths and put a normal sidechain compressor only on the low path.

### What does multiband compression do?

It splits a signal into frequency bands with crossover filters, compresses each band independently, and recombines them ([Sound On Sound](https://www.soundonsound.com/techniques/multi-band-compression-tips)). That way a loud event in one range does not pull down the others.

### Which bass frequencies should I duck under the kick?

A published example ducks the bass from 20 to 132 Hz with the kick as the trigger ([The Pro Audio Files](https://theproaudiofiles.com/video/how-to-mix-bass-and-kick-with-multiband-sidechain-compression/)). Treat that as a starting point and adjust the top edge to your kick and the notes your bass plays.

### Can you sidechain an EQ?

Yes, in the form of a dynamic EQ with an external sidechain input, where the band cuts only when the trigger signal crosses the threshold. It is a good fit for narrow clashes, while multiband sidechain compression handles wider ranges.

## Sources

- [Multi-band Compression, Sound On Sound](https://www.soundonsound.com/techniques/multi-band-compression-tips)
- [Side-chaining In Your Software Studio, Sound On Sound](https://www.soundonsound.com/techniques/side-chaining-your-software-studio)
- [How to Mix Bass and Kick with Multiband Sidechain Compression, The Pro Audio Files](https://theproaudiofiles.com/video/how-to-mix-bass-and-kick-with-multiband-sidechain-compression/)
- [How to Sidechain in Ableton Live, Gear4music](https://www.gear4music.com/blog/how-to-sidechain-in-ableton-live/)
- [Compression Techniques: Parallel, Sidechain and Multiband, Aulart](https://www.aulart.com/blog/understanding-compression-techniques-sidechain-parallel-and-multiband-compression-using-ableton-live/)
- [Multi band compressors, Thomann](https://www.thomannmusic.com/onlineexpert_page_mastering_multi_band_compressors.html)
- [Mastering The Mix's Fuser review, MusicTech](https://musictech.com/reviews/plug-ins/mastering-the-mix-fuser/)
- [6 Types of Compression, Mastering.com](https://mastering.com/wp-content/uploads/2015/11/6TypesOfCompression.pdf)

## Recommended

- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression/)
- [New York Compression: How to Set It Up and Blend It](https://vector-dsp.com/blog/new-york-compression/)
- [AU Sidechain Routing: How It Works and How to Set It Up](https://vector-dsp.com/blog/au-sidechain-routing/)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw/)
