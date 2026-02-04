'use client';

import { useEffect, useRef } from 'react';

export default function CodingRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full screen
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Characters for rain
        const chars = 'CORSFIX01<>{}[]/\\|&!@#$%^*()_+=-';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // Array to track drop positions
        const drops: number[] = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Start at different heights
        }

        const draw = () => {
            // Semi-transparent black to create trailing effect
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#6366f1'; // Indigo color matching the theme
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = charArray[Math.floor(Math.random() * charArray.length)];

                // Draw character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                // Move drop down
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
            style={{ filter: 'blur(0px)' }}
        />
    );
}
