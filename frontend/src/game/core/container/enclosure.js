import { LifeStage } from "../general/enums";
import { FeedContainer } from "./abc_feed_contaniner";

export class Enclosure extends FeedContainer {
    constructor() {
        super(1); // 可改為動態數量
    }

    addBeetle(beetle) {
        if (beetle.curLifeStage === LifeStage.ADULT || beetle.curLifeStage === LifeStage.PUPA) {
            console.log("不能放入成蟲或蛹");
            return;
        }
        if (this.beetles.length >= this.containCount) {
            console.log("已滿，無法放入");
            return;
        }

        this.beetles.push(beetle);
    }

    changeMud() {
        // 土壤更換邏輯，可影響品質評分
    }

    increaseMoisture(amount) {
        // 增加濕度
        this.moisture = Math.min(this.moisture + amount, 1.0);
    }
}
