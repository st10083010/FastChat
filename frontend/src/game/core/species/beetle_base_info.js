export class BeetleBaseInfo {
    constructor(data) {
        this.id = data.id; // 編號
        this.scientificName = data.scientificName; // 學名
        this.commonName = data.commonName; // 俗名
        this.info = data.info; // 說明
        this.minTemp = data.minTemp; // 最小適應溫度
        this.maxTemp = data.maxTemp; // 最大適應溫度
        this.minMoisture = data.minMoiseture; // 最小適應濕度
        this.maxMoisture = data.maxMoiseture; // 最大適應濕度
        this.speciesBaseSize = data.speciesBaseSize; // 物種基礎尺寸
        this.dayEgg = data.dayEgg; // 卵期
        this.dayLarva = data.dayLarva; // 幼蟲期
        this.dayPupa = data.dayPupa; // 蛹期
        this.dayAdult = data.dayAdult; // 成蟲期
        this.feedLevel = data.feedLevel; // 飼養難度
    }
}