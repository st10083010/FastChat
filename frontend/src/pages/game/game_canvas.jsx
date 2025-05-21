// GameCanvas.jsx
import { useRef, useEffect } from 'react';

const GameCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let x = 50, y = 50;
        let speed = 1;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#228be6';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI);
            ctx.fill();

            x += speed;
            if (x > canvas.width) x = 0;

            requestAnimationFrame(draw);
        };

        draw();
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={500} height={300} />
        </>
    );
};

export default GameCanvas;
