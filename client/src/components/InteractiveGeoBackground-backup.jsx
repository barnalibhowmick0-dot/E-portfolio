import { useEffect, useRef } from "react";

export default function InteractiveGeoBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;
    let particles = [];

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const createParticles = () => {
      particles = [];

      const density =
        window.innerWidth < 768
          ? 28
          : Math.min(75, Math.floor(window.innerWidth / 18));

      for (let i = 0; i < density; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          baseX: Math.random() * window.innerWidth,
          baseY: Math.random() * window.innerHeight,

          size: Math.random() * 1.5 + 0.5,

          speedX: (Math.random() - 0.5) * 0.18,
          speedY: (Math.random() - 0.5) * 0.18,

          opacity: Math.random() * 0.35 + 0.15,
        });
      }
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      /* --------------------------------
         SUBTLE TOPOGRAPHIC GRID
      -------------------------------- */

      const gridSpacing = 90;

      ctx.lineWidth = 0.4;

      for (let x = 0; x < window.innerWidth; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, window.innerHeight);
        ctx.strokeStyle = "rgba(100, 150, 180, 0.035)";
        ctx.stroke();
      }

      for (let y = 0; y < window.innerHeight; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y);
        ctx.strokeStyle = "rgba(100, 150, 180, 0.035)";
        ctx.stroke();
      }

      /* --------------------------------
         PARTICLE MOVEMENT
      -------------------------------- */

      particles.forEach((particle) => {
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        if (particle.baseX < -50) particle.baseX = window.innerWidth + 50;
        if (particle.baseX > window.innerWidth + 50) particle.baseX = -50;

        if (particle.baseY < -50) particle.baseY = window.innerHeight + 50;
        if (particle.baseY > window.innerHeight + 50) particle.baseY = -50;

        let targetX = particle.baseX;
        let targetY = particle.baseY;

        /* --------------------------------
           CURSOR INTERACTION
        -------------------------------- */

        if (mouse.active) {
          const dx = mouse.x - particle.baseX;
          const dy = mouse.y - particle.baseY;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const interactionRadius = 180;

          if (distance < interactionRadius) {
            const force =
              (interactionRadius - distance) / interactionRadius;

            targetX -= dx * force * 0.28;
            targetY -= dy * force * 0.28;
          }
        }

        particle.x += (targetX - particle.x) * 0.035;
        particle.y += (targetY - particle.y) * 0.035;

        /* --------------------------------
           DRAW PARTICLE
        -------------------------------- */

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(120, 190, 210, ${particle.opacity})`;

        ctx.fill();
      });

      /* --------------------------------
         CONNECT NEARBY PARTICLES
      -------------------------------- */

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 125) {
            const opacity = (1 - distance / 125) * 0.11;

            ctx.beginPath();

            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(110, 170, 190, ${opacity})`;

            ctx.lineWidth = 0.5;

            ctx.stroke();
          }
        }
      }

      /* --------------------------------
         CURSOR RADAR
      -------------------------------- */

      if (mouse.active) {
        const pulse =
          38 + Math.sin(Date.now() * 0.003) * 7;

        ctx.beginPath();

        ctx.arc(
          mouse.x,
          mouse.y,
          pulse,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle =
          "rgba(120, 200, 220, 0.13)";

        ctx.lineWidth = 0.7;

        ctx.stroke();

        /* inner glow */

        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          90
        );

        gradient.addColorStop(
          0,
          "rgba(100, 190, 220, 0.08)"
        );

        gradient.addColorStop(
          1,
          "rgba(100, 190, 220, 0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
          mouse.x,
          mouse.y,
          90,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-geo-background"
      aria-hidden="true"
    />
  );
}