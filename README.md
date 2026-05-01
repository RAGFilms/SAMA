# SAMA
### Spectral Audio Morphing Application
#### Created by AGW Entertainment

---

A few years back, while surfing the net, I stumbled across Palestinian DJ [Sama' Abdulhadi](https://en.wikipedia.org/wiki/Sama%CA%BC_Abdulhadi) and was completely amazed by her set. In the years following I have thoroughly enjoyed her live performances and original productions. She is a hero to me.

Three years ago, out of frustration with every music player available, I started building my own. Many iterations, many failures, and more than a few moments of giving up later — SAMA exists. I think you will be very satisfied with it.

SAMA is a single-file, zero-install browser-based media player. Drop the HTML file anywhere, open it in Brave, Chrome, or Edge, and you are running a full-featured audio environment: local file playback, endless internet radio, playlist management, and a multi-mode audio-reactive visualizer — all in one self-contained file with no server, no dependencies to install, and no account required. It works on desktop, tablet, and phone.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Desktop Usage](#desktop-usage)
- [Mobile Usage](#mobile-usage)
- [Visualizer](#visualizer)
- [Themes](#themes)
- [MIDI Playback](#midi-playback)
- [Internet Radio](#internet-radio)
- [Playlist Management](#playlist-management)
- [Local Storage](#local-storage)
- [Browser Compatibility](#browser-compatibility)
- [Libraries Used](#libraries-used)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

**Local Playback**
Plays MP3, WAV, and MIDI files directly from your drive. Drag and drop individual files, select a full folder, or mix both. MIDI playback uses a built-in soundfont synthesizer with real-time piano roll display. Artist and title are parsed automatically from filenames formatted as `Artist - Title.mp3`.

**Internet Radio**
Powered by the [Radio Browser API](https://www.radio-browser.info/) — completely free, no API key required, access to tens of thousands of stations worldwide. Search by name, filter by 17 genre categories, save up to eight favorites as persistent presets.

**Playlist Management**
Build playlists from local files, save them by name, reload them across sessions, remove individual tracks, and clear the queue. Shuffle and loop modes included.

**Visualizer**
Six audio-reactive fullscreen visualizer modes with ten color presets. All modes respond to the active hardware theme and color selection in real time.

**Four Hardware Themes**
CASIO (amber phosphor), ROLAND (green phosphor), YAMAHA (electric blue), FREE PALESTINE (white LCD, green accent, four-color flag header stripe).

**Responsive Design**
Full desktop experience on wide screens. Optimized touch layout on phones and tablets — fixed transport bar, floating visualizer button, swipe-to-seek, finger-sized controls throughout.

---

## Getting Started

### Requirements

- A Chromium-based browser: **Brave**, **Chrome**, or **Edge** (recommended)
- Firefox is supported for most features
- No server, no installation, no internet connection required for local file playback
- Internet connection required for radio streaming and MIDI soundfont loading on first use

### Installation — Desktop

1. Download `sama-player.html` from this repository
2. Save it anywhere on your computer
3. Open it in Brave, Chrome, or Edge by dragging it into the browser or using `File > Open`

That is the entire installation.

### Installation — Mobile

1. Download `sama-player.html` to your phone or tablet
2. Open your browser (Chrome on Android, Safari or Chrome on iOS)
3. Use `File > Open` or locate the file in your Downloads folder and open it with the browser
4. For the best experience on Android, add it to your home screen: tap the browser menu and select `Add to Home Screen`

### iOS Note

iOS Safari blocks the fullscreen API for locally opened files. The visualizer will open as a large overlay rather than true fullscreen. All other features work normally. Chrome on iOS shares this restriction due to Apple's WebKit requirements.

---

## Desktop Usage

### Playing Local Files

**Adding files individually:**
Click `▼ ADD FILES` or drag and drop MP3, WAV, or MIDI files onto the drop zone. Files are added to the playlist immediately.

**Adding a full folder:**
Click `⊞ SELECT FOLDER`. A native folder picker opens. SAMA scans the folder and loads all compatible audio files. This is the fastest way to load a music library.

**Playing tracks:**
Click any track name in the playlist to play it immediately. The active track highlights in the accent color.

**Removing tracks:**
Click the `✕` button on the right of any playlist row. If the removed track is currently playing, SAMA advances to the next available track automatically.

**Filename convention for artist display:**
Format files as `Artist Name - Song Title.mp3` and both fields populate the LCD display automatically. Files without a hyphen separator display the full filename as the title.

### Transport Controls

| Button | Action |
|--------|--------|
| `\|◀◀` | Previous track |
| `◀◀` | Skip back 10 seconds |
| `▶ PLAY` / `‖ PAUSE` | Play or pause |
| `▶▶` | Skip forward 10 seconds |
| `▶▶\|` | Next track |
| `■` | Stop |
| `↺ LOOP` | Loop current track |
| `⇄ SHUF` | Shuffle playlist |

The seek bar is clickable — click anywhere to jump to that position in the track.

### LCD Display

The main display shows artist name (top left), track title (large, center), and elapsed time (top right). The waveform canvas below reacts to the audio in real time.

The status row displays source, format, duration or BPM, and play state.

---

## Mobile Usage

SAMA automatically detects your screen size and switches to a touch-optimized layout on phones under 600px wide, and applies touch-friendly sizing on tablets between 600px and 1023px.

### Phone Layout

**Theme button:**
The four hardware theme buttons collapse into a single cycle button in the top-right corner. Tap it to step through CASIO → ROLAND → YAMAHA → FREE PALESTINE and back. The current theme name displays on the button.

**Transport bar:**
Play controls lock to the bottom of the screen at all times, like a native music app. All buttons are minimum 52px tall for comfortable thumb reach.

**Floating VIZ button:**
A glowing `⬡` button sits above the transport bar at the bottom-right. Tap it to open the visualizer fullscreen.

**Seek bar:**
8px tall, fully touch-draggable. Touch and drag anywhere on it to scrub to any position in the track.

**Status row:**
Hidden on phones. Screen space is prioritized for content and controls.

**Drop zone:**
Hidden on phones. Use the `▼ ADD FILES` and `⊞ SELECT FOLDER` toolbar buttons instead.

**Radio presets:**
The eight preset slots become a horizontal scroll row. Swipe left and right to see all eight presets.

**Playlist rows:**
Minimum 44px tall for easy tap targeting.

### Tablet Layout

Tablets use the full desktop layout with wider touch targets, a thicker seek bar, and larger slider thumbs. The LCD, transport, and controls all scale proportionally to the available width.

### Mobile Tips

- On Android, use `Add to Home Screen` for a near-native app feel with no browser chrome
- Rotate to landscape for a wider visualizer canvas
- If audio does not start after tapping play, tap anywhere on the screen once to satisfy the browser's Web Audio gesture requirement
- On iOS, ensure a data connection is active the first time you play a MIDI file so the soundfont can load from CDN

---

## Visualizer

Click `⬡ VIZ` (desktop) or the floating `⬡` button (mobile) to open the visualizer fullscreen. Use the square buttons along the bottom bar to switch modes and colors. Press `✕` or `Escape` to close.

### Modes

| Button | Name | Description |
|--------|------|-------------|
| ✦ GEOM | Islamic Geometric | Procedural star polygon tessellation. Bass drives rotation speed and tile scale. Mid frequencies morph point count between 5 and 13. Shockwave rings radiate from center on beat hits. Each star has an inner detail ring and connecting straps. |
| ▐▐ SPEC | Spectrum | Classic FFT frequency bars with falling peak markers and phosphor scanline overlay. 140 bars across the full screen width. |
| ∿ SCOPE | Oscilloscope | Alternates every 500 frames between a classic waveform display with grid and a Lissajous figure using left vs right channel data. |
| ◎ RADIAL | Radial | 200 frequency bars radiating outward from a center point, slowly rotating, spin speed driven by bass amplitude. |
| ❋ MIRROR | Kaleidoscope | Waveform ribbons reflected symmetrically across multiple segments with spectrum bars in each wedge. Segment count morphs on heavy bass hits. A center bloom dot pulses with amplitude. |
| ⣿ PLASMA | 3D Mesh | 48×27 point frequency mesh with sinusoidal depth displacement. Point size and brightness are amplitude-driven. Nodes connect horizontally and vertically with fading lines. |
| ⚄ RND | Random | Switches between all six modes on detected beat hits and at random time intervals. The button label briefly shows the active mode name. |

### Color Modes

| Button | Name | Description |
|--------|------|-------------|
| THEME | Theme | Inherits the active hardware theme phosphor color |
| CYCLE | Cycle | Slow continuous HSL hue rotation through the full spectrum |
| BEAT | Beat | Hue jumps to a new random value on every detected kick or bass transient |
| PRISM | Prism | Each bar or element gets its own hue, spreading the full spectrum simultaneously |
| FIRE | Fire | Red → orange → yellow gradient mapped across frequency bands |
| ICE | Ice | Deep blue → cyan → white gradient |
| AURORA | Aurora | Cycles through green → blue → purple → pink → cyan |
| 🇵🇸 PALST | Palestine | Palestinian flag colors — black, red, white, green — cycled across all visual elements |
| ∞ RAND | Random Drift | Smoothly interpolates toward random hue targets, independent of the music |

**Recommended combinations:**
- `GEOM` + `PALST` — Islamic geometric patterns in Palestinian flag colors
- `GEOM` + `BEAT` — Stars change color on every kick hit
- `MIRROR` + `PRISM` — Full rainbow kaleidoscope
- `PLASMA` + `AURORA` — Aurora borealis mesh field
- `RND` + `CYCLE` — Full chaos mode, never repeats

---

## Themes

Click the theme button (desktop: buttons in top-right corner; mobile: cycle button) to switch. Selection persists across sessions via local storage.

| Theme | Panel | LCD Color | Accent | Character |
|-------|-------|-----------|--------|-----------|
| CASIO | Deep amber-black `#120e00` | Amber `#ffaa00` | Amber | 1983 calculator warmth |
| ROLAND | Deep green-black `#001200` | Phosphor green `#00ff41` | Green | Classic terminal authority |
| YAMAHA | Near-black `#00000e` | Electric blue `#00a8ff` | Blue | DX7 parameter display |
| 🇵🇸 FREE PALESTINE | True black `#0d0d0d` | White `#f0f0f0` | Palestinian green `#009736` | Four-color flag header stripe |

The FREE PALESTINE theme is unique in that its top accent line renders as a horizontal stripe in the four colors of the Palestinian flag — black, red, white, green. No other theme has a multi-color header.

---

## MIDI Playback

SAMA plays standard MIDI files (`.mid`, `.midi`) using midi-player-js for sequencing and soundfont-player with the MusyngKite acoustic grand piano soundfont.

**Loading:** Add MIDI files the same way as audio files — ADD FILES, SELECT FOLDER, or drag and drop. MIDI files are identified by their extension and handled separately from audio files.

**Piano roll:** A real-time piano roll canvas appears below the LCD display when a MIDI file is loaded. Notes light up and scroll as they play, with velocity-mapped brightness.

**Tempo:** BPM is displayed in the status row during MIDI playback.

**First-time soundfont loading:** The soundfont data is fetched from a CDN the first time you play a MIDI file. This requires an active internet connection and may take a few seconds. The browser caches it afterward so subsequent MIDI playback works offline.

**Current MIDI limitations:**
- Single instrument (acoustic grand piano)
- No per-track or per-channel muting in this release
- Seek scrubbing not supported for MIDI files
- Tempo modification not available in this release

---

## Internet Radio

SAMA connects to the Radio Browser API, a free community-maintained directory of internet radio stations worldwide. No API key, account, or payment is required.

### How to Search

1. Switch to the `RADIO` tab
2. Type a station name in the search field, select a genre from the dropdown, or both
3. Click `SCAN`
4. Results appear sorted by listener votes
5. Click any station to start streaming

### Preset Stations

- Click `★` next to any station in the results to save it to the next available preset slot (P1–P8)
- Tap or click a filled preset button to play that station immediately
- Right-click (desktop) or long-press (mobile) a preset to clear it
- Presets persist across sessions in local storage

### About CORS Errors

When SAMA shows `CORS` instead of playing a station, it means the station's streaming server rejected the connection because SAMA is opened as a local file rather than from a web server. This is a browser security policy — approximately 30% of radio streams have this limitation.

**What to do:**
- Try other stations in the same search results — most searches return several CORS-compatible stations
- Higher-bitrate stations from larger broadcasters generally work more reliably
- Hosting SAMA on a simple local web server eliminates most CORS issues:

```bash
# In the folder containing sama-player.html
python3 -m http.server 8080
# Then open http://localhost:8080/sama-player.html in your browser
```

---

## Playlist Management

### Building a Queue

Files accumulate across multiple add operations. You can add a folder, then add individual files, and they all appear in the same playlist queue. The order follows the order they were added (folders load in filesystem order, typically alphabetical).

### Saving a Playlist

Click `+ CREATE PLAYLIST` after building a queue. Enter a name. The list of track filenames is saved to local storage. Playlists can be named anything and there is no limit to how many you can save.

### Loading a Playlist

Click `▶ LOAD PLAYLIST`. Your saved playlist names appear. Enter the name to load. You will then need to re-add the source files or folder — SAMA matches filenames from the saved list against what you load. This design keeps the file self-contained and avoids broken absolute path references.

### Removing Tracks

Click `✕` on any playlist row. Removing the active track advances playback to the next track. The index tracker updates correctly throughout — no skipped or double-played tracks.

### Clearing the Queue

Click `✕ CLEAR` in the toolbar. This empties the current queue only. Saved playlists in local storage are not affected.

---

## Local Storage

SAMA stores data locally in your browser. Nothing is sent to any external server beyond radio stream connections and the CDN requests for fonts and libraries on first load.

| Storage Key | Contents |
|-------------|----------|
| `sama_theme` | Last active theme name |
| `sama_presets` | Array of eight radio station objects |
| `sama_playlists` | Object of named playlists with filename arrays |

### Clearing SAMA Data

Open browser developer tools (`F12` or `Cmd+Option+I` on Mac), go to **Application** → **Local Storage** → your file path, and delete keys beginning with `sama_`. Alternatively use your browser's **Clear Site Data** function for the local file origin.

---

## Browser Compatibility

### Desktop

| Browser | Local Files | Folder Select | Radio | Visualizer | MIDI |
|---------|------------|---------------|-------|------------|------|
| Brave ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chrome ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edge ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ | ✅ | ✅ |
| Safari | ✅ | ⚠️ Limited | ✅ | ✅ | ✅ |

### Mobile

| Browser | Files | Folder | Radio | Visualizer | Fullscreen |
|---------|-------|--------|-------|------------|------------|
| Chrome / Android | ✅ | ✅ | ✅ | ✅ | ✅ |
| Brave / Android | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firefox / Android | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chrome / iOS | ✅ | ⚠️ One at a time | ✅ | ✅ | ⚠️ Overlay |
| Safari / iOS | ✅ | ⚠️ One at a time | ✅ | ✅ | ⚠️ Overlay |

**Recommended:** Brave on desktop and Android. Chrome on iOS.

iOS fullscreen restriction is enforced by Apple at the OS level for all browsers — it is not something SAMA can work around. The visualizer opens as a full-window overlay which is functionally equivalent in most cases.

---

## Libraries Used

All libraries load from CDN on first use and are cached by the browser. An internet connection is required for the initial load of each library.

| Library | Version | Purpose | License |
|---------|---------|---------|---------|
| [DSEG Font](https://github.com/keshikan/DSEG) | 0.46.0 | Authentic seven-segment LCD typeface | SIL OFL 1.1 |
| [midi-player-js](https://github.com/grimmdude/MidiPlayerJS) | 2.0.16 | MIDI file parsing and playback sequencing | MIT |
| [soundfont-player](https://github.com/danigb/soundfont-player) | 0.12.0 | Web Audio API soundfont synthesis | MIT |
| [Radio Browser API](https://www.radio-browser.info/) | — | Free open community radio station directory | CC0 1.0 |

---

## Roadmap

Planned for future releases:

- ID3 tag reading — auto-populate artist and title from embedded file metadata
- Equalizer with adjustable frequency bands
- Additional visualizer modes
- Expanded skin and theme system
- MIDI instrument selection per channel
- MIDI seek and tempo control
- Playlist drag-to-reorder
- Export playlist as M3U
- Local web server mode to resolve CORS limitations

---

## Contributing

SAMA is a passion project maintained by AGW Entertainment. Feature requests and bug reports are welcome via the GitHub issue tracker. Please read the license terms before submitting pull requests.

---

## License

© AGW Entertainment. All rights reserved. See [LICENSE](LICENSE) for full terms.

Personal use and unmodified sharing with attribution is permitted. Commercial use and derivative works require written permission from AGW Entertainment.

---

*Dedicated to Sama' Abdulhadi — keep playing.*
