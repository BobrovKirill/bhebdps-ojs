import {Weapon} from "./Weapon.js";
import {Arm} from "./Arm.js";
import * as test from "node:test";
import {Bow} from "./Bow.js";
import {LongBow} from "./LongBow.js";
import {Axe} from "./Axe.js";

describe('Weapon Class', () => {
    test('should create weapon with correct properties', () => {
        const weapon = new Weapon('Test', 10, 100, 2);
        expect(weapon.name).toBe('Test');
        expect(weapon.attack).toBe(10);
        expect(weapon.initDurability).toBe(100);
        expect(weapon.durability).toBe(100);
        expect(weapon.range).toBe(2);
    });

    test('takeDamage should reduce durability', () => {
        const weapon = new Weapon('Test', 10, 100, 2);
        weapon.takeDamage(30);
        expect(weapon.durability).toBe(70);
    });

    test('durability should not go below 0', () => {
        const weapon = new Weapon('Test', 10, 100, 2);
        weapon.takeDamage(150);
        expect(weapon.durability).toBe(0);
    });

    test('Infinity durability should not change', () => {
        const arm = new Arm();
        arm.takeDamage(100);
        expect(arm.durability).toBe(Infinity);
    });

    test('getDamage should return full attack above 30%', () => {
        const weapon = new Weapon('Test', 20, 100, 2);
        weapon.takeDamage(60); // 40 left, above 30
        expect(weapon.getDamage()).toBe(20);
    });

    test('getDamage should return half attack below 30%', () => {
        const weapon = new Weapon('Test', 20, 100, 2);
        weapon.takeDamage(80); // 20 left, below 30
        expect(weapon.getDamage()).toBe(10);
    });

    test('getDamage should return 0 when broken', () => {
        const weapon = new Weapon('Test', 20, 100, 2);
        weapon.takeDamage(100);
        expect(weapon.getDamage()).toBe(0);
    });

    test('isBroken should return true when durability 0', () => {
        const weapon = new Weapon('Test', 20, 100, 2);
        weapon.takeDamage(100);
        expect(weapon.isBroken()).toBe(true);
    });

    test('isBroken should return false when durability > 0', () => {
        const weapon = new Weapon('Test', 20, 100, 2);
        weapon.takeDamage(50);
        expect(weapon.isBroken()).toBe(false);
    });
});

describe('Specific Weapons', () => {
    test('Arm should have correct properties', () => {
        const arm = new Arm();
        expect(arm.name).toBe('Рука');
        expect(arm.attack).toBe(1);
        expect(arm.durability).toBe(Infinity);
        expect(arm.range).toBe(1);
    });

    test('Bow should have correct properties', () => {
        const bow = new Bow();
        expect(bow.name).toBe('Лук');
        expect(bow.attack).toBe(10);
        expect(bow.initDurability).toBe(200);
        expect(bow.range).toBe(3);
    });

    test('LongBow should extend Bow correctly', () => {
        const longBow = new LongBow();
        expect(longBow.name).toBe('Длинный лук');
        expect(longBow.attack).toBe(15);
        expect(longBow.range).toBe(4);
        expect(longBow.initDurability).toBe(200);
    });

    test('Axe should extend Sword correctly', () => {
        const axe = new Axe();
        expect(axe.name).toBe('Секира');
        expect(axe.attack).toBe(27);
        expect(axe.initDurability).toBe(800);
        expect(axe.range).toBe(1);
    });
});