---
title: "AU Sidechain Routing: How It Works and How to Set It Up"
description: ""
date: 2026-10-21
---

# AU Sidechain Routing: How It Works and How to Set It Up

![Producer routing a kick bus to an AU plugin](https://media.babylovegrowth.ai/blog-images/organization-30746/1792406992053_Producer-routing-a-kick-bus-to-an-AU-plugin.jpeg)

Sidechain routing in an Audio Unit (AU) plugin means the plugin exposes a second input, and your DAW feeds another track into it. The plugin reads that signal as a trigger and does not play it back. In Logic Pro, you open the plugin window, find the Side Chain menu in the header and pick the track you want as the trigger. If that menu is missing or does nothing, the cause is almost always the plugin, the source track or the routing, and each is easy to check.

This guide covers how AU sidechains work, step-by-step setup in Logic Pro and Ableton Live, and the failures people hit most often.

## TL;DR

- An AU sidechain is an auxiliary input bus. The host sends a second signal to it, and the plugin uses that signal as a control, not as audio to output.
- In Logic Pro, choose the trigger from the Side Chain menu in the plugin header. The plugin must offer a sidechain input, or the menu will not appear.
- Ducking is only one use. The same input can drive gates, filters, vocoders and any other effect that reacts to a control signal.
- If you hear no effect, confirm that the external source is actually selected, that the sidechain is switched on in the plugin, and that the trigger track is producing signal.

## Table of Contents

- [What an AU sidechain actually is](#what-an-au-sidechain-actually-is)
- [Sidechain is more than ducking](#sidechain-is-more-than-ducking)
- [Setting up AU sidechain routing in Logic Pro](#setting-up-au-sidechain-routing-in-logic-pro)
- [Setting up sidechain for an AU plugin in Ableton Live](#setting-up-sidechain-for-an-au-plugin-in-ableton-live)
- [Why your AU sidechain does nothing](#why-your-au-sidechain-does-nothing)
- [Perspective: what we think about sidechain routing](#perspective-what-we-think-about-sidechain-routing)
- [A practical way to test any sidechain setup](#a-practical-way-to-test-any-sidechain-setup)
- [Where a multi-lane insert fits](#where-a-multi-lane-insert-fits)
- [FAQ](#faq)
- [Sources](#sources)

## What an AU sidechain actually is

A normal effect has one audio input and one audio output. A sidechain-capable effect adds a second input. Apple's own [Audio Unit programming guide](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/AudioUnitProgrammingGuide/TheAudioUnit/TheAudioUnit.html) notes that an effect unit typically needs just one input bus and one output bus, and that a unit can declare more when its design calls for them. A sidechain is that extra bus. The AUv3 standard also [allows multiple inputs and outputs per plugin](https://abwiki.loopypro.com/doku.php?id=au_multi_bus), though support depended on hosts catching up.

That explains most of what confuses people:

- **The plugin decides whether a sidechain exists.** Your DAW cannot add a key input to an effect that was not built with one.
- **The DAW only does the wiring.** It lists the tracks and buses you can pick from and sends the chosen signal to the extra bus.
- **The key signal is not heard.** It is analyzed. In a compressor, the level of the trigger (peak or RMS) decides how much gain reduction the main signal receives.

MusicTech makes the same point in its [Logic Pro sidechain tutorial](https://musictech.com/tutorials/logic-pro/how-to-sidechain-in-logic-pro-x/): compressors and gates have an audio input for the signal being processed plus a separate sidechain or external key input.

### Internal versus external sidechain

The "internal" sidechain is the signal already on the track where the plugin sits. Choosing an external source swaps the detector's input to another track. Sound on Sound's [guide to sidechains in Logic](https://www.soundonsound.com/techniques/logic-using-sidechains) describes where the control lives: on plugins that offer it, the Side Chain drop-down sits at the right-hand end of the gray strip at the top of the plugin's control panel.

One detail from Apple's documentation trips people up. On Logic's Compressor, [the side chain parameters stay active even when no external source is selected](https://support.apple.com/guide/logicpro/compressor-side-chain-parameters-lgce0b2501de/mac). So you can turn on a side chain filter, set it, and hear no routing at all because the detector is still listening to the track's own signal.

![Internal and external sidechain signal paths](https://media.babylovegrowth.ai/blog-images/organization-30746/1792407046929_Internal-and-external-sidechain-signal-paths.jpeg)

## Sidechain is more than ducking

Most people meet sidechaining as the kick-and-bass pump in dance music. That is one application. Any plugin with a key input can use another signal to control something:

- **Compressor ducking:** a kick lowers a bass, a vocal lowers a pad.
- **Gate or expander keying:** a hi-hat pattern opens a gate on a sustained synth.
- **Vocoder or filter modulation:** a speech signal shapes a synth.
- **Time-based effects:** a reverb or delay tail drops while the dry source is active and returns in the gaps. We cover that in detail in our posts on [reverb ducking](https://vector-dsp.com/blog/reverb-ducking/) and [ducking delay](https://vector-dsp.com/blog/ducking-delay/).

The practical consequence is that the routing is only half of the sound. The character of a ducking effect comes from the plugin's attack, release, threshold and ratio, and the detector's filtering. Two producers can route identically and get very different results.

## Setting up AU sidechain routing in Logic Pro

These steps assume a recent Logic Pro and a sidechain-capable plugin, such as Logic's own Compressor.

1. **Pick the trigger track.** This is the track whose level will control the effect, for example a kick drum track.
2. **Insert the plugin on the target track.** This is the track you want to be affected, such as the bass. Put the compressor, gate or other sidechain-capable effect in an Audio FX slot.
3. **Open the plugin window.** Apple notes the plugin window [opens automatically on insertion](https://support.apple.com/en-ae/guide/logicpro/lgcpbc21a1fd/mac) unless you turned that behavior off in the View settings.
4. **Open the Side Chain menu in the header.** Choose the kick track. Apple's page on [using Compressor](https://support.apple.com/guide/logicpro/use-compressor-lgcef1bec9f3/mac) describes this exact use: the dynamics of another channel strip serve as the control source, for instance a drum groove acting on a bass.
5. **Play both tracks and watch the gain reduction meter.** It should move in time with the trigger, not with the bass itself.
6. **Shape the response.** Set the threshold so the trigger crosses it reliably, then adjust attack and release by ear.

### When the trigger is an instrument or a bus

If the trigger comes from a software instrument or a group of sounds, you may not see it listed or it may not behave as expected. A reliable workaround is to send the sound to a bus and select that bus in the Side Chain menu. Sending the kick through a bus also lets you choose what the detector hears, for example a kick without the room sound.

![When the trigger is an instrument or a bus — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792407066754_When-the-trigger-is-an-instrument-or-a-bus-overview-diagram.jpeg)

### Starting values for a kick-and-bass duck

These are starting points to adjust by ear, not rules:

| Control | Starting point | What it changes |
|---|---|---|
| Threshold | Low enough that every kick hit registers | Whether the effect fires consistently |
| Ratio | Moderate to high for obvious ducking, lower for subtle | Depth of the duck |
| Attack | Very fast | How quickly the bass gets out of the way |
| Release | Set to the tempo, so the bass recovers before the next hit | The pump or breathe feel |
| Detector | Peak for sharp triggers, RMS for smoother ones | How the trigger's level is read |

MusicTech's experts stress this very point: the success of a ducking effect depends heavily on attack and release, rather than just on the routing.

## Setting up sidechain for an AU plugin in Ableton Live

Ableton Live hosts AU plugins on macOS, and the process differs from Logic's because the routing panel lives in Live's device view. Ableton's [help article on sidechaining third-party plugins](https://help.ableton.com/hc/en-us/articles/209775325-Sidechaining-a-third-party-plug-in) covers it for Live 10.1 and later:

1. Add a sidechain-capable VST or Audio Unit plugin to the target track.
2. Enable sidechain support inside the plugin's own interface. This varies by plugin, so check its manual. In Ableton's example, the sidechain source in the plugin is set to an external option.
3. Make sure a trigger track exists.
4. In Live's plugin view, enable Sidechain and choose the trigger in the Audio From drop-down.
5. Adjust the gain and mix.

The key line from Ableton: sidechain functionality depends on the plugin itself, and if the plugin does not support external sidechaining, the routing has no effect. That is the single most common reason for a silent sidechain in any host.

## Why your AU sidechain does nothing

Work through these in order. They go from most to least likely.

### 1. The plugin has no sidechain input

Check the manual or the plugin's product page. In Logic, no Side Chain menu in the header usually means no key input. Some plugins fake a sidechain with an internal detector filter, which is not the same as an external input.

### 2. The external source is not selected

Sound on Sound notes engineers regularly confuse internal and external modes, and recommend verifying which input is active on the plugin. As covered above, Logic's sidechain controls can be live while the source is still the track itself. Re-open the menu and confirm the trigger track is chosen.

### 3. The plugin's own sidechain switch is off

In Live, many third-party plugins require you to enable the key input inside their own interface as well as in Live's routing panel. Do both.

### 4. The trigger track is silent or sent post-fader at zero

Sidechain taps usually follow what the trigger track outputs. If the track is muted or its fader is down, the detector can be starved. Check the trigger's signal with its own meter.

### 5. The plugin is not showing at all

If the AU does not appear in the Audio FX list, that is a validation or install problem, not a routing one. Our walkthrough of [six quick checks for missing AU plugins in Logic Pro](https://vector-dsp.com/blog/au-plugin-not-showing/) covers it.

### 6. Latency or dropouts make the effect feel late

If the pump sounds off the grid, a plugin may be adding latency, or the audio engine may be struggling. Our guide to [fixing Apple Core Audio dropouts](https://vector-dsp.com/blog/apple-core-audio-dropouts/) goes through the buffer and device checks.

## Perspective: what we think about sidechain routing

We build audio plugins around real-time DSP, so we look at sidechain routing from the plugin side of the wire. The host gives a plugin an extra bus, and from then on it is the plugin's job to use that signal with care.

Three things matter to us when a plugin depends on a control signal:

- **The detector has to be intentional.** What the plugin listens to, and how it smooths it, shapes the result as much as any gain curve. A trigger that is filtered or smoothed badly produces chatter, clicks or a pump that fights the groove.
- **Latency must stay honest.** If the key signal and the main signal are not aligned, the duck lands late. Real-time constraints and low latency are design requirements for us, not afterthoughts.
- **Ducking should serve the mix, not announce itself.** The most useful sidechain work is often the quietest, such as clearing a reverb or delay tail so the dry sound stays clear while the space returns between phrases. That is why we wrote about [keeping reverb depth without pumping](https://vector-dsp.com/blog/reverb-ducking/).

Our own focus is per-band, lane-based processing within a single insert, built for precise control. If a sidechain duck is muddying one region of the spectrum, the better fix is often to act on that region only, not to duck the whole signal. Our guides to [splitting frequencies in a DAW without phase problems](https://vector-dsp.com/blog/split-frequencies-in-daw/) and [parallel effects routing](https://vector-dsp.com/blog/parallel-effects-routing/) go into that approach.

> *— Kai*

## A practical way to test any sidechain setup

Before you trust a routing for a whole session, run a two-minute test:

1. Loop four bars with the trigger and target playing together.
2. Solo the target and watch the plugin's reduction or activity meter. It should move with the trigger.
3. Mute the trigger. The plugin should stop reacting, while the target stays playing. If it keeps reacting, the detector is still hearing the target.
4. Switch the sidechain source back to internal and compare. The difference tells you the external input is truly active.
5. Bounce a few bars and listen again on other speakers. Heavy ducking that sounds right solo often sounds exaggerated in the full mix.

## Where a multi-lane insert fits

Sidechain routing is the right tool when you need one track to control another. It is not always the right tool when you want to treat one part of a sound differently from another within the same track. A kick-and-bass clash, for example, is usually only a low-frequency problem. Ducking the entire bass removes midrange and top end that did not need to move.

This is where we built ToneLab. It is a single plugin that runs multiple parallel effect lanes, with EQ targeting on each lane, so you can shape a specific region without splitting a track across several channels. It ships in VST3, AU and AAX formats for Windows and macOS, and it is a one-time purchase at [73.99 USD on our pricing page](https://vector-dsp.com/pricing). A free demo is available, so you can test it in your own DAW before buying, and minor version updates are included.

## FAQ

### How do I sidechain in Logic Pro?

Insert a sidechain-capable plugin, such as Compressor, on the track you want to affect. Open the plugin window, click the Side Chain menu in the header and choose the trigger track. Then set threshold, attack and release while watching the gain reduction meter.

### Why is the Side Chain menu missing or gray in my AU plugin?

The plugin probably has no sidechain input, because the host can only route to an auxiliary bus the plugin declares. Check the plugin's manual for external sidechain support. If the plugin is supposed to have one, rescan or reinstall it and reopen the project.

### Can I sidechain from a software instrument?

Often yes, but sources sometimes do not appear in the list directly. Route the instrument to a bus and select that bus as the sidechain source. This also lets you control exactly what the plugin hears.

### Is sidechaining only for kick-and-bass pumping?

No. A sidechain is simply an extra control input. [Sound on Sound](https://www.soundonsound.com/techniques/logic-using-sidechains) treats it as a general way of feeding one signal into another plugin, and it works for gating, filtering and vocoding as well as ducking.

### Do I hear the sidechain signal?

Not unless the plugin offers a listen or monitor option for the key signal. By default the sidechain is analyzed by the detector and never reaches the output.

## Sources

- [Compressor side chain parameters in Logic Pro for Mac, Apple Support](https://support.apple.com/guide/logicpro/compressor-side-chain-parameters-lgce0b2501de/mac)
- [Use Compressor in Logic Pro for Mac, Apple Support](https://support.apple.com/guide/logicpro/use-compressor-lgcef1bec9f3/mac)
- [Work in the plug-in window in Logic Pro for Mac, Apple Support](https://support.apple.com/en-ae/guide/logicpro/lgcpbc21a1fd/mac)
- [The Audio Unit, Apple Developer Documentation](https://developer.apple.com/library/archive/documentation/MusicAudio/Conceptual/AudioUnitProgrammingGuide/TheAudioUnit/TheAudioUnit.html)
- [AU Multi-Bus Audio Units and Hosts, Audiobus Wiki](https://abwiki.loopypro.com/doku.php?id=au_multi_bus)
- [Logic: Using Sidechains, Sound on Sound](https://www.soundonsound.com/techniques/logic-using-sidechains)
- [How to sidechain in Logic Pro X, MusicTech](https://musictech.com/tutorials/logic-pro/how-to-sidechain-in-logic-pro-x/)
- [Sidechaining a third party plug-in, Ableton Help](https://help.ableton.com/hc/en-us/articles/209775325-Sidechaining-a-third-party-plug-in)

## Recommended

- [Parallel Effects Routing for Producers: 5 Step DAW Setup, Per Lane Tips](https://vector-dsp.com/blog/parallel-effects-routing)
- [Reverb Ducking: Sidechain EQ Keeps Depth Without Pumping in Any DAW](https://vector-dsp.com/blog/reverb-ducking)
- [Parallel EQ: Three DAW Routes, but Phase Comes First](https://vector-dsp.com/blog/parallel-eq)
- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression)
