import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // 載入背景圖
        this.load.image('bg_room', '/assets/bg_room.png');

        // 載入角鋼架
        this.load.image('angel_frame', '/assets/angel_frame.png');
    }

    create() {
        // 畫背景
        this.add.image(512, 288, 'bg_room').setOrigin(0.5, 0.5);

        // 畫角鋼架
        this.angelFrame = this.add.image(160, 256, 'angel_frame').setOrigin(0, 0);
        this.angelFrame.setInteractive();

        this.angelFrame.on('pointerdown', () => {
            console.log('Clicked Angel Frame');
        });

        // 初始化飼育箱 group
        this.enclosures = this.add.group();

        // 範例：建立一個飼育箱
        const enclosure = this.add.rectangle(400, 400, 48, 48, 0x333333).setInteractive();
        enclosure.on('pointerdown', () => {
            console.log('點擊了飼育箱');
            // 這裡可呼叫外部 function 例如 setSelectedEnclosureIndex
        });
        this.enclosures.add(enclosure);
    }

    update(time, delta) {
        // 每幀更新邏輯
    }
}
