import {Archer, Mage, Warrior} from "./players/index.js";
import * as test from "node:test";
import {play} from "./index.js";


describe('Game Integration', () => {
    test('play should run without errors', () => {
        const warrior = new Warrior(0, 'Warrior');
        const archer = new Archer(5, 'Archer');
        const mage = new Mage(10, 'Mage');

        const winner = play([warrior, archer, mage]);
        expect(winner).toBeDefined();
        expect([warrior, archer, mage]).toContain(winner);
    });

    test('tryAttack should work correctly', () => {
        const warrior = new Warrior(0, 'Warrior');
        const archer = new Archer(2, 'Archer');

        const initialLife = archer.life;
        warrior.moveRight(1);
        warrior.tryAttack(archer);
        expect(archer.life).toBeLessThan(initialLife);
    });
});