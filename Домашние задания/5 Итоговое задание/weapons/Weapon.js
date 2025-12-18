export class Weapon {
    constructor(name, attack, durability, range) {
        this.name = name;
        this.attack = attack;
        this.initDurability = durability;
        this.durability = durability;
        this.range = range;
    }

    takeDamage(damage) {
        if (this.durability === Infinity) return;
        this.durability = Math.max(0, this.durability - damage);
    }

    getDamage() {
        if (this.durability === 0) return 0;
        const threshold = this.initDurability * 0.3;
        if (this.durability >= threshold) {
            return this.attack;
        } else {
            return this.attack / 2;
        }
    }

    isBroken() {
        return this.durability === 0;
    }
}