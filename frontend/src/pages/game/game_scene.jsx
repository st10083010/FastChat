import { useRef, useEffect } from 'react';

const GameScene = ({ enclosures, setSelectedEnclosureIndex }) => {
    // 遊戲畫面
    const canvasRef = useRef(null);
    const canvasWidth = 1024;
    const canvasHeight = 576;

    const draw = (ctx) => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#2d4a73';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        enclosures.forEach((en) => {
            ctx.fillStyle = '#333';
            ctx.fillRect(en.x, en.y, 48, 48);
            ctx.fillStyle = 'white';
            ctx.fillText('E', en.x + 18, en.y + 30);
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const loop = () => {
            draw(ctx);
            requestAnimationFrame(loop);
        };
        loop();

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            enclosures.forEach((en, index) => {
                if (x >= en.x && x <= en.x + 48 && y >= en.y && y <= en.y + 48) {
                    setSelectedEnclosureIndex(index);
                }
            });
        };

        canvas.addEventListener('click', handleClick);
        return () => canvas.removeEventListener('click', handleClick);
    }, [enclosures]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: '1px solid black' }}
        />
    );
};

export default GameScene;
