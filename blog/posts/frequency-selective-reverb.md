---
title: "80–120 Hz Vocal Start: Frequency Selective Reverb for Engineers"
description: ""
date: 2026-09-29
---

# 80–120 Hz Vocal Start: Frequency Selective Reverb for Engineers

![Engineer adjusting vocal reverb send](https://media.babylovegrowth.ai/blog-images/organization-30746/1790591543051_Engineer-adjusting-vocal-reverb-send.jpeg)

Frequency selective reverb means applying reverb differently across frequency bands rather than dumping one wash of ambience over the whole signal. The best approach combines EQ filtering (pre and post reverb), split or parallel reverb busses, and dynamic ducking when needed. Done right, it keeps the low end clean, tames sibilance, and preserves depth without turning a mix into mud.

***

> **TL;DR:**
>
> - Frequency selective reverb is most beneficial when a mix has masking issues, harsh sibilance, or conflicting low-frequency elements that need band-specific control.
> - Using send routing with independent EQ filters and parallel busses allows precise control over reverb decay and filtering across different frequency bands.
> - Pre-reverb high-pass filters at 80-120 Hz for vocals and 200 Hz or higher for kick and bass help prevent low-end rumble and muddiness in the reverb tail.
> - Multi-band reverb approaches enable shaping decay times and brightness independently, with two to three bands being practical for most vocal and mix-bus applications.
> - Modern reverberators based on Feedback Delay Networks and their variants exploit frequency-dependent decay, allowing flexible, high-quality control that surpasses convolution reverb's fixed characteristics.

***

## Table of Contents

- [When to use frequency selective reverb vs a standard reverb](#when-to-use-frequency-selective-reverb-vs-a-standard-reverb)
- [Basic routing and signal flow for selective reverb](#basic-routing-and-signal-flow-for-selective-reverb)
- [EQ and filtering techniques with starting settings](#eq-and-filtering-techniques-with-starting-settings)
- [Multi-band and parallel reverb approaches](#multi-band-and-parallel-reverb-approaches)
- [Dynamic control: ducking, sidechain, and gating](#dynamic-control-ducking-sidechain-and-gating)
- [How modern reverbs create frequency dependent decay](#how-modern-reverbs-create-frequency-dependent-decay)
- [The perceptual effect and creative use of band-specific reverb](#the-perceptual-effect-and-creative-use-of-band-specific-reverb)
- [Frequency selective reverb versus convolution reverb and tone shaping](#frequency-selective-reverb-versus-convolution-reverb-and-tone-shaping)
- [Common pitfalls when applying frequency selective reverb](#common-pitfalls-when-applying-frequency-selective-reverb)
- [A working test chain for frequency selective reverb](#a-working-test-chain-for-frequency-selective-reverb)
- [Getting per-band control without building it from scratch](#getting-per-band-control-without-building-it-from-scratch)
- [Sources](#sources)
- [FAQ](#faq)

## When to use frequency selective reverb vs a standard reverb

Selective reverb earns its complexity when something in the mix is fighting the ambience. A dense arrangement with overlapping instruments, a vocal with harsh sibilance that reverb amplifies, or a kick and bass that turn to mush under a wash of low-frequency tail are all signs you need band-specific control rather than one global setting.

A quick way to decide:

- **Masking check:** does the reverb tail blur the attack or pitch definition of another element, especially in the low mids?
- **Tonal conflict check:** does the reverb exaggerate a frequency range that's already a problem in the dry source, like sibilance or boxiness?
- **Control need check:** do different sections of the mix need different decay times or brightness from the same physical space?

If none of those apply, a standard reverb is usually the better call. Sparse arrangements, single-instrument passages, or mixes aiming for straightforward acoustic realism rarely benefit from splitting bands, and the extra routing just adds complexity without a payoff.

## Basic routing and signal flow for selective reverb

Sends give you more control than inserts for most selective reverb work, because multiple sources can share one reverb buss while each source's send level and pre-send EQ stay independent. An insert makes sense only when the reverb is meant to color one specific track and nothing else.

A few routing recipes to set up directly in your DAW:

1. **Single send with a high-pass filter:** insert an EQ on the aux track before the reverb plugin, high-pass at your chosen cutoff, and let everything above pass through untouched.
2. **Split send, low and high:** duplicate the send to two aux busses, high-pass one and low-pass the other, then set different decay and wet levels on each.
3. **Parallel bussing:** route dry and wet signals to separate faders so you can balance ambience against clarity without touching the reverb's internal mix knob.

Gain stage the send at unity before adjusting the reverb's own output, then set wet/dry balance by ear against the dry track soloed and unsoloed. Small changes in send level matter more than most reverb parameters.

## EQ and filtering techniques with starting settings

Filtering the reverb, not just the dry source, is where most of the control lives. Two stages matter: what goes into the reverb, and what comes out of it.

Pre-reverb high-pass filtering removes sub and low-mid energy before it excites the algorithm, which keeps the tail from turning into a low rumble. Typical starting points:

- **Vocals:** high-pass the reverb send around 80 to 120 Hz.
- **Kick and bass:** high-pass around 200 Hz or higher, or skip reverb on these sources entirely.
- **Full mix busses or pads:** 60 to 100 Hz is a reasonable starting range depending on how much low content the source carries.

Post-reverb sculpting handles what the algorithm adds. A gentle high shelf cut above 8 to 10 kHz softens harshness without dulling the sense of space, and a narrow notch (high Q, ) around 2 to 4 kHz can tame boxy or honky resonances that a lot of algorithmic reverbs introduce. For vocal reverb specifically, a de-esser or a dynamic EQ on the return before the sibilant range keeps hissy tails from riding on top of the dry vocal.

A reasonable starting preset for vocals: high-pass at 80 to 120 Hz, decay around 0.8 to 1.5 seconds, pre-delay of 10 to 30 ms to keep the reverb from smearing into the consonants. For kick and bass, keep the send low-passed out entirely or reserve it for a very short, heavily filtered room sound.

**Pro Tip:** *Automate the reverb send lower during dense choruses and higher during sparse verses instead of committing to one static level for the whole song.*

![EQ and filtering techniques with starting settings — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1790591596717_EQ-and-filtering-techniques-with-starting-settings-overview-diagram.jpeg)

## Multi-band and parallel reverb approaches

Splitting a reverb send into separate frequency bands, each feeding its own reverb instance, lets you shape decay and brightness independently instead of compromising with one setting for the whole spectrum.

A workable crossover scheme:

- **Low band, below 200 Hz:** short decay, heavy damping, sometimes muted entirely to avoid low-end buildup.
- **Mid band, 200 Hz to 3 kHz:** the main body of the reverb, where most of the perceived space lives.
- **High band, above 3 kHz:** brighter, often slightly longer decay for air and sheen, with a gentle high shelf to avoid harshness.

A dedicated multiband reverb plugin simplifies this into one instance with internal crossovers, which is faster to set up but limits you to whatever bands and reverb types the plugin ships with. Building it manually with three aux busses and three reverb instances costs more CPU and more routing but gives full control over reverb type, decay, and modulation per band.

For most vocal or mix-buss applications, two bands (low cut out, everything else through one reverb) covers the need. Full three-band splitting is worth the CPU load mainly on complex arrangements where kick, vocal, and cymbals all compete for reverb space at once.

## Dynamic control: ducking, sidechain, and gating

Static EQ solves tonal conflicts, but timing conflicts need dynamic tools. Three techniques cover most cases:

1. **Sidechain compression on the reverb buss:** trigger a compressor on the reverb return from the dry source, with a fast attack (1 to 10 ms) and a release around 100 to 300 ms, so the reverb ducks under the source and recovers between phrases.
2. **Transient shaping before the send:** placing a transient shaper on the dry signal before it hits the reverb send emphasizes attacks and reduces the sustain that feeds the reverb, which keeps the tail from washing out picking or consonants.
3. **Tempo-synced gating:** gate the reverb return to note values so tails cut off rhythmically instead of bleeding into the next hit, useful on rhythmic guitar or drum ambience.

Reach for these when the problem is timing rather than tone, for example a reverb that sounds fine in isolation but buries the next word or note. EQ alone can't fix a masking problem that only happens on transients.

**Pro Tip:** *Set the sidechain trigger to the dry source, not the wet reverb signal, or the ducking will always lag behind the transient it's supposed to protect.*

## How modern reverbs create frequency dependent decay

Frequency selective decay isn't a plugin gimmick bolted onto a generic algorithm. Independent frequency-band control is the technical foundation of modern high-quality reverbs, and Feedback Delay Networks are a common architecture for achieving it, since they let designers simulate spaces built from materials with different absorption characteristics, a stone hall decaying differently at low and high frequencies than a heavily carpeted room, according to [research on FDN reverberator design](https://dafx2020.mdw.ac.at/proceedings/papers/DAFx2020_paper_47.pdf).

![Feedback delay network with band decay paths](https://media.babylovegrowth.ai/blog-images/organization-30746/1790591547558_Feedback-delay-network-with-band-decay-paths.jpeg)

Unitary Feedback Delay Networks extend this by inserting attenuation and filtering into each delay line, which gives independent control over decay time and energy level at different frequencies rather than one global decay curve, as described in [work on absorbent all-pass filter reverberators](https://www.dafx.de/paper-archive/2000/pdf/Dahl_Final.pdf).

What this means at the plugin level:

- Look for a **decay high/low ratio** or separate high and low decay times rather than one global decay knob.
- A **high-frequency reference** parameter sets the crossover point where the high decay rate takes over from the low.
- **Diffusion** and per-band damping controls shape how quickly the tail smooths out versus how metallic or grainy it sounds early on.

A reverb that exposes these controls gives you the split-band behavior natively, without needing to build a manual multiband chain.

## The perceptual effect and creative use of band-specific reverb

Frequency selective reverb changes how a mix feels in space, not just how it sounds tonally. A vocal with a high-passed, bright reverb reads as present and forward even while sitting inside a large room, because the ear associates low-frequency reverberation with distance and size, while a clean, undamped top end reads as clarity and proximity. Strip the highs and keep the lows and the same reverb suddenly feels distant and muddy.

Producers use this deliberately. Keeping bass and kick dry while letting vocals and cymbals ring out creates a sense of a tight rhythm section standing in front of a much larger space, a trick common in modern pop and rock mixes where punch and size need to coexist. Conversely, letting only the low mids reverberate while cutting highs can create a dark, cavernous texture without smearing intelligibility, useful for cinematic or ambient work where sub-heavy elements need to breathe without turning into noise.

Selective damping also controls perceived material. A short, heavily damped high-band reverb reads as a soft, absorbent room, while a long, bright high-band decay reads as stone or tile. None of this requires a convolution impulse of a real space: frequency-dependent decay shaping gets you there synthetically, and it's editable in ways a fixed impulse response never will be.

## Frequency selective reverb versus convolution reverb and tone shaping

Convolution reverb captures the impulse response of a real space or hardware unit and applies its exact frequency and decay characteristics to your signal. It's accurate and often more natural-sounding for realistic spaces, but the frequency behavior is baked into the impulse: you can EQ before and after, but you can't independently change how the low band decays versus the high band the way you can with an algorithmic FDN reverb that exposes per-band controls.

Frequency selective reverb, by contrast, is a technique you apply to any reverb type, algorithmic or convolution, through external EQ, splitting, and dynamics. It's more flexible but requires manual setup rather than a single accurate snapshot of a space.

Tone shaping, meaning static EQ on the dry or wet signal without any band-dependent decay difference, addresses a different problem. It changes color but doesn't change how long each frequency range rings out. A boxy reverb notched at 2 kHz still decays the same way at 2 kHz as it does at 500 Hz, it's just quieter there. True frequency selective reverb changes the decay time itself per band, which is a structural difference, not just a tonal one.

In practice, most mixes benefit from combining all three: a convolution or algorithmic reverb for the base sound, tone shaping EQ for color, and frequency-dependent decay control (native or manually split) for how long each range actually rings.

## Common pitfalls when applying frequency selective reverb

The most common mistake is over-filtering early reflections along with the tail, which strips the sense of space entirely and leaves a thin, disconnected wash. High-pass filtering should usually apply to the whole reverb signal gently, not aggressively carve out everything below a hard cutoff.

Forgetting pre-delay is another frequent issue. Without pre-delay, especially on vocals, the reverb's first reflections arrive close enough to the dry signal to blur consonants and pitch definition, which no amount of EQ afterward fixes.

Over-splitting is also a trap: three or four reverb bands on every source adds CPU load and mixing complexity for a difference that's often inaudible once the mix is playing back at normal volume. Save multiband splitting for the sources where masking is actually a problem, typically vocals, snare, and full mix busses, rather than applying it everywhere by default.

Finally, watch for phase and comb-filtering artifacts when running parallel reverb bands through separate EQs and recombining them. Sudden hollow or thin spots when the bands sum usually mean a crossover overlap needs adjusting or one band's delay is misaligned with the others. Solo each band during setup, then check the sum, not just the individual bands in isolation.

## A working test chain for frequency selective reverb

My go-to check is simple: solo the reverb return alone, then solo it against the dry source, then check the full mix at low volume. If the low end feels loose in any of those three states, the send needs a higher high-pass cutoff before anything else changes. The two mistakes I see most often are over-filtering the early reflections along with the tail, which kills the sense of space, and skipping pre-delay entirely, which blurs vocal consonants no EQ can fix afterward.

> *— Kai*

## Getting per-band control without building it from scratch

Everything above works with stock EQ and busses, but building three-band reverb splits by hand for every session adds setup time most engineers don't have on a deadline. ToneLab from Vector DSP is built around a multi-lane parallel effects architecture with per-lane EQ targeting inside a single insert, which covers a lot of the manual routing described in the multiband section above without the extra aux tracks.

A few ways it fits into the workflow covered here:

- Set independent EQ per lane instead of duplicating sends and busses for each frequency band.
- Run parallel lanes in real time with low latency, which matters when you're auditioning decay and filtering choices live against a mix.
- Works as VST3, AU, or AAX, so it drops into most major DAWs without a format issue.

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

ToneLab is a one-time purchase at [$73.99](https://vector-dsp.com/pricing), and a demo is available to test the per-band routing against your own reverb chain before buying.

## Sources

The DAFx2020 paper on FDN reverberator design and the paper on absorbent all-pass filter reverberators cover the underlying topologies referenced above.

- [A reverberator based on absorbent all-pass filters (Dahl et al.)](https://www.dafx.de/paper-archive/2000/pdf/Dahl_Final.pdf)
- [DAFx2020 proceedings paper on FDN and frequency-band control](https://dafx2020.mdw.ac.at/proceedings/papers/DAFx2020_paper_47.pdf)

## FAQ

### What are the four types of reverb?

The main categories are plate, spring, chamber (room or hall), and convolution or algorithmic reverb, which simulate or model these physical spaces digitally. Each has a distinct decay character, and modern algorithmic reverbs can model any of them while adding frequency-dependent decay control that physical spring or plate units don't offer natively.

### Is a frequency response of 20Hz to 20kHz good?

A 20 Hz to 20 kHz frequency response covers the commonly cited range of human hearing, so gear or software claiming that range is reproducing the full audible spectrum rather than a partial one. What matters more in practice is how flat and controlled the response is across that range, not just whether the range is technically covered.

### What is the best reverb setting for vocals?

There's no single best setting since it depends on the source and mix, but a reasonable starting point is a high-pass filter on the send around 80 to 120 Hz, decay of 0.8 to 1.5 seconds, and pre-delay of 10 to 30 ms to keep the tail from blurring consonants. From there, adjust wet level and any post-reverb EQ by ear against the dry vocal.

### Which reverb plugin should I use for per-band control?

Look for a reverb that exposes separate high and low decay times, a high-frequency reference point, and per-band damping rather than one global decay knob, since these map directly to frequency-dependent decay research. For engineers who want per-band EQ control across parallel effect lanes rather than reverb-specific band splitting, ToneLab from Vector DSP offers that routing inside a single insert.

### How is frequency selective reverb different from convolution reverb?

Convolution reverb applies the fixed frequency and decay characteristics of a captured impulse response, while frequency selective reverb is a technique of independently shaping decay or tone across frequency bands, which you can apply to convolution or algorithmic reverb alike. The difference is that convolution gives you accuracy from a real space, while frequency selective processing gives you editable control over how each band behaves.
