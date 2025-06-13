export class PlayerController {
    constructor(name) {
        this.name = name;
        this.level = 1;
        this.feedExp = 0.8;
        this.cash = 500;
        this.currenDay = 1;

        // 持有容器數量
        this.enclosureEmpty = 1;
        this.enclosureUsing = 0;
        this.kinshiBottleEmpty = 0;
        this.kinshiBottleUsing = 0;
    }

    addFeedExp(amount) {
        // 增加飼育經驗
        // 可在此判斷等級是否提升
        this.feedExp += amount;
    }

    changeCash(amount) {
        // 增加或扣除現金
        this.cash += amount;
        if (this.cash < 0) this.cash = 0;
    }

    useEnclosure() {
        // 使用飼養箱
        if (this.enclosureEmpty > 0) {
            this.enclosureEmpty--;
            this.enclosureUsing++;
            return true;
        }
        return false;
    }

    // returnEnclosure() {
    //     // 回收飼養箱
    //     if (this.enclosureUsing > 0) {
    //         this.enclosureUsing--;
    //         this.enclosureEmpty++;
    //     }
    // }

    useKinshiBottle() {
        // 使用菌瓶
        if (this.kinshiBottleEmpty > 0) {
            this.kinshiBottleEmpty--;
            this.kinshiBottleUsing++;
            return true;
        }
        return false;
    }

    // returnKinshiBottle() {
    //     if (this.kinshiBottleUsing > 0) {
    //     this.kinshiBottleUsing--;
    //     this.kinshiBottleEmpty++;
    //     }
    // }

    
    getStatus() {
        // 取得狀態用於畫面顯示
        return {
            name: this.name,
            level: this.level,
            cash: this.cash,
            feedExp: this.feedExp,
            containers: {
                enclosure: {
                    empty: this.enclosureEmpty,
                    using: this.enclosureUsing
                },
                kinshiBottle: {
                    empty: this.kinshiBottleEmpty,
                    using: this.kinshiBottleUsing
                }
            }
        };
    }
}
