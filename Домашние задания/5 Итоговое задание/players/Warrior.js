import {Arm, Knife, Sword} from "../weapons/index.js";
import {Player} from "./Player.js";


export class Warrior extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 120;
        this.speed = 2;
        this.attack = 10;
        this.description = 'Воин';
        this.weapon = new Sword();
        this.weaponsOrder = [Knife, Arm];
    }

    takeDamage(damage) {
        if (this.life < 60 && this.getLuck() > 0.8 && this.magic > 0) {
            const magicDamage = Math.min(damage, this.magic);
            this.magic -= magicDamage;
            const remainingDamage = damage - magicDamage;
            if (remainingDamage > 0) {
                super.takeDamage(remainingDamage);
            }
        } else {
            super.takeDamage(damage);
        }
    }
}