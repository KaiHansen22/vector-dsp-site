---
title: "New York Compression: How to Set It Up and Blend It"
description: ""
date: 2026-10-20
---

# New York Compression: How to Set It Up and Blend It

![Engineer balancing a drum compression return](https://media.babylovegrowth.ai/blog-images/organization-30746/1792326717443_Engineer-balancing-a-drum-compression-return.jpeg)

New York compression is another name for parallel compression. You copy a signal, compress one copy hard, and blend it with the dry or lightly compressed copy. [The compressed path raises softer material and adds density, while the dry path keeps transients and natural dynamics](https://www.musicradar.com/how-to/parallel-compression). You get the weight of a squashed drum bus without flattening the hits. This guide covers the settings that work, the mistakes that ruin it, and how to apply it to drums, bass and vocals.

## TL;DR

- New York compression means parallel compression: one heavily compressed path blended under an uncompressed one.
- For drums, start with a high ratio, a fast attack and roughly 10 to 20 dB of gain reduction on the compressed return, then [blend it just under the dry drums](https://fohonline.com/articles/theory-and-practice/parallel-compression-aka-nyct/).
- Check latency and polarity between the two paths before you judge the sound. A mismatch causes comb filtering and a loss of punch.
- Judge the character of the return in solo, but make the final blend decision in the full mix at matched loudness.

## Table of Contents

- [What New York compression actually does](#what-new-york-compression-actually-does)
- [Setting up New York compression on drums](#setting-up-new-york-compression-on-drums)
- [Filter the return before you touch the ratio](#filter-the-return-before-you-touch-the-ratio)
- [Phase and latency: the check that saves your punch](#phase-and-latency-the-check-that-saves-your-punch)
- [Beyond drums: bass, vocals and the mix bus](#beyond-drums-bass-vocals-and-the-mix-bus)
- [Judge the blend honestly](#judge-the-blend-honestly)
- [Our perspective](#our-perspective)
- [Building parallel chains in a single insert](#building-parallel-chains-in-a-single-insert)
- [Try it in your own sessions](#try-it-in-your-own-sessions)
- [Common mistakes to avoid](#common-mistakes-to-avoid)
- [FAQ](#faq)
- [Sources](#sources)

## What New York compression actually does

A normal compressor sits as an insert: every bit of the signal passes through it. Parallel compression uses the compressor as a send effect instead, so [the dry and compressed signals run side by side](https://www.soundonsound.com/sound-advice/q-what-does-parallel-compression-mean). [Wikipedia describes it as a form of upward compression](https://en.wikipedia.org/wiki/Parallel_compression), because blending in a squashed copy lifts the quiet parts without pulling the peaks down.

That is the point people miss. The goal is not simply more compression. The dry path preserves the attack and decay of each hit. The crushed path fills in low-level detail: room sound, ghost notes, the tail of a snare. [Sound On Sound frames the payoff as loud, punchy drums without sacrificing dynamics](https://www.soundonsound.com/techniques/reason-parallel-compression).

The name comes from New York studios, where engineers popularized the approach on drums. Names aside, it is the same technique you will see in tutorials called parallel drum compression, and the rest of this article uses both terms interchangeably.

## Setting up New York compression on drums

Drums are the classic use, and the most searched one. Here is a setup that works in any DAW.

1. **Create a bus or aux.** Send your drum tracks (or the drum bus) to a new stereo aux channel. Use a post-fader send if you want the return to follow your drum faders, or pre-fader if you want to balance it separately.
2. **Insert a compressor on the aux.** Any compressor with fast controls will do. Character matters more than brand: some units grab and distort pleasantly, others stay clean.
3. **Set an aggressive ratio.** Think 10:1 or higher. One widely read tutorial from 2008 suggests [hitting the compressor hard, at least 10 dB of gain reduction](https://www.musicradar.com/how-to/parallel-compression) is a common starting point, and FOH Magazine's guidance lands in the same place: [high ratio, fast attack, about 10 to 20 dB of gain reduction](https://fohonline.com/articles/theory-and-practice/parallel-compression-aka-nyct/).
4. **Pick a release that breathes with the song.** Tune it to the tempo so the compressor recovers before the next hit. [Very short release times can produce distortion or pumping](https://fohonline.com/articles/theory-and-practice/parallel-compression-aka-nyct/). That can be a feature, as long as you chose it.
5. **Blend.** Raise the aux fader slowly until the drums feel bigger, then stop. The FOH starting point is to sit the return just under the uncompressed drums.
6. **Check the bypass.** Mute the aux and unmute it. If the drums only get louder, you have not improved anything. They should get denser, closer and more sustained.

### Starting values at a glance

| Control | Starting point | What to listen for |
|---|---|---|
| Ratio | 10:1 or higher | Peaks squashed, room and tails lifted |
| Attack | Fast | Transient is shaved on the return, preserved on the dry path |
| Release | Matched to tempo | Recovers before the next hit, no obvious pumping unless wanted |
| Gain reduction | Roughly 10 to 20 dB | Heavy but not lifeless |
| Blend | Just under the dry drums | Fuller and denser, not simply louder |

Treat these as a place to begin. Every kit, room and genre moves them.

## Filter the return before you touch the ratio

If your parallel drums pump or sound muddy, the fix is often not a different ratio. [Filtering the detector or the parallel return is frequently more important](https://www.soundonsound.com/techniques/cubase-parallel-bus-compression). A sidechain high-pass filter stops the kick and bass from driving the compressor so hard that everything ducks on every low hit.

Two practical habits help:

- **High-pass the detector.** Roll off the low end of the sidechain so the kick does not dominate the gain reduction.
- **Decide who gets in.** In an "all-in" parallel send, [leaving the drums out lets overheads and cymbals breathe](https://www.soundonsound.com/techniques/cubase-parallel-bus-compression) instead of being smeared by a compressor reacting to the kick. Sometimes you want that smear, but choose it.

It is also worth knowing that [one master parallel bus behaves differently from several separate parallel compressors](https://www.soundonsound.com/techniques/cubase-parallel-bus-compression), because the sources you feed to the shared compressor interact. One bus glues. Separate compressors keep each element independent.

## Phase and latency: the check that saves your punch

Parallel processing has a failure mode that serial compression does not. If the dry and compressed paths are not time-aligned, they combine with a slight delay and produce comb filtering. On drums, the symptom is a hollow, thinner sound that makes you think the technique failed.

[Plugin delay compensation is a genuine failure point on transient-rich material](https://www.soundonsound.com/sound-advice/q-what-does-parallel-compression-mean). Before you judge anything:

- Confirm that your DAW's delay compensation is active.
- Flip the polarity on the aux and listen. Keep the setting that sounds fuller in the low end.
- If the compressor has a built-in mix control, it avoids routing mismatch, but still run a bypass check to confirm there is no level or latency jump.

Lookahead is a common culprit. A compressor with lookahead reports latency, and a DAW that compensates properly will handle it. If you work in Cubase and hear smearing, [our five-step latency checklist for Cubase](https://vector-dsp.com/blog/cubase-plugin-latency-fix/) walks through the usual causes. When you need to monitor while tracking, [a 1 to 2 ms lookahead keeps monitoring responsive](https://vector-dsp.com/blog/lookahead-plugins-when-tracking/).

Why does this matter so much for the people who write the plugins? In a real-time audio engine, [a 128-sample buffer at 44.1 kHz leaves about 2.9 ms per processing cycle](https://ps.ipd.kit.edu/downloads/ka_2015_parallelizing_realtime_audio_application.pdf), and the compressor must finish its work within that window while keeping detector state stable from block to block. Any extra latency the plugin introduces has to be reported correctly, or the parallel paths drift apart.

Mono compatibility is a related risk. If you delay one path to compensate and get it wrong by a few samples, the sum can collapse. [Sample-accurate delay in parallel processing](https://vector-dsp.com/blog/mono-compatibility-parallel-processing/) is worth understanding if you build many parallel chains.

## Beyond drums: bass, vocals and the mix bus

### Bass

Parallel compression on bass gives you a solid low end that stays articulate. Keep the dry path for the note attack and use the squashed path to hold the sustain level steady. The danger is low-frequency buildup, so high-pass the detector and listen in mono.

### Vocals

A parallel vocal return can bring out intimate detail and make a performance feel closer. It also raises everything quiet, which includes things you did not want. [A compressed vocal return can exaggerate breaths, sibilance and consonant noise](https://www.soundonsound.com/techniques/mix-rescue-michaela-betts-alessia-mcdermott-audio). In one published mix, the engineer used a parallel vocal compressor at 14:1 and then added de-essing specifically because the fast compression emphasized noisy consonants. That is a corrective step, not a universal preset. If you want a vocal setting, begin with a lower blend than you would on drums, then de-ess the return.

### Mix bus

Some engineers parallel-compress the whole mix. It is the most delicate version, because any pumping is heard on everything. Use gentle gain reduction and check that your blend does not simply raise perceived loudness. [SonicScoop's guide](https://sonicscoop.com/parallel-compression/) is a good survey of the wider family of parallel techniques, from drums to vocals and bass.

## Judge the blend honestly

Louder sounds better, and parallel compression adds level. Your ears will tell you the blend is great when it is only louder. Two habits correct for this.

First, audition the compressed return in solo to hear its character: is it grabbing, distorting, flattening in the way you want? Then make the final blend decision in the full mix at matched loudness, with the aux bypassed and engaged at the same perceived level. If you cannot hear a difference at equal loudness, leave it out.

Second, remember that this is a mix-positioning tool. [Manny Marroquin has described parallel compression as one option among several](https://www.cras.edu/manny-marroquin-part-2/), alongside trying different compressors, EQs and combinations, when a part is not sitting in the song. If a part is fighting the arrangement or the fader balance is wrong, no blend will fix that. Once your mix is finished, the same discipline applies to how it travels: [audio analysis tools that match tracks to playlists](https://playlistpilotapp.com/how-audio-analysis-matches-playlists-for-musicians) reward a balanced, well-positioned master more than a heavily processed one.

![Judge the blend honestly — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792326801249_Judge-the-blend-honestly-overview-diagram.jpeg)

## Our perspective

We build audio plugins, so we spend a lot of time on the part of parallel processing nobody sees: what happens between the two paths. The idea is simple. The implementation is where things go wrong. Dry and wet signals must stay sample-aligned, detector state must be stable across blocks, and the whole thing has to finish inside the DAW's audio deadline with low latency.

That is why we think the routing is as important as the compressor. Building a parallel aux by hand works, but it asks you to manage compensation, polarity and levels every time. It also tends to treat the signal as one block, when the problem is often in a specific region. A kick-heavy drum bus may need heavy crush on the mids and almost none on the lows. That is the thinking behind our per-band, lane-based approach: several parallel paths within a single insert, each with its own targeted EQ, so you shape what enters each lane instead of filtering after the fact. If you want to go deeper on the idea, our posts on [per-band blends in multiband parallel compression](https://vector-dsp.com/blog/multiband-parallel-compression/), [parallel EQ and why phase comes first](https://vector-dsp.com/blog/parallel-eq/) and [frequency-selective effects with proportional Q](https://vector-dsp.com/blog/frequency-selective-effects/) cover the details.

Our honest advice: learn the manual aux method first. It teaches you what each control does. Then use a tool that removes the housekeeping when you are mixing against a deadline.

> *— Kai*

## Building parallel chains in a single insert

A manual New York setup uses an aux, a compressor, and a fader. That is fine for one drum bus. It becomes cumbersome when you want to try the same idea on bass, vocals and a few effects. Our guide to [parallel effects routing for producers](https://vector-dsp.com/blog/parallel-effects-routing/) lays out a five-step DAW setup and per-lane tips.

If you also want to put saturation in front of a compressor, our [2 to 4 dB test](https://vector-dsp.com/blog/saturation-before-compression/) offers a simple way to decide whether it helps. And if you use tilt EQ to rebalance the tone of a return, [match levels and check the bypass](https://vector-dsp.com/blog/tilt-eq/) before you trust your ears.

## Try it in your own sessions

ToneLab is our multi-lane parallel effects plugin with per-lane EQ targeting, available as VST3, AU and AAX for Windows and macOS. It is a one-time license at [$73.99](https://vector-dsp.com/pricing), and a free demo is available so you can test it in your own DAW before you buy. Minor version updates are included.

## Common mistakes to avoid

- **Judging by loudness.** Match levels with the return bypassed. If the improvement vanishes, it was volume.
- **Ignoring latency.** A hollow sound is usually phase, not taste.
- **Letting the kick drive the detector.** High-pass the sidechain.
- **Over-blending.** Start under the dry signal, as in the FOH guidance, and stop sooner than you think.
- **Using it to fix the arrangement.** It is a positioning tool, not a rescue.
- **Forgetting the noise floor.** Whatever is quiet gets louder, including breaths, hiss and room noise.

## FAQ

### Is New York compression the same as parallel compression?

Yes. [New York compression is a common name for parallel compression](https://en.wikipedia.org/wiki/Parallel_compression), where an unprocessed signal is mixed with a compressed copy. The terms describe the same routing and the same goal.

### What compressor settings work best for parallel compression on drums?

Begin with a high ratio, a fast attack and about 10 to 20 dB of gain reduction, with the release matched to the song's tempo. Blend the return just under the dry drums. Then adjust by ear at matched loudness, since the right values depend on the kit and the room.

### Should I use parallel compression on vocals?

It can add presence and detail, but it also raises breaths and sibilance. Keep the blend lower than on drums and add a de-esser on the return if consonants get harsh. Treat any published ratio as an example, not a preset.

### Why do my drums sound thin after adding a parallel bus?

Most often the two paths are out of time or polarity. Check that delay compensation is on, flip the polarity on the aux, and bypass the compressor to confirm the level and timing match.

## Sources

- [How to use parallel 'New York'-style compression, MusicRadar](https://www.musicradar.com/how-to/parallel-compression)
- [Parallel Compression, a.k.a. NYCT, FOH Magazine](https://fohonline.com/articles/theory-and-practice/parallel-compression-aka-nyct/)
- [Parallel compression, Wikipedia](https://en.wikipedia.org/wiki/Parallel_compression)
- [Reason: Parallel Compression, Sound On Sound](https://www.soundonsound.com/techniques/reason-parallel-compression)
- [Q. What does 'parallel compression' mean? Sound On Sound](https://www.soundonsound.com/sound-advice/q-what-does-parallel-compression-mean)
- [Cubase: Parallel Bus Compression, Sound On Sound](https://www.soundonsound.com/techniques/cubase-parallel-bus-compression)
- [Mix Rescue: Michaela Betts & Alessia McDermott, Sound On Sound](https://www.soundonsound.com/techniques/mix-rescue-michaela-betts-alessia-mcdermott-audio)
- [A Comprehensive Guide to Parallel Compression, SonicScoop](https://sonicscoop.com/parallel-compression/)
- [An Afternoon With Manny Marroquin Part 2, CRAS](https://www.cras.edu/manny-marroquin-part-2/)
- [Parallelizing a real-time audio application, KIT](https://ps.ipd.kit.edu/downloads/ka_2015_parallelizing_realtime_audio_application.pdf)

## Recommended

- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression)
- [Parallel Effects Routing for Producers: 5 Step DAW Setup, Per Lane Tips](https://vector-dsp.com/blog/parallel-effects-routing)
- [Stop Phase Problems: DAW Agnostic Frequency Split for Producers](https://vector-dsp.com/blog/split-frequencies-in-daw)
- [Parallel EQ: Three DAW Routes, but Phase Comes First](https://vector-dsp.com/blog/parallel-eq)
