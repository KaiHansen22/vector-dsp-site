---
title: "6 Quick Checks to Fix Missing AU Plugins in Logic Pro"
description: ""
date: 2026-10-04
---

# 6 Quick Checks to Fix Missing AU Plugins in Logic Pro

![Producer troubleshooting AU plugins in Logic Pro](https://media.babylovegrowth.ai/blog-images/organization-30746/1790937673858_Producer-troubleshooting-AU-plugins-in-Logic-Pro.jpeg)

Most missing Audio Unit plugins come back after a restart and a rescan through Logic Pro's Plug-in Manager, since that single step clears the majority of detection failures tied to a fresh install. If the plugin still doesn't appear, the cause is usually one of four things: the installer put the component in the wrong location, the plugin failed Apple's validation, it isn't authorized, or it needs Rosetta on Apple silicon. When a rescan alone doesn't fix it, a full Audio Unit reset followed by clearing the AudioUnitCache resolves nearly everything else.

***

> **TL;DR:**
>
> - Restarting your Mac and rescanning plugins in Logic Pro often resolves detection issues caused by cached data or minor placement errors.
> - Plugins placed outside the correct system folders, failed validation, or lacking proper authorization are the most common causes of missing or hidden Audio Units in Logic Pro.
> - Running a full Audio Unit reset and clearing the cache can fix persistent detection failures, especially after installation or system updates.
> - Compatibility with Apple silicon relies on native or universal binary builds; Intel-only plugins may need Rosetta, or they might never load correctly without it.
> - Contacting the plugin vendor with detailed system, plugin, and validation information is essential if issues persist after troubleshooting.

***

## Table of Contents

- [Quick-check checklist: six fast things to try first](#quick-check-checklist-six-fast-things-to-try-first)
- [Step-by-step: use Logic Pro's Plug-in Manager and rescanning workflows](#step-by-step-use-logic-pros-plug-in-manager-and-rescanning-workflows)
- [Reinstall, authorization, and license checks: what to verify with the vendor](#reinstall-authorization-and-license-checks-what-to-verify-with-the-vendor)
- [Apple silicon specifics and Rosetta: a compatibility checklist](#apple-silicon-specifics-and-rosetta-a-compatibility-checklist)
- [Advanced troubleshooting: cache deletion, auval, permissions, and isolating bad plugins](#advanced-troubleshooting-cache-deletion-auval-permissions-and-isolating-bad-plugins)
- [When to contact the developer, Apple Support, or forum help, and what to send them](#when-to-contact-the-developer-apple-support-or-forum-help-and-what-to-send-them)
- [Vector DSP note: developer-side checklist and what we test before release](#vector-dsp-note-developer-side-checklist-and-what-we-test-before-release)
- [Common pitfalls and habits that prevent this from happening again](#common-pitfalls-and-habits-that-prevent-this-from-happening-again)
- [If you want AU-native, well-tested plugins, try ToneLab](#if-you-want-au-native-well-tested-plugins-try-tonelab)
- [FAQ](#faq)
- [Sources](#sources)

## Quick-check checklist: six fast things to try first

Before digging into logs or cache folders, run through these steps in order. Each one takes under a minute and catches the most common causes of a missing AU.

1. Restart your Mac, then relaunch Logic Pro and check the plugin menu again, since a stale system cache is the single most frequent culprit.
2. Confirm the installer placed an AUv2 component in `/Library/Audio/Plug-Ins/Components` or an AUv3 extension in `/Applications`, since a misplaced file simply won't be found.
3. Open Plug-in Manager and search by the manufacturer's name rather than scrolling, since some plugins register under a company name instead of the product name.
4. Select any entry marked as failed and run Rescan, or use Reset and Rescan Selection if the plugin shows no entry at all.
5. Check whether the plugin requires activation or a license manager, since an unauthorized install can appear installed but stay hidden from the plugin list.
6. Verify the build is 64-bit and either native to Apple silicon or properly flagged for Rosetta, since architecture mismatches block loading outright.

Running through all six usually tells you which of the deeper fixes below you actually need.

## Step-by-step: use Logic Pro's Plug-in Manager and rescanning workflows

Plug-in Manager is the control center for everything related to AU visibility in Logic Pro, and most fixes start here. Apple's own troubleshooting guidance for Logic Pro and MainStage [points to this tool first](https://support.apple.com/en-us/122179) before any file-level intervention.

Open it from Logic Pro's Settings (Preferences on older versions), then choose Plug-in Manager. From there:

- Filter the list by manufacturer to isolate the plugin you're looking for.
- Read the Compatibility column carefully: a checkmark means the plugin passed validation and loaded correctly, "failed validation" means Logic tried to load it and hit an error, and "not authorized" means Logic sees the file but the license or activation check didn't pass.
- Select a failed or missing entry and choose Reset and Rescan Selection first, since it's the least disruptive option and only touches the plugin you picked.
- If Reset and Rescan Selection doesn't help, run a Full Audio Unit Reset, which clears Logic's entire AU cache and forces it to revalidate every installed component. Apple's documentation on working with Audio Units describes both AUv2 and AUv3 install paths and how the manager reports each state.
- After rescanning, open a project and check the plugin menu directly rather than trusting Plug-in Manager alone, since a rescan can clear without the plugin actually loading in a live session.

**Pro Tip:** *Run Reset and Rescan Selection before a Full Audio Unit Reset. The full reset works, but it also re-validates every other plugin you own, which can take several minutes on a large library.*

A plugin that passes validation but still won't show up in the instrument or effects list is almost always an authorization issue rather than an installation one, which is where the next section picks up.

## Reinstall, authorization, and license checks: what to verify with the vendor

A "not authorized" status in Plug-in Manager means Logic found the file but the plugin's own licensing layer rejected it. This is a vendor-side issue, not a Logic bug, so the fix lives in the plugin's documentation rather than Apple's.

- Open the vendor's license manager, standalone authorization app, or dongle utility and confirm the plugin shows as activated on the current machine.
- If you recently moved the plugin from another Mac, deactivate it on the old machine first since many licenses are tied to a single active seat.
- For a clean reinstall, remove the old component and any associated support files, run the current installer fresh, and confirm it places the AU in the correct system folder rather than a user-level fallback.
- Re-run activation immediately after reinstalling rather than opening Logic first, since some plugins need to see a valid license before they'll register as a usable AU.
- If authorization still fails after a clean reinstall, contact the vendor directly with your macOS version, Logic Pro version, and the exact plugin build number, since that's the information support teams need to diagnose a licensing server issue versus a local one.

Apple's own guidance on working with Audio Units is explicit that authorization and validation problems are addressed through the plugin developer's documentation, not through Logic itself. Treat reinstalling as a last resort after authorization, not the first move, since reinstalling without fixing a license issue just reproduces the same error.

## Apple silicon specifics and Rosetta: a compatibility checklist

Apple silicon changed how Logic Pro handles older AU builds, and it's a common source of plugins that install fine but never appear. Logic reports AUv3 extensions separately from AUv2 components in Plug-in Manager, and an Intel-only AUv2 plugin can behave differently depending on whether Rosetta is installed.

- Confirm whether the plugin is a native Apple silicon build, an Intel build, or a universal binary, since the vendor's download page usually states this directly.
- Logic Pro supports most AUv2 and AUv3 plugins on Apple silicon natively, but some Intel-only plugins, and certain workflows like ARA integration, may require Rosetta to function correctly.
- If Rosetta isn't installed, macOS will usually prompt you the first time it's needed, but you can also install it manually through Terminal if the vendor's documentation recommends it ahead of time.
- Running Logic itself under Rosetta is rarely necessary unless a vendor specifically instructs it for compatibility with an older plugin suite.

**AU and architecture mismatch** is one of the more overlooked causes of a plugin that installs cleanly but never loads, since Apple's compatibility guidance confirms that Intel-only components sometimes need Rosetta even when the rest of your system is fully native.

When a vendor offers both Intel and Apple silicon builds, always install the native one first and keep Rosetta as a fallback rather than a default, since native builds tend to run with lower latency and fewer edge-case bugs.

## Advanced troubleshooting: cache deletion, auval, permissions, and isolating bad plugins

If rescanning and authorization checks don't fix it, the problem usually lives in a corrupted cache file or a permissions conflict that Plug-in Manager can't resolve on its own.

1. Quit Logic Pro completely, then navigate to `~/Library/Caches/AudioUnitCache` and `/Library/Caches/AudioUnitCache`, and move the files inside to the desktop rather than deleting them outright.
2. Relaunch Logic Pro, which forces a complete rescan of every installed Audio Unit since the cache no longer exists. Apple's troubleshooting steps list this as the last-resort move after Plug-in Manager rescans and resets have failed.
3. Run `auval -a` in Terminal to list every registered AU on the system, or `auval -v [type] [subtype] [manufacturer]` to validate a specific plugin and see the exact error it throws during loading.
4. Check the file permissions on `/Library/Audio/Plug-Ins/Components` itself, since a folder with restricted write access can silently block new installs from registering.
5. If a specific plugin is suspected of destabilizing the whole AU scan, move it out of the Components folder into a temporary location, relaunch Logic, and confirm the rest of your plugins load normally before reintroducing it.

**Pro Tip:** *Reintroduce suspected plugins one at a time after an isolation test, not all at once. Reloading everything together just reproduces the original ambiguity about which file caused the failure.*

Moving files instead of deleting them matters here: if a cache clear or isolation test doesn't fix anything, you can restore the originals without reinstalling.

![Reversible plugin isolation and restore workflow](https://media.babylovegrowth.ai/blog-images/organization-30746/1790937666486_Reversible-plugin-isolation-and-restore-workflow.jpeg)

## When to contact the developer, Apple Support, or forum help, and what to send them

Once you've run through rescans, authorization checks, and cache clears, further guessing wastes time. Collect this information before reaching out, and the same package works whether you're contacting the plugin's developer, Apple Support, or a production forum.

- Your exact macOS version, Logic Pro version, and the plugin's version or build number.
- The installer log if one was generated, plus the Compatibility column status shown in Plug-in Manager.
- Output from an `auval` validation run on the specific plugin, since it often names the exact missing dependency or failed check.
- A minimal test project where the issue reproduces reliably, built in a fresh session rather than your main production file.

Contact the plugin's developer first, since they control the authorization and installer logic that most often causes this. Escalate to Apple Support only if the failure looks like an OS-level validation problem rather than a vendor-side one. When posting logs publicly on a forum, strip out license keys, serial numbers, and any personal account identifiers first.

## Vector DSP note: developer-side checklist and what we test before release

Plugin visibility issues often trace back to installer and validation decisions made long before a user ever opens Logic Pro. Releases are tested for AUv2 and AUv3 compliance, Apple silicon native builds, and correct installer placement in the system Audio and Plug-Ins folders, since that's where most AU detection failures actually start.

Before shipping, we run validation checks against Logic Pro's Plug-in Manager directly and confirm real-time performance holds up under normal session loads. If you're setting up a new plugin from any developer, the same habits apply: run the demo first, confirm the installer wrote to the correct system folder, check that authorization completed, and rescan in Plug-in Manager before assuming anything is broken.

## Common pitfalls and habits that prevent this from happening again

![Common pitfalls and habits that prevent this from happening again — overview diagram](https://media.babylovegrowth.ai/blog-images/organization-30746/1790937737015_Common-pitfalls-and-habits-that-prevent-this-from-happening-again-overview-diagram.jpeg)

Most AU visibility problems are preventable with a few consistent habits rather than reactive troubleshooting. Keep both your DAW and every plugin updated, and test a freshly installed plugin in a new, empty project before trusting it in a real session, since that isolates install problems from project-specific quirks immediately.

Favor installers that write directly to the system Audio and Plug-Ins folders over ones that default to user-level locations, since system folders are what Plug-in Manager scans first and most reliably. Keep a short written checklist for every new plugin: confirm install path, confirm authorization, then rescan. It takes two minutes and catches almost everything covered above before it becomes a session-day problem.

> *— Kai*

## If you want AU-native, well-tested plugins, try ToneLab

A lot of AU headaches trace back to plugins that were never built with Apple's validation process as a first priority. ToneLab is developed natively for AU, VST3, and AAX from the start, using an industry-standard C++ and JUCE architecture designed to install cleanly and pass Plug-in Manager's checks without extra configuration.

![Vector-dsp](https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-30746/1778694946550_vector-dsp.jpg)

- ToneLab's multi-lane parallel effects architecture gives per-band EQ targeting inside a single insert, built for surgical control rather than broad strokes.
- Releases are tested for correct installer placement and Apple silicon compatibility before shipping.
- The plugin runs with real-time, low-latency DSP across major DAWs on multiple platforms.

You can try ToneLab and see [current pricing](https://vector-dsp.com/pricing) directly on the product page, where it's available as a one-time license.

## FAQ

### Why is the plugin not working?

A plugin that installs but won't load is usually failing Apple's validation check, missing authorization, or sitting in the wrong install folder for its format. Running a rescan through Logic Pro's Plug-in Manager and checking the Compatibility column will usually identify which of the three it is.

### Why are UAD plugins disabled?

Universal Audio plugins typically disable when their license manager can't confirm activation on the current machine, often after a system update or a move between computers. Reopening the UAD license manager and confirming the authorization status resolves most of these cases.

### Why are my plugins not showing up in GarageBand?

GarageBand reads from the same system Audio Unit folders as Logic Pro, so a plugin missing in one is usually missing in both for the same reason: wrong install path, failed validation, or an architecture mismatch. Running a rescan from Logic Pro's Plug-in Manager often fixes visibility in GarageBand as well, since they share the same AU registration.

### Why won't my plugin show up in Logic?

The most common causes are an installer that placed the AU component in the wrong folder, a failed validation state, or a missing authorization, all of which show up directly in Plug-in Manager's Compatibility column. A restart followed by a rescan resolves the majority of these without further steps.

### Do Intel-only plugins need Rosetta on Apple silicon Macs?

Some do, particularly for specific workflows like ARA integration, since Apple's own guidance confirms that most AUv2 and AUv3 plugins run natively but certain Intel-only builds still require Rosetta. Checking with the plugin vendor for an Apple silicon native build is the better long-term fix.
