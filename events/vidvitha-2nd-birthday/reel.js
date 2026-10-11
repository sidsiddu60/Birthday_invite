/**
 * StoryReel - Fullscreen mobile story reel with auto-progressing slides,
 * touch gestures (tap left/right, hold to pause), and celebratory animations.
 */
class StoryReel {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '#story-reel-modal');
    this.slidesContainer = document.querySelector(options.slidesSelector || '#reel-slides');
    this.progressContainer = document.querySelector(options.progressSelector || '#reel-progress-bars');
    this.closeBtn = document.querySelector(options.closeBtnSelector || '#reel-close-btn');
    this.duration = options.duration || 5000; // 5 seconds per slide
    this.slides = [];
    this.currentIndex = 0;
    this.timer = null;
    this.startTime = 0;
    this.remainingTime = this.duration;
    this.isPaused = false;
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.container) return;

    this.slides = Array.from(this.slidesContainer.querySelectorAll('.reel-slide'));
    this.buildProgressBars();
    this.bindEvents();
  }

  buildProgressBars() {
    this.progressContainer.innerHTML = '';
    this.progressBars = [];

    this.slides.forEach((_, idx) => {
      const barWrapper = document.createElement('div');
      barWrapper.className = 'progress-bar-wrapper';

      const fill = document.createElement('div');
      fill.className = 'progress-bar-fill';
      barWrapper.appendChild(fill);

      this.progressContainer.appendChild(barWrapper);
      this.progressBars.push(fill);
    });
  }

  bindEvents() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // Touch / Click navigation
    this.container.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#reel-close-btn') || e.target.closest('.reel-action-btn')) return;
      this.pause();
      this.holdTimeout = setTimeout(() => {
        this.isHolding = true;
      }, 180);
    });

    this.container.addEventListener('pointerup', (e) => {
      if (e.target.closest('#reel-close-btn') || e.target.closest('.reel-action-btn')) return;
      clearTimeout(this.holdTimeout);

      if (!this.isHolding) {
        const rect = this.container.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX < rect.width * 0.35) {
          this.prev();
        } else {
          this.next();
        }
      } else {
        this.resume();
      }
      this.isHolding = false;
    });

    this.container.addEventListener('pointercancel', () => {
      clearTimeout(this.holdTimeout);
      this.isHolding = false;
      this.resume();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') this.next();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'Escape') this.close();
    });
  }

  open(startIndex = 0) {
    this.isOpen = true;
    this.container.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.goToSlide(startIndex);
    if (window.celebrationFX) {
      window.celebrationFX.burst({ count: 40 });
    }
  }

  close() {
    this.isOpen = false;
    this.pause();
    this.container.classList.remove('active');
    document.body.style.overflow = '';
  }

  goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= this.slides.length) {
      // Loop or gracefully exit to invitation view
      this.close();
      return;
    }

    this.currentIndex = index;

    // Update slides visibility
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    // Update progress bars
    this.progressBars.forEach((bar, idx) => {
      bar.style.transition = 'none';
      if (idx < index) {
        bar.style.width = '100%';
      } else if (idx === index) {
        bar.style.width = '0%';
      } else {
        bar.style.width = '0%';
      }
    });

    // Trigger subtle celebratory effect on specific slides
    if (index === 1 || index === 2) {
      if (window.celebrationFX) {
        window.celebrationFX.burst({ count: 30, y: window.innerHeight * 0.3 });
      }
    }

    this.remainingTime = this.duration;
    this.startSlideTimer();
  }

  startSlideTimer() {
    clearTimeout(this.timer);
    const currentBar = this.progressBars[this.currentIndex];
    
    // Force reflow
    void currentBar.offsetWidth;
    
    currentBar.style.transition = `width ${this.remainingTime}ms linear`;
    currentBar.style.width = '100%';
    this.startTime = Date.now();

    this.timer = setTimeout(() => {
      this.next();
    }, this.remainingTime);
  }

  pause() {
    if (this.isPaused || !this.isOpen) return;
    this.isPaused = true;
    clearTimeout(this.timer);

    const elapsed = Date.now() - this.startTime;
    this.remainingTime = Math.max(0, this.remainingTime - elapsed);

    const currentBar = this.progressBars[this.currentIndex];
    const computedWidth = getComputedStyle(currentBar).width;
    currentBar.style.transition = 'none';
    currentBar.style.width = computedWidth;
  }

  resume() {
    if (!this.isPaused || !this.isOpen) return;
    this.isPaused = false;
    this.startSlideTimer();
  }

  next() {
    this.goToSlide(this.currentIndex + 1);
  }

  prev() {
    this.goToSlide(this.currentIndex - 1);
  }
}

window.StoryReel = StoryReel;
