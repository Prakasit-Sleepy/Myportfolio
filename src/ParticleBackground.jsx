import { useEffect, useRef } from 'react';

const symbolColors = {
  '○': '#FF3B3B',     // แดง
  '×': '#3B82F6',     // น้ำเงิน
  '□': '#A855F7',     // ม่วง
  '△': '#10B981',     // เขียว
};

const symbols = Object.keys(symbolColors);

function PlayStationParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const numberOfParticles = 70;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = symbolColors[this.symbol];
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 24 + 16;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.size}px Kanit, sans-serif`;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.4; // โปร่งใสเล็กน้อย
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.fillStyle = '#ffffff'; // ✅ พื้นหลังสีขาว
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    init();
    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

export default PlayStationParticleBackground;
