import { LifeStage } from "../general/enums";
import { FeedContainer } from "./abc_feed_contaniner";

export class KinshiBottle extends FeedContainer {
    constructor(allowedSpecies) {
        super(1);
        this.allowedSpecies = allowedSpecies; // 限定可飼養物種
        this.moisture = 0.5; // 固定值
    }

    addBeetle(beetle) {
        // 添加物種
        if (beetle.curLifeStage === LifeStage.ADULT || beetle.curLifeStage === LifeStage.PUPA) {
            console.log("不能放入成蟲或蛹");
            return;
        }
        if (!this.allowedSpecies.includes(beetle.species)) {
            beetle.alive = false; // 或設為死亡狀態
            console.log("物種錯誤，甲蟲死亡");
            return;
        }
        this.beetles.push(beetle);
    }

    increaseMoisture() {
        console.log("菌瓶無法更改濕度");
    }
}
