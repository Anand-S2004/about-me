/**
 * Canvas Background: Hyperspherical Celestial Foliation & Optimal Transport Vector Flow
 * Inspired by Project Milky Way and Reduction Network GTD
 */

class InteractiveBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 85;
        this.mouse = { x: -1000, y: -1000, radius: 160 };
        this.mode = 'celestial'; // 'celestial' or 'vectorflow'
        this.hueBase = 220; // Deep celestial cyan/indigo
        this.animationFrameId = null;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        this.createParticles();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const count = Math.min(this.numParticles, Math.floor((this.width * this.height) / 12000));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1,
                baseRadius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.6 + 0.2,
                angle: Math.random() * Math.PI * 2,
                orbitRadius: Math.random() * 120 + 40,
                radialIntensity: Math.random() * 0.8 + 0.2, // Inspired by Milky Way
                classPrototype: Math.floor(Math.random() * 3) // For GTD streamlines
            });
        }
    }

    setMode(newMode) {
        this.mode = newMode;
        if (newMode === 'vectorflow') {
            this.hueBase = 280; // Electric violet for optimal transport
        } else {
            this.hueBase = 210; // Celestial cyan for Milky Way
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const time = Date.now() * 0.001;

        // Draw dynamic vector flow or celestial web
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            if (this.mode === 'celestial') {
                // Milky Way celestial foliation: subtle radial harmonic motion
                p.x += p.vx + Math.sin(time * 0.5 + p.angle) * 0.2;
                p.y += p.vy + Math.cos(time * 0.5 + p.angle) * 0.2;
            } else {
                // Optimal Transport vector field stream: least action streamline toward virtual centroids
                const cx = (p.classPrototype + 1) * (this.width / 4);
                const cy = this.height / 2 + Math.sin(time + p.classPrototype) * 80;
                const dx = cx - p.x;
                const dy = cy - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                p.x += (p.vx * 0.4) + (dx / dist) * 0.6;
                p.y += (p.vy * 0.4) + (dy / dist) * 0.6;
            }

            // Screen wrap
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            // Mouse repulsion/attraction
            const mdx = this.mouse.x - p.x;
            const mdy = this.mouse.y - p.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < this.mouse.radius) {
                const force = (1 - mdist / this.mouse.radius) * 3;
                p.x -= (mdx / mdist) * force;
                p.y -= (mdy / mdist) * force;
            }

            // Draw particle
            const hue = (this.hueBase + p.radialIntensity * 50) % 360;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${hue}, 85%, 65%, ${p.alpha})`;
            this.ctx.fill();

            // Connect nearby points (SpiderNet / Foliation Web)
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dxx = p.x - p2.x;
                const dyy = p.y - p2.y;
                const d = Math.sqrt(dxx * dxx + dyy * dyy);
                const maxDist = this.mode === 'celestial' ? 95 : 120;

                if (d < maxDist) {
                    const connAlpha = (1 - d / maxDist) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${connAlpha})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        }

        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
    window.bgCanvas = new InteractiveBackground('bg-canvas');
});

