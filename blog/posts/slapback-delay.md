---
title: "Slapback Delay: Settings, Times and How to Mix It"
description: ""
date: 2026-11-20
---

# Slapback Delay: Settings, Times and How to Mix It

![Vocalist recording in an acoustically treated booth](https://media.babylovegrowth.ai/blog-images/organization-30746/1794967938407_Vocalist-recording-in-an-acoustically-treated-booth.jpeg)

Slapback delay is one short echo, no feedback, placed far enough behind the dry signal to be heard as a separate hit but close enough to feel attached to it. Set it somewhere between 40 and 150 ms, roll the top and bottom off the repeat so it sits behind the source, and you get size and attitude without the wash of a reverb tail. Below we cover the times, the tempo math, the filtering, source-by-source starting points and where slapback sits in your chain.

## TL;DR

- Slapback is a single repeat: feedback at zero, delay time roughly 40 to 150 ms depending on the source and the era you want.
- Filter the repeat. A low cut and a high cut on the delay keep it behind the dry signal instead of competing with it.
- Vocals and guitar like it subtle. Rockabilly-style slap runs louder and longer.
- It is a cleaner way to add space than reverb in a dense mix, because it repeats the source instead of smearing it.
- Put the delay before the reverb, and keep the repeat out of the low end if your mix is already crowded.

## Table of Contents

- [What slapback delay actually is](#what-slapback-delay-actually-is)
- [Where the sound came from](#where-the-sound-came-from)
- [Slapback settings that work](#slapback-settings-that-work)
- [Lock the time to the tempo](#lock-the-time-to-the-tempo)
- [Darken the repeat](#darken-the-repeat)
- [Slapback by source](#slapback-by-source)
- [Slapback versus reverb and longer echo](#slapback-versus-reverb-and-longer-echo)
- [Where slapback goes in the chain](#where-slapback-goes-in-the-chain)
- [A quick setup you can try today](#a-quick-setup-you-can-try-today)
- [One way to build it in a single insert](#one-way-to-build-it-in-a-single-insert)
- [Our view on slapback](#our-view-on-slapback)
- [FAQ](#faq)
- [Sources](#sources)

## What slapback delay actually is

Stanford's CCRMA describes [slap back as a single echo on a recorded track](https://ccrma.stanford.edu/realsimple/DelayVar/Miscellaneous_Effects.html), with the delay just large enough to be heard as a discrete echo on careful listening. The same page notes it was very popular in 1950s rockabilly and can be treated as a simplified form of doubling, with the second voice held at a larger, fixed delay.

That is the whole recipe: one copy, one delay time, nothing fed back. Because there is no feedback, there is no trail of decaying repeats. You hear the note, then a quick shadow of it.

It helps to place slapback on a scale of delay times:

- **Doubling (about 30 to 50 ms):** the repeat fuses with the source and reads as a thicker voice.
- **Slapback (about 40 to 150 ms):** the repeat is audible as an echo, but tightly attached.
- **Echo (a few hundred ms and up):** the repeat answers the source instead of hugging it.

The borders are soft. Sources disagree by a few dozen milliseconds, and your ear and the tempo of the song decide where it stops being slap and starts being a rhythmic delay.

## Where the sound came from

Slapback was a tape trick before it was a plug-in setting. A [Tape Op review of the Sam Phillips biography](https://tapeop.com/reviews/gear/115/sam-phillips-the-man-who-invented-rock-n-roll-book) credits Phillips with the tape echo he christened slapback, calling it a defining element of the Sun Records sound. The effect came from taking the signal off a tape machine's playback head a fraction of a second after it was recorded and blending it back in.

That history matters for mixing decisions. The tape repeat was darker than the original, a little distorted and a little wobbly. When you build a slapback digitally, most of the work is putting that character back. A clean, full-bandwidth copy 100 ms later sounds like a digital echo, not like a record.

## Slapback settings that work

Published starting points cluster in the same range. Here is what the sources say:

| Source | Delay time | Feedback | Notes |
|---|---|---|---|
| [Sound on Sound, Paul White](https://www.soundonsound.com/techniques/digital-delay-tactics) | 20 to 80 ms classic; 30 to 100 ms on vocals and rock guitar | None | Cites John Lennon's vocal sound as leaning on short slap-back |
| [Yamaha, Mike Levine](https://hub.yamaha.com/proaudio/recording/using-delay-part-2/) | 50 to 140 ms | Little or none | Depending on wet/dry, adds body without being obvious |
| [MusicRadar, Jon Musgrave](https://www.musicradar.com/how-to/short-delays) | About 40 ms, up to 80 ms for a deeper effect | Zero | Wet level around 20%, filters near 300 Hz and 3 kHz; the traditional "Elvis" slap is around 135 ms |

Take the overlap as your zone: roughly 50 to 120 ms, feedback at zero. Start at 80 ms, then move in 10 ms steps and listen against the groove.

### Feedback: zero means zero

A single repeat is what defines the effect. Any feedback turns it into a short echo train and the vocal or guitar starts to smear. If your delay does not let you set feedback fully to zero, shorten the time or lower the wet level until the second repeat is gone.

### Level: behind, not beside

The wet level is where producers split. Modern pop and rock vocals usually want the slap tucked well behind the dry signal, around the 20% mark in MusicRadar's demonstration. Rockabilly and vintage styles push it much louder, to the point where the echo is a feature of the performance. Decide which one the song needs before you touch the fader, because the same delay time reads very differently at two levels.

## Lock the time to the tempo

There is a reason a lot of producers type in note values instead of milliseconds. A quarter note lasts 60,000 divided by the BPM, in milliseconds. At 120 BPM that is 500 ms, so:

- A 1/16 note is 125 ms.
- A 1/32 note is 62.5 ms.
- A 1/64 note is about 31 ms, which lands in doubling territory.

At 90 BPM a 1/16 is about 167 ms, already long for a slap. So the note value that works changes with the song. On fast songs a 1/16 can be a perfect slap. On slow ones, a 1/32 is a better fit.

The tempo-synced time has a real benefit: the repeat falls on the grid, so it feels like part of the groove. The alternative is dialing a time that is slightly off the grid, which gives a loose, vintage feel. Try both. A repeat that lands a little late reads as swagger, and one that lands a little early can make the part feel rushed.

## Darken the repeat

This is the step most people skip, and the one that separates a slap that sounds like a record from one that sounds like a plug-in demo.

MusicRadar's vocal example filters the delay with a high-pass at about 300 Hz and a low-pass at about 3 kHz. Those are the figures to start from, not rules. The logic is straightforward:

- **Low cut on the repeat.** Low frequencies in the echo pile up with the dry signal's low end and make the mix muddy. Cutting the repeat above the body of the source keeps the delay out of the low mids.
- **High cut on the repeat.** If the echo has the same bright consonants and pick attack as the dry signal, the ear hears two of everything. Rolling off the top makes the echo recede, which is what tape did naturally.

A practical way to set it: solo the delay return, sweep the high cut down until the echo stops sounding like a second take of the performance, then bring it back into the mix and pull the level until you only notice it when it is muted.

If your mix is crowded in the bass, the same idea goes further. Our piece on [frequency specific delay](https://vector-dsp.com/blog/frequency-specific-delay/) shows how to keep repeats out of the low end entirely, and [multiband delay](https://vector-dsp.com/blog/multiband-delay/) covers treating different bands of the repeat separately.

## Slapback by source

### Vocals

Vocals are the classic home of slapback. Sound on Sound points to short delays of 30 to 100 ms as effective on vocals and cites John Lennon's "trippy" vocal sound as relying heavily on short slap-back. Yamaha's Mike Levine notes that slapback was a big part of 1950s rockabilly vocals and, depending on the wet/dry setting, can add body without being overly noticeable.

Start at 60 to 100 ms, no feedback, filtered repeat, and a low wet level. If the vocal needs presence in a busy chorus, the slap is a way to add width and weight without extending the tail the way reverb does. If you want to keep the echo from stepping on words in a fast lyric, look at [ducking delay](https://vector-dsp.com/blog/ducking-delay/), which lowers the repeat while the dry vocal is singing and lets it come up in the gaps.

### Stereo slap on a lead vocal

A mono slap pulled to one side can pull the vocal with it. Levine suggests a stereo approach: pan one delay hard to about 3 o'clock and the other to about 9 o'clock, with one side 4 to 5 ms slower or faster than the other. The tiny time difference widens the image while the center of the vocal stays put.

### Electric guitar

Guitar is the other home of slapback, and the Sun Records sound is built on it. The sound has been associated with Scotty Moore's guitar on Elvis Presley's recordings for decades. For a rockabilly tone, go longer (90 to 140 ms) and louder. For modern clean or crunch tones, keep it in the 50 to 90 ms range and tuck it under the dry sound. On a distorted guitar, put the slap after the distortion so the repeat is a copy of the finished tone rather than something that gets driven into more distortion. If you want to explore that ordering, [EQ before distortion](https://vector-dsp.com/blog/eq-before-distortion/) walks through what pre-EQ does to the clipping stage.

![Guitar slapback time ranges by playing style](https://media.babylovegrowth.ai/blog-images/organization-30746/1794967969474_Guitar-slapback-time-ranges-by-playing-style.jpeg)

### Drums and percussion

A short slap on a snare adds a little room feel without a tail that fights the next hit. Go toward the short end, 60 to 100 ms, keep the level very low and filter the repeat so it sounds like body, not a separate hit. Check it in context. On a fast groove, a slap that lands on a subdivision can turn a clean backbeat into a flam.

### Echo from the room itself

Before you reach for the effect, listen to the room you are tracking in. A bare, hard-walled home studio gives you its own reflections, and they arrive on top of anything you add later. If a vocal recorded in a bare room already carries a short smear, a slap on top makes it worse. Cutting down the reflections, for instance with [no-drill fixes for room echo](https://liftedplus.com/reduce-echo-living-room/) such as removable felt panels, gives you a dry source to place deliberately with the delay.

## Slapback versus reverb and longer echo

MusicRadar's explanation is useful here: a short delay with minimal or no feedback replicates the early reflections you hear in a space, the same concept as the first stage of a typical algorithmic reverb. So slapback is a tight, readable version of what the first reflection of a room does, and none of the tail.

ProSoundWeb's Joe Gilder makes the practical case: on [up-tempo tracks reverb can get lost and then become too much when turned up](https://www.prosoundweb.com/in-the-studio-how-and-why-to-use-slap-back-delay-includes-video/), and slap-back is a way to get a room sound when reverb will not do the trick.

The choice, in plain terms:

- **Reach for slapback** when the mix is dense, the tempo is quick, or the source has to stay articulate and present.
- **Reach for reverb** when you want the source to sit inside a visible space with a tail.
- **Use both** when you want an upfront slap and a little depth behind it. Keep the reverb quieter than the slap.

A longer delay is a different tool. Once the repeat is a few hundred milliseconds late, it stops thickening the note and starts answering it, and you are in rhythmic delay territory.

## Where slapback goes in the chain

The usual order is the dry source, then the delay, then reverb. The delay repeats whatever it receives, so if the reverb comes first every echo carries its own tail and the result turns to wash. Send the delay into the reverb and the echo decays into the space instead. We cover the reasoning in [delay vs reverb order](https://vector-dsp.com/blog/delay-vs-reverb-order/).

Two more habits that help:

1. **Run slapback on a send, not an insert**, when you want one slap shared across several parts. You can then filter and level the return once.
2. **If you do put EQ after reverb on the return**, [EQ after reverb](https://vector-dsp.com/blog/eq-after-reverb/) shows how to keep the combined space from getting boxy.

For the subtle end of the effect, saturation also changes the repeat's character. If you drive the delay return a little, the echo takes on the grit of old tape. Keep the level modest and check the result against the dry signal, since saturation adds harmonics and peaks along with the color.

## A quick setup you can try today

1. Put a delay on a send. Set feedback to 0%, time to 80 ms, and mix fully wet on the return.
2. High-pass the return near 300 Hz and low-pass it near 3 kHz.
3. Bring the send up until you can hear the echo, then pull it back until you only hear it when it is muted.
4. Move the time up and down 10 ms at a time. Stop where the repeat feels like part of the groove.
5. Add a short reverb after the delay if the part needs depth, and keep it quieter than the slap.
6. Check in mono. A slap that vanishes or turns hollow in mono is a sign the stereo offset is too wide.

## One way to build it in a single insert

In ToneLab, the delay lane has its own EQ, so the low cut and high cut on the repeat live in the same lane as the delay and the dry signal is left alone. The plugin is a one-time license at $73.99, and there is a free demo for Windows and macOS. You can see the full lineup at [Vector DSP](https://vector-dsp.com).

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

## Our view on slapback

> We think slapback is the most honest delay there is. One repeat, no feedback, nowhere to hide: if the time and the filtering are wrong, you hear it at once.
>
> The part we care about most is the filtering. A slap that is as bright and full as the source fights it, so the repeat needs its own EQ. That is the thinking behind how we build our tools: effects that give you control over which frequencies an effect touches, not one setting for the whole signal.
>
> Our ToneLab design follows from it. Each of its five lanes (chorus, distortion, reverb, delay and saturation) has its own EQ, so shaping what the delay repeats is part of the lane, not an extra plugin after it. Frequency-specific and parallel processing is where we spend our design time.
>
> If you take one thing from this article, take the habit: always listen to the repeat on its own, then decide what it should keep.
>
> *Kai*

## FAQ

### What is a slapback delay?

It is a single, short echo with little or no feedback, typically somewhere between 40 and 150 ms behind the dry signal. It is heard as a quick shadow of each note and adds thickness and size without a trail of repeats. It is strongly associated with 1950s rockabilly recordings.

### What are good slapback delay settings?

Start with feedback at zero and a time of 60 to 100 ms. Filter the repeat, for example a high-pass near 300 Hz and a low-pass near 3 kHz, as in [MusicRadar's vocal example](https://www.musicradar.com/how-to/short-delays). Set the level low for a modern sound, and louder for rockabilly.

### Is slapback delay the same as echo?

Not quite. Slapback is a single short repeat, while echo usually means a longer delay time, often with several repeats. The mechanism is the same, a delayed copy of the signal, but the effect on the listener differs: slapback thickens, echo answers.

### Should I use slapback delay or reverb?

It depends on the mix. Slapback keeps articulation and works well in dense or fast songs, while reverb adds a tail and a sense of space. Many mixes use a slap for presence and a small amount of reverb behind it.

## Sources

- [Miscellaneous Effects, Stanford CCRMA](https://ccrma.stanford.edu/realsimple/DelayVar/Miscellaneous_Effects.html)
- [Sam Phillips biography review, Tape Op](https://tapeop.com/reviews/gear/115/sam-phillips-the-man-who-invented-rock-n-roll-book)
- [Digital Delay Tactics, Sound on Sound](https://www.soundonsound.com/techniques/digital-delay-tactics)
- [Using Delay, Part 2, Yamaha Hub](https://hub.yamaha.com/proaudio/recording/using-delay-part-2/)
- [How to use short delays as an alternative to reverb, MusicRadar](https://www.musicradar.com/how-to/short-delays)
- [How and why to use slap-back delay, ProSoundWeb](https://www.prosoundweb.com/in-the-studio-how-and-why-to-use-slap-back-delay-includes-video/)

## Recommended

- [Frequency Specific Delay: Keep Repeats Out of the Low End](https://vector-dsp.com/blog/frequency-specific-delay/)
- [Ducking Delay: What It Is and How to Set It Up in Any DAW](https://vector-dsp.com/blog/ducking-delay/)
- [Multiband Delay: How It Works and How to Use It in a Mix](https://vector-dsp.com/blog/multiband-delay/)
- [Delay vs Reverb Order: Which Goes First in a Mix](https://vector-dsp.com/blog/delay-vs-reverb-order/)
