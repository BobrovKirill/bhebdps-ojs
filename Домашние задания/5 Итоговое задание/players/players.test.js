import {Player} from "./Player.js";
import {Warrior} from "./Warrior.js";
import * as test from "node:test";
import {Archer} from "./Archer.js";
import {Mage} from "./Mage.js";

describe('Player Class', () => {
    test('should create player with correct properties', () => {
        const player = new Player(5, 'Test');
        expect(player.life).toBe(100);
        expect(player.magic).toBe(20);
        expect(player.speed).toBe(1);
        expect(player.attack).toBe(10);
        expect(player.agility).toBe(5);
        expect(player.luck).toBe(10);
        expect(player.description).toBe('Игрок');
        expect(player.weapon.name).toBe('Рука');
        expect(player.position).toBe(5);
        expect(player.name).toBe('Test');
    });

    test('getLuck should return value between luck/100 and (100+luck)/100', () => {
        const player = new Player(0, 'Test');
        const luck = player.getLuck();
        expect(luck).toBeGreaterThanOrEqual(0.1);
        expect(luck).toBeLessThanOrEqual(1.1);
    });

    test('getDamage should return 0 when out of range', () => {
        const player = new Player(0, 'Test');
        expect(player.getDamage(2)).toBe(0); // Arm range is 1
    });

    test('takeDamage should reduce life', () => {
        const player = new Player(0, 'Test');
        player.takeDamage(30);
        expect(player.life).toBe(70);
    });

    test('life should not go below 0', () => {
        const player = new Player(0, 'Test');
        player.takeDamage(150);
        expect(player.life).toBe(0);
    });

    test('isDead should return true when life is 0', () => {
        const player = new Player(0, 'Test');
        player.takeDamage(100);
        expect(player.isDead()).toBe(true);
    });

    test('movement methods should work correctly', () => {
        const player = new Player(5, 'Test');
        player.moveLeft(3);
        expect(player.position).toBe(4); // speed limited to 1
        player.moveRight(5);
        expect(player.position).toBe(5); // speed limited to 1
        player.move(-2);
        expect(player.position).toBe(4);
        player.move(3);
        expect(player.position).toBe(5);
    });

    test('chooseEnemy should select player with minimum health', () => {
        const player1 = new Player(0, 'P1');
        const player2 = new Player(2, 'P2');
        const player3 = new Player(4, 'P3');
        player2.takeDamage(30);
        player3.takeDamage(50);
        const players = [player1, player2, player3];
        const enemy = player1.chooseEnemy(players);
        expect(enemy).toBe(player3);
    });

    test('chooseEnemy should return null when no enemies', () => {
        const player = new Player(0, 'P1');
        const enemy = player.chooseEnemy([player]);
        expect(enemy).toBeNull();
    });
});

describe('Warrior Class', () => {
    test('should have correct properties', () => {
        const warrior = new Warrior(0, 'War');
        expect(warrior.life).toBe(120);
        expect(warrior.speed).toBe(2);
        expect(warrior.weapon.name).toBe('Меч');
        expect(warrior.description).toBe('Воин');
    });

    test('takeDamage should use magic when conditions met', () => {
        const warrior = new Warrior(0, 'War');
        warrior.takeDamage(70); // Life becomes 50
        warrior.takeDamage(10);
        expect(warrior.life).toBe(50);
        expect(warrior.magic).toBe(10); // 20 - 10
    });
});

describe('Archer Class', () => {
    test('should have correct properties', () => {
        const archer = new Archer(0, 'Arch');
        expect(archer.life).toBe(80);
        expect(archer.magic).toBe(35);
        expect(archer.agility).toBe(10);
        expect(archer.weapon.name).toBe('Лук');
    });

    test('getDamage formula should be different', () => {
        const archer = new Archer(0, 'Arch');
        const damage = archer.getDamage(2);
        expect(damage).toBeGreaterThan(0);
    });
});

describe('Mage Class', () => {
    test('should have correct properties', () => {
        const mage = new Mage(0, 'Mage');
        expect(mage.life).toBe(70);
        expect(mage.magic).toBe(100);
        expect(mage.weapon.name).toBe('Посох');
    });

    test('takeDamage should reduce magic when above 50%', () => {
        const mage = new Mage(0, 'Mage');
        mage.takeDamage(20);
        expect(mage.life).toBe(60); // 70 - 20/2
        expect(mage.magic).toBe(88); // 100 - 12
    });
});