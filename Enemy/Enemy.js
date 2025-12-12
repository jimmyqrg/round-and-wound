/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemy extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dog1", "./Enemy/costumes/dog1.png", { x: 48, y: 34 }),
      new Costume("dog2", "./Enemy/costumes/dog2.png", { x: 48, y: 34 }),
      new Costume("dog3", "./Enemy/costumes/dog3.png", { x: 48, y: 34 }),
      new Costume("dog4", "./Enemy/costumes/dog4.png", { x: 48, y: 34 }),
      new Costume("hit2", "./Enemy/costumes/hit2.png", { x: 23, y: 38 }),
      new Costume("enemy1", "./Enemy/costumes/enemy1.png", { x: 42, y: 38 }),
      new Costume("enemy2", "./Enemy/costumes/enemy2.png", { x: 42, y: 38 }),
      new Costume("enemy4", "./Enemy/costumes/enemy4.png", { x: 42, y: 38 }),
      new Costume("enemy3", "./Enemy/costumes/enemy3.png", { x: 42, y: 38 }),
      new Costume("hit", "./Enemy/costumes/hit.png", { x: 23, y: 38 }),
    ];

    this.sounds = [new Sound("Rip", "./Enemy/sounds/Rip.mp3")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "GO" }, this.whenIReceiveGo),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag2
      ),
    ];

    this.vars.row = 17;
    this.vars.column = 1;
    this.vars.id = 0;
    this.vars.type = "dirt";
    this.vars.gridId = 320;
    this.vars.lastValue = 0;
    this.vars.xVel = 0;
    this.vars.yVel = 0;
    this.vars.lastCostume = 0;
    this.vars.frame = 0;
    this.vars.temp = 0;
  }

  *cloneEnemies() {
    this.vars.row = 1;
    this.vars.column = 1;
    this.vars.id = 0;
    this.costume = "big";
    this.size = this.toNumber(this.stage.vars.zoom);
    this.goto(
      -240 + this.toNumber(this.stage.vars.tileWidth) / 2,
      -180 + this.toNumber(this.stage.vars.tileWidth) / 2
    );
    this.y += this.toNumber(this.stage.vars.worldYOffset);
    for (let i = 0; i < this.toNumber(this.stage.vars.worldHeight); i++) {
      for (let i = 0; i < this.toNumber(this.stage.vars.worldWidth); i++) {
        this.warp(this.findGridIdFor)(this.vars.column, this.vars.row);
        this.costume = "hit";
        this.vars.type = this.itemOf(
          this.stage.vars.tileNames,
          this.itemOf(this.stage.vars.grid, this.vars.gridId - 1) - 1
        );
        if (this.arrayIncludes(this.stage.vars.enemies, this.vars.type)) {
          this.vars.id++;
          this.createClone();
        }
        this.costume = "big";
        this.x += this.toNumber(this.stage.vars.tileWidth);
        this.vars.column++;
      }
      this.y += this.toNumber(this.stage.vars.tileWidth);
      this.x = -240 + this.toNumber(this.stage.vars.tileWidth) / 2;
      this.vars.column = 1;
      this.vars.row++;
    }
  }

  *whenIReceiveGo() {
    yield* this.cloneEnemies();
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.visible = true;
    this.vars.xVel = 2;
    this.vars.yVel = 0;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.y += 2;
    this.costume = "enemy1";
    if (this.toNumber(this.stage.vars.theme) === 3) {
      this.costume = "dog1";
    }
    this.vars.frame = 0;
    while (true) {
      this.vars.yVel -= 0.5;
      this.vars.lastCostume = this.costumeNumber;
      this.costume = "hit";
      if (this.touching(this.sprites["Player"].andClones())) {
        if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
          yield* this.startSound("Rip");
        }
        this.stage.vars.editor = 1;
        yield* this.playerBreakEffect();
        this.broadcast("Reset");
      }
      yield* this.moveInSteps(
        Math.abs(this.toNumber(this.vars.xVel)) +
          Math.abs(this.toNumber(this.vars.yVel))
      );
      this.costume = this.vars.lastCostume;
      this.vars.frame++;
      if (this.toNumber(this.vars.frame) % 4 === 0) {
        this.costumeNumber++;
        if (this.toNumber(this.stage.vars.theme) === 3) {
          this.costume =
            "dog" +
            this.letterOf(this.costume.name, this.costume.name.length - 1);
        }
        if (this.costume.name === "hit" || this.costume.name === "hit2") {
          this.costume = "enemy1";
          if (this.toNumber(this.stage.vars.theme) === 3) {
            this.costume = "dog1";
          }
        }
      }
      yield;
    }
  }

  *findGridIdFor(column, row) {
    this.vars.gridId =
      (this.toNumber(row) - 1) * this.toNumber(this.stage.vars.worldWidth) +
      this.toNumber(column);
  }

  *moveInSteps(steps) {
    for (let i = 0; i < this.toNumber(steps); i++) {
      this.vars.lastValue = this.x;
      this.x += this.toNumber(this.vars.xVel) / this.toNumber(steps);
      if (
        this.touching(this.sprites["TileSolid"].andClones()) ||
        this.touching(this.sprites["TileEnemyHit"].andClones())
      ) {
        this.x = this.toNumber(this.vars.lastValue);
        this.direction += 180;
        this.vars.xVel = 0 - this.toNumber(this.vars.xVel);
      }
      this.vars.lastValue = this.y;
      this.y += this.toNumber(this.vars.yVel) / this.toNumber(steps);
      if (
        this.touching(this.sprites["TileSolid"].andClones()) ||
        this.touching(this.sprites["TileEnemyHit"].andClones())
      ) {
        this.y = this.toNumber(this.vars.lastValue);
        this.vars.yVel = 0;
      }
    }
  }

  *playerBreakEffect() {
    for (let i = 0; i < 3; i++) {
      this.vars.temp = -90;
      for (let i = 0; i < 11; i++) {
        this.stage.vars.newParticles.push(this.sprites["Player"].x);
        this.stage.vars.newParticles.push(this.sprites["Player"].y);
        this.stage.vars.newParticles.push(this.vars.temp);
        this.stage.vars.newParticles.push(
          "player" + this.toString(this.random(1, 5))
        );
        this.vars.temp += 18;
      }
    }
  }

  *startAsClone2() {
    while (!(this.toNumber(this.stage.vars.complete) === 1)) {
      yield;
    }
    /* TODO: Implement stop other scripts in sprite */ null;
    yield* this.enemyBreakEffect();
    this.deleteThisClone();
  }

  *enemyBreakEffect() {
    for (let i = 0; i < 3; i++) {
      this.vars.temp = -90;
      for (let i = 0; i < 11; i++) {
        this.stage.vars.newParticles.push(this.x);
        this.stage.vars.newParticles.push(this.y);
        this.stage.vars.newParticles.push(this.vars.temp);
        this.stage.vars.newParticles.push(
          "enemy" + this.toString(this.random(1, 4))
        );
        this.vars.temp += 18;
      }
    }
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.visible = false;
  }
}
