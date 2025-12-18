import {Player} from "./index.js";
import {Staff, Knife, Arm} from "../weapons/index.js";

export class Mage extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
        this.weaponsOrder = [Knife, Arm];
    }

    takeDamage(damage) {
        if (this.magic > 50) {
            super.takeDamage(damage / 2);
            this.magic -= 12;
        } else {
            super.takeDamage(damage);
        }
    }
}