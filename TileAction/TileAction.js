/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TileAction extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("hit", "./TileAction/costumes/hit.png", { x: 32, y: 32 }),
      new Costume("big", "./TileAction/costumes/big.svg", {
        x: 93.5833350000002,
        y: 93.58333499999995,
      }),
      new Costume("blank", "./TileAction/costumes/blank.svg", { x: 0, y: 0 }),
      new Costume("left", "./TileAction/costumes/left.png", { x: 31, y: 20 }),
      new Costume("spring", "./TileAction/costumes/spring.png", {
        x: 30,
        y: -3,
      }),
      new Costume("right", "./TileAction/costumes/right.png", { x: 29, y: 20 }),
      new Costume("flag", "./TileAction/costumes/flag.png", { x: 32, y: 31 }),
      new Costume("coin", "./TileAction/costumes/coin.png", { x: 26, y: 26 }),
      new Costume("spike", "./TileAction/costumes/spike.png", { x: 31, y: 21 }),
      new Costume("coin-hit", "./TileAction/costumes/coin-hit.png", {
        x: 26,
        y: 26,
      }),
      new Costume("mini-spring", "./TileAction/costumes/mini-spring.png", {
        x: 30,
        y: -11,
      }),
      new Costume("enemy", "./TileAction/costumes/enemy.png", { x: 42, y: 38 }),
      new Costume("dash-right", "./TileAction/costumes/dash-right.png", {
        x: 22,
        y: 18,
      }),
      new Costume("dash-left", "./TileAction/costumes/dash-left.png", {
        x: 22,
        y: 18,
      }),
      new Costume("flip", "./TileAction/costumes/flip.png", { x: 32, y: 32 }),
      new Costume("arrow-frame-0", "./TileAction/costumes/arrow-frame-0.png", {
        x: 29,
        y: 20,
      }),
      new Costume("flip-frame-0", "./TileAction/costumes/flip-frame-0.png", {
        x: 32,
        y: 32,
      }),
      new Costume("flip-frame-1", "./TileAction/costumes/flip-frame-1.png", {
        x: 32,
        y: 32,
      }),
      new Costume("flip-frame-2", "./TileAction/costumes/flip-frame-2.png", {
        x: 32,
        y: 32,
      }),
      new Costume("flip-frame-3", "./TileAction/costumes/flip-frame-3.png", {
        x: 32,
        y: 32,
      }),
      new Costume("flip-frame-4", "./TileAction/costumes/flip-frame-4.png", {
        x: 32,
        y: 32,
      }),
      new Costume("flip-frame-5", "./TileAction/costumes/flip-frame-5.png", {
        x: 32,
        y: 32,
      }),
      new Costume("arrow-frame-1", "./TileAction/costumes/arrow-frame-1.png", {
        x: 29,
        y: 20,
      }),
      new Costume("arrow-frame-2", "./TileAction/costumes/arrow-frame-2.png", {
        x: 29,
        y: 20,
      }),
      new Costume("arrow-frame-3", "./TileAction/costumes/arrow-frame-3.png", {
        x: 29,
        y: 20,
      }),
      new Costume("arrow-frame-4", "./TileAction/costumes/arrow-frame-4.png", {
        x: 29,
        y: 20,
      }),
      new Costume("arrow-frame-5", "./TileAction/costumes/arrow-frame-5.png", {
        x: 29,
        y: 20,
      }),
      new Costume("arrow-frame-6", "./TileAction/costumes/arrow-frame-6.png", {
        x: 29,
        y: 20,
      }),
      new Costume("arrow-frame-7", "./TileAction/costumes/arrow-frame-7.png", {
        x: 29,
        y: 20,
      }),
      new Costume("coin-frame-0", "./TileAction/costumes/coin-frame-0.png", {
        x: 26,
        y: 26,
      }),
      new Costume("coin-frame-1", "./TileAction/costumes/coin-frame-1.png", {
        x: 18,
        y: 26,
      }),
      new Costume("coin-frame-2", "./TileAction/costumes/coin-frame-2.png", {
        x: 14,
        y: 26,
      }),
      new Costume("coin-frame-3", "./TileAction/costumes/coin-frame-3.png", {
        x: 6,
        y: 26,
      }),
      new Costume("coin-frame-4", "./TileAction/costumes/coin-frame-4.png", {
        x: 14,
        y: 26,
      }),
      new Costume("flag-frame-0", "./TileAction/costumes/flag-frame-0.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-1", "./TileAction/costumes/flag-frame-1.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-2", "./TileAction/costumes/flag-frame-2.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-3", "./TileAction/costumes/flag-frame-3.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-4", "./TileAction/costumes/flag-frame-4.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-5", "./TileAction/costumes/flag-frame-5.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-6", "./TileAction/costumes/flag-frame-6.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-7", "./TileAction/costumes/flag-frame-7.png", {
        x: 16,
        y: 14,
      }),
      new Costume("flag-frame-8", "./TileAction/costumes/flag-frame-8.png", {
        x: 16,
        y: 14,
      }),
      new Costume(
        "spring-frame-1",
        "./TileAction/costumes/spring-frame-1.png",
        { x: 30, y: 13 }
      ),
      new Costume(
        "spring-frame-2",
        "./TileAction/costumes/spring-frame-2.png",
        { x: 30, y: 21 }
      ),
      new Costume(
        "spring-frame-3",
        "./TileAction/costumes/spring-frame-3.png",
        { x: 30, y: 29 }
      ),
      new Costume(
        "spring-frame-4",
        "./TileAction/costumes/spring-frame-4.png",
        { x: 30, y: 37 }
      ),
      new Costume(
        "spring-frame-5",
        "./TileAction/costumes/spring-frame-5.png",
        { x: 30, y: 29 }
      ),
      new Costume(
        "spring-frame-6",
        "./TileAction/costumes/spring-frame-6.png",
        { x: 30, y: 21 }
      ),
      new Costume(
        "spring-frame-7",
        "./TileAction/costumes/spring-frame-7.png",
        { x: 30, y: 13 }
      ),
      new Costume(
        "mini-spring-frame-1",
        "./TileAction/costumes/mini-spring-frame-1.png",
        { x: 30, y: -3 }
      ),
      new Costume(
        "mini-spring-frame-2",
        "./TileAction/costumes/mini-spring-frame-2.png",
        { x: 30, y: 1 }
      ),
      new Costume(
        "mini-spring-frame-3",
        "./TileAction/costumes/mini-spring-frame-3.png",
        { x: 30, y: 5 }
      ),
      new Costume(
        "mini-spring-frame-4",
        "./TileAction/costumes/mini-spring-frame-4.png",
        { x: 30, y: 9 }
      ),
      new Costume(
        "mini-spring-frame-5",
        "./TileAction/costumes/mini-spring-frame-5.png",
        { x: 30, y: 5 }
      ),
      new Costume(
        "mini-spring-frame-6",
        "./TileAction/costumes/mini-spring-frame-6.png",
        { x: 30, y: 1 }
      ),
      new Costume(
        "mini-spring-frame-7",
        "./TileAction/costumes/mini-spring-frame-7.png",
        { x: 30, y: -3 }
      ),
      new Costume("dog", "./TileAction/costumes/dog.svg", { x: 24, y: 17 }),
    ];

    this.sounds = [
      new Sound("Boing", "./TileAction/sounds/Boing.wav"),
      new Sound("Connect", "./TileAction/sounds/Connect.wav"),
      new Sound("Low Whoosh", "./TileAction/sounds/Low Whoosh.wav"),
      new Sound("speed", "./TileAction/sounds/speed.wav"),
      new Sound("flip", "./TileAction/sounds/flip.mp3"),
      new Sound("Collect1", "./TileAction/sounds/Collect1.mp3"),
      new Sound("Collect2", "./TileAction/sounds/Collect2.mp3"),
      new Sound("Rip", "./TileAction/sounds/Rip.mp3"),
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Clear" }, this.whenIReceiveClear),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Boing Sound" },
        this.whenIReceiveBoingSound
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.row = 13;
    this.vars.column = 1;
    this.vars.type = "dirt";
    this.vars.gridId = 180;
    this.vars.id = 3;
    this.vars.temp = 14042;
    this.vars.brightness = 0;
  }

  *whenIReceiveRenderTiles() {
    yield* this.renderTiles();
  }

  *renderTiles() {
    this.stage.vars.coinsRequired = 0;
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
        if (this.arrayIncludes(this.stage.vars.actionTiles, this.vars.type)) {
          this.vars.id++;
          if (
            this.compare(this.stage.vars.animationFrames.length, this.vars.id) <
            0
          ) {
            this.stage.vars.animationFrames.push("");
          }
          if (this.toString(this.vars.type) === "coin") {
            this.stage.vars.coinsRequired++;
          }
          if (
            !(this.toString(this.vars.type) === "enemy") ||
            this.toNumber(this.stage.vars.running) === 0
          ) {
            this.createClone();
          }
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

  *startAsClone() {
    this.visible = true;
    this.costume = this.vars.type;
    if (
      this.toNumber(this.stage.vars.theme) === 3 &&
      this.toString(this.vars.type) === "enemy"
    ) {
      this.costume = "dog";
    }
    this.vars.brightness = 0;
    yield* this.tickAction();
    if (
      !(
        this.toString(this.vars.type) === "flag" &&
        this.compare(this.stage.vars.coins, this.stage.vars.coinsRequired) < 0
      )
    ) {
      if (this.toNumber(this.itemOf(this.stage.vars.settings, 2)) === 1) {
        this.effects.brightness = -100;
        this.effects.ghost = 50;
        this.y += -2 * (this.toNumber(this.stage.vars.zoom) / 100);
        this.stamp();
        this.effects.clear();
        this.effects.brightness = this.toNumber(this.vars.brightness);
        this.y += 2 * (this.toNumber(this.stage.vars.zoom) / 100);
      }
    }
  }

  *whenIReceiveClear() {
    this.deleteThisClone();
  }

  *findGridIdFor(column, row) {
    this.vars.gridId =
      (this.toNumber(row) - 1) * this.toNumber(this.stage.vars.worldWidth) +
      this.toNumber(column);
  }

  *tickAction() {
    this.warp(this.updateAnimation)();
    if (this.toString(this.vars.type) === "flag") {
      if (
        this.compare(this.stage.vars.coins, this.stage.vars.coinsRequired) < 0
      ) {
        this.effects.ghost = 40;
        return;
      } else {
        this.size = 2 * this.toNumber(this.stage.vars.zoom);
        this.costume =
          "flag-frame-" +
          this.toString(this.toNumber(this.stage.vars.frame) % 9);
      }
    }
    if (this.stringIncludes(this.toString(this.vars.type), "dash")) {
      if (this.toNumber(this.stage.vars.running) === 1) {
        this.vars.brightness =
          10 *
          Math.sin(this.degToRad(this.toNumber(this.stage.vars.frame) * 60));
      }
    }
    this.vars.temp = this.costumeNumber;
    if (this.toString(this.vars.type) === "coin") {
      this.costume = "coin-hit";
    }
    if (
      (this.touching(this.sprites["Player"].andClones()) &&
        this.toNumber(this.stage.vars.running) === 1) ||
      (this.touching(this.sprites["DashEffect"].andClones()) &&
        this.toString(this.vars.type) === "coin")
    ) {
      this.costume = this.vars.temp;
      if (!this.arrayIncludes(this.stage.vars.activated, this.vars.id)) {
        this.stage.vars.activated.push(this.vars.id);
        if (this.toString(this.vars.type) === "spring") {
          this.stage.vars.playerYVel = 27;
          this.stage.vars.playerXVel =
            1 * this.toNumber(this.stage.vars.playerXVel);
          this.stage.vars.animationFrames.splice(this.vars.id - 1, 1, 1);
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            this.audioEffects.pitch = 50;
            yield* this.startSound("Boing");
          }
        }
        if (this.toString(this.vars.type) === "mini-spring") {
          this.stage.vars.playerYVel = 15;
          this.stage.vars.playerXVel =
            this.toNumber(this.stage.vars.playerXVel) * 1.5;
          this.stage.vars.animationFrames.splice(this.vars.id - 1, 1, 1);
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            this.audioEffects.pitch = 150;
            yield* this.startSound("Boing");
          }
        }
        if (this.toString(this.vars.type) === "flip") {
          this.stage.vars.up = this.toNumber(this.stage.vars.up) * -1;
          if (this.toNumber(this.stage.vars.up) === -1) {
            this.warp(this.createParticlesOfType)(1, "flip");
          } else {
            this.warp(this.createParticlesOfType)(1, "flip2");
          }
          this.stage.vars.animationFrames.splice(this.vars.id - 1, 1, 1);
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            null;
          }
        }
        if (this.toString(this.vars.type) === "left") {
          this.stage.vars.playerDirX =
            0 - Math.abs(this.toNumber(this.stage.vars.playerDirX));
          this.vars.temp = -90;
          this.warp(this.createParticlesOfType)(1, "arrow");
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("Low Whoosh");
          }
        }
        if (this.toString(this.vars.type) === "right") {
          this.stage.vars.playerDirX = Math.abs(
            this.toNumber(this.stage.vars.playerDirX)
          );
          this.vars.temp = 90;
          this.warp(this.createParticlesOfType)(1, "arrow");
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("Low Whoosh");
          }
        }
        if (this.toString(this.vars.type) === "dash-right") {
          this.stage.vars.playerXVel = 5.667;
          this.stage.vars.dash = 1;
          this.stage.vars.dashY = this.y;
          this.vars.temp = 90;
          if (null) {
            this.warp(this.createParticlesOfType)(1, "dash1");
            this.warp(this.createParticlesOfType)(1, "dash2");
            this.warp(this.createParticlesOfType)(1, "dash3");
          }
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("speed");
          }
        }
        if (this.toString(this.vars.type) === "dash-left") {
          this.stage.vars.playerXVel = -5.667;
          this.stage.vars.dash = -1;
          this.stage.vars.dashY = this.y;
          this.vars.temp = -90;
          if (null) {
            this.warp(this.createParticlesOfType)(1, "dash1");
            this.warp(this.createParticlesOfType)(1, "dash2");
            this.warp(this.createParticlesOfType)(1, "dash3");
          }
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("speed");
          }
        }
        if (this.toString(this.vars.type) === "coin") {
          this.stage.vars.coins++;
          this.stage.vars.collected.push(this.vars.id);
          this.vars.temp = 0;
          this.warp(this.createParticlesOfType)(10, "coin");
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound(
              "Collect" + this.toString(this.random(1, 2))
            );
          }
        }
        if (
          this.toString(this.vars.type) === "flag" &&
          this.toNumber(this.stage.vars.complete) === 0
        ) {
          this.stage.vars.complete = 1;
          this.x -= 3;
          this.vars.temp = 0;
          this.warp(this.createParticlesOfType)(15, "flag");
          this.x += 3;
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            this.audioEffects.pitch = 40;
            yield* this.startSound("Connect");
            yield* this.startSound(
              "Collect" + this.toString(this.random(1, 2))
            );
          }
        }
        if (this.toString(this.vars.type) === "spike") {
          this.stage.vars.editor = 1;
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("Rip");
          }
          this.warp(this.playerBreakEffect)();
          this.broadcast("Reset");
        }
      }
    } else {
      this.costume = this.vars.temp;
      this.vars.temp = this.costumeNumber;
      this.costume = "hit";
      if (!this.touching(this.sprites["Player"].andClones())) {
        this.stage.vars.activated.splice(
          this.indexInArray(this.stage.vars.activated, this.vars.id),
          1
        );
      }
      this.costume = this.vars.temp;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.collected = [];
    this.stage.vars.activated = [];
    this.stage.vars.animationFrames = [];
    this.stage.vars.coins = 0;
  }

  *createParticlesOfType(_, type) {
    for (let i = 0; i < this.toNumber(_); i++) {
      this.vars.temp += 360 / this.toNumber(_);
      this.stage.vars.newParticles.push(this.x);
      this.stage.vars.newParticles.push(this.y);
      this.stage.vars.newParticles.push(this.vars.temp);
      this.stage.vars.newParticles.push(type);
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

  *whenIReceiveGameStart() {
    while (true) {
      yield* this.wait(0);
      this.stage.vars.frame++;
      yield;
    }
  }

  *whenIReceiveBoingSound() {
    if (
      this.toString(this.vars.type) === "spring" &&
      this.touching(this.sprites["Player"].andClones())
    ) {
      this.stage.vars.springAnimating = 1;
      this.stage.vars.springFrame = 0;
      this.costume = "spring-frame-0";
    }
    if (
      this.toString(this.vars.type) === "mini-spring" &&
      this.touching(this.sprites["Player"].andClones())
    ) {
      this.stage.vars.miniSpringAnimating = 1;
      this.stage.vars.miniSpringFrame = 0;
      this.costume = "mini-spring-frame-0";
    }
  }

  *whenIReceiveGreenFlag() {
    this.stage.vars.springAnimating = 0;
    this.stage.vars.miniSpringAnimating = 0;
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }

  *updateAnimation() {
    if (this.toString(this.vars.type) === "spring") {
      if (
        this.compare(
          this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1),
          ""
        ) > 0
      ) {
        this.costume =
          "spring-frame-" +
          this.toString(
            this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1)
          );
        this.stage.vars.animationFrames.splice(
          this.vars.id - 1,
          1,
          this.toNumber(
            this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1)
          ) + 1
        );
        if (
          this.compare(
            this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1),
            7
          ) > 0
        ) {
          this.stage.vars.animationFrames.splice(this.vars.id - 1, 1, "");
        }
      }
    }
    if (this.toString(this.vars.type) === "mini-spring") {
      if (
        this.compare(
          this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1),
          ""
        ) > 0
      ) {
        this.costume =
          "mini-spring-frame-" +
          this.toString(
            this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1)
          );
        this.stage.vars.animationFrames.splice(
          this.vars.id - 1,
          1,
          this.toNumber(
            this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1)
          ) + 1
        );
        if (
          this.compare(
            this.itemOf(this.stage.vars.animationFrames, this.vars.id - 1),
            7
          ) > 0
        ) {
          this.stage.vars.animationFrames.splice(this.vars.id - 1, 1, "");
        }
      }
    }
    if (
      this.toString(this.vars.type) === "left" ||
      this.toString(this.vars.type) === "right"
    ) {
      this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
      if (
        this.compare(
          Math.ceil(this.toNumber(this.stage.vars.frame) / 1) % 24,
          8
        ) < 0
      ) {
        if (this.toNumber(this.stage.vars.running) === 1) {
          this.costume =
            "arrow-frame-" +
            this.toString(
              Math.ceil(this.toNumber(this.stage.vars.frame) / 1) % 24
            );
          if (this.toString(this.vars.type) === "left") {
            this.direction = -90;
          } else {
            this.direction = 90;
          }
        }
      }
    }
    if (this.toString(this.vars.type) === "flip") {
      if (
        this.compare(
          Math.ceil(this.toNumber(this.stage.vars.frame) / 1) % 24,
          6
        ) < 0
      ) {
        if (this.toNumber(this.stage.vars.running) === 1) {
          this.costume =
            "flip-frame-" +
            this.toString(
              Math.ceil(this.toNumber(this.stage.vars.frame) / 1) % 24
            );
        }
      }
    }
    if (this.toString(this.vars.type) === "coin") {
      if (this.arrayIncludes(this.stage.vars.collected, this.vars.id)) {
        this.deleteThisClone();
      } else {
        if (this.toNumber(this.stage.vars.running) === 1) {
          this.costume =
            "coin-frame-" +
            this.toString(
              Math.ceil(this.toNumber(this.stage.vars.frame) / 1.5) % 5
            );
        }
      }
    }
  }
}
