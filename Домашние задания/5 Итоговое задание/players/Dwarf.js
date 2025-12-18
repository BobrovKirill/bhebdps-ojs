import {Axe, Knife, Arm} from "../weapons/index.js";
import {Warrior} from "./Warrior.js";

export class Dwarf extends Warrior {
    constructor(position, name) {
        super(position, name);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.weaponsOrder = [Knife, Arm];
        this.hitCount = 0;
    }

    takeDamage(damage) {
        this.hitCount++;
        if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
            super.takeDamage(damage / 2);
        } else {
            super.takeDamage(damage);
        }
    }
}