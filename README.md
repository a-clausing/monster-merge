# Monster Merge

A dark-fantasy merge-drop puzzle game for phones, in the style of Suika Game.
Drop monsters into the dungeon pit. When two of the same monster touch, they
merge into the next, bigger one. Keep the pile below the glowing line for as
long as you can.

**Play:** https://a-clausing.github.io/monster-merge/

On iPhone, open it in Safari, tap **Share → Add to Home Screen**, and launch
it from the icon for a full-screen app that also works offline.

## How to play

1. **Drag** to aim, **let go** to drop.
2. Two of the **same monster** touching merge into the next one.
3. Bigger monsters score more. Merge again quickly for a **chain combo** bonus.
4. Keep monsters **below the glowing line**. If they keep spilling over it,
   the game ends.
5. Discover all **11 monsters**. Merging two **Forgotten Ones** multiplies
   your score.

### The monsters (smallest → largest)

Slime → Imp → Goblin → Skeleton → Orc → Troll → Ogre → Golem → Demon →
Dragon → Forgotten One

Only the first four (Slime, Imp, Goblin, Skeleton) are ever dropped. Every
other monster must be merged.

## Features

- Real 2D physics ([Matter.js](https://brm.io/matter-js/))
- Layered, animated home screen (logo, floating reaper, pulsing orb, torch
  flicker, rising embers)
- Score, best score, and hidden mistakes (3 slips over the line ends the game)
- Achievements and an Evolution book that tracks every monster you've found
- Pause menu: music and effects volume with quick mute, reduced animations,
  How to Play, restart
- Sound effects and a generative "focus" dungeon music loop, all synthesized
  in code with the Web Audio API, so there are no audio files
- Saves your game in progress, so you can close the app and continue later
- Installable home-screen app with offline support

## Running it locally

There's no build step. Serve the folder with any static file server and open
it in a browser:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk (`file://`) mostly works, but the
monster art and offline mode need a real server.

## Publishing

The game is a static site served by **GitHub Pages** from the `main` branch.
Pushing to `main` publishes it, usually within a minute or two.

The offline cache in `sw.js` loads fresh files whenever the phone is online,
so updates reach players on their next launch. If you add or rename an asset,
also add it to the `ASSETS` list in `sw.js` and bump the `CACHE` name
(for example, `monster-merge-v6` → `monster-merge-v7`).

## Project layout

| Path | What it is |
| --- | --- |
| `index.html` | The whole game: markup, styles and code |
| `sw.js` | Service worker: offline cache, network-first |
| `manifest.webmanifest` | Home-screen app name, colors and icons |
| `monster_merge_orbs.zip` | The 11 monster orb images, loaded at startup |
| `dungeon-stage.b64` | The game-screen dungeon backdrop (base64 image) |
| `home-v3/` | Home screen and UI art: background, logo, reaper, orb, rocks, button frames, plaque, icons |
| `icons/` | App icons: 180 (iPhone), 192 and 512 (Android/desktop), a padded 512 "maskable" version, and a 32 px browser-tab icon |
| `fonts/` | Cinzel font (700 and 900 weights) and its license |
| `vendor/` | Matter.js 0.20.0 and JSZip 3.10.1, bundled for offline play |

## Making new art

The UI art in `home-v3/` was generated with an image AI on a solid
**bright green (#00FF00)** background, then cut out (chroma-keyed) into
transparent WebP files. Tips for new pieces:

- Attach an existing image as a style reference, so new pieces match.
- Ask for **no text**. Labels like PLAY and SCORE are real text in Cinzel, so
  they stay sharp and are easy to change.
- Ask for **no green on the object itself**, or it gets cut out with the
  background.

## Saved data

Everything is stored in the browser's `localStorage` on the player's device,
including the best score, saved game, stats, achievements, settings and
whether How to Play has been seen. All keys start with `monsterMerge`.

On iPhone, the home-screen app and Safari keep **separate** storage, so they
have separate best scores.

## Known issues

- **iOS 26 home-screen apps can lose sound after a relaunch.** This is a
  WebKit bug ([WebKit #291892](https://bugs.webkit.org/show_bug.cgi?id=291892)).
  The game works around it by rebuilding its audio when that happens.
  **Settings → Test sound** shows the audio status.
- iPhone's silent switch mutes the game on purpose.

## Credits

- Physics: [Matter.js](https://github.com/liabru/matter-js) (MIT)
- Zip loading fallback: [JSZip](https://stuk.github.io/jszip/) (MIT or GPLv3)
- Font: [Cinzel](https://fonts.google.com/specimen/Cinzel) by Natanael Gama
  (SIL Open Font License, see `fonts/OFL-Cinzel.txt`)
