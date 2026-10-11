/**
 * AudioController - Modular background music & celebratory sound effects
 */
class AudioController {
  constructor(options = {}) {
    this.audioSrc = options.src || null;
    this.audio = null;
    this.isPlaying = false;
    this.buttonEl = document.querySelector(options.buttonSelector || '#music-toggle-btn');
    this.iconEl = document.querySelector(options.iconSelector || '#music-icon');
    
    if (this.audioSrc) {
      this.initAudio();
    } else {
      this.updateButtonState(false);
    }

    if (this.buttonEl) {
      this.buttonEl.addEventListener('click', () => this.toggle());
    }
  }

  initAudio() {
    this.audio = new Audio(this.audioSrc);
    this.audio.loop = true;
    this.audio.preload = 'auto';
  }

  setSource(newSrc) {
    this.audioSrc = newSrc;
    if (this.audio) {
      this.audio.pause();
    }
    this.initAudio();
  }

  toggle() {
    if (!this.audioSrc) {
      // If no audio file has been selected yet, play a pleasant celebratory chime using Web Audio API!
      this.playChime();
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateButtonState(true);
    }).catch(() => {
      console.log('Audio autoplay prevented by browser');
    });
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateButtonState(false);
  }

  updateButtonState(playing) {
    if (!this.buttonEl) return;
    if (playing) {
      this.buttonEl.classList.add('playing');
      this.buttonEl.setAttribute('aria-label', 'Pause background music');
    } else {
      this.buttonEl.classList.remove('playing');
      this.buttonEl.setAttribute('aria-label', 'Play music or celebratory chime');
    }
  }

  /**
   * Built-in Web Audio API gentle celebration chime chords
   * Works on any phone with 0 external sound files!
   */
  playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major celebratory arpeggio
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + index * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.12 + 0.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + index * 0.12);
        osc.stop(ctx.currentTime + index * 0.12 + 0.85);
      });

      // Visual feedback
      if (this.buttonEl) {
        this.buttonEl.classList.add('playing');
        setTimeout(() => this.buttonEl.classList.remove('playing'), 900);
      }
    } catch (e) {
      console.log('WebAudio not supported:', e);
    }
  }
}

window.AudioController = AudioController;
