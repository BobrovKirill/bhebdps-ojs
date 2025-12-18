import {Arm, Knife} from "../weapons/index.js";

export class Player {
    constructor(position, name) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
        this.weaponsOrder = [Knife, Arm];
    }

    getLuck() {
        const randomNumber = Math.random() * 100;
        return (randomNumber + this.luck) / 100;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) return 0;
        const weaponDamage = this.weapon.getDamage();
        return (this.attack + weaponDamage) * this.getLuck() / distance;
    }

    takeDamage(damage) {
        this.life = Math.max(0, this.life - damage);
    }

    isDead() {
        return this.life === 0;
    }

    moveLeft(distance) {
        const move = Math.min(Math.abs(distance), this.speed);
        this.position -= move;
    }

    moveRight(distance) {
        const move = Math.min(Math.abs(distance), this.speed);
        this.position += move;
    }

    move(distance) {
        if (distance < 0) {
            this.moveLeft(-distance);
        } else {
            this.moveRight(distance);
        }
    }

    isAttackBlocked() {
        return this.getLuck() > (100 - this.luck) / 100;
    }

    dodged() {
        return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
    }

    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            this.weapon.takeDamage(damage);
            this.checkWeapon();
            return;
        }
        if (this.dodged()) {
            return;
        }
        this.takeDamage(damage);
    }

    checkWeapon() {
        if (this.weapon.isBroken()) {
            const nextWeaponClass = this.weaponsOrder.shift();
            if (nextWeaponClass) {
                this.weapon = new nextWeaponClass();
            }
        }
    }

    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position);
        if (this.weapon.range < distance) {
            return;
        }
        this.weapon.takeDamage(10 * this.getLuck());
        this.checkWeapon();
        const damage = this.getDamage(distance);
        enemy.takeAttack(damage);
        if (this.position === enemy.position) {
            enemy.position += 1;
            enemy.takeAttack(damage * 2);
        }
    }

    chooseEnemy(players) {
        const alivePlayers = players.filter(p => !p.isDead() && p !== this);
        if (alivePlayers.length === 0) return null;
        return alivePlayers.reduce((min, p) => p.life < min.life ? p : min);
    }

    moveToEnemy(enemy) {
        if (!enemy) return;
        const distance = enemy.position - this.position;
        this.move(distance);
    }

    turn(players) {
        const enemy = this.chooseEnemy(players);
        if (!enemy) return;
        this.moveToEnemy(enemy);
        this.tryAttack(enemy);
    }
}