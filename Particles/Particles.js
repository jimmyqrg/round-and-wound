/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Particles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("BIG", "./Particles/costumes/BIG.svg", {
        x: 127.5,
        y: 127.5,
      }),
      new Costume("coin", "./Particles/costumes/coin.png", { x: 7, y: 7 }),
      new Costume("flag", "./Particles/costumes/flag.png", { x: 2, y: 6 }),
      new Costume("arrow", "./Particles/costumes/arrow.png", { x: 29, y: 20 }),
      new Costume("player1", "./Particles/costumes/player1.png", {
        x: 2,
        y: 4,
      }),
      new Costume("player2", "./Particles/costumes/player2.png", {
        x: 8,
        y: 6,
      }),
      new Costume("player3", "./Particles/costumes/player3.png", {
        x: 8,
        y: 6,
      }),
      new Costume("player4", "./Particles/costumes/player4.png", {
        x: 8,
        y: 6,
      }),
      new Costume("player5", "./Particles/costumes/player5.png", {
        x: 8,
        y: 6,
      }),
      new Costume("enemy1", "./Particles/costumes/enemy1.png", { x: 8, y: 6 }),
      new Costume("enemy2", "./Particles/costumes/enemy2.png", { x: 8, y: 6 }),
      new Costume("enemy3", "./Particles/costumes/enemy3.png", { x: 8, y: 6 }),
      new Costume("enemy4", "./Particles/costumes/enemy4.png", { x: 8, y: 6 }),
      new Costume("flip", "./Particles/costumes/flip.png", { x: 13, y: 23 }),
      new Costume("flip2", "./Particles/costumes/flip2.png", { x: 13, y: 23 }),
      new Costume("dash1", "./Particles/costumes/dash1.svg", { x: 11, y: 9 }),
      new Costume("dash2", "./Particles/costumes/dash2.png", { x: 14, y: 18 }),
      new Costume("dash3", "./Particles/costumes/dash3.png", { x: 14, y: 18 }),
      new Costume("dirt", "./Particles/costumes/dirt.svg", { x: 0, y: 0 }),
      new Costume("enemy5", "./Particles/costumes/enemy5.png", { x: 8, y: 6 }),
      new Costume("enemy6", "./Particles/costumes/enemy6.png", { x: 8, y: 6 }),
    ];

    this.sounds = [new Sound("pop", "./Particles/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
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

    this.vars.yVel = 0;
    this.vars.xVel = 0;
    this.vars.lastValue = 0;
    this.vars.costume = 0;
  }

  *cloneNewParticles() {
    while (!(this.stage.vars.newParticles.length === 0)) {
      this.goto(
        this.toNumber(this.itemOf(this.stage.vars.newParticles, 0)),
        this.toNumber(this.itemOf(this.stage.vars.newParticles, 1))
      );
      this.direction = this.toNumber(
        this.itemOf(this.stage.vars.newParticles, 2)
      );
      this.costume = "BIG";
      this.costume = this.itemOf(this.stage.vars.newParticles, 3);
      if (this.toNumber(this.stage.vars.theme) === 3) {
        if (
          this.toString(this.itemOf(this.stage.vars.newParticles, 3)) ===
          "enemy2"
        ) {
          this.costume = "enemy5";
        }
        if (
          this.toString(this.itemOf(this.stage.vars.newParticles, 3)) ===
          "enemy3"
        ) {
          this.costume = "enemy6";
        }
      }
      this.createClone();
      for (let i = 0; i < 4; i++) {
        this.stage.vars.newParticles.splice(0, 1);
      }
    }
  }

  *startAsClone() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 3)) === 0) {
      this.deleteThisClone();
    }
    this.visible = true;
    this.moveBehind();
    if (this.costume.name === "flip2") {
      this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
      this.size = this.toNumber(this.stage.vars.zoom) * 1.2;
      for (let i = 0; i < 10; i++) {
        this.y += this.toNumber(this.stage.vars.zoom) * -0.04;
        this.effects.ghost += 12;
        yield;
      }
      this.deleteThisClone();
    } else {
      if (this.costume.name === "flip") {
        this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
        this.size = this.toNumber(this.stage.vars.zoom) * 1.2;
        for (let i = 0; i < 10; i++) {
          this.y += this.toNumber(this.stage.vars.zoom) * 0.04;
          this.effects.ghost += 12;
          yield;
        }
        this.deleteThisClone();
      } else {
        if (this.costume.name === "arrow") {
          this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
          this.size = this.toNumber(this.stage.vars.zoom) * 1.2;
          for (let i = 0; i < 10; i++) {
            this.move(this.toNumber(this.stage.vars.zoom) * 0.02);
            this.effects.ghost += 12;
            yield;
          }
          this.deleteThisClone();
        } else {
          if (
            this.stringIncludes(this.costume.name, "player") ||
            this.stringIncludes(this.costume.name, "enemy") ||
            this.costume.name === "dirt"
          ) {
            this.size = this.toNumber(this.stage.vars.zoom);
            this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
            this.move(this.toNumber(this.stage.vars.zoom) * 0.05);
            if (this.touching(this.sprites["TileSolid"].andClones())) {
              this.deleteThisClone();
            }
            this.vars.xVel =
              this.random(4, 10) *
              (this.toNumber(this.stage.vars.zoom) / 100) *
              Math.cos(this.degToRad(this.direction + 270));
            this.vars.yVel =
              this.random(4, 10) *
              (this.toNumber(this.stage.vars.zoom) / 100) *
              Math.sin(this.degToRad(this.direction + 90));
            for (let i = 0; i < 25; i++) {
              this.direction += Math.sqrt(
                this.toNumber(this.vars.xVel) * this.toNumber(this.vars.xVel) +
                  this.toNumber(this.vars.yVel) * this.toNumber(this.vars.yVel)
              );
              this.vars.xVel = this.toNumber(this.vars.xVel) * 0.875;
              this.vars.yVel--;
              yield* this.moveInSteps(
                Math.abs(this.toNumber(this.vars.xVel)) +
                  Math.abs(this.toNumber(this.vars.yVel))
              );
              this.effects.ghost += 4;
              yield;
            }
            this.deleteThisClone();
          } else {
            if (this.costume.name === "dash1") {
              this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
              this.size = this.toNumber(this.stage.vars.zoom) * 1.2;
              for (let i = 0; i < 10; i++) {
                this.move(this.toNumber(this.stage.vars.zoom) * 0.03);
                this.effects.ghost += 12;
                yield;
              }
              this.deleteThisClone();
            } else {
              if (this.costume.name === "dash2") {
                this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
                this.size = this.toNumber(this.stage.vars.zoom) * 1.2;
                for (let i = 0; i < 10; i++) {
                  this.move(this.toNumber(this.stage.vars.zoom) * 0.05);
                  this.effects.ghost += 12;
                  yield;
                }
                this.deleteThisClone();
              } else {
                if (this.costume.name === "dash3") {
                  this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
                  this.size = this.toNumber(this.stage.vars.zoom) * 1.2;
                  for (let i = 0; i < 10; i++) {
                    this.move(this.toNumber(this.stage.vars.zoom) * 0.07);
                    this.effects.ghost += 12;
                    yield;
                  }
                  this.deleteThisClone();
                } else {
                  this.rotationStyle = Sprite.RotationStyle.DONT_ROTATE;
                  this.size = this.toNumber(this.stage.vars.zoom);
                  if (this.costume.name === "coin") {
                    this.move(this.toNumber(this.stage.vars.zoom) * 0.1);
                  } else {
                    this.move(this.toNumber(this.stage.vars.zoom) * 0.05);
                  }
                  for (let i = 0; i < 15; i++) {
                    this.move(this.toNumber(this.stage.vars.zoom) * 0.03);
                    this.effects.ghost += 7;
                    this.size -= 5;
                    yield;
                  }
                  this.deleteThisClone();
                }
              }
            }
          }
        }
      }
    }
  }

  *moveInSteps(steps) {
    this.vars.costume = this.costumeNumber;
    this.costume = "BIG";
    this.size -= 20;
    this.costume = this.vars.costume;
    for (let i = 0; i < this.toNumber(steps); i++) {
      this.vars.lastValue = this.x;
      this.x += this.toNumber(this.vars.xVel) / this.toNumber(steps);
      if (this.touching(this.sprites["TileSolid"].andClones())) {
        this.x = this.toNumber(this.vars.lastValue);
        this.vars.xVel = 0;
      }
      this.vars.lastValue = this.y;
      this.y += this.toNumber(this.vars.yVel) / this.toNumber(steps);
      if (this.touching(this.sprites["TileSolid"].andClones())) {
        this.y = this.toNumber(this.vars.lastValue);
        this.vars.yVel = 0;
      }
    }
    this.vars.costume = this.costumeNumber;
    this.costume = "BIG";
    this.size += 20;
    this.costume = this.vars.costume;
  }

  *whenIReceiveGameStart() {
    this.visible = false;
    this.stage.vars.newParticles = [];
    while (true) {
      yield* this.cloneNewParticles();
      yield;
    }
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.visible = false;
    this.stage.vars.newParticles = [];
  }
}
