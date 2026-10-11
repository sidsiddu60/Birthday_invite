# 🎂 Family Celebrations & Birthday WhatsApp Invitations

A mobile-first, high-impact digital invitation platform built for sharing on **WhatsApp** across mobile devices. It includes an interactive invitation card, wax seal envelope unfold, real-time countdown, 1-tap Google Maps directions, and a full-screen vertical **Story / Video Reel mode** (like Instagram/WhatsApp Stories).

---

## 🌟 Features

* **Dual Experience in One Web App**:
  1. **Interactive Invitation Card**: Unfolds like a royal envelope with a golden wax seal, live ticker countdown, event schedule, 1-tap Google Maps directions, 1-tap Add to Calendar (Google & Apple/ICS), and WhatsApp share.
  2. **Animated Story / Video Reel Mode**: Fullscreen 9:16 vertical story reel with auto-advancing slides, touch gestures (tap left/right, hold to pause), and cinematic typography.
* **Optimized for WhatsApp Sharing (OpenGraph)**:
  - Custom OpenGraph preview card (`og_preview.jpg`), title, and description.
  - When you paste the link into any WhatsApp chat or group, WhatsApp automatically displays a rich invitation card with thumbnail image and event details.
* **Single Repository for Multiple Family Events**:
  - Organized structure (`events/vidvitha-2nd-birthday/`, `events/template/`).
  - Add future events (birthdays, anniversaries, naming ceremonies) without duplicating code or creating new repositories.
* **Zero Server Crashes on GitHub Pages**:
  - 100% static, client-side, CDN-cached by GitHub and Fastly.
  - Unlimited traffic capacity — will never crash, timeout, or face server errors regardless of how many guests tap the link simultaneously.

---

## 📁 Repository Structure

```
Birthday_invite/
├── index.html                                 # Smart redirect to active event / Family Hub
├── 404.html                                   # GitHub Pages routing fallback
├── events/
│   ├── vidvitha-2nd-birthday/                 # Active Event: Shree Vidvitha Varenya (Oct 16)
│   │   ├── index.html                         # Mobile app & Story Reel markup
│   │   ├── style.css                          # Luxury pastel pink & gold theme
│   │   ├── app.js                             # Interactive app controller
│   │   ├── reel.js                            # 9:16 Story Reel gesture & timing engine
│   │   ├── event-data.json                    # Structured event data
│   │   └── assets/
│   │       ├── flyer_cover_opt.jpg            # Optimized flyer cover
│   │       ├── flyer_details_opt.jpg          # Optimized flyer venue details
│   │       ├── og_preview.jpg                 # WhatsApp link preview card (1200x900)
│   │       └── story_reel_bg.jpg              # Vertical 9:16 story reel artwork
│   └── template/                              # Boilerplate for future family celebrations
│       ├── index.html
│       ├── style.css
│       ├── app.js
│       └── event-data.json
├── shared/                                    # Reusable assets across all events
│   ├── css/
│   │   └── common.css                         # Shared tokens, typography & animations
│   └── js/
│       ├── confetti.js                        # Particle & burst confetti engine
│       ├── countdown.js                       # Universal countdown timer
│       ├── calendar.js                        # 1-tap Google Calendar & ICS generator
│       └── audio-controller.js                # Background music & celebratory chimes
└── README.md
```

---

## 🚀 How to Deploy on GitHub Pages (Step-by-Step)

GitHub Pages provides **free, permanent hosting** backed by a global CDN with 99.99%+ uptime.

1. **Push this repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WhatsApp family invitations platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Birthday_invite.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   * On GitHub, go to your repository: **Settings** → **Pages** (in the left sidebar).
   * Under **Build and deployment**:
     * **Source**: Choose `Deploy from a branch`.
     * **Branch**: Select `main`, folder `/ (root)`.
     * Click **Save**.

3. **Get Your Invitation Link**:
   * Within ~30 to 60 seconds, GitHub Pages will deploy your site at:
     ```
     https://<your-username>.github.io/Birthday_invite/
     ```
   * Or directly to Vidvitha's celebration:
     ```
     https://<your-username>.github.io/Birthday_invite/events/vidvitha-2nd-birthday/
     ```

---

## 💬 How to Share on WhatsApp

1. Copy your GitHub Pages URL (e.g. `https://<your-username>.github.io/Birthday_invite/`).
2. Paste it into any WhatsApp chat or family group.
3. **Wait 2 seconds** before pressing Send: WhatsApp will automatically fetch and display the preview thumbnail with the title *"Two Cute to Be One ✨ Shree Vidvitha Varenya's 2nd Birthday"*.
4. Guests can tap the link directly inside WhatsApp to experience the envelope reveal, countdown, directions, and story reel!

> [!TIP]
> **Testing WhatsApp Link Preview**: You can test how WhatsApp or social apps see your preview image anytime using the free [Facebook / Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) or simply by pasting the link into WhatsApp Web.

---

## 🎵 Adding Background Music Later

The project includes an `AudioController` module ready to connect any soundtrack:
1. Place your audio file (e.g. `music.mp3`) inside `events/vidvitha-2nd-birthday/assets/`.
2. In `events/vidvitha-2nd-birthday/app.js`, update the initialization line:
   ```javascript
   const audioCtrl = new AudioController({
     src: 'assets/music.mp3', // Path to your audio track
     buttonSelector: '#music-toggle-btn',
     iconSelector: '#music-icon'
   });
   ```
3. That's it! When guests open the envelope, the music will play smoothly with a floating mute/unmute button. If no audio file is provided, tapping the bell plays a gentle celebratory chime chord.

---

## ➕ Adding a New Family Event in Future

To add a new celebration (e.g. 1st birthday, anniversary, naming ceremony):
1. Duplicate `events/template/` to a new folder, e.g. `events/ananya-naming-ceremony/`.
2. Edit `events/ananya-naming-ceremony/event-data.json` and `index.html` with the new event details and photos.
3. In the root `index.html`, update `ACTIVE_EVENT_URL = 'events/ananya-naming-ceremony/'`.
