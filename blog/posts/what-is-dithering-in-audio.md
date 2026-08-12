---
title: "Audio Dithering in Audio: What Engineers Need to Know"
description: ""
date: 2026-08-12
---

# Audio Dithering in Audio: What Engineers Need to Know

![Engineer adjusting audio hardware dial in studio](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1786332919876_Engineer-adjusting-audio-hardware-dial-in-studio.jpeg)

Dithering in audio is the practice of adding a precisely calibrated low-level noise signal to a digital audio stream before reducing its bit depth, converting deterministic quantization distortion into a more benign and perceptually uniform noise floor. The production rule is simple: apply dither once, at the final bounce or export, whenever you reduce from a higher fixed-point bit depth to a lower one (24-bit to 16-bit being the classic case).
- Dithering randomizes rounding errors so they stop correlating with your signal.
- Apply it at final export only, not during intermediate processing stages.
- Skip it entirely on 32-bit float exports going to another engineer for further processing.

**Pro Tip:** *For most final masters, TPDF (triangular probability density function) dither is the safe default. If you're delivering a CD or streaming master and want to push the noise floor down perceptually, a mild noise-shaped dither is worth testing — but listen carefully at high levels for any high-frequency artifacts before committing.*

***

## Key Takeaways

Dithering is a single-use tool: apply it once, at the final fixed-point conversion, and choose the type based on the delivery format.

| Point | Details |
| --- | --- |
| Dither when reducing bit depth | Apply dither at every fixed-point bit-depth reduction, especially 24-bit to 16-bit for CD delivery. |
| Dither once, at final export | Multiple dithering passes accumulate noise floors with no benefit; one pass at the final conversion is correct. |
| TPDF for most cases | Triangular dither is the safe default for intermediate bounces and most final masters. |
| Noise shaping for final masters | Mild noise-shaped dither can lower perceived noise floor on CD/streaming masters; test for HF artifacts before delivery. |
| Skip dither on float exports | 32-bit float files going to further processing do not need dither; apply it only at the final fixed-point render. |

***

## Table of Contents

