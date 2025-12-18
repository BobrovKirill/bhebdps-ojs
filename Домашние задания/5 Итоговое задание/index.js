import {Warrior, Mage, Archer} from "./players/index.js";

export function play(players) {
    let round = 1;
    while (players.filter(p => !p.isDead()).length > 1) {
        console.log(`\n=== Раунд ${round} ===`);
        for (const player of players) {
            if (player.isDead()) continue;
            player.turn(players);
            console.log(`${player.name} (${player.description}): ${player.life} HP`);
        }
        round++;
    }
    const winner = players.find(p => !p.isDead());
    console.log(`\nПобедитель: ${winner.name} (${winner.description})!`);
    return winner;
}

const warrior = new Warrior(10, "Алёша Попович");
console.log(warrior.life, warrior.magic); // 120 20
warrior.takeDamage(50);
console.log(warrior.life, warrior.magic); // 70 20
warrior.takeDamage(20);
console.log(warrior.life, warrior.magic); // 50 20
warrior.takeDamage(5);
console.log(warrior.life, warrior.magic); // 50 15 (Алёша Попович получает урон 5 из магии.)
warrior.takeDamage(7);
console.log(warrior.life, warrior.magic); // 43 15
warrior.takeDamage(5);
console.log(warrior.life, warrior.magic); // 38 15
warrior.takeDamage(22);
console.log(warrior.life, warrior.magic); // 16 15
warrior.takeDamage(30);
console.log(warrior.life, warrior.magic); // 0 15

const mage = new Mage(10, "Гендальф");
console.log(mage.life, mage.magic); // 70 100
mage.takeDamage(50);
console.log(mage.life, mage.magic); // 45 88
mage.takeDamage(20);
console.log(mage.life, mage.magic); // 35 76
mage.takeDamage(10);
console.log(mage.life, mage.magic); // 30 64
mage.takeDamage(20);
console.log(mage.life, mage.magic); // 20 52
mage.takeDamage(20);
console.log(mage.life, mage.magic); // 10 40
mage.takeDamage(10);
console.log(mage.life, mage.magic); // 0 40

const player = new Warrior(6, "Алёша Попович"); // speed: 2
console.log(player.position); // 6
player.moveLeft(5);
console.log(player.position); // 4
player.moveRight(2);
console.log(player.position); // 6
player.moveRight(1);
console.log(player.position); // 7

const player2 = new Warrior(6, "Алёша Попович");
console.log(player2.isAttackBlocked()); // false
console.log(player2.isAttackBlocked()); // false
console.log(player2.isAttackBlocked()); // false
console.log(player2.isAttackBlocked()); // true

const player3 = new Warrior(0, "Алёша Попович");
const archer = new Archer(2, "Леголас");

console.log(archer.life, archer.position); // 80 2
player.tryAttack(archer);
console.log(archer.life, archer.position); // 80 2 (Алёша Попович не достаёт)
player.moveRight(1); // Алёша Попович подходит
player.tryAttack(archer);
console.log(archer.life, archer.position); // 60.98 2
player.moveRight(1); // Алёша Попович подходит вплотную
player.tryAttack(archer);
console.log(archer.life, archer.position); // 32.86 3 (Алёша Попович бъёт с удвоенным уроном. Леголас отлетает на 1 позицию)