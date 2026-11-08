# Srikanth Music

A mobile-first YouTube music player built with plain HTML, CSS, and JavaScript. No install or build step is needed. Open `index.html` directly for local UI and pasted-link playback, or serve this folder over localhost/HTTPS for the service worker and install features. YouTube playback, metadata, and artwork need internet access.

## Search and API key

Pasting a YouTube video URL or 11-character video ID works without an API key. The app requests public metadata from YouTube oEmbed and sends the video to YouTube's official IFrame Player API. Some videos may not allow embedding, and browser autoplay policies may require an explicit play tap.

For text search, create a YouTube Data API v3 key in Google Cloud Console and enable the API. Open Settings and paste the key. It is stored locally in this browser as `glassfm_api_key` and sent to Google's API for searches. Restrict the key to your use and do not publish it.

## Included features

- Liquid-glass cards with a local fixed background photo, now-playing artwork and responsive layout
- YouTube Data API v3 search and no-key URL/ID metadata lookup
- Hidden official YouTube iframe, play/pause, seek, previous/next and volume controls
- Queue, shuffle, repeat off/all/one, favorites and recent plays in localStorage
- Floating mini-player with springy touch feedback, ripple, long-press feedback and toggle micro-shake
- Media Session artwork, metadata and play/pause/seek/previous/next handlers where supported
- PWA manifest, 192/512/maskable icons, and service worker shell cache/offline fallback

## Install as a PWA or Android APK

1. Host the complete folder on GitHub Pages or Cloudflare Pages. All local links are relative, so a GitHub Pages subpath such as `/repo-name/` works. The manifest is `manifest.json` at the deployed site root.
2. Open the HTTPS site on Android Chrome and use its Install app/Add to Home screen option. A service worker and secure context require HTTPS or localhost, not `file://`.
3. To create a sideloadable Android APK, open the deployed HTTPS URL at https://www.pwabuilder.com/, run its checks, then use its Android package flow to create and sign an APK. This project does not compile an APK. Protect the signing key PWABuilder creates or asks you to provide.

## Background playback and Android limits

Start a track while the app is foregrounded. On a supported browser, Media Session publishes metadata and artwork and registers play, pause, seek, previous, and next actions. The app requests a Screen Wake Lock while starting playback when available and renews it when the page becomes visible. Wake Lock keeps the screen on, so it does not let the display sleep while guaranteeing audio. The app does not keep the screen awake continuously. Audio continuing while hidden or screen-off depends on Android/Chrome, installed-app mode, YouTube's iframe, network, and power management. Web apps cannot guarantee audio-focus ownership or prevent the OS from suspending the page. Test lock-screen playback on a real Android phone; desktop emulation is not proof. The YouTube iframe may reject individual videos.

## Files

- `index.html`: app shell
- `css/`: base layout, glass surfaces, now-playing, mini-player, touch feedback
- `js/`: API, playback wrapper, queue, storage, UI, Media Session, app wiring
- `assets/night-sky.jpg`: local background photo
- `assets/icon-192.png`, `assets/icon-512.png`, `assets/icon-maskable-512.png`: install icons
- `manifest.json`: PWA Builder-compatible manifest
- `sw.js`: app-shell cache and offline index fallback
