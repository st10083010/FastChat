// 抽象類別
export class FeedContainer {
    constructor(containCount = 1) {
        if (new.target === FeedContainer) {
           throw new Error("Abstract class FeedContainer cannot be instantiated");
        }
        this.beetles = [];
        this.moisture = 0.6;
        this.containCount = containCount; // 飼養上限
    }

    addBeetle(beetle) {
        throw new Error("addBeetle must be implemented in subclass");
    }
}