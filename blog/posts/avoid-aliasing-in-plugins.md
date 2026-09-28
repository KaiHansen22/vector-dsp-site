---
title: "993 Hz Test: Stop Plugin Aliasing for Engineers With ADAA & DPW"
description: ""
date: 2026-09-28
---

# 993 Hz Test: Stop Plugin Aliasing for Engineers With ADAA & DPW

![Waveform analysis showing digital aliasing](https://media.babylovegrowth.ai/blog-images/organization-30746/1790618590381_Waveform-analysis-showing-digital-aliasing.jpeg)

Avoid audible aliasing by oversampling where nonlinear processing happens, inserting low pass filters near distortion or waveshaping stages, or using algorithmic antialiasing on oscillators and waveshapers. Each fix trades CPU load, latency, or phase accuracy for cleaner high end, so the right choice depends on the plugin and the source material. Measure before you commit to any single method across a session.

***

> **TL;DR:**
>
> - Oversampling at higher rates effectively pushes harmonics further away from the audible band, reducing aliasing in nonlinear processing but increases CPU load at higher multiples.
> - Placing gentle low pass filters immediately after distortion or saturation stages prevents harmonics from propagating and compounding in the signal chain.
> - Algorithmic antialiasing methods like DPW, ADAA, and PolyADAA directly redesign nonlinear functions to limit aliasing without heavy oversampling, suitable for source development.
> - Testing aliasing with sine sweeps at specific odd-frequency tones helps identify problematic plugins, guiding targeted fixes rather than automatic high-rate oversampling.
> - Using chain oversampling or higher project sample rates, combined with selective filtering and offline printing, balances CPU demands with effective aliasing control in mixing sessions.

***

## Table of Contents

- [What causes aliasing inside a plugin](#what-causes-aliasing-inside-a-plugin)
- [Oversampling and chain oversampling explained](#oversampling-and-chain-oversampling-explained)
- [Where to place low pass filters around nonlinear stages](#where-to-place-low-pass-filters-around-nonlinear-stages)
- [Algorithmic antialiasing: ADAA, DPW, and PolyADAA](#algorithmic-antialiasing-adaa-dpw-and-polyadaa)
- [Testing and measuring aliasing before you fix it](#testing-and-measuring-aliasing-before-you-fix-it)
- [Building antialiasing into a plugin's DSP](#building-antialiasing-into-a-plugins-dsp)
- [A quick checklist for aliasing-free sessions](#a-quick-checklist-for-aliasing-free-sessions)
- [How a DSP-focused plugin maker thinks about aliasing](#how-a-dsp-focused-plugin-maker-thinks-about-aliasing)
- [What I tell engineers who ask about aliasing](#what-i-tell-engineers-who-ask-about-aliasing)
- [Getting precise control over your signal chain](#getting-precise-control-over-your-signal-chain)
- [Sources](#sources)
- [FAQ](#faq)

## What causes aliasing inside a plugin

Every digital audio system has a Nyquist limit: half the sample rate, above which no frequency can be represented correctly. When a plugin generates content above that limit, either through clipping, waveshaping, or bad sample rate conversion, those frequencies do not disappear. They fold back into the audible range as new, unrelated tones called aliases.

Nonlinear processing is the usual trigger. Distortion, saturation, and waveshaper plugins work by bending a waveform's shape, and that bending creates harmonics reaching well past the original signal's spectrum. A clean 5 kHz tone pushed through a hard clipper can spawn harmonics at 10 kHz, 15 kHz, 20 kHz, and beyond, according to a [Sound On Sound explanation of aliasing](https://www.soundonsound.com/sound-advice/q-what-aliasing-and-what-causes-it), which ties the effect to quantizer overload and folding harmonics.

![Harmonics folding back below Nyquist limit](https://media.babylovegrowth.ai/blog-images/organization-30746/1790618597415_Harmonics-folding-back-below-Nyquist-limit.jpeg)

The usual culprits are the same across most DAWs: distortion and saturation plugins, aggressive waveshapers, bitcrushers, and any sample rate converter that skips proper filtering. Synth oscillators generating sharp-edged waveforms, like sawtooths and squares, are also prone to it, since those shapes are mathematically rich in harmonics from the start.

## Oversampling and chain oversampling explained

Oversampling runs a plugin's internal processing at a multiple of the project sample rate, then filters and downsamples back down. Running the nonlinear math at, say, 192kHz instead of 48kHz pushes the generated harmonics further from the audible band before they get folded back in, according to Sound On Sound's guide to oversampling, which walks through this exact scenario.

You have three practical routes: turn on oversampling inside an individual plugin, use a host feature that oversamples an entire chain or bus, or track and mix at a higher project sample rate from the start. Chain oversampling avoids the CPU cost of running every single insert at high rates, since only the segment around the nonlinear stage needs it.

- Lower multiples of oversampling typically handle mild saturation with modest CPU cost.
- Higher multiples suit harder clipping or distortion where harmonics extend further into the spectrum.
- The highest multiples are usually reserved for extreme waveshaping or bit crushing, where the CPU cost is warranted only on select tracks.

The catch is that oversampling doesn't touch intermodulation distortion generated by the nonlinear math itself. If IMD remains audible with oversampling engaged, the issue is baked into the plugin's algorithm, and Sound On Sound's piece on oversampling notes that switching plugins may be the only fix. Latency and phase issues can also creep in, particularly on aux sends where oversampled and non-oversampled paths run in parallel. Check your true peak meter after enabling oversampling, since inter-sample peaks often rise once harmonic content shifts.

**Pro Tip:** *A/B the chain with oversampling toggled on and off before committing, and only print the oversampled version to audio if your session is CPU-limited during mixdown.*

## Where to place low pass filters around nonlinear stages

A low pass filter placed right after a distortion or saturation stage stops the newly generated harmonics from climbing into the next plugin in the chain. Without it, those harmonics keep compounding: a saturator feeds a compressor, which feeds an EQ, and each nonlinear stage adds its own aliasing on top of what came before.

Pre-conditioning the source before a waveshaper works the same way in reverse. Rolling off extreme highs on a bright guitar or synth before it hits a fuzz pedal emulation reduces how much harmonic content the waveshaper has to work with in the first place.

- Use gentle slopes, generally 6 to 12 dB per octave, cutting somewhere around 18 to 22 kHz rather than sharp brick wall filters.
- Avoid stacking multiple linear phase filters back to back, since their pre-ringing can become audible on transient-heavy material.
- Place the filter immediately after the nonlinear stage rather than at the end of the chain, so downstream plugins never see the extra harmonics.

## Algorithmic antialiasing: ADAA, DPW, and PolyADAA

Oversampling brute-forces the problem by running math at a higher rate. Algorithmic antialiasing takes a different route: it redesigns the nonlinear function itself so it produces band-limited output without needing extra samples.

Differentiated Polynomial Waveforms, or DPW, build a waveform from its antiderivative and then differentiate the result, which smooths out the sharp discontinuities that generate aliasing in the first place. A [Stanford paper on alias-suppressed oscillators](https://grail.stanford.edu/papers/alias-suppressed-oscillators-based-differentiated-polynomial-waveforms) demonstrates that fourth-order DPW is perceptually alias-free across a piano's full register, which makes it a strong fit for synth oscillators generating sawtooth or square shapes.

![DPW process smoothing oscillator waveform](https://media.babylovegrowth.ai/blog-images/organization-30746/1790618593900_DPW-process-smoothing-oscillator-waveform.jpeg)

Antiderivative Antialiasing, or ADAA, applies a related idea to arbitrary nonlinear functions like waveshapers and clippers rather than just oscillators. It converts the discrete processing step into a continuous one by working with the function's antiderivative, producing smoother, less alias-prone output.

PolyADAA pushes this further. It uses higher order interpolation combined with Chebyshev polynomial approximations to reduce aliasing more efficiently than standard linear-interpolation ADAA, according to the [PolyADAA paper presented at DAFx26](https://dafx26.mit.edu/assets/papers/DAFx26_paper_47.pdf). The paper also documents offline precomputation of Chebyshev moments, which shifts expensive math to a one-time setup step and leaves a cheaper lookup at runtime.

- **DPW** suits oscillators generating classic synth waveforms and needs no per-sample lookup once implemented.
- **ADAA** suits stateless nonlinear functions like waveshapers, clippers, and saturation curves.
- **PolyADAA** suits developers who need higher accuracy than basic ADAA without paying oversampling's CPU tax, at the cost of more complex implementation.

**Pro Tip:** *If you are building a plugin rather than mixing with one, precompute what you can offline. PolyADAA's Chebyshev-moment approach shows that a small setup cost can buy a much cheaper runtime evaluation.*

These methods are harder to implement than flipping an oversampling switch, and they usually live inside a plugin's DSP code rather than a preset a mixing engineer can toggle. But for anyone building oscillators or nonlinear processors, they solve aliasing at the source instead of filtering it out after the fact.

## Testing and measuring aliasing before you fix it

You cannot fix what you cannot see, and aliasing is often subtle enough that only a spectrum analyzer reveals it clearly.

1. Feed the plugin a sine sweep or a fixed test tone rather than program material, since a clean single-frequency signal makes any new harmonic content obvious.
2. Use 993 Hz at 44.1 kHz or 996 Hz at 96 kHz rather than round numbers like 1,000 Hz, since these odd frequencies place alias products between the true harmonics rather than stacking on top of them, a tip documented in an [AudioTechnology PC Audio column](https://www.audiotechnology.net/regulars/pc-audio-136).
3. Set your analyzer's display range to run from 0 dB down to negative 120 dB so quiet alias artifacts near the noise floor are still visible.
4. Bypass and reinsert low pass filters one at a time through the chain to isolate exactly which plugin introduces the alias.
5. Toggle oversampling on and off on the suspect plugin and compare the resulting spectrum directly.

**The 993 Hz test tone convention**, used to expose aliasing on spectrum analyzers, works because it avoids the coincidental overlap between a fundamental's harmonics and the aliases folding back from above Nyquist, making fold-back products visually distinct rather than hidden.

## Building antialiasing into a plugin's DSP

Developers writing nonlinear processors or oscillators face a different set of decisions than someone mixing with off-the-shelf plugins, starting with which resampling library to build on.

- Windowed sinc resamplers, such as ReSinc on the JUCE Marketplace, offer real-time-safe interpolation and decimation with precomputed filter tables rather than calculating coefficients on the fly.
- ReSinc documents its latency directly as a function of filter length, with oversampler latency equal to twice the sinc radius, which developers need to report accurately to the host for delay compensation.
- Conditional oversampling, running the expensive path only when a signal's level or spectral content crosses a threshold, cuts average CPU use compared to oversampling everything all the time.
- Lookup tables for waveshaping functions, precomputed offline the way PolyADAA precomputes Chebyshev moments, move cost out of the real-time audio thread.
- Linear phase filters preserve phase relationships but add latency and pre-ringing, while minimum phase filters avoid pre-ringing but shift phase, so the choice depends on whether the plugin processes transient material or sustained tones.

Getting latency reporting right matters as much as the antialiasing math itself. A plugin that quietly introduces unreported delay breaks sync in a host, regardless of how clean its spectrum looks on an analyzer.

## A quick checklist for aliasing-free sessions

Keeps a short mental checklist rather than reaching for oversampling as a default on every insert.

- Turn on per-plugin oversampling only on tracks where a sine sweep test shows audible aliasing.
- Reach for chain oversampling or a higher project sample rate when several nonlinear plugins sit back to back.
- Place a gentle low pass filter, cutting around 18 to 22 kHz, right after any saturation or distortion stage.
- Print oversampled processing to audio once a mix is CPU-heavy, rather than leaving oversampling live through mixdown.
- Bounce problem tracks in place selectively instead of oversampling the entire session.

| Situation | Recommended fix | Main tradeoff |
|---|---|---|
| Single saturated track | Per-plugin oversampling | CPU cost on that track |
| Several nonlinear plugins in series | Chain oversampling or higher project rate | Higher overall CPU |
| Synth oscillator generating harsh harmonics | Algorithmic antialiasing (DPW) | Implementation complexity |
| CPU-limited mixdown | Print oversampled audio | Loses real-time flexibility |

## How a DSP-focused plugin maker thinks about aliasing

Vector DSP builds plugins around thoughtful DSP design rather than treating antialiasing as an afterthought bolted onto a finished algorithm. The company's positioning centers on real-time performance with minimal latency, built on industry-standard frameworks like C++ and JUCE.

A multi-lane, per-band architecture changes how aliasing risk gets distributed through a plugin. Processing each band separately means nonlinear stages only see the frequency content relevant to that band, which can limit how far harmonics spread before a filter or oversampling stage catches them. That's a structural choice rather than a setting a user toggles, and it reflects how an underlying signal path can be designed.

## What I tell engineers who ask about aliasing

Aliasing is not always a problem worth chasing. Some of the grit in a heavily saturated bass or a lo-fi drum bus comes from aliasing, and removing it can leave a track feeling thinner. Leave it in when it serves the sound, but note where you made that call so a later mix pass does not undo it by accident.

Spend your fixing effort on lead vocals, solo instruments, and master bus processing before you touch every secondary layer. Global oversampling on an entire session rarely earns back the CPU cost it demands.

> *— Kai*

## Getting precise control over your signal chain

Some plugin design approaches start from the problem that nonlinear processing generates harmonics, and that control over where and how that happens determines whether a mix stays clean or picks up unwanted grit. Some plugins use a multi-lane, per-band architecture to give separate control over each frequency lane inside a single insert, so a saturation stage on one band does not spill unchecked harmonics into the next.

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

That kind of per-lane targeting can matter most on busy buses and master chains, where several nonlinear stages often stack without anyone noticing until the top end turns harsh. ToneLab is available as a one-time license at [$73.99](https://vector-dsp.com/pricing), with a free demo so you can test it against your own chain before buying.

## Sources

For deeper technical detail, Sound On Sound's oversampling guide covers practical tradeoffs in a mixing context, while the Stanford DPW paper and the PolyADAA paper from DAFx26 cover the underlying math for developers. Plugin builders evaluating resampling libraries can review ReSinc's product page on the JUCE Marketplace.

- [PolyADAA (DAFx26 paper)](https://dafx26.mit.edu/assets/papers/DAFx26_paper_47.pdf)
- [Alias-suppressed oscillators based on differentiated polynomial waveforms](https://grail.stanford.edu/papers/alias-suppressed-oscillators-based-differentiated-polynomial-waveforms)

## FAQ

### Is anti-aliasing better left on or off?

Anti-aliasing measures, whether oversampling or algorithmic methods, are worth leaving on whenever a sine sweep test reveals audible aliasing on a given plugin. Leave them off on tracks where testing shows no meaningful aliasing, since oversampling adds CPU load and sometimes latency for no audible benefit.

### How do you eliminate the aliasing effect in a mix?

Oversample the specific plugin or chain segment generating the aliasing, insert a low pass filter right after the nonlinear stage causing it, or switch to a plugin using algorithmic antialiasing like DPW or ADAA. Testing with a sine sweep first tells you which fix actually applies to your situation.

### When should you use oversampling instead of other fixes?

Use oversampling when a plugin's nonlinear processing generates audible harmonics and you have CPU headroom to spare, according to Sound On Sound's guide. Skip it when intermodulation distortion persists even with oversampling enabled, since that distortion comes from the plugin's core algorithm rather than the sample rate.

### What does aliasing mean in digital audio?

Aliasing happens when a frequency above half the sample rate, the Nyquist limit, gets generated or allowed into a digital system and folds back down into the audible range as a false, unrelated tone. It commonly comes from nonlinear processing like distortion or from a sample rate converter without proper filtering, as described in Sound On Sound's explainer on aliasing.
