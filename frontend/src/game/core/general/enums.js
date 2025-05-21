
// 生命週期
export const LifeStage = Object.freeze({
    EGG: "Egg",
    LARVA: "Larva",
    PUPA: "Pupa",
    ADULT: "Adult"
});

// 生命週期順序
export const LifeStageOrder = [LifeStage.EGG, LifeStage.LARVA, LifeStage.PUPA, LifeStage.ADULT];

// 性別
export const Sex = Object.freeze({
    MALE: 'Male',
    FEMALE: "Female",
    HERMAPHRODITE: "Hermaphrodite" // 雌雄同體
})

// 健康狀況
export const HealthState = Object.freeze({
    HEALTHY: 'Healthy',
    UNHEALTHY: 'Unhealthy',
    DEAD: 'Dead'
})

// 飼養環境
export const AreaType = Object.freeze({
    ROOM_TEMPERATURE: 'roomTemperature',
    COOLER_BOX: 'coolerBox',
    REFRIGERATOR: 'refrigerator',
});