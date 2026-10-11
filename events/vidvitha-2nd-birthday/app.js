/**
 * ============================================================================
 * FEATURE TOGGLE CONFIGURATION (Backend / Settings)
 * ============================================================================
 * Easily turn optional features ON (true) or OFF (false) anytime.
 */
const INVITATION_CONFIG = {
  features: {
    storyReel: false,        // Fullscreen 9:16 vertical Story Reel mode
    calendar: false,         // Google Calendar & Apple (.ics) 1-tap buttons
    whatsappShare: false,    // "Forward on WhatsApp" button
    googleMaps: true,        // 1-Tap Google Maps directions (active)
    countdown: true,         // Moments until celebration countdown
    audioChime: true         // Celebratory chime & floating music bell
  }
};

/**
 * Apply feature visibility based on configuration
 */
function applyFeatureToggles(config = INVITATION_CONFIG) {
  const { features } = config;

  // Toggle DOM elements mapped with data-feature attributes
  document.querySelectorAll('[data-feature]').forEach((el) => {
    const feat = el.getAttribute('data-feature');
    if (features[feat] === false) {
      el.style.display = 'none';
    } else if (features[feat] === true) {
      el.style.display = '';
    }
  });

  // If Story Reel is turned off, center the royal badge in the top nav
  const topNav = document.querySelector('.top-nav');
  if (topNav) {
    if (features.storyReel === false) {
      topNav.classList.add('centered-pill');
    } else {
      topNav.classList.remove('centered-pill');
    }
  }

  // Toggle audio chime button
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn && features.audioChime === false) {
    musicBtn.style.display = 'none';
  }
}

/**
 * Main Application Lifecycle
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Apply Backend Feature Toggles Immediately
  applyFeatureToggles(INVITATION_CONFIG);

  // 2. Initialize Event Countdown to Oct 16, 2026 18:00 IST
  if (INVITATION_CONFIG.features.countdown) {
    const targetDate = '2026-10-16T18:00:00+05:30';
    new EventCountdown(targetDate, {
      days: '#cd-days',
      hours: '#cd-hours',
      mins: '#cd-mins',
      secs: '#cd-secs',
      status: '#cd-status'
    });
  }

  // 3. Initialize Audio & Chime Controller
  const audioCtrl = new AudioController({
    buttonSelector: '#music-toggle-btn',
    iconSelector: '#music-icon'
  });

  // 4. Initialize Story Reel (if enabled)
  if (INVITATION_CONFIG.features.storyReel) {
    const reel = new StoryReel({
      containerSelector: '#story-reel-modal',
      slidesSelector: '#reel-slides',
      progressSelector: '#reel-progress-bars',
      closeBtnSelector: '#reel-close-btn',
      duration: 5000
    });

    const openReelButtons = document.querySelectorAll('.trigger-story-reel');
    openReelButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        audioCtrl.playChime();
        reel.open(0);
      });
    });
  }

  // 5. Envelope Unfold Experience
  const envelopeModal = document.getElementById('envelope-overlay');
  const openEnvelopeBtn = document.getElementById('open-envelope-btn');
  const replayEnvelopeBtn = document.getElementById('replay-envelope-btn');

  function openEnvelope() {
    if (!envelopeModal) return;
    envelopeModal.classList.add('opening');
    audioCtrl.playChime();

    if (window.celebrationFX) {
      window.celebrationFX.burst({ count: 90 });
      setTimeout(() => window.celebrationFX.burst({ count: 60 }), 450);
    }

    setTimeout(() => {
      envelopeModal.classList.add('hidden');
      document.body.classList.remove('lock-scroll');
    }, 1100);
  }

  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener('click', openEnvelope);
  }

  if (replayEnvelopeBtn) {
    replayEnvelopeBtn.addEventListener('click', () => {
      envelopeModal.classList.remove('hidden', 'opening');
      document.body.classList.add('lock-scroll');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Calendar Actions (if enabled)
  if (INVITATION_CONFIG.features.calendar) {
    const eventDetails = {
      title: "Shree Vidvitha Varenya's Birthday Celebrations 🎂",
      details: "Join us to celebrate Shree Vidvitha Varenya's Birthday.",
      location: "M.M Party Hall, No: 31, Cholambedu Rd, Ganesh Nagar, Thirumullaivoyal, Avadi, Tamil Nadu 600062",
      startDate: '2026-10-16T18:00:00+05:30',
      endDate: '2026-10-16T22:30:00+05:30',
      slug: 'vidvitha-varenya-2nd-birthday'
    };

    const gcalBtn = document.getElementById('add-gcal-btn');
    const icsBtn = document.getElementById('download-ics-btn');

    if (gcalBtn) {
      gcalBtn.href = CalendarHelper.getGoogleCalendarUrl(eventDetails);
    }

    if (icsBtn) {
      icsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        CalendarHelper.downloadIcs(eventDetails);
        if (window.celebrationFX) {
          window.celebrationFX.burst({ count: 35 });
        }
      });
    }
  }

  // 7. WhatsApp Forwarding / Share Button (if enabled)
  if (INVITATION_CONFIG.features.whatsappShare) {
    const shareBtn = document.getElementById('whatsapp-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const shareUrl = window.location.href;
        const shareText = encodeURIComponent(
          `🎂 *Shree Vidvitha Varenya's Birthday Celebrations* ✨\n\n` +
          `Join us to celebrate Shree Vidvitha Varenya's Birthday\n\n` +
          `📅 *Date:* Friday, October 16th, 2026\n` +
          `⏰ *Time:* 6:00 PM onwards\n` +
          `📍 *Venue:* M.M Party Hall, Avadi\n\n` +
          `Tap the link below to open the interactive invitation & get directions:\n${shareUrl}`
        );
        window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
      });
    }
  }

  // 8. Interactive Confetti on Cake or Crown tap
  const interactiveIcons = document.querySelectorAll('.interactive-tap');
  interactiveIcons.forEach((el) => {
    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      if (window.celebrationFX) {
        window.celebrationFX.burst({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          count: 45
        });
      }
      audioCtrl.playChime();
    });
  });

  // Start subtle celebratory ambient falling stars
  if (window.celebrationFX) {
    window.celebrationFX.startGentleRain();
  }
});
