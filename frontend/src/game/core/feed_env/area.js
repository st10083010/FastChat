// 單一飼育環境管理類別
export class Area {
    constructor(name, type, temperature, maxCount) {
        this.areaName = name;
        this.type = type; // AreaType
        this.temperature = temperature;
        this.maxCount = maxCount; // 最大飼育數量
        this.curCount = 0; // 當前飼育數量
        this.curFeedContainers = []; // 飼育容器
    }

    changeTemperature(value) {
        this.temperature += value;
    }

    showTemperature() {
        return this.temperature;
    }

    addFeedContainer(container) {
        if (this.curCount < this.maxCount) {
        this.curFeedContainers.push(container);
        this.curCount += 1;
        return true;
        }
        return false;
    }
}
