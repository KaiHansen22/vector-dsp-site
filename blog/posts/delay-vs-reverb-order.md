---
title: "Delay vs Reverb Order: Which Goes First in a Mix"
description: ""
date: 2026-11-04
---

# Delay vs Reverb Order: Which Goes First in a Mix

![Producer comparing delay and reverb signal order](https://media.babylovegrowth.ai/blog-images/organization-30746/1793642782288_Producer-comparing-delay-and-reverb-signal-order.jpeg)

Put delay first and reverb second when you want echoes that stay readable and sit inside a believable space. Put reverb first and delay second when you want a deliberately blurred, growing wash. Neither order is wrong, but they produce very different results, and the default for most vocals, leads and guitars is delay into reverb.

Below we cover what each order does to the signal, how to set up both in a DAW with inserts or sends, and how to keep the result clear in a dense mix.

## TL;DR

- Delay then reverb: each repeat gets its own reverb tail. Echoes stay audible, softened and placed in a room. This is the safe default for vocals and leads.
- Reverb then delay: the delay repeats the whole reverb tail. You get a thicker, less defined wash, which suits pads, sound beds and effects.
- Parallel routing (delay and reverb on separate sends) keeps the two from interacting and gives the most clarity.
- In a DAW you can flip the order in seconds, so decide with your ears on the actual part, in context.
- Whatever the order, filter the low end of the repeats and tails so the mix does not clog.

## Table of Contents

- [The short answer: delay first, reverb last](#the-short-answer-delay-first-reverb-last)
- [What each order actually sounds like](#what-each-order-actually-sounds-like)
- [Why the order changes the sound](#why-the-order-changes-the-sound)
- [Delay before reverb: setting it up for a vocal or lead](#delay-before-reverb-setting-it-up-for-a-vocal-or-lead)
- [Reverb before delay: when the wash is the point](#reverb-before-delay-when-the-wash-is-the-point)
- [The third option: run them in parallel](#the-third-option-run-them-in-parallel)
- [Keeping it clean whichever order you choose](#keeping-it-clean-whichever-order-you-choose)
- [Our perspective](#our-perspective)
- [One way to do this in a single insert](#one-way-to-do-this-in-a-single-insert)
- [FAQ](#faq)
- [Sources](#sources)

## The short answer: delay first, reverb last

The most common recommendation is delay first, reverb last. The logic is physical. In a real room, a sound bounces back as an echo, and every one of those echoes then excites the room and produces its own reverb. Delay into reverb imitates that: the reverb receives your dry note and every repeat, then blends them into one space. Guitar pedal guides land in the same place, and a pedalboard is simply a fixed signal chain.

Attack Magazine describes the result as largely audible delay taps with the reverb adding lushness and softness to the repeats, and [it points out](https://www.attackmagazine.com/technique/tutorials/does-plugin-order-matter/) that no order is objectively correct, only appropriate or inappropriate for what you are trying to make. That is the right frame. The default is a starting point, not a law.

## What each order actually sounds like

| | Delay → Reverb | Reverb → Delay |
|---|---|---|
| What the delay processes | Dry signal | Dry signal plus its reverb tail |
| What the reverb processes | Dry signal plus every repeat | Dry signal only |
| Character | Distinct repeats, softened and placed in a room | Blurred, thick, washy |
| Echo definition | High | Lower |
| Risk | Reverb can smear fast rhythmic repeats | Buildup and mud from repeating the tail |
| Typical use | Vocals, leads, guitar, anything that must stay intelligible | Pads, ambient beds, transitions, sound design |

Think of it as echoes inside a room versus a room inside echoes. In the first, you hear a clear rhythm of repeats, each gently diffused. In the second, the room itself is what repeats, so the space seems to bloom and recirculate.

## Why the order changes the sound

Each effect treats whatever arrives at its input as a source. That is all there is to it, and it explains everything above.

When the delay comes first, its input is a clean, transient-rich signal. It makes copies of that signal at set times. The reverb then gets the original plus the copies, and each one starts its own tail. Because the reverb sees distinct events, the result keeps a rhythmic shape.

When the reverb comes first, its output is already a smeared, dense signal with no sharp transients. The delay copies that smear. Then each copy overlaps the next as the feedback runs, so density rises with every repeat. The reverb tail is multiplied, and with long decay times and plenty of feedback it can turn chaotic quickly.

![Signal flow comparison for delay and reverb order](https://media.babylovegrowth.ai/blog-images/organization-30746/1793642841014_Signal-flow-comparison-for-delay-and-reverb-order.jpeg)

This is also why the same two settings can sound fine in one order and muddy in the other. If a chain sounds cloudy, the first thing to check is whether you are feeding a tail into a feedback loop.

## Delay before reverb: setting it up for a vocal or lead

This is the order for parts that carry the song. Here is a workable starting point on a lead vocal:

1. Set the delay to a tempo-synced value. A quarter note at 90 BPM is about 667 ms, an eighth note about 333 ms. Start with two or three repeats of feedback.
2. Roll off the low end of the repeats so they do not stack up under the kick and bass. Our piece on [frequency specific delay](https://vector-dsp.com/blog/frequency-specific-delay/) covers keeping repeats out of the low end in detail.
3. Add a plate or room reverb after the delay. Keep the decay moderate so the tail of one repeat is fading by the time the next arrives.
4. Set the reverb mix lower than you think you need. The delay is already adding space.
5. Solo nothing. Judge the pair with the full mix playing.

Sound On Sound's Mike Senior suggests a related trick for full mixes: a tempo-synchronized feedback delay placed before the reverb [lengthens the reverb sustain](https://www.soundonsound.com/sound-advice/q-how-do-achieve-reverb-drenched-sound-full-mix) without washing out the mix as much as simply cranking the reverb. If you want more tail but the arrangement is already full, this is worth trying before you touch the decay knob.

A vocal that has to stay forward also needs its level managed against the music underneath. If the effects are fighting the words, a clear [voice and music balance](https://orchestralmeditations.com/articles/voice-vs-music-balance) is the first thing to settle before you tweak decay times.

### When delay-first gets in the way

On very fast rhythmic repeats, a long reverb can blur the pattern. Shorten the decay, add a little pre-delay to the reverb, or move the reverb to a send, which brings us to the next option.

## Reverb before delay: when the wash is the point

Reverb into delay is the order for textures, not for words. Attack Magazine recommends it for pads, sound beds and experimental sound design, where a less defined, washier sound is what you want.

Useful situations:

- **Ambient and shoegaze-style beds.** The delay repeats the diffuse tail, so the sound keeps growing and recirculating.
- **Transitions.** A single snare or vocal hit through a big reverb and then a long feedback delay becomes a swelling event you can automate in and out.
- **Ear candy on a vocal.** Some engineers put a long delay after a short, bright reverb to create a localized effect on a word or phrase, not on the whole performance. Because the reverb is short, the repeats stay small and shiny instead of turning into a cloud.

Keep these guardrails when you go this way:

- Lower the feedback. Start with one or two repeats, not five.
- Keep the reverb decay short to medium. A long tail into a long delay is where things go muddy.
- Filter the delay return, high and low. A band-limited wash sits behind a mix instead of on top of it.
- Automate. A reverb-first throw works best as a moment, not a constant.

## The third option: run them in parallel

If you want clarity and flexibility more than interaction, do not chain them at all. Put the delay and the reverb on separate send buses, each receiving its own copy of the dry signal, and blend the returns. Neither effect processes the other, so you hear a clean delay and a clean reverb, and you can balance them independently.

You can still get the delay-into-reverb sound on a send setup: route part of the delay return into the reverb send. Now you control how much of the echoes feeds the space with one send level, and the effects stay modular. Turn that level down for a drier, more articulate result and up for a lusher one.

Parallel routing is easy to build in any DAW, and we walk through the steps in our guide to [parallel effects routing](https://vector-dsp.com/blog/parallel-effects-routing/). For a deeper look at splitting effects by frequency range, see [multiband delay](https://vector-dsp.com/blog/multiband-delay/) and [frequency-selective reverb](https://vector-dsp.com/blog/frequency-selective-reverb/).

Guitar players face the same choice with hardware. A fixed pedalboard chain is serial, so getting parallel routing there takes a dedicated mixer or splitter box. In a DAW it costs you two buses.

## Keeping it clean whichever order you choose

Order decides how the effects interact. These habits decide whether the result is still clear when the whole band is playing.

**Filter the returns.** Low frequencies in a delay or reverb tail add energy without adding information. Cutting the lows of the return is usually the cheapest cleanup you have. High-frequency content in the tail can also get harsh, so a gentle roll-off there helps the effect sit behind the dry sound.

**Place EQ with intent.** Putting an EQ after the reverb shapes the whole tail, while putting one before it changes what the reverb reacts to. We cover the tradeoffs in [EQ after reverb](https://vector-dsp.com/blog/eq-after-reverb/).

**Make room with dynamics processing.** Effects can bury a vocal during phrases and bloom between them. A ducking setup that lowers the delay or reverb return while the dry vocal plays, then lets it rise in the gaps, keeps depth without crowding the words. Any audible pumping in that setup comes from the dynamics processing, meaning the detector, threshold, ratio, attack and release, so those are the controls to adjust. See [ducking delay](https://vector-dsp.com/blog/ducking-delay/) and [reverb ducking](https://vector-dsp.com/blog/reverb-ducking/) for setups.

**Check in mono and at low volume.** A wash that sounds huge in wide stereo can vanish or turn thin when summed. Quiet listening shows you whether the effects are doing the work or just taking up space.

![Keeping it clean whichever order you choose](https://media.babylovegrowth.ai/blog-images/organization-30746/1793642864801_Keeping-it-clean-whichever-order-you-choose.jpeg)

**Flip the order and compare.** In a DAW it takes seconds to swap two plugins or rewire a send. Do it on the real part, with the real mix, at matched levels. The louder version always sounds better at first, so match them before you decide.

## Our perspective

> We design plugins for people who want to place an effect exactly where it belongs, and the delay and reverb order question is a good example of why. The usual advice treats the choice as binary: delay first or reverb first. In practice, a mix needs different answers in different parts of the spectrum.
>
> A long delay on a vocal can add a lovely sense of space in the upper mids and highs, and add nothing but clutter below 150 Hz. A reverb can give a pad width and air while thickening the low mids. When you treat the whole signal as one block, you pick one order and live with the compromises.
>
> That is why we like lane-based thinking: split the signal, give each range the effect treatment it needs, and recombine. Delay into reverb on the top, a short plate only on the mids, nothing at all on the lows. This is the same idea as the parallel send, taken one step further, so that the order and the amount become decisions per band instead of per track.
>
> Our advice is simple. Learn the default, which is delay then reverb. Learn why reverb then delay sounds different. Then stop thinking of the chain as a single line and start thinking about where in the frequency range each effect earns its place.
>
> *Kai*

## One way to do this in a single insert

If you want per-range control without building a stack of buses and filters by hand, ToneLab is one way to do it. It is our plugin with multi-lane parallel effects and per-lane EQ targeting, so you can aim a delay or reverb at the range it belongs in, inside one insert. It runs on Windows and macOS in major DAWs, with real-time, low-latency processing, and a free demo is available. ToneLab is a one-off license at $73.99, with minor version updates included. You can see the details on the [ToneLab page](https://vector-dsp.com/pricing/).

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

## FAQ

### Do you put delay before or after reverb?

Before, in most cases. Delay first and reverb last lets each repeat pick up its own reverb tail, which sounds natural and keeps the echoes articulate. Switch to reverb first when you want a thicker, washier texture for a pad, a transition or sound design.

### Is reverb before delay ever the better choice?

Yes, when the goal is atmosphere rather than clarity. The delay repeats the reverberant signal, so the space seems to grow and recirculate. It works for ambient beds, swells and special moments, but keep feedback low and filter the return, because the repeated tail builds density fast.

### Can I avoid the order question completely?

Yes. Put the delay and the reverb on two separate sends and blend the returns. Neither effect feeds the other, so you get the most separation. If you want some interaction, send a little of the delay return into the reverb send and control it with one level.

### Does the order change between guitar pedals and a mixing chain?

The physics are the same, but the flexibility is not. A pedalboard is a fixed series chain, and delay before reverb is the standard placement. In a DAW you can reorder plugins in seconds or use parallel sends, so the order becomes a creative choice you can audition on every part.

### What is the difference between delay and reverb?

Delay creates distinct, repeating copies of a sound at set times. Reverb creates a dense cloud of reflections that simulates a space, with no separate repeats. Delay gives rhythm and echo, while reverb gives size and ambience.

## Sources

- [Does Plugin Order Matter? Attack Magazine](https://www.attackmagazine.com/technique/tutorials/does-plugin-order-matter/)
- [Q. How do I achieve a reverb-drenched sound on a full mix? Sound On Sound](https://www.soundonsound.com/sound-advice/q-how-do-achieve-reverb-drenched-sound-full-mix)

## Recommended

- [EQ After Reverb: When It Helps and How to Set It Up](https://vector-dsp.com/blog/eq-after-reverb/)
- [Frequency Specific Delay: Keep Repeats Out of the Low End](https://vector-dsp.com/blog/frequency-specific-delay/)
- [Multiband Reverb: How to Split Reverb by Frequency](https://vector-dsp.com/blog/multiband-reverb/)
- [Multiband Delay: How It Works and How to Use It in a Mix](https://vector-dsp.com/blog/multiband-delay/)