- [What is dithering in audio, and why does quantization cause distortion?](#what-is-dithering-in-audio-and-why-does-quantization-cause-distortion)
- [How dithering converts quantization distortion into noise](#how-dithering-converts-quantization-distortion-into-noise)
- [Common dither types and how each one sounds](#common-dither-types-and-how-each-one-sounds)
- [When and where to apply dither in your production chain](#when-and-where-to-apply-dither-in-your-production-chain)
- [Practical recommendations for dither settings and presets](#practical-recommendations-for-dither-settings-and-presets)
- [Do you need dither with 32-bit float and 24-bit sessions?](#do-you-need-dither-with-32-bit-float-and-24-bit-sessions)
- [What dithering actually does to what you hear](#what-dithering-actually-does-to-what-you-hear)
- [How to apply dither in common tools and workflows](#how-to-apply-dither-in-common-tools-and-workflows)
- [Common misconceptions about dithering, cleared up](#common-misconceptions-about-dithering-cleared-up)
- [Why dither matters for high-precision audio chains: a Vector-dsp perspective](#why-dither-matters-for-high-precision-audio-chains-a-vector-dsp-perspective)
- [An engineer's honest take on when dithering actually matters](#an-engineers-honest-take-on-when-dithering-actually-matters)
- [Sources](#sources)

## What is dithering in audio, and why does quantization cause distortion?

Before dithering makes sense, quantization has to. When a digital audio system stores a sample, it maps a continuous amplitude value to the nearest available discrete step. The number of steps available is determined by bit depth: 16-bit gives you 65,536 steps; 24-bit gives you over 16 million. The difference between the actual signal value and the nearest step is called quantization error.

At high bit depths, that error is tiny and effectively random relative to the signal. The problem appears when you reduce bit depth, say from a 24-bit session file down to a 16-bit delivery format. Suddenly the step size is much coarser, and the rounding error is no longer random. It becomes correlated with the input signal, which means it produces harmonic distortion rather than neutral noise. Quiet passages and slowly decaying reverb tails are where you hear this most clearly, because the signal amplitude is small relative to the step size and the error pattern repeats in a way the ear recognizes as tonal.

Common symptoms of unmitigated quantization distortion include:

- Harmonic spikes and "birdies" (tonal artifacts that track the signal's pitch)
- A stepped, grainy quality on sustained low-level signals
- Loss of depth and air in reverb tails and ambience
- Audible "stairstepping" on slowly fading signals

The [MIT CSAIL graphics lecture notes](https://groups.csail.mit.edu/graphics/classes/6.837/F98/Lecture11/dithering.html) describe this same mechanism in image processing, where predictable rounding errors create visible banding. The audio parallel is exact: correlated error is always more perceptually damaging than random error of the same magnitude.

***

## How dithering converts quantization distortion into noise

Dither makes quantization error behave like broadband noise rather than signal-correlated distortion. The mechanism is straightforward: you add a small random noise signal to the audio before the quantizer rounds each sample. That randomness breaks the correlation between the input waveform and the rounding error, so instead of harmonic spikes that track your signal, you get a flat, low-level noise floor.

The math intuition is worth a sentence. Without dither, the quantizer rounds each sample to the nearest step, and the error is a deterministic function of the input. Add a noise signal whose probability density function (PDF) spans at least one quantization step, and the rounding decision becomes partly random. The error is now statistically independent of the input. As the [IEEE Transactions on Signal Processing paper by Wannamaker, Lipshitz, Vanderkooy, and Wright](https://ieeexplore.ieee.org/document/823976/) demonstrates, a suitably chosen dither PDF can render the quantization error sequence spectrally white and make its moments independent of the input signal under specific conditions. That is the theoretical ceiling dithering is reaching for.

What changes in practice when you apply dither:

- Harmonic spikes in the spectrum are replaced by a flat noise floor.
- The noise floor rises slightly in absolute terms, but the character shifts from tonal to neutral.
- Low-level signals that would otherwise disappear into quantization distortion become recoverable, because [dither allows encoding of values smaller than the least significant bit](https://theproaudiofiles.com/dither/).
- Reverb tails and ambience decay smoothly rather than stepping into silence.

The AES/JAES review literature confirms that properly applied dither, with minimum added noise power and an appropriate PDF, is the standard approach for transparent bit-depth reduction in professional audio.

***

## Common dither types and how each one sounds

The choice of dither PDF determines how the added noise is distributed in amplitude and frequency. Each type makes a different audible trade-off.

- **Rectangular (RPDF):** The simplest form. Noise is uniformly distributed across one quantization step. It decorrelates the error but doesn't fully eliminate all error moments. Audibly, it's a flat, low-level hiss. Adequate for non-critical applications.
- **Triangular (TPDF):** Two rectangular distributions summed together. TPDF is the workhorse of practical dithering because it achieves first- and second-moment independence from the input, meaning the mean and variance of the error are both independent of the signal. [Audacity's manual](https://manual.audacityteam.org/man/dither.html) lists triangle as one of the two recommended choices for best subjective results.
- **Gaussian:** Theoretically appealing but adds more total noise power than TPDF for the same decorrelation benefit. Rarely the best practical choice for audio.
- **Noise-shaped dither:** Applies an error-feedback filter after quantization to spectrally redistribute the noise away from the most sensitive frequency bands (roughly 2–4 kHz for human hearing) and push it toward higher frequencies. The result is a lower perceived noise floor at the cost of elevated HF noise content. This is the approach used in professional mastering tools.

**Additive vs. subtractive dither** is a distinction worth understanding. Additive dither is what every practical tool uses: you add noise before quantization and leave it in the signal. Subtractive dither, described in the IEEE nonsubtractive dither paper, is a research-level concept where the dither signal is known at both encoder and decoder and can be subtracted at reconstruction, theoretically eliminating the noise penalty. In practice, subtractive dither requires the dither sequence to be transmitted alongside the audio, which makes it impractical for most delivery formats.

**Pro Tip:** *TPDF is the right default for any intermediate bounce or processing stage. Reserve noise-shaped dither for your final master, and only if you've confirmed the shaping curve doesn't create audible HF peaks when the master is limited or normalized.*

***

## When and where to apply dither in your production chain

The rule has one sentence: apply dither when you reduce from a higher fixed-point bit depth to a lower fixed-point bit depth, and do it once, at the final conversion. Everything else follows from that.

Splice's workflow guidance and LANDR's practical notes both confirm the same principle: save dither for the final export, not for intermediate files.

**Apply dither when:**

- Exporting a 24-bit session to a 16-bit WAV for CD delivery.
- Rendering a 32-bit float mix down to a 24-bit or 16-bit fixed-point file.
- Converting any fixed-point file to a lower fixed-point bit depth.

**Do not apply dither when:**

- Exporting a 32-bit float file that will go to a mastering engineer for further processing. The float format has enough internal precision that dithering at this stage adds noise with no benefit.
- Bouncing internal stems or session files at the same or higher bit depth.
- Encoding to lossy formats (MP3, AAC). The lossy encoder's own processing will swamp any dither noise, making it pointless.
- Applying dither at multiple stages in a chain. The AES/JAES literature is explicit: careless or repeated dithering across stages can harm transparency.

Understanding [audio bit depth](https://vector-dsp.com/blog/what-is-bit-depth-audio) is the prerequisite here. If you're unclear on what a bit depth reduction actually does to your word length, that's the place to start before touching dither settings.

***

## Practical recommendations for dither settings and presets

TPDF covers most situations. Noise-shaped dither is worth considering for final CD or streaming masters, but only with a light shaping curve and a listening check. That's the short version.

| Use Case | Recommended Dither Type | Notes |
| --- | --- | --- |
| Intermediate bounce (24-bit to 24-bit fixed) | None needed | Same word length, no reduction |
| Mix bounce to 24-bit fixed for mastering | TPDF (triangle) | Clean, neutral, no shaping artifacts |
| Final master to 16-bit CD | TPDF or mild noise-shaped | Test shaped version at full level before committing |
| Archival 24-bit WAV | TPDF | Minimal noise, safe for future reprocessing |
| 32-bit float export for further processing | None | Float precision makes dither unnecessary here |

For shaping strength, think of it in three tiers: flat (no shaping, pure TPDF), shape-weak (gentle redistribution, barely audible difference), and shape-medium (noticeable perceptual noise floor reduction, but HF content rises). Shape-strong settings exist in some tools and can produce audible high-frequency artifacts, especially after limiting. Always audition the shaped version through your full mastering chain, including any final limiter, before delivery.

**Pro Tip:** *Aggressive noise shaping pushes noise energy above 15 kHz. If your master has a final limiter, that HF noise can cause the limiter to react to content your ears wouldn't notice, slightly changing the loudness behavior. Test by bypassing the limiter and checking the spectrum above 14 kHz.*

***

## Do you need dither with 32-bit float and 24-bit sessions?

The short answer: no dither for 32-bit float exports going to further processing; yes dither when converting to any fixed-point format for delivery.

32-bit float uses a 24-bit mantissa with an 8-bit exponent, giving it a dynamic range that far exceeds anything a converter or playback system can reproduce. Inside a 32-bit float session, quantization error is so small it's irrelevant. When you export a 32-bit float file to send to a mastering engineer, that file will be processed again before final delivery, so adding dither at this stage only introduces noise that serves no purpose and can't be removed.

The situation changes the moment you commit to a fixed-point format. A 24-bit fixed-point file has a finite word length, and any conversion from float to fixed-point involves rounding. That rounding needs dither. The same applies to the final 16-bit master: the step from 24-bit fixed to 16-bit fixed is exactly the scenario dithering was designed for.

[Double-precision DSP processing](https://vector-dsp.com/blog/why-use-double-precision-dsp-for-audio-processing) inside a plugin chain extends this logic further. When your plugin processes audio at 64-bit float internally, quantization at the plugin output boundary is negligible. The critical conversion happens at the DAW's final export stage.

Workflow examples:

- **Exporting stems for mastering:** 32-bit float, no dither. The mastering engineer will apply their own dither at final delivery.
- **Delivering a 16-bit CD master:** 24-bit to 16-bit with TPDF or mild noise-shaped dither, applied once at the final render.
- **Archival copy:** 24-bit fixed-point with TPDF dither. Clean, future-proof, and safe for any downstream reprocessing.

***

## What dithering actually does to what you hear

The audible trade-off is concrete: dithering replaces tonal, signal-correlated distortion with a low-level broadband noise floor. That trade is almost always worth making, because the ear is far more tolerant of neutral noise than it is of harmonic distortion that tracks the signal.

![Abstract sound wave and studio mood lighting](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1786332913178_Abstract-sound-wave-and-studio-mood-lighting.jpeg)

The most revealing place to hear the difference is in reverb tails and quiet ambience. Without dither, a reverb tail decays into a stepped, grainy texture and then cuts off abruptly. With dither, it fades smoothly into a gentle hiss and disappears naturally. The absolute silence of an undithered file is technically "quieter," but the distortion artifacts leading up to that silence are more objectionable than the noise floor a properly dithered file leaves behind.

**How to audition the difference:**

- Export a short section of a quiet reverb tail or low-level ambience, once with dither and once without.
- Normalize both files to the same peak level and A/B them in your DAW.
- Listen specifically for the character of the decay: smooth fade vs. stepped texture.
- Check the spectrum with a high-resolution analyzer. Without dither, you'll see harmonic spikes above the noise floor. With dither, those spikes flatten into a uniform noise shelf.

**What to look for in measurements:**

- Harmonic distortion products (spikes at multiples of the signal frequency) visible in the spectrum without dither.
- A flat, featureless noise floor with dither applied.
- With noise-shaped dither, the noise floor will tilt upward above roughly 10–12 kHz.

Sonic checklist for verifying dither benefit:

- Quiet passages and room tone
- Reverb and delay tails
- Sustained low-level pads or strings
- Fade-outs on full mixes

***

## How to apply dither in common tools and workflows

The location of the dither setting varies by tool, but the principle is the same everywhere: enable dither only at the final fixed-point export, set the type before you render, and document the setting in your project notes.

### Generic DAW export (most major DAWs)

1. Open the export or bounce dialog.
2. Set the output bit depth to your target (16-bit for CD, 24-bit for archival).
3. Locate the dithering option, usually in the same dialog or in a dedicated "processing" tab.
4. Select TPDF (triangle) for intermediate exports or mild noise-shaped for final masters.
5. Disable any built-in normalization that runs after dither, as post-dither normalization can re-introduce correlated error.
6. Render and verify the output file's bit depth in your file inspector.

### Plugin-based dither module (standalone dither plugin inserted on the master bus)

1. Insert the dither plugin as the very last plugin in your master bus chain, after any limiting.
2. Set the output word length to match your export target.
3. Choose the dither type and shaping curve.
4. Disable the DAW's own built-in dither in the export dialog to avoid double-dithering.
5. Bounce the master bus to a file at the matching bit depth.

### Offline converter or batch processor

1. Set the source and target bit depths.
2. Enable dither and select the algorithm (TPDF or shaped).
3. Process the file and confirm the output bit depth.

### Command-line tool (e.g., SoX)

1. Specify the output bit depth with the appropriate flag.
2. Add the dither flag and select the PDF type if the tool supports it.
3. Run the conversion and inspect the output with a metering tool.

**Numbered workflow for a typical mastering session:**

1. Complete all processing at 32-bit float or 24-bit fixed internally.
2. Insert your dither plugin last on the master bus.
3. Set output word length to 16-bit, dither type to TPDF or mild shaped.
4. Disable DAW-level dither in the export dialog.
5. Export and verify with a spectrum analyzer.
6. Document the dither type and settings in your session notes.

Note: if your DAW or plugin interface has annotated screenshots available, adding them at steps 3 and 4 will help clarify where the setting lives in your specific tool.

***

## Common misconceptions about dithering, cleared up

**Should dither be on or off?** On, when you're reducing bit depth for a final fixed-point delivery. Off for internal float files, lossy encodes, and any export that will be processed further.

**Does dither lower quality?** No. It trades an imperceptible amount of noise power for the elimination of audible harmonic distortion. The noise added by TPDF dither is below the threshold of audibility in most listening contexts. The Audacity manual notes that differences between dither types are subtle and audible only under critical listening conditions.

**Should you dither a master?** Yes, at the final fixed-point conversion. That is exactly the scenario dithering was designed for.

**Does dithering multiple times cause problems?** Yes. Each dithering pass adds a noise floor. Dithering a file that has already been dithered raises the noise floor without any benefit. Dither once, at the final conversion.

**What if I hear high-frequency artifacts after applying noise-shaped dither?** The shaping curve is too aggressive. Switch to a weaker shaping preset or fall back to TPDF. Also check whether your final limiter is reacting to the shaped HF content.

**Quick troubleshooting checklist:**

- Audible HF hiss after dithering: reduce shaping strength or switch to TPDF.
- Dither seems to have no effect: confirm you're actually reducing bit depth in the export.
- Double-dithering: check that both the plugin and the DAW export dialog don't have dither enabled simultaneously.
- Silence passages sound noisy: consider a dither plugin with auto-blanking for passages below a set threshold.
- Loudness normalization applied after dither: re-render with normalization disabled or applied before dither.

***

## Why dither matters for high-precision audio chains: a Vector-dsp perspective

For plugin and algorithm designers, dithering is not just a mastering afterthought. It's a design decision that touches every quantization boundary in a signal chain.

Inside a plugin, audio typically flows at 32-bit or 64-bit float. Quantization error at those precisions is negligible. But the moment a plugin writes to a fixed-point intermediate buffer, or a hardware DSP chain converts between word lengths, the same quantization distortion problem appears. [Noise shaping](https://en.wikipedia.org/wiki/Noise_shaping) is implemented with an error-feedback filter that takes the quantization error from the current sample and feeds it back into the input of the next quantization step, spectrally redistributing the noise energy. The filter's frequency response determines where the noise goes.

Implementation considerations for developers working on [DSP algorithm design](https://vector-dsp.com/blog/dsp-algorithm-design-for-audio-professionals-explained):

- Expose both the PDF choice (rectangular, triangular, shaped) and the shaping strength as user-accessible parameters. Engineers want control, not a black box.
- Implement auto-blanking or low-level suppression for passages below a configurable threshold. At very low amplitudes, dither noise can become audible if not shaped appropriately.
- Test cascading quantizers: if your plugin chain includes multiple fixed-point conversion boundaries, verify that noise accumulation across stages stays within acceptable limits.
- Use objective tests (spectrum analysis, THD+N measurement) alongside listening tests. A flat noise floor in the spectrum is the clearest confirmation that dithering is working correctly.
- For real-time implementations, the dither noise generator must be computationally lightweight. A simple PRNG feeding a triangular PDF is sufficient for most cases and adds negligible CPU overhead.

The interaction between dither and limiting deserves special attention. If a limiter follows the dither stage, the limiter will respond to the dither noise as well as the signal. With TPDF, this is rarely audible. With aggressive noise shaping, the elevated HF content can cause the limiter to engage more frequently than intended, subtly changing the loudness character of the master. Testing the full chain, dither plus limiter, before delivery is not optional. Refer to [DSP algorithm types in audio plugins](https://vector-dsp.com/blog/dsp-algorithm-types-in-audio-plugins-a-pros-guide) for a broader view of where quantization boundaries appear across different plugin architectures.

***

## An engineer's honest take on when dithering actually matters

There's a version of this conversation that gets very academic very fast, and a version that's just practical. Here's the practical one.

The rule I use: if the file is going somewhere that will process it again, no dither. If the file is the final delivery format, dither.

The real-world case that makes this concrete is mastering for CD versus sending stems to another engineer. A 16-bit CD master is a final delivery format. It will be played back exactly as rendered, and the quantization step from 24-bit to 16-bit is large enough that undithered distortion is audible on quiet passages. TPDF dither, applied once at the final render, handles it cleanly. A spectrum check before and after confirms the harmonic spikes are gone and the noise floor is flat.

Sending stems to another engineer is the opposite situation. Those stems will be processed, mixed, and eventually mastered by someone else. Dithering them adds a noise floor that the other engineer can't remove. They'll apply their own dither at their own final export. Sending 32-bit float stems with no dither is the correct move.

The A/B test is worth doing at least once if you haven't. Export a reverb tail both ways, normalize both files, and listen on headphones. The undithered version will have a texture to its decay that the dithered version won't. Once you hear it, you'll understand exactly what the theory is describing.

***

## Sources

The sources below back the technical claims in this article and are worth bookmarking for deeper study.

- [Dither - Audacity Manual](https://manual.audacityteam.org/man/dither.html)
- [A theory of nonsubtractive dither. IEEE Transactions on Signal Processing. 2000;48(2):499-516. doi:10.1109/78.823976](https://ieeexplore.ieee.org/document/823976/)
- [Audio Dither 101: What is Audio Dithering?](https://theproaudiofiles.com/dither/)

## Recommended

- [Audio Bit Depth Explained: What It Means for Your Sound — Vector DSP](https://vector-dsp.com/blog/what-is-bit-depth-audio)
- [DSP Algorithm Design for Audio Professionals Explained — Vector DSP](https://vector-dsp.com/blog/dsp-algorithm-design-for-audio-professionals-explained)
- [DSP Algorithm Types in Audio Plugins: A Pro's Guide — Vector DSP](https://vector-dsp.com/blog/dsp-algorithm-types-in-audio-plugins-a-pros-guide)
- [Professional Audio Standards Overview List for Pros — Vector DSP](https://vector-dsp.com/blog/professional-audio-standards-overview-list-for-pros)
