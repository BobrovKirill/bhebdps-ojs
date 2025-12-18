import { Mage } from './Mage.js';
import { Arm, Knife, StormStaff } from "../weapons/index.js";


export class Demiurge extends Mage {
    constructor(position, name) {
        super(position, name);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 12;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
        this.weaponsOrder = [Knife, Arm];
    }

    getDamage(distance) {
        const baseDamage = super.getDamage(distance);
        if (this.magic > 0 && this.getLuck() > 0.6) {
            return baseDamage * 1.5;
        }
        return baseDamage;
    }
}