---
title: "WASAPI vs ASIO: Which Windows Audio Driver for Mixing?"
description: ""
date: 2026-10-27
---

# WASAPI vs ASIO: Which Windows Audio Driver for Mixing?

![Engineer choosing an audio driver while mixing](https://media.babylovegrowth.ai/blog-images/organization-30746/1792919082684_Engineer-choosing-an-audio-driver-while-mixing.jpeg)

Use your interface's own ASIO driver for tracking, monitoring through the DAW and mixing on Windows. Use WASAPI when you have no interface with an ASIO driver, or when you want to listen to music or video from other apps while you work. WASAPI Exclusive can get close to ASIO for playback, but ASIO is still the path built for pro audio sessions. The rest of this article explains why, what the settings mean, and how to test your own system in ten minutes.

## TL;DR

- ASIO talks to your interface's hardware driver directly, skipping the Windows audio engine. It is the default choice for recording and live monitoring in a DAW.
- WASAPI Shared lets several apps play at once but runs through the Windows mixer. WASAPI Exclusive hands the device to one app and gets much closer to ASIO behavior.
- If your interface ships an ASIO driver, use it. Skip ASIO4ALL unless you have no interface driver at all.
- On a Mac there is no choice to make: Core Audio is the system audio layer, and the question becomes buffer size and driver quality.
- Measure instead of guessing: set the buffer, check the reported latency in your DAW, and record a click through the loop.

## Table of Contents

- [What ASIO and WASAPI actually are](#what-asio-and-wasapi-actually-are)
- [Latency: where the milliseconds come from](#latency-where-the-milliseconds-come-from)
- [WASAPI Shared vs Exclusive](#wasapi-shared-vs-exclusive)
- [Do you need ASIO4ALL?](#do-you-need-asio4all)
- [And what about Core Audio?](#and-what-about-core-audio)
- [A practical setup for mixing engineers](#a-practical-setup-for-mixing-engineers)
- [Where parallel and multiband processing fits in](#where-parallel-and-multiband-processing-fits-in)
- [Our perspective](#our-perspective)
- [FAQ](#faq)
- [Sources](#sources)

## What ASIO and WASAPI actually are

ASIO stands for Audio Stream Input/Output. Steinberg created it, and [Focusrite describes it](https://support.focusrite.com/hc/en-gb/articles/360013509640-What-do-the-terms-ASIO-and-WDM-mean) as intended for low-latency recording and playback with high channel counts. Its main trick is architectural: [ASIO lets software talk directly to the audio hardware](https://www.linkwitzlab.com/medien/dCS_Guide_to_Computer_Audio(2).pdf), bypassing intermediate Windows layers such as the Windows audio engine.

WASAPI, the Windows Audio Session API, is Microsoft's own native interface. Applications reach the audio driver through sessions, and Windows decides how those sessions share the hardware. It is stable and built into every modern Windows install, which is why plenty of apps default to it.

So the comparison is not "old versus new" or "good versus bad". One is a vendor-driver path designed around a single professional application owning the device. The other is an operating system service designed to keep a whole desktop of apps working together, with an exclusive escape hatch.

![ASIO and WASAPI paths to audio hardware](https://media.babylovegrowth.ai/blog-images/organization-30746/1792919168433_ASIO-and-WASAPI-paths-to-audio-hardware.jpeg)

## Latency: where the milliseconds come from

![Latency: where the milliseconds come from — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1792919131650_Latency-where-the-milliseconds-come-from-overview-diagram.jpeg)

Latency in a DAW is mostly buffer size. A buffer of 128 samples at 48 kHz holds about 2.7 ms of audio (128 divided by 48,000). At 256 samples it is about 5.3 ms, and at 64 samples about 1.3 ms. Input and output each add a buffer, plus converter and driver overhead, so round-trip time is always higher than a single buffer. Your DAW's audio settings panel usually shows the figure it calculates.

The driver model decides how small a buffer you can run before the audio breaks up with clicks and dropouts. Here the two APIs differ:

- **ASIO with a manufacturer driver** is written by the interface maker for that exact hardware. Microsoft's own Windows music developer guidance says a supported external interface with a native ASIO driver [generally gives much lower latency and more tracks](https://devblogs.microsoft.com/windows-music-dev/unofficial-windows-10-audio-workstation-build-and-tweak-guide-part-2/) than ASIO4ALL or WDM/WASAPI.
- **WASAPI Shared** goes through the Windows audio engine. Microsoft's low-latency documentation notes that by default [applications in Windows 10 and later use 10 ms buffers](https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/low-latency-audio) to render and capture, though apps can ask the driver for smaller ones if it supports them.
- **WASAPI Exclusive** skips the engine. Like ASIO, it gives [a single application direct access to the hardware](https://www.linkwitzlab.com/medien/dCS_Guide_to_Computer_Audio(2).pdf), which is why it can be so much faster than shared mode.

How much latency is too much? [LEWITT notes](https://www.lewitt-audio.com/blog/what-is-asio) that in most scenarios latency below 10 ms is not noticeable while recording. That matches what most of us hear: a singer monitoring through the DAW starts to feel the delay somewhere above that, while a guitarist playing through an amp sim feels it sooner. Keyboard players and drummers, who trigger sounds with their hands, are usually the least forgiving.

### A quick comparison

| | ASIO (interface driver) | WASAPI Exclusive | WASAPI Shared |
|---|---|---|---|
| Who writes the driver | Interface manufacturer | Microsoft API, hardware driver beneath | Microsoft |
| Other apps can play audio | No, the interface is typically held by one host | No | Yes |
| Windows mixer and sample-rate conversion | Bypassed | Bypassed | Applied |
| Typical use | Tracking, monitoring, mixing | Playback, reference listening, some DAW setups | Everyday desktop audio |
| Channel count | High, built for multichannel | Depends on the app and driver | Usually stereo mix |
| Input and output device | Same device | Chosen per app | Chosen per app |

The last two rows matter in practice. Focusrite warns that ASIO normally uses the [same device for input and output](https://support.focusrite.com/hc/en-gb/articles/360013509640-What-do-the-terms-ASIO-and-WDM-mean), so you cannot combine an interface's inputs with the computer's built-in output. Plan on monitoring through the same box you record into.

## WASAPI Shared vs Exclusive

Both modes use the same API but make very different bargains.

In shared mode, each app's audio goes to a virtual device that [mixes the streams from different apps](https://habr.com/en/articles/663352/), applies attenuation, and passes the result to the physical device. That is why you can hear a browser tab, a chat app and your DAW at once. It is also why the system picks one format for the mix and converts everything else to it.

In exclusive mode, [other system sounds and apps cannot use the hardware](https://learn.microsoft.com/en-my/answers/questions/5564452/how-do-i-turn-off-waspi) while your app holds it. The upside is direct, unaltered output. The catch is that the format you request has to match what the hardware supports, since there is no engine to convert for you. The [NAudio documentation](https://naudio.github.io/NAudio/docs/OutputDeviceTypes.html) sums up the split: shared when you need sample-rate conversion, exclusive for very low latency or bit-perfect output, ASIO for professional audio applications that need very low latency and direct hardware access.

### The classic symptoms

- **"My DAW has no sound and I can't hear YouTube."** Something holds the device exclusively. Close the DAW, or turn off "Allow applications to take exclusive control" in the Windows sound properties for your playback device.
- **"My DAW says the sample rate is not supported."** In exclusive mode the DAW must match a rate the device accepts. Set the interface's rate in its control panel and in the DAW to the same value.
- **"Everything works but it feels late."** You are probably in shared mode at a 10 ms-class buffer. Move to ASIO or exclusive and lower the buffer.

## Do you need ASIO4ALL?

Usually not. If you use an external audio interface, [Puget Systems advises](https://www.pugetsystems.com/support/guides/daw-driver-latency/) using the device's own audio driver instead of a standalone ASIO4ALL install. The generic wrapper adds a translation layer on top of Windows drivers, while the interface maker's driver talks to the hardware it was written for.

There are two situations where a generic ASIO driver still earns its keep:

1. You are on a laptop's built-in sound with no interface, and your DAW only offers ASIO. A generic driver gives you an ASIO endpoint, though Microsoft's guidance above is clear that you should not expect native-driver performance.
2. You want to run a DAW and system audio together on hardware whose ASIO driver locks the device. Some wrappers can route ASIO through WASAPI so other apps keep working.

If your interface is class compliant and has no ASIO driver, check the manufacturer's site before you reach for a wrapper. Fender's US support guidance says default Windows drivers [may be unacceptable](https://support.fender.com/hc/en-us/articles/46597753882267-How-to-reduce-USB-audio-latency-by-using-an-ASIO-driver-with-a-Windows-based-computer) when an application needs low latency, and suggests an ASIO driver in that case. For many USB interfaces, the maker supplies one.

## And what about Core Audio?

CoreAudio versus ASIO is a different kind of question. ASIO is a driver model added to Windows to get around its system audio path. Core Audio is the macOS audio layer itself, built to give apps low-latency access to hardware. So on a Mac you are not choosing between APIs. You are choosing a buffer size and a good driver, or a class compliant interface that needs none.

In user-level latency tests, engineers often report ASIO on Windows reaching slightly lower buffers than Core Audio on the same interface, but that comes down to the interface, the connection and driver quality as much as the API. Treat any claim of a clear winner with suspicion and test your own gear.

When a Mac session starts clicking and dropping out, the usual fixes are not about swapping APIs. Our [step-by-step Core Audio dropout fixes](https://vector-dsp.com/blog/apple-core-audio-dropouts/) cover the order we test things in.

## A practical setup for mixing engineers

Mixing is different from tracking, and the right driver choice follows from that.

### While tracking

Use ASIO and the smallest buffer that stays clean. Monitor either through the interface's direct monitoring (zero added delay, but no plugins) or through the DAW (plugins audible, delay equal to your round trip). Plugin delay counts too: a plugin with lookahead adds to the buffer. We wrote about why this matters in [keeping monitoring responsive with 1 to 2 ms lookahead](https://vector-dsp.com/blog/lookahead-plugins-when-tracking/), and about [why "zero latency" monitoring effects can mislead musicians](https://vector-dsp.com/blog/zero-latency-monitoring-effects/).

### While mixing

Latency stops mattering to the performer, so raise the buffer. A 512 or 1024 sample buffer gives the CPU headroom for heavy plugin chains, and you will not feel the delay while adjusting faders and EQ. If you use a DAW that compensates for plugin delay, check that it does so on every track. Our [Cubase plugin latency checklist](https://vector-dsp.com/blog/cubase-plugin-latency-fix/) walks through that.

### While listening to references

This is where WASAPI is handy. If you want to A/B a streaming reference in a browser while your session is open, you either need a shared-mode setup, or you run the reference through a track inside the DAW. Many engineers prefer the second route, because it keeps everything on one clock and one volume path.

### Ten-minute loopback test

1. Connect an output of your interface to an input with a short cable.
2. Create an audio track that records that input and play a click or single-sample impulse from another track.
3. Record the return.
4. Zoom in and measure the gap between the original and the recorded click. That is your true round-trip latency in samples.
5. Repeat at 64, 128, 256 and 512 samples with each driver option you have. Note where dropouts begin.

You will have a table of your own numbers, which beats any forum thread.

## Where parallel and multiband processing fits in

Driver latency and plugin latency add up. The audio path after ASIO or WASAPI hands your buffer to the DAW still has to pass through each plugin, and some processing approaches, like linear phase crossovers, add their own delay on top. A linear phase split can cost tens of milliseconds, which is fine on a mix bus and a problem on a live monitoring path. If you work with band-split processing, our guide on [linear phase crossovers and planning for 40 ms of latency](https://vector-dsp.com/blog/linear-phase-crossover/) gives the numbers.

A minimum-phase filter does not escape this either. It avoids pre-ringing, but it still has group delay, so it is never a free path. Treat every filter as something that costs a little time, and let the driver buffer be the one you tune.

One approach we built around this: running several frequency-targeted effects in parallel lanes inside a single insert, so the delay stays one plugin's worth instead of stacking across a chain. ToneLab, our multi-lane effects plugin with per-lane EQ, works that way, and it is $73.99 as a one-time license with a free demo on the [ToneLab page](https://vector-dsp.com/pricing).

## Our perspective

We are a small design studio, and we build plugins, so we sit on the other side of the driver from you. Our software never chooses ASIO or WASAPI. Your DAW does, and the plugin simply has to return its block of audio before the deadline the buffer sets. That makes us biased in a specific way: we care about real-time constraints more than API arguments.

Here is what we see when people report problems. Most "ASIO vs WASAPI" threads are really about one of three things: a driver that locks the device, a sample rate mismatch between Windows and the interface, or a buffer too small for the plugin chain. Swapping APIs rarely fixes the third.

Our rule is boring. Use the manufacturer's ASIO driver for sessions. Set the buffer by the task, not by pride. Measure with a loopback before you trust a number on a spec sheet. If a plugin chain breaks up at a buffer that your interface handles easily, the cause is the chain, not the driver, and that is a plugin design problem we take seriously.

> *— Kai*

## FAQ

### Is ASIO better than WASAPI?

For recording and monitoring in a DAW, yes, in most setups. A manufacturer's ASIO driver is written for your hardware and bypasses the Windows audio engine. For general desktop audio or casual playback, WASAPI is simpler and lets other apps share the device.

### Is WASAPI Exclusive as good as ASIO?

It is close for playback. Both give one application direct hardware access and skip the Windows mixer. ASIO still has the edge for multichannel work and for DAW sessions, since it was built for them and interface makers tune their drivers for it.

### Do I need ASIO if I have an audio interface?

Yes, if your DAW supports it, and you should install the interface maker's own driver. Focusrite recommends ASIO in DAWs that support it, including Cubase, Ableton Live, Pro Tools, Studio One, Reaper, Reason and Cakewalk. Class compliant interfaces may work without a custom driver, but check the maker's page for an ASIO option.

### Is ASIO4ALL needed?

Usually not. With an external interface, use its own driver. ASIO4ALL is mainly a fallback for built-in sound hardware when your DAW only offers ASIO.

### Does Core Audio on a Mac replace ASIO?

In effect, yes. Core Audio is the macOS audio layer, so there is no separate ASIO choice to make there. Your latency comes from the buffer size, the interface and its driver.

## Sources

- [What do the terms "ASIO" and "WDM" mean? (Focusrite)](https://support.focusrite.com/hc/en-gb/articles/360013509640-What-do-the-terms-ASIO-and-WDM-mean)
- [dCS Guide To Computer Audio v1.10](https://www.linkwitzlab.com/medien/dCS_Guide_to_Computer_Audio(2).pdf)
- [Unofficial Windows 10 Audio Workstation build and tweak guide, part 2 (Microsoft)](https://devblogs.microsoft.com/windows-music-dev/unofficial-windows-10-audio-workstation-build-and-tweak-guide-part-2/)
- [Low Latency Audio, Windows drivers (Microsoft Learn)](https://learn.microsoft.com/en-us/windows-hardware/drivers/audio/low-latency-audio)
- [What is ASIO? (LEWITT)](https://www.lewitt-audio.com/blog/what-is-asio)
- [Audio API Quick Start Guide](https://habr.com/en/articles/663352/)
- [How do I turn off WASAPI (Microsoft Q&A)](https://learn.microsoft.com/en-my/answers/questions/5564452/how-do-i-turn-off-waspi)
- [Understanding Output Devices (NAudio)](https://naudio.github.io/NAudio/docs/OutputDeviceTypes.html)
- [DAW Configuration for Low Latency Audio (Puget Systems)](https://www.pugetsystems.com/support/guides/daw-driver-latency/)
- [How to reduce USB audio latency by using an ASIO driver (Fender)](https://support.fender.com/hc/en-us/articles/46597753882267-How-to-reduce-USB-audio-latency-by-using-an-ASIO-driver-with-a-Windows-based-computer)

## Recommended

- [VST3 vs AU vs AAX: Which Plugin Format Does Your DAW Use?](https://vector-dsp.com/blog/au-vs-vst/)
- [10 to 20 Minute Fix and DSP Verification for AAX Plugins in Pro Tools](https://vector-dsp.com/blog/aax-plugin-not-showing/)
- [Stop DAWs Overwriting Plugin State: VST3 & JUCE Fixes for Developers](https://vector-dsp.com/blog/plugin-state-recall-issues/)
