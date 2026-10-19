---
title: "AU vs VST: Which Plugin Format Should You Use?"
description: ""
date: 2026-10-19
---

# AU vs VST: Which Plugin Format Should You Use?

![Producer comparing plugin formats at a workstation](https://media.babylovegrowth.ai/blog-images/organization-30746/1792240258502_Producer-comparing-plugin-formats-at-a-workstation.jpeg)

If your DAW offers both, the choice between AU (Audio Units) and VST usually comes down to your host and your operating system, not to sound. AU is Apple's format and runs only on macOS and iOS. VST, in its current VST3 form, runs on Windows, macOS and Linux. On a Mac, use whichever format your DAW handles best, and if you work in Logic Pro, that is AU.

The rest of this guide covers where the formats really differ, which one to pick in common DAWs, and what to check when a plugin refuses to show up.

## TL;DR

- **Sound quality is identical.** [Formats do not change the audio](https://intercom.help/audiostrom/en/articles/8315262-plugin-formats). They change how the plugin talks to the host.
- **Windows:** use VST3. AU does not exist there.
- **Mac with Logic Pro or GarageBand:** use AU. **Mac with Ableton Live, Reaper, Cubase, Studio One or FL Studio:** VST3 is the safe default, AU is a valid alternative.
- **Pro Tools needs AAX**, a third format, regardless of platform.
- If a plugin misbehaves in one format, try the other. Do not uninstall anything until you have tested both.

## Table of Contents

- [What a plugin format actually is](#what-a-plugin-format-actually-is)
- [Does AU sound different from VST?](#does-au-sound-different-from-vst)
- [Where the formats really differ](#where-the-formats-really-differ)
- [Which format to use in your DAW](#which-format-to-use-in-your-daw)
- [A simple decision process](#a-simple-decision-process)
- [State recall and saving projects](#state-recall-and-saving-projects)
- [Performance: what to expect and what not to promise](#performance-what-to-expect-and-what-not-to-promise)
- [Our perspective](#our-perspective)
- [When a plugin does not show up](#when-a-plugin-does-not-show-up)
- [What to look for in a plugin purchase](#what-to-look-for-in-a-plugin-purchase)
- [Try the formats on a real plugin](#try-the-formats-on-a-real-plugin)
- [FAQ](#faq)
- [Sources](#sources)

## What a plugin format actually is

A plugin format is a contract. It defines how a DAW finds a plugin, loads it, sends it audio and MIDI, hands it parameters for automation, and saves and restores its state. The plugin's DSP, the math that shapes your signal, is written once. The format is the wrapper around it.

That is why most developers ship one codebase in several wrappers. A VST3 file, an AU component and an AAX module of the same plugin contain the same processing. What differs is the plumbing between the plugin and each host.

Three formats cover almost everything you will install:

| Format | Made by | Platforms | Typical hosts |
|---|---|---|---|
| VST3 | Steinberg | Windows, macOS, Linux | Ableton Live, Cubase, FL Studio, Reaper, Studio One, Bitwig |
| AU | Apple | macOS, iOS | Logic Pro, GarageBand, plus many third-party Mac DAWs |
| AAX | Avid | Windows, macOS | Pro Tools |

You may also see VST2 on older plugin libraries. [VST3 is the current standard and has replaced it](https://www.elgato.com/us/en/explorer/products/wave/what-is-a-vst/), bringing lower CPU use when idle, side-chain support and more precise automation according to that guide. If a plugin is offered in both VST2 and VST3, choose VST3.

## Does AU sound different from VST?

No. [Documentation from a plugin host developer](https://intercom.help/audiostrom/en/articles/8315262-plugin-formats) states that there is no variation in sound quality between formats. Both process the same stream of samples with the same algorithm.

If you hear a difference when you swap formats, look for these causes before blaming the format:

1. **Different settings.** A preset recalled in one format but not the other, or a parameter that did not load.
2. **Gain staging.** One instance sits on a different channel strip, or sits before or after another insert.
3. **Latency compensation.** If a plugin reports its latency differently to a host, parallel tracks can drift out of alignment and create comb filtering that sounds like a tonal change.
4. **Oversampling or quality modes** set differently between instances.

A proper test: load both formats on duplicate tracks, flip the polarity of one, and null them with identical settings. If the sum goes silent, they are the same. Any residue points to a setting, not to the format.

## Where the formats really differ

The differences are practical and sit in the host, not in the sound.

### Platform reach

This is the biggest one. AU is macOS and iOS only. If you move between a Windows desktop and a Mac laptop, VST3 is the one format both machines share, so your sessions and plugin choices stay consistent.

![AU and VST3 platform compatibility comparison](https://media.babylovegrowth.ai/blog-images/organization-30746/1792240285439_AU-and-VST3-platform-compatibility-comparison.jpeg)

### Stability and testing

Practitioners often report that VST implementations get tested across a wider range of hosts, which can mean fewer surprises. [The Gig Performer team](https://gigperformer.com/which-plugin-format-is-better-vst-vs-vst3-vs-au) says the honest answer is that it depends, and recommends trying formats yourself. That is a fair summary. A given plugin may be rock solid as AU and quirky as VST3 in one DAW, and the reverse in another.

### Scanning and caching

AU plugins are registered with macOS and cached by the host. [Users commonly describe](https://gigperformer.com/which-plugin-format-is-better-vst-vs-vst3-vs-au) a freshly installed or updated AU not appearing until they log out or restart. VST3 files sit in a plain folder the host scans, so it tends to be less fussy. If your AU is missing in Logic, our [six quick checks for missing AU plugins in Logic Pro](https://vector-dsp.com/blog/au-plugin-not-showing/) walk through validation and cache problems in order.

### File locations and management

VST3 plugins live in standard folders. On Windows that is `C:\Program Files\Common Files\VST3`, and our [five-step VST3 install guide](https://vector-dsp.com/blog/install-vst3-folder-location/) covers it. On a Mac, AU components are placed in the system's Components folders, which gives you less freedom to organize them. VST3 files can be grouped or moved in ways that suit you, as long as your host scans the path.

### Features

VST3 supports side-chaining, idle-aware processing and finer parameter handling. AU supports these too in capable hosts, but how smoothly depends on the DAW's implementation. Check how your host exposes side-chain inputs for each format before you build a template around one.

## Which format to use in your DAW

This is the question behind most searches. Here is the practical map.

### Logic Pro and GarageBand (macOS)

Use AU. Logic hosts AU plugins and does not load VST3. If a developer offers a plugin only as VST3, it will not appear in Logic at all.

### Ableton Live (Mac)

Live supports both AU and VST3 on macOS. Either works. Many users standardize on VST3 so projects open the same way on a Windows machine, and so they can find one folder of plugins. If you only ever work on a Mac, pick one and stay consistent so you do not end up with two entries for each plugin in the browser.

### Ableton Live, FL Studio, Cubase, Reaper, Studio One, Bitwig (Windows)

VST3. There is no AU option, so there is nothing to decide.

### FL Studio

FL Studio does read AU on Mac, but forum threads tend to say VST3 integrates more smoothly. Treat that as a reason to try VST3 first and fall back to AU if a specific plugin acts up.

### Pro Tools

AAX only. VST3 and AU plugins will not show in Pro Tools, however well they work elsewhere. If an AAX plugin is missing, our [10 to 20 minute AAX fix and DSP verification](https://vector-dsp.com/blog/aax-plugin-not-showing/) covers folder placement, signing and the usual traps.

### Hosts that take both, such as Reaper

Pick one format per plugin and hide the other in the FX browser. Duplicates are the most common source of the "which one did I use in this project?" problem.

## A simple decision process

1. **Name your DAW and operating system.** Logic means AU. Pro Tools means AAX. Everything else points to VST3.
2. **Check the plugin's supported formats** before you buy, not after.
3. **Install one format first.** Run it for a week of real sessions.
4. **Switch only for a reason**, such as a crash, a missing side-chain, a scanning delay or a feature your host exposes in one format only.
5. **Keep the format consistent in a project.** Swapping formats mid-session can lose automation links or saved state in some hosts.

## State recall and saving projects

Format choice can affect whether a project reopens exactly as you left it. Hosts save a plugin's state, then hand it back on load. Most of the time this works. When it does not, the cause is usually how a particular host handles a particular format, or how the plugin serializes its parameters. Developers can dig into this in our write-up on [stopping DAWs from overwriting plugin state](https://vector-dsp.com/blog/plugin-state-recall-issues/). As a user, the tip is simple: if recall is flaky in one format, test the other, and bounce important stems to audio before you archive a project.

## Performance: what to expect and what not to promise

You will find confident claims online that AU uses less CPU on a Mac, and equally confident claims that VST3 is faster. Neither holds up as a rule. CPU load depends on the plugin's DSP, buffer size, host, and what else is running. If you get dropouts, the format is rarely the first suspect. Look at buffer size, sample rate, aggregate devices and USB hubs first; our [three engineer-tested steps for Core Audio dropouts](https://vector-dsp.com/blog/apple-core-audio-dropouts/) cover that.

One format-related thing that does help: modern VST3 hosts can skip processing on silent inputs, which trims idle load in big sessions. [That is one of the VST3 improvements](https://www.elgato.com/us/en/explorer/products/wave/what-is-a-vst/) over VST2.

## Our perspective

We build plugins in C++ with JUCE, and we ship VST3, AU and AAX from the same DSP core. That gives us an unusual view of this debate: from the inside, the formats are three doors into the same room.

When we test a build, the processing is bit-for-bit the same across formats. What we spend time on is the host. Each DAW has its own opinion about when to call a plugin, how to report latency, how to restore state and how to scale a window. A bug that shows up in AU in one host and never in VST3 in another is almost always about the host's behavior, not the format's quality.

So our advice is boring on purpose. Choose the format your DAW is built around, keep it consistent, and judge a plugin by what it does to your signal. A thoughtful DSP design with low latency beats any format debate. If you want to hear what we mean by design, look at things like [aliasing control in nonlinear plugins](https://vector-dsp.com/blog/avoid-aliasing-in-plugins/) or how [per-band processing avoids phase problems](https://vector-dsp.com/blog/split-frequencies-in-daw/). Those choices affect your mix far more than a file extension does.

> *— Kai*

## When a plugin does not show up

Nine times out of ten the format is right and the install is wrong. Run through this list:

- **Right format for the host?** AU in Pro Tools or VST3 in Logic will never appear.
- **Right folder?** For VST3 on Windows, the Common Files VST3 folder. Rescan after copying.
- **Rescan or reset the plugin cache** in your DAW's plugin manager.
- **Restart the DAW, then log out or reboot** if an AU still does not appear on a Mac, as users commonly report.
- **Architecture match.** Make sure the build matches your Mac's processor type and your host's mode.
- **Window scaling or blank GUI** on high-DPI screens is a separate issue. Developers can read about it in [fixing plugin UI scaling](https://vector-dsp.com/blog/ui-scaling-in-plugins/).

## What to look for in a plugin purchase

Formats matter at the moment of purchase because you want to pay once and have it work everywhere you work. Before you buy, check:

- Does it ship in the format your DAW needs, including AAX if you use Pro Tools?
- Does it run on both your operating systems if you switch machines?
- Is there a demo, so you can test it in your host before paying?
- Do minor updates come with the license?
- Does it report latency correctly so tracks stay aligned?

## Try the formats on a real plugin

ToneLab, our multi-lane effects plugin with per-lane EQ targeting, ships as VST3, AU and AAX for Windows and macOS. It costs $73.99 as a one-time license, and a free demo lets you load it in your own DAW before buying. If you are deciding between AU and VST3 on a Mac, the demo is an easy way to run the null test above. See [ToneLab on the pricing page](https://vector-dsp.com/pricing) or the [product overview](https://vector-dsp.com/).

## FAQ

### Should I use VST or AU on Mac?

If your DAW is Logic Pro or GarageBand, use AU, because those hosts do not load VST3. In Ableton Live, Reaper, Cubase or Studio One, either works, and VST3 is a sensible default if you also use Windows. Pick one format and stay with it so your plugin lists stay clean.

### Is AU better than VST3?

Not in any way you can hear. [Sound quality does not vary between formats](https://intercom.help/audiostrom/en/articles/8315262-plugin-formats), so "better" means better behavior in your host. Test both on the plugin and DAW you use, and keep whichever is steadier.

### What is better, VST or VST3?

VST3. It is [the current standard](https://www.elgato.com/us/en/explorer/products/wave/what-is-a-vst/) and brings better idle efficiency, side-chain support and finer automation than VST2. Use VST2 only when no VST3 version exists.

### Where are AU plugins on a Mac?

AU plugins are installed as component files in the system's Components folders, either at the system level or in your user Library. You do not browse to them from the DAW. The host finds them through macOS. If one is missing, see our [Logic Pro AU checklist](https://vector-dsp.com/blog/au-plugin-not-showing/).

### Can I run AU and VST3 of the same plugin together?

Yes, in hosts that load both. They are independent instances with no conflict. The only trouble is organizational: duplicates in your browser and a mixed-format project that is harder to move between machines.

## Sources

- [Plugin formats | LiveProfessor Documentation](https://intercom.help/audiostrom/en/articles/8315262-plugin-formats)
- [Which plugin format is better: VST vs VST3 vs AU | Gig Performer](https://gigperformer.com/which-plugin-format-is-better-vst-vs-vst3-vs-au)
- [What is a VST? | Elgato](https://www.elgato.com/us/en/explorer/products/wave/what-is-a-vst/)

## Recommended

- [5 Step VST3 Install: Put .vst3 in C:\Program Files\Common Files\VST3](https://vector-dsp.com/blog/install-vst3-folder-location)
- [6 Quick Checks to Fix Missing AU Plugins in Logic Pro](https://vector-dsp.com/blog/au-plugin-not-showing)
