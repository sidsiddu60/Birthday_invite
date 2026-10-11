/**
 * CelebrationFX - Lightweight Canvas Confetti, Stars & Floating Hearts
 * Zero external dependencies, GPU-accelerated.
 */
class CelebrationFX {
  constructor() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'confetti-canvas';
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isRaining = false;
    this.colors = [
      '#f48fb1', '#f06292', '#e91e63', // Pinks
      '#d4af37', '#ffd54f', '#ffecb3', // Golds
      '#e5a9a9', '#f8bbd0', '#ffffff'  // Rose Gold, Pastels & Whites
    ];
    this.shapes = ['circle', 'rect', 'star', 'heart'];

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle(x, y, isBurst = false) {
    const angle = isBurst ? Math.random() * Math.PI * 2 : (Math.PI / 2) + ((Math.random() - 0.5) * 0.4);
    const speed = isBurst ? Math.random() * 8 + 3 : Math.random() * 2 + 1;
    
    return {
      x: x !== undefined ? x : Math.random() * this.canvas.width,
      y: y !== undefined ? y : -20,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + (isBurst ? -2 : 1),
      size: Math.random() * 7 + 4,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      shape: this.shapes[Math.floor(Math.random() * this.shapes.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      opacity: 1,
      fadeSpeed: isBurst ? Math.random() * 0.012 + 0.008 : 0,
      gravity: 0.12,
      wobble: Math.random() * 10,
      wobbleSpeed: Math.random() * 0.08 + 0.03
    };
  }

  burst(options = {}) {
    const count = options.count || 70;
    const x = options.x !== undefined ? options.x : window.innerWidth / 2;
    const y = options.y !== undefined ? options.y : window.innerHeight * 0.4;

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(x, y, true));
    }
    
    if (!this.animationId) {
      this.animate();
    }
  }

  startGentleRain() {
    if (this.isRaining) return;
    this.isRaining = true;
    if (!this.animationId) {
      this.animate();
    }
  }

  stopGentleRain() {
    this.isRaining = false;
  }

  drawShape(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);
    this.ctx.fillStyle = p.color;
    this.ctx.globalAlpha = Math.max(0, p.opacity);

    if (p.shape === 'circle') {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
    } else if (p.shape === 'rect') {
      this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else if (p.shape === 'star') {
      const spikes = 5;
      const outerRadius = p.size;
      const innerRadius = p.size / 2;
      let rot = (Math.PI / 2) * 3;
      let step = Math.PI / spikes;

      this.ctx.beginPath();
      this.ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        let x = Math.cos(rot) * outerRadius;
        let y = Math.sin(rot) * outerRadius;
        this.ctx.lineTo(x, y);
        rot += step;
        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        this.ctx.lineTo(x, y);
        rot += step;
      }
      this.ctx.lineTo(0, -outerRadius);
      this.ctx.closePath();
      this.ctx.fill();
    } else if (p.shape === 'heart') {
      const s = p.size * 0.6;
      this.ctx.beginPath();
      this.ctx.moveTo(0, s * 0.3);
      this.ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s, s * 0.3, 0, s);
      this.ctx.bezierCurveTo(s, s * 0.3, s * 0.6, -s * 0.4, 0, s * 0.3);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isRaining && Math.random() < 0.25 && this.particles.length < 80) {
      this.particles.push(this.createParticle());
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx + Math.sin(p.wobble) * 1.2;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;

      if (p.fadeSpeed > 0) {
        p.opacity -= p.fadeSpeed;
      }

      this.drawShape(p);

      if (p.y > this.canvas.height + 30 || p.opacity <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0 || this.isRaining) {
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// Global instance
window.celebrationFX = new CelebrationFX();
