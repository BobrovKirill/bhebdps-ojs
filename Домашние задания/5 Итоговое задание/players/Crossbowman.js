import {Archer} from "./Archer.js";
import {Arm, Knife, LongBow} from "../weapons/index.js";

export class Crossbowman extends Archer {
    constructor(position, name) {
        super(position, name);
        this.life = 85;
        this.attack = 8;
        this.agility = 20;
        this.luck = 15;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
        this.weaponsOrder = [Knife, Arm];
    }
}