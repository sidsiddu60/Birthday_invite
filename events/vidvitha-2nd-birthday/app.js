/**
 * Birthday Invitation Main Application Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Event Countdown to Oct 16, 2026 18:00 IST
  const targetDate = '2026-10-16T18:00:00+05:30';
  new EventCountdown(targetDate, {
    days: '#cd-days',
    hours: '#cd-hours',
    mins: '#cd-mins',
    secs: '#cd-secs',
    status: '#cd-status'
  });

  // 2. Initialize Audio & Chime Controller
  const audioCtrl = new AudioController({
    buttonSelector: '#music-toggle-btn',
    iconSelector: '#music-icon'
  });

  // 3. Initialize Story Reel
  const reel = new StoryReel({
    containerSelector: '#story-reel-modal',
    slidesSelector: '#reel-slides',
    progressSelector: '#reel-progress-bars',
    closeBtnSelector: '#reel-close-btn',
    duration: 5000
  });

  // Story Reel triggers
  const openReelButtons = document.querySelectorAll('.trigger-story-reel');
  openReelButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      audioCtrl.playChime();
      reel.open(0);
    });
  });

  // 4. Envelope Unfold Experience
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

  // 5. Calendar Actions
  const eventDetails = {
    title: "Shree Vidvitha Varenya's 2nd Birthday Celebration 🎂",
    details: "Double the giggles, twice the fun, our little princess is turning TWO! Join us as we celebrate 2 magical years filled with love, laughter, and sweet memories.",
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

  // 6. WhatsApp Forwarding / Share Button
  const shareBtn = document.getElementById('whatsapp-share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = window.location.href;
      const shareText = encodeURIComponent(
        `🎂 *You're Invited to Shree Vidvitha Varenya's 2nd Birthday!* ✨\n\n` +
        `"TWO CUTE to Be ONE"\n` +
        `📅 *Date:* Friday, October 16th, 2026\n` +
        `⏰ *Time:* 6:00 PM onwards\n` +
        `📍 *Venue:* M.M Party Hall, Avadi\n\n` +
        `Tap the link below to open the interactive invitation & get directions:\n${shareUrl}`
      );
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    });
  }

  // 7. Interactive Confetti on Cake or Crown tap
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
