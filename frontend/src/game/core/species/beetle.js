import { HealthState, LifeStage, Sex } from "../general/enums";

export class Beetle {
    constructor(baseInfo, lifeStage, sex, healthState, dayAlive = 0) {
        this.baseInfo = baseInfo;
        this.curLifeStage = lifeStage;
        this.sex = sex;
        this.healthState = healthState;
        this.dayAlive = dayAlive;
        this.size = null;
    }

    // methods
    calculateSize() {
        // 計算最終尺寸
        if (this.curLifeStage !== LifeStage.ADULT) return 0;

        const randomSizeWeight = Beetle.randomSizeWeight();

        let healthMultiplier = 0;
        switch (this.healthState) {
            case HealthState.HEALTHY:
                healthMultiplier = 1.1;
                break;
            case HealthState.UNHEALTHY:
                healthMultiplier = 0.9;
                break;
            case HealthState.DEAD:
                healthMultiplier = 0;
                break;
            default:
                healthMultiplier = 0;
        }

        // 結果 = 基礎物種尺寸 * 健康程度 * 隨機尺寸權重
        const result = healthMultiplier * randomSizeWeight;
        return result;
    }
    pushLifeStage() {
        // 推進生命階段
        const { dayEgg, dayLarva, dayPupa } = this.baseInfo;

        if (this.curLifeStage === LifeStage.EGG && this.dayAlive >= dayEgg) {
            this.curLifeStage = LifeStage.LARVA;
            this.dayAlive = 0;
        } else if (this.curLifeStage === LifeStage.LARVA && this.dayAlive >= dayLarva) {
            this.curLifeStage = LifeStage.PUPA;
            this.dayAlive = 0;
        } else if (this.curLifeStage === LifeStage.PUPA && this.dayAlive >= dayPupa) {
            this.curLifeStage = LifeStage.ADULT;
            this.dayAlive = 0;
            this.size = this.calculateSize();
        } else {
            this.dayAlive += 1;
        }
    }

    static randomSex() {
        // 隨機抽取性別 50%公 49%母 1%雌雄同體
        const rand = Math.floor(Math.random() * 100) + 1 // 1 ~ 100
        if (rand <= 1) return Sex.HERMAPHRODITE;
        if (rand <= 51) return Sex.MALE;
        return Sex.FEMALE;
    }

    static randomSizeWeight() {
        // 隨機計算尺寸權重
        return Math.random() * (1.20 - 0.85) + 0.85;
    }
}