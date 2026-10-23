---
title: "LUFS vs dBFS: What Each Meter Tells You in a Mix"
description: ""
date: 2026-10-23
---

# LUFS vs dBFS: What Each Meter Tells You in a Mix

![Engineer checks mix levels in a mastering room](https://media.babylovegrowth.ai/blog-images/organization-30746/1792571777150_Engineer-checks-mix-levels-in-a-mastering-room.jpeg)

dBFS tells you how close the loudest sample is to digital clipping. LUFS tells you how loud the program is likely to feel over time. They share the same "full scale" reference and the same step size, which is why people confuse them, but they answer two different questions. You need both: dBFS (and its cousin, true peak) to protect headroom, and LUFS to judge and match loudness.

We build audio tools, and we spend a lot of time matching levels between processed and unprocessed signals. This guide covers what each unit measures, why one cannot be converted into the other, what the common targets are, and how to use both meters in a normal mixing session.

## TL;DR

- **dBFS** measures the level of digital samples against the clipping point. It says how much headroom is left, not how loud something sounds.
- **LUFS** measures loudness over time, using K-weighting and gating from ITU-R BS.1770. It is the number that streaming and broadcast normalization use.
- **One LU equals one dB** in step size, but you cannot convert a peak reading into a LUFS reading with a formula. The result depends on the material.
- **Mix with both:** watch peaks and true peak for headroom, watch integrated and short-term LUFS for balance and delivery.
- **RMS** sits between the two: an average level with no perceptual weighting, so it is useful but blind to how the ear hears bass and treble.

## Table of Contents

- [What dBFS actually measures](#what-dbfs-actually-measures)
- [What LUFS measures](#what-lufs-measures)
- [Why you cannot convert LUFS to dBFS](#why-you-cannot-convert-lufs-to-dbfs)
- [Where RMS fits](#where-rms-fits)
- [The targets you will run into](#the-targets-you-will-run-into)
- [Using both meters in a session](#using-both-meters-in-a-session)
- [Loudness is not a limiter problem](#loudness-is-not-a-limiter-problem)
- [Our perspective: loudness meters are for comparing, not for chasing](#our-perspective-loudness-meters-are-for-comparing-not-for-chasing)
- [A quick way to apply this on a bus](#a-quick-way-to-apply-this-on-a-bus)
- [Common mistakes to avoid](#common-mistakes-to-avoid)
- [FAQ](#faq)
- [Sources](#sources)

## What dBFS actually measures

dBFS stands for decibels relative to full scale. In a digital system, 0 dBFS is the highest value a sample can hold. Everything you can represent sits at 0 dBFS or below, so the numbers are negative: -6 dBFS is half the maximum amplitude, -20 dBFS is a tenth.

That makes dBFS a purely mechanical measurement. The meter looks at sample values, reports the biggest, and does not care what frequency they are or how long they last. A 20 ms kick transient and a sustained pad can both touch -3 dBFS, and the pad will sound far louder.

This is why a peak meter is the right tool for one job: knowing whether you are about to clip. It is the wrong tool for deciding whether track A is louder than track B.

### Sample peak versus true peak

A sample-peak meter only reads the stored samples. When the file is converted to analog, or to a lossy codec, the waveform reconstructed between samples can overshoot. That is an intersample peak. True-peak meters (dBTP) estimate it by oversampling. The [EBU's loudness page](https://tech.ebu.ch/loudness) points to true-peak ceilings of -1 dBTP as the usual practice for delivery, which is why a master that reads -0.1 dBFS on a sample meter can still distort downstream.

If you only remember one rule: leave true-peak headroom on anything you deliver.

## What LUFS measures

LUFS means loudness units relative to full scale. The measurement is defined in [ITU-R BS.1770](https://www.itu.int/rec/r-rec-bs.1770/_page.print), and it does three things a peak meter does not:

1. **K-weighting.** A filter stage shapes the signal before measuring, so that the meter reacts the way our hearing does. We are less sensitive to low frequencies, so heavy sub energy counts for less than midrange energy at the same sample level.
2. **Averaging over time.** The meter reports energy across a window, not a single instant.
3. **Gating.** Silence and very quiet passages are ignored in the integrated reading, so a long quiet intro does not drag the number down.

The [EBU's presentation on R 128](https://tech.ebu.ch/docs/events/ibc11-ebutechnical/presentations/ibc11_10things_r128.pdf) explains the relationship plainly: BS.1770 defines the basic measurement, and R 128 builds on it. LKFS and LUFS refer to the same measurement under different standards bodies' naming, so a meter labeled either way is doing the same job.

### The three LUFS readings you will see

| Reading | Window | What it is for |
|---|---|---|
| Momentary | Short, about 400 ms | Watching sudden jumps, like a chorus entry |
| Short-term | About 3 seconds | Judging sections against each other |
| Integrated | Whole program, gated | Delivery targets and normalization |

Most confusion online comes from people quoting a LUFS number without saying which of these they mean. "My master is -9 LUFS" almost always refers to integrated. "The chorus hits -8 short-term" is a different statement.

## Why you cannot convert LUFS to dBFS

Since both units are "relative to full scale", people assume a simple offset exists. It does not. The relationship between peak level and loudness is the crest factor of your material, and that changes with every song.

Take two masters, both peaking at -1 dBFS:

- A sparse acoustic ballad with strong dynamics might measure around -18 LUFS integrated.
- A dense, heavily limited electronic track might measure around -8 LUFS integrated.

Same dBFS peak, ten LU apart. The reverse holds too: two tracks at the same LUFS can have very different peaks. (These are illustrative figures to show the principle, not measurements of specific records.)

One piece of the relationship is exact, and it is useful: **the step size**. One LU is one dB of gain. If you turn a whole track down 3 dB, both the peak and the integrated loudness drop by 3. The [Hidacs overview of LUFS versus dBFS](https://hidacs.ch/en/blog/lufs-vs-dbfs/) makes the same point about conversion: there is no formula, only measurement.

The one-to-one step breaks as soon as you change more than gain. Add an EQ boost in a region the K-weighting emphasizes and the LUFS reading moves by more than the peak does. Cut the same amount deep in the sub and loudness may barely move. That is the whole point of weighting.

## Where RMS fits

People searching this topic often ask about LUFS versus RMS, so here is the short version.

RMS is the root-mean-square level of the signal over a window. It is an average, so it correlates better with perceived loudness than a peak does. But it treats every frequency equally, so it has no model of hearing, and its result depends on window length and on how a given meter implements it (for example, whether it adds a few dB so that a sine reads the same as its peak).

LUFS is effectively RMS-style averaging after K-weighting, plus gating, with a published standard behind it. That standardization is the real difference: two LUFS meters from different makers should agree, while two RMS meters often do not.

Practical rule: RMS is fine as a quick gain-staging aid inside a session. For anything you will compare, deliver, or hand off, use LUFS.

![Where RMS fits — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792571878345_Where-RMS-fits-overview-diagram.jpeg)

## The targets you will run into

Targets differ by destination, and several are conventions rather than hard rules.

| Destination | Target | Notes |
|---|---|---|
| EBU R 128 broadcast | -23 LUFS | [±0.2 LU for most programs, ±1 LU for live](https://tech.ebu.ch/loudness) |
| US broadcast (ATSC A/85) | -24 LKFS | See the [ATSC A/85 quick reference](https://www.atsc.org/wp-content/uploads/2026/07/A85-2026-07-Annex-M.pdf) for content-type details |
| Spotify playback | -14 LUFS integrated | [Applied at playback](https://support.spotify.com/us/artists/article/loudness-normalization/); the file is not altered |

Two cautions. First, check the platform's current documentation before delivering, because these settings can change. Second, a target is a reference point for how the platform will treat you, not a quality score for your mix.

### What normalization does to a loud master

Spotify's help page says it applies negative gain to louder masters so they land at -14 LUFS, and that this lowers volume without adding distortion. So a master at -10 LUFS integrated is turned down roughly 4 dB on playback where normalization is active. (Spotify also notes that the web player and some third-party devices do not normalize, so listeners will hear different things in different places.)

That answers the question "is -10 LUFS too loud?" Not in the sense of breaking anything. But on a normalizing service you gain no loudness advantage from it, and you may have given up transient detail to get there. If you are working out how these platforms treat your files, this walkthrough of [Spotify loudness targets for mastering](https://zenviewstudios.fr/single-post/niveau-loudness-spotify) covers the playback side in more depth (it is in French).

## Using both meters in a session

Here is the order we suggest, because each meter is good at a different stage.

### 1. Gain-stage with peaks and true peak

While tracking and early mixing, keep peaks comfortably below 0 dBFS. This is about headroom for plugins and converters, not loudness. A -18 dBFS average figure is a common analog-style reference level, but it is a gain-staging convention, not a loudness target.

### 2. Balance with short-term LUFS

Once the mix is taking shape, put a LUFS meter on the mix bus and watch short-term values. It will tell you honestly whether the chorus is three LU above the verse or only one. Your ears adapt within minutes, and a meter does not.

### 3. Check dynamics with loudness range

Loudness range describes how much the loudness varies across a program. The EBU's [Tech 3341 document](https://tech.ebu.ch/docs/tech/tech3341.pdf) describes it as a measure of variation over a macroscopic timescale, supplementary to overall loudness. A narrow range alongside a high integrated figure is a hint that dynamics were flattened.

### 4. Verify delivery with integrated LUFS and true peak

At the end, measure the full bounce: integrated LUFS for the platform, true peak for codec safety. Do this on the final file, not a loop.

## Loudness is not a limiter problem

A common trap is to chase a LUFS number with the limiter alone. You push the input until the meter says what you want, and the result is a flat, fatiguing master.

The better route is to treat the balance of the mix as the lever. Because K-weighting favors some regions over others, spectral balance affects the LUFS reading as much as raw level does. A mix with controlled low-mid buildup and a clear presence region can read louder at the same peak ceiling than a muddy one, with no extra limiting.

A word on saturation, since it often gets credited with free loudness. Saturation can change how dense a sound feels, and it adds harmonics that the K-weighted meter may register. But it also changes peaks, so it is not a way to raise loudness while leaving peaks untouched. Measure before and after, and match levels before you judge. Our post on [when to use saturation before compression](https://vector-dsp.com/blog/saturation-before-compression/) shows how we check this with small, measured gain changes.

## Our perspective: loudness meters are for comparing, not for chasing

We are a small design studio, and loudness measurement shapes how we test our own processing. Almost every effect we build changes level in some way, and your ears will pick the louder version as the better one nearly every time. If you do not compensate, you will believe a processor is improving a mix when it is only making it louder.

So we match first. Integrated or short-term LUFS gets the processed and bypassed versions within a fraction of an LU of each other, and only then do we listen. We wrote down the workflow in [matching parallel chains within 0.5 LU](https://vector-dsp.com/blog/metering-parallel-chains/), including the null test that confirms the two paths line up.

![Our perspective: loudness meters are for comparing, not for chasing — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792571837390_Our-perspective-loudness-meters-are-for-comparing-not-for-chasing-overview-diagram.jpeg)

Frequency-specific processing makes this even more important. If you compress only the low band, the loudness shift is not what a broadband gain change would produce, because that band is weighted differently by the meter. The same goes for a parallel path that you blend in under a single band. Watch short-term LUFS while you adjust, not just the peak meter, and you will catch the change your ears are being fooled by. If pumping appears when you work this way, look at the compressor's attack, release and detection settings, because pumping is a dynamics-processing behavior. Our write-up on [multiband parallel compression](https://vector-dsp.com/blog/multiband-parallel-compression/) goes through per-band blends in detail.

One more habit: do not make a LUFS target the goal of the mix. The standards bodies built LUFS to make programs consistent for the listener, not to rank creative decisions. Use the number to remove variables, then decide with your ears.

> *— Kai*

## A quick way to apply this on a bus

If you do per-band or parallel work, the most practical thing you can do is build a level-matching habit into the process. One way to do that is a multi-lane plugin such as [ToneLab](https://vector-dsp.com/pricing), which splits a signal into parallel lanes with per-lane EQ targeting inside one insert, so each lane's contribution can be balanced and metered against the dry path. It is a one-time license at $73.99 with a free demo available, so you can test the level-matching workflow on your own material before buying. The technique works with any set of tools that lets you split, process and re-sum while keeping the gain honest.

## Common mistakes to avoid

- **Quoting LUFS without the window.** Say integrated, short-term or momentary.
- **Treating -14 as a rule.** It is a platform's normalization point, not a requirement, and other services use other numbers.
- **Judging by peaks.** A track that peaks lower can sound louder than one that peaks at 0.
- **Skipping true peak.** A clean sample-peak reading does not guarantee a clean encode.
- **Comparing without matching.** A 1 LU difference is enough to bias a listening test.

## FAQ

### Is LUFS the same as dBFS?

No. dBFS is the level of digital samples relative to the clipping point, while LUFS is a weighted, time-averaged loudness measurement defined in [ITU-R BS.1770](https://www.itu.int/rec/r-rec-bs.1770/_page.print). They use the same full-scale reference and the same step size, so a 1 dB gain change moves both by one unit. But a given peak level does not map to a single LUFS value.

### How many dB is 1 LUFS?

One LU, the unit of relative loudness, equals one dB of gain. LUFS itself is an absolute level on a scale anchored to full scale, so you cannot say how many dB "a LUFS" is without a reference point. Differences between two LUFS readings are in LU, and each LU is a 1 dB change in gain.

### Is 0 dBFS loud?

0 dBFS is the highest level a digital system can represent, so it is the ceiling for peaks rather than a statement about loudness. Audio can peak at 0 dBFS and still be quiet on average. Because intersample peaks can exceed the ceiling after conversion, most delivery specs ask for true-peak headroom, such as the -1 dBTP the [EBU cites](https://tech.ebu.ch/loudness).

### Is -10 LUFS too loud?

It is louder than most streaming targets. On a service that normalizes to -14 LUFS, like [Spotify](https://support.spotify.com/us/artists/article/loudness-normalization/), a -10 LUFS master is turned down about 4 dB on playback. You get no loudness advantage there, so it is worth checking whether the limiting cost you punch for nothing.

## Sources

- [ITU-R BS.1770: Algorithms to measure audio programme loudness and true-peak audio level](https://www.itu.int/rec/r-rec-bs.1770/_page.print)
- [EBU loudness page, R 128](https://tech.ebu.ch/loudness)
- [EBU presentation: 10 things to know about R 128](https://tech.ebu.ch/docs/events/ibc11-ebutechnical/presentations/ibc11_10things_r128.pdf)
- [EBU Tech 3341: EBU Mode loudness metering](https://tech.ebu.ch/docs/tech/tech3341.pdf)
- [ATSC A/85 Annex M: Loudness and True Peak Quick Reference](https://www.atsc.org/wp-content/uploads/2026/07/A85-2026-07-Annex-M.pdf)
- [Spotify for Artists: Loudness normalization on Spotify](https://support.spotify.com/us/artists/article/loudness-normalization/)
- [Hidacs: LUFS vs dBFS, can you convert LUFS to dB?](https://hidacs.ch/en/blog/lufs-vs-dbfs/)

## Recommended

- [Meter Parallel Chains: Match Within 0.5 LU, Then Run a Null Test](https://vector-dsp.com/blog/metering-parallel-chains/)
- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression/)
- [Pre Fader vs. Post Fader: Test Sends in Any DAW or Console](https://vector-dsp.com/blog/pre-fader-vs-post-fader/)
