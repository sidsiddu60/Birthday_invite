/**
 * EventCountdown - Universal live countdown timer
 */
class EventCountdown {
  constructor(targetDateString, elements = {}) {
    this.targetDate = new Date(targetDateString).getTime();
    this.daysEl = document.querySelector(elements.days || '#cd-days');
    this.hoursEl = document.querySelector(elements.hours || '#cd-hours');
    this.minsEl = document.querySelector(elements.mins || '#cd-mins');
    this.secsEl = document.querySelector(elements.secs || '#cd-secs');
    this.statusEl = document.querySelector(elements.status || '#cd-status');
    this.timerId = null;

    this.update = this.update.bind(this);
    this.start();
  }

  start() {
    this.update();
    this.timerId = setInterval(this.update, 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  pad(num) {
    return num.toString().padStart(2, '0');
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      if (this.daysEl) this.daysEl.textContent = '00';
      if (this.hoursEl) this.hoursEl.textContent = '00';
      if (this.minsEl) this.minsEl.textContent = '00';
      if (this.secsEl) this.secsEl.textContent = '00';
      if (this.statusEl) {
        this.statusEl.textContent = '🎉 Celebration is happening today! Join us!';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = this.pad(days);
    if (this.hoursEl) this.hoursEl.textContent = this.pad(hours);
    if (this.minsEl) this.minsEl.textContent = this.pad(minutes);
    if (this.secsEl) this.secsEl.textContent = this.pad(seconds);
  }
}

window.EventCountdown = EventCountdown;
