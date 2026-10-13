---
title: "Pre Fader vs. Post Fader: Test Sends in Any DAW or Console"
description: ""
date: 2026-10-13
---

# Pre Fader vs. Post Fader: Test Sends in Any DAW or Console

![Console fader beside aux send controls](https://media.babylovegrowth.ai/blog-images/organization-30746/1791705741553_Console-fader-beside-aux-send-controls.jpeg)

A pre-fader send taps the signal before the channel fader, so its level stays fixed no matter where you move that fader. A post-fader send taps the signal after the fader, so it tracks every fader move exactly. The working rule: use pre-fader for monitor mixes and foldback, post-fader for effects and broadcast feeds, and confirm it by nudging the fader while watching the aux meter.

***

> **TL;DR:**
>
> - For monitor sends, choose pre fader and usually pre EQ, so channel tonal changes do not alter performers’ headphone mixes.
> - Use post fader for broadcast and room feeds, but check whether mute also silences the send; some systems keep it active.
> - For creative tails, switch to pre fader when you want reverb or delay to continue after the dry track fades or stops.
> - Logic Pro defaults sends to post fader, so verify saved session templates instead of assuming a monitor send kept its intended mode.
> - In parallel processing chains, keep every lane’s send position and latency compensation consistent to prevent phase cancellation when wet and dry signals recombine.

***

## Table of Contents

- [Where sends tap the signal and why the fader matters](#where-sends-tap-the-signal-and-why-the-fader-matters)
- [Real-world cases: monitors, effects, broadcast, and creative tricks](#real-world-cases-monitors-effects-broadcast-and-creative-tricks)
- [How to check and set pre or post sends in your session](#how-to-check-and-set-pre-or-post-sends-in-your-session)
- [Why send position matters for parallel DSP chains](#why-send-position-matters-for-parallel-dsp-chains)
- [The three rules I actually follow in session](#the-three-rules-i-actually-follow-in-session)
- [FAQ](#faq)
- [Sources](#sources)

## Where sends tap the signal and why the fader matters

Every channel strip has a signal path, and a send is just a point where a copy of that signal splits off. A **pre-fader** send grabs that copy before it reaches the fader, so whatever you do with the fader afterward never touches what the send carries. A **post-fader** send grabs the copy after the fader, so the send level rises and falls in lockstep with it.

![Signal paths for pre, post, and post-pan sends](https://media.babylovegrowth.ai/blog-images/organization-30746/1791705785339_Signal-paths-for-pre-post-and-post-pan-sends.jpeg)

That distinction is what keeps a reverb or delay sounding balanced. When a send is [post-fader](https://www.prosoundweb.com/tech-tip-of-the-day-pre-post-confusion/), pulling the dry channel down pulls the wet effect down with it, so the ratio between the two stays put. Pull a vocal fader down 6 dB and the reverb return drops with it instead of swamping a suddenly quiet track.

Pre-fader independence works the other way: the send level holds steady regardless of fader position, which is why it fits monitor and foldback mixes where a musician's headphone balance shouldn't shift every time someone adjusts the main mix. Pre-fader sends can still sit pre or post the channel's EQ depending on how a console or DAW routes them, and most engineers choose pre-fader and pre-EQ for monitor sends so tonal tweaks on the main channel don't bleed into the monitor world.

A third option, post-pan, behaves like post-fader but also follows the channel's pan position, which matters for stereo or surround sends where left-right placement should travel with the source.

## Real-world cases: monitors, effects, broadcast, and creative tricks

The choice between pre and post almost always comes down to one question: should this send move when the fader moves?

- **Stage monitors and in-ear mixes**: pre-fader is standard because a performer's headphone balance has to stay stable even as the front-of-house engineer rides faders throughout the show.
- **Reverb and delay returns**: post-fader is the default because it keeps the wet/dry ratio musical as the dry signal rises and falls during a mix.
- **Broadcast and room feeds**: post-fader keeps a secondary feed, like a lobby speaker or a stream mix, proportional to whatever the main fader is doing, so a muted channel stays muted everywhere.
- **Creative ambience**: a pre-fader send to a reverb or delay lets you pull the dry track all the way down while the wet tail keeps ringing, a trick producers use for a vocal that fades into pure reverb or a guitar hit that dissolves into delay after the note stops.

A vocal chain is the clearest example: a post-fader reverb send tracks every automation move on the lead vocal, which is exactly what you want for a natural-sounding room. Switch that same send to pre-fader and you can automate the dry vocal fader down to silence while the reverb tail keeps breathing, a technique used for ends of phrases or big dramatic drops. Drum rooms often run post-fader so a parallel room-mic blend rises and falls with the kit fader during a mix pass, while a guitar send built for a swelling delay effect sometimes goes pre-fader on purpose, letting the delay trail outlive the dry signal once the fader cuts.

## How to check and set pre or post sends in your session

Menu names vary, but the diagnostic never changes.

1. Solo or isolate the aux return feeding from the send you want to test.
2. Move the channel fader up and down while watching the aux meter or listening to the return.
3. If the aux level moves with the fader, [the send is post-fader](https://sound.stackexchange.com/questions/14216/difference-between-pre-and-post-fade); if it stays put, it's pre-fader.

**Pro Tip:** *Run this check once per session template rather than trusting defaults, since a saved template can carry pre/post settings from a completely different mix.*

In [Logic Pro](https://help.apple.com/logicpro/mac/9.1.6/en/logicpro/usermanual/chapter_10_section_9.html), send mode is set directly on the send slot as Post Pan, Post Fader, or Pre Fader, with Post Fader as the default so effect levels stay tied to the channel fader. Analog and digital consoles typically offer the same three options on each aux send, sometimes labeled simply "pre/post" with a separate post-pan toggle.

PFL (pre-fade listen) solo is a different tool entirely: it lets you monitor a channel's pre-fader signal in your headphones or control room without changing any routing, which is useful for checking gain staging but has nothing to do with how your aux sends are wired.

If a reverb or delay keeps ringing after you mute a channel, check whether that channel's mute bypasses its sends; many consoles and DAWs let a send stay active even when the channel itself is muted, which can look like a pre/post problem but is actually a routing setting.

## Why send position matters for parallel DSP chains

Pre and post choices get more consequential once a send feeds a parallel processing chain rather than a single effect return. If one lane of a multi-lane setup is tapped post-fader and another pre-fader, their relative balance shifts every time you touch a fader, which makes consistent recall nearly impossible across a mix.

Latency adds another layer. A send feeding a low-latency DSP chain introduces a small but real delay before the wet signal returns to the mix, and if that delay isn't compensated the same way across parallel lanes, you get comb filtering or partial phase cancellation when the wet and dry signals recombine. Keeping send position and latency compensation consistent across every lane is the only way to avoid that kind of null during a blend test.

> Consistent send position across parallel lanes, paired with matched latency compensation, is what keeps a multi-lane blend phase-coherent instead of comb-filtered.

Our [multi-lane parallel architecture](https://vector-dsp.com/blog/parallel-effects-routing/) in ToneLab was built around that exact problem, and readers chasing frequency-selective reverb tricks or [multiband parallel compression](https://vector-dsp.com/blog/multiband-parallel-compression/) setups will find more detail on aligning those lanes in our blog.

## The three rules I actually follow in session

![The three rules I actually follow in session — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1791705813670_The-three-rules-I-actually-follow-in-session-overview-diagram.jpeg)

I keep it simple: monitors and foldback get pre-fader, reverb and delay get post-fader, and broadcast or secondary room feeds get post-fader too. The exception is deliberate ambience work, where a pre-fader send lets a reverb tail outlive a muted or faded source, which I use often on vocal tails and guitar swells.

Test the routing every session rather than trusting the last project's defaults. Templates lie.

> *— Kai*

## FAQ

### When should I use post-fader sends?

Use post-fader whenever you want the send level to track the channel fader, which covers most reverb and delay returns and any broadcast or room feed that should stay proportional to the main mix. It's also the default send mode in Logic Pro and most consoles for exactly that reason.

### Should monitor mixes be pre-fader or post-fader?

Monitor and foldback mixes should run pre-fader so a performer's headphone balance stays stable no matter how the front-of-house or tracking engineer moves the main faders. This is the standard practice referenced in live sound troubleshooting guides.

### When should I use pre-fader metering?

Pre-fader metering, often accessed through PFL solo, lets you check a channel's level or gain staging independent of where the fader sits, which is useful for setting input gain before you start riding the fader in a mix.

### What does a pre-fader send actually do?

A pre-fader send taps the channel's signal before it reaches the fader, so the send level stays constant regardless of fader position. That makes it the right choice any time you need a mix that's independent of the main fader moves, like monitor feeds or sustained ambience effects.

## Sources

- [Tech Tip Of The Day: Pre/Post Confusion - ProSoundWeb](https://www.prosoundweb.com/tech-tip-of-the-day-pre-post-confusion/)
- [Using pre fader, post fader, and post pan sends — Logic Pro user guide](https://help.apple.com/logicpro/mac/9.1.6/en/logicpro/usermanual/chapter_10_section_9.html)
- [Difference between pre and post fade - Sound.StackExchange](https://sound.stackexchange.com/questions/14216/difference-between-pre-and-post-fade)

## Recommended

- [Parallel Effects Routing for Producers: 5 Step DAW Setup, Per Lane Tips](https://vector-dsp.com/blog/parallel-effects-routing)
- [2–4 dB Test: When Engineers Should Use Saturation Before Compression](https://vector-dsp.com/blog/saturation-before-compression)
- [Avoid Mono Collapse: Sample Delay Parallel Processing for Producers](https://vector-dsp.com/blog/mono-compatibility-parallel-processing)
- [2–3 Band Multiband Parallel Compression for Engineers: Per Band Blends](https://vector-dsp.com/blog/multiband-parallel-compression)
