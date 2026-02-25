"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const mouse = {
            x: null as number | null,
            y: null as number | null,
            radius: 100,
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.x;
            mouse.y = event.y;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseOut);

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Collision detection with mouse
                let dx = (mouse.x || -1000) - this.x;
                let dy = (mouse.y || -1000) - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius + this.size) {
                    if (mouse.x !== null && this.x < mouse.x && this.x > this.size * 10) {
                        this.x -= 2;
                    }
                    if (mouse.x !== null && this.x > mouse.x && this.x < canvas.width - this.size * 10) {
                        this.x += 2;
                    }
                    if (mouse.y !== null && this.y < mouse.y && this.y > this.size * 10) {
                        this.y -= 2;
                    }
                    if (mouse.y !== null && this.y > mouse.y && this.y < canvas.height - this.size * 10) {
                        this.y += 2;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        const init = () => {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;

            const isDark = theme === "dark" || theme === "system";
            const particleColor = isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(15, 23, 42, 0.3)";

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;

                particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        };

        const connect = () => {
            if (!ctx) return;
            let opacityValue = 1;

            const isDark = theme === "dark" || theme === "system";
            const r = isDark ? 255 : 15;
            const g = isDark ? 255 : 23;
            const b = isDark ? 255 : 42;

            for (let a = 0; a < particlesArray.length; a++) {
                for (let b_idx = a; b_idx < particlesArray.length; b_idx++) {
                    let distance =
                        ((particlesArray[a].x - particlesArray[b_idx].x) * (particlesArray[a].x - particlesArray[b_idx].x))
                        + ((particlesArray[a].y - particlesArray[b_idx].y) * (particlesArray[a].y - particlesArray[b_idx].y));

                    if (distance < (canvas!.width / 7) * (canvas!.height / 7)) {
                        opacityValue = 1 - (distance / 10000);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacityValue * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b_idx].x, particlesArray[b_idx].y);
                        ctx.stroke();
                    }
                }
            }
        };

        init();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, theme]);

    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}
