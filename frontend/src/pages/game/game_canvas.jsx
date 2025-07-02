import { useEffect } from 'react';
import Phaser from 'phaser';
import { config } from '../../game/core/general/phaser_game';

const GameCanvas = () => {
    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div id="game-container" style={{ width: '1024px', height: '576px' }} />
    );
};

export default GameCanvas;
