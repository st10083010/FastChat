import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // 預先加載
        this.load.image('bg_room', '/assets/bg_room.png');
        this.load.image('angle_frame', '/assets/angle_frame.png');
        this.load.image('fridge', '/assets/fridge.png')
    }

    create() {
        // 背景
        this.add.image(512, 288, 'bg_room').setOrigin(0.5, 0.5);

        // 角鋼架
        const shelf = this.add.image(150, 350, 'angle_frame').setInteractive();

        // 冰箱
        const fridge = this.add.image(300, 380, 'fridge').setInteractive();

        shelf.on('pointerdown', () => {
            console.log('點擊了角鋼架');
        });
    }

    update(time, delta) {
        // 每幀更新
    }
}

export const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    scene: GameScene,
    parent: 'game-container'
};
