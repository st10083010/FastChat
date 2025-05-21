import { Area } from "./area";
import { AreaType } from "../general/enums";

// 飼養房間管理機制
export class Room {
    constructor() {
        this.roomTemperatureArea = new Area('室溫區', AreaType.ROOM_TEMPERATURE, 28, 5); // TODO: 初始設定，後續考慮是否寫死
        this.coolerBoxArea = null;       // 保麗龍箱
        this.refrigeratorArea = null;    // 冰箱
        this.hasAC = false; // 是否有冷氣
    }

    installAC() {
        // 安裝冷氣
        this.hasAC = true;
    }

    unlockCoolerBox() {
        // 解鎖保麗龍箱
        if (!this.coolerBoxArea) {
            this.coolerBoxArea = new Area('保麗龍箱', AreaType.COOLER_BOX, 24, 3);
            return true;
        }

        return false;
    }

    unlockRefrigerator() {
        // 解鎖冰箱
        if (!this.refrigeratorArea) {
            this.refrigeratorArea = new Area('冰箱', AreaType.REFRIGERATOR, 18, 2);
            return true;
        }
        return false;
    }

    updateACTemperatures() {
        // 更新冷氣溫度，冰箱不變動
        if (this.hasCooler) {
            this.roomTemperatureArea.changeTemperature(-1.5);
            if (this.coolerBoxArea) {
                this.coolerBoxArea.changeTemperature(-0.5);
            }
        }
    }

    getActiveAreas() {
        // 取得當前已解鎖並可用的飼養區域
        const areas = [this.roomTemperatureArea];
        if (this.coolerBoxArea) areas.push(this.coolerBoxArea);
        if (this.refrigeratorArea) areas.push(this.refrigeratorArea);
        return areas;
    }
}
