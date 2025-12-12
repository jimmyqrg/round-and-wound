/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("soldier", "./Player/costumes/soldier.png", { x: 26, y: 38 }),
      new Costume("soldier-walk", "./Player/costumes/soldier-walk.png", {
        x: 26,
        y: 38,
      }),
      new Costume("soldier-walk2", "./Player/costumes/soldier-walk2.png", {
        x: 26,
        y: 38,
      }),
      new Costume("soldier-walk3", "./Player/costumes/soldier-walk3.png", {
        x: 26,
        y: 38,
      }),
      new Costume("hitbox-down", "./Player/costumes/hitbox-down.png", {
        x: 20,
        y: 34,
      }),
      new Costume("hitbox-up", "./Player/costumes/hitbox-up.png", {
        x: 20,
        y: 34,
      }),
      new Costume("soldierUP", "./Player/costumes/soldierUP.png", {
        x: 26,
        y: 38,
      }),
      new Costume("soldier-walkUP", "./Player/costumes/soldier-walkUP.png", {
        x: 26,
        y: 38,
      }),
      new Costume("soldier-walk2UP", "./Player/costumes/soldier-walk2UP.png", {
        x: 26,
        y: 38,
      }),
      new Costume("soldier-walk3UP", "./Player/costumes/soldier-walk3UP.png", {
        x: 26,
        y: 38,
      }),
      new Costume("hitbox-downUP", "./Player/costumes/hitbox-downUP.png", {
        x: 20,
        y: 34,
      }),
      new Costume("hitbox-upUP", "./Player/costumes/hitbox-upUP.png", {
        x: 20,
        y: 34,
      }),
      new Costume("dash-hit", "./Player/costumes/dash-hit.svg", {
        x: 10,
        y: 7.482660332541627,
      }),
    ];

    this.sounds = [new Sound("wind-up", "./Player/sounds/wind-up.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "GO" }, this.whenIReceiveGo),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.BROADCAST, { name: "GO" }, this.whenIReceiveGo2),
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

    this.vars.lastValue = -183;
    this.vars.realXVel = 4.249999999999997;
    this.vars.realYVel = -14.249999999999963;
    this.vars.costumeCooldown = 13.389000000000001;
    this.vars.costume = 3;
    this.vars.distance = -72;
    this.vars.direction = 220;
    this.vars.count = 0;
    this.vars.temp = 0;
  }

  *moveInSteps(steps) {
    if (this.compare(this.stage.vars.playerYVel, 0) < 0) {
      this.costume = "hitbox-down";
    } else {
      this.costume = "hitbox-up";
    }
    if (this.toNumber(this.stage.vars.up) === -1) {
      this.costume = this.costume.name + "UP";
    }
    if (this.touching(this.sprites["TileSolid"].andClones())) {
      this.warp(this.findClosestSpaceFrom)(this.x, this.y);
    }
    for (let i = 0; i < this.toNumber(steps); i++) {
      this.vars.lastValue = this.x;
      this.x += this.toNumber(this.vars.realXVel) / this.toNumber(steps);
      if (this.touching(this.sprites["TileSolid"].andClones())) {
        this.x = this.toNumber(this.vars.lastValue);
        this.stage.vars.playerXVel = 0;
        this.vars.realXVel = 0;
      }
      this.vars.lastValue = this.y;
      this.y += this.toNumber(this.vars.realYVel) / this.toNumber(steps);
      if (this.touching(this.sprites["TileSolid"].andClones())) {
        this.y = this.toNumber(this.vars.lastValue);
        this.stage.vars.playerYVel = 0;
        this.vars.realYVel = 0;
        this.warp(this.slip)();
      }
    }
  }

  *whenIReceiveGo() {
    this.stage.vars.running = 1;
    this.vars.costumeCooldown = 0;
    this.effects.ghost = 0;
    this.stage.vars.playerDirX = 1;
    this.direction = 90;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.costume = "soldier";
    this.vars.costume = this.costumeNumber;
    while (true) {
      if (!(this.toNumber(this.stage.vars.dash) === 0)) {
        yield* this.dash();
      }
      this.costume = "hitbox-down";
      if (this.toNumber(this.stage.vars.up) === -1) {
        this.costume = this.costume.name + "UP";
      }
      this.stage.vars.playerXVel += this.toNumber(this.stage.vars.playerDirX);
      this.stage.vars.playerYVel += 0 - this.toNumber(this.stage.vars.up);
      this.stage.vars.playerXVel =
        this.toNumber(this.stage.vars.playerXVel) * 0.85;
      this.stage.vars.playerYVel =
        this.toNumber(this.stage.vars.playerYVel) * 0.95;
      this.vars.realXVel =
        this.toNumber(this.stage.vars.playerXVel) *
        (this.toNumber(this.stage.vars.zoom) / 100);
      this.vars.realYVel =
        this.toNumber(this.stage.vars.playerYVel) *
        (this.toNumber(this.stage.vars.zoom) / 100);
      yield* this.moveInSteps(
        Math.abs(this.toNumber(this.vars.realXVel)) +
          Math.abs(this.toNumber(this.vars.realYVel))
      );
      this.direction = this.toNumber(this.stage.vars.playerDirX) * 90;
      this.costume = this.vars.costume;
      if (this.compare(this.timer, this.vars.costumeCooldown) > 0) {
        yield* this.progressAnimation();
      }
      yield;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.dash = 0;
    this.stage.vars.up = 1;
    this.stage.vars.running = 0;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.stage.vars.playerDirX = 1;
    this.direction = 90;
    this.goto(
      this.toNumber(
        this.itemOf(
          this.stage.vars.spawnPositions,
          this.toNumber(this.stage.vars.level) * 2 - 2
        )
      ),
      this.toNumber(
        this.itemOf(
          this.stage.vars.spawnPositions,
          this.toNumber(this.stage.vars.level) * 2 - 1
        )
      )
    );
    this.stage.vars.playerXVel = 0;
    this.stage.vars.playerYVel = 0;
    this.visible = true;
    this.moveAhead();
    this.effects.ghost = 40;
    this.costume = "soldier";
    this.size = this.toNumber(this.stage.vars.zoom);
  }

  *whenIReceiveRenderTiles() {
    if (this.toNumber(this.stage.vars.running) === 1) {
      this.y -= 3;
      this.effects.brightness = -100;
      this.effects.ghost = 50;
      this.stamp();
      this.y += 3;
      this.effects.clear();
    }
  }

  *whenIReceiveGo2() {
    while (true) {
      if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
        yield* this.playSoundUntilDone("wind-up");
      }
      yield;
    }
  }

  *slip() {
    this.y += -2 * this.toNumber(this.stage.vars.up);
    this.x += 2;
    if (!this.touching(this.sprites["TileSolid"].andClones())) {
      this.stage.vars.playerXVel++;
      return;
    }
    this.x -= 4;
    if (!this.touching(this.sprites["TileSolid"].andClones())) {
      this.stage.vars.playerXVel--;
      return;
    }
    this.y += 2 * this.toNumber(this.stage.vars.up);
    this.x += 2;
  }

  *whenIReceiveGameStart() {
    this.broadcast("Reset");
  }

  *dash() {
    this.vars.lastValue = this.x;
    this.x +=
      this.toNumber(this.stage.vars.tileWidth) *
      3 *
      this.toNumber(this.stage.vars.dash);
    this.costume = "dash-hit";
    while (!!this.touching(this.sprites["TileSolid"].andClones())) {
      this.x += 0 - this.toNumber(this.stage.vars.dash);
    }
    this.vars.distance = this.x - this.toNumber(this.vars.lastValue);
    this.x = this.toNumber(this.vars.lastValue);
    this.warp(this.checkToMakeParticles)();
    this.x = this.toNumber(this.vars.lastValue);
    for (let i = 0; i < 6; i++) {
      this.x += this.toNumber(this.vars.distance) / 6;
      this.stage.vars.dashEffect.push(this.x);
      this.stage.vars.dashEffect.push(this.y);
      this.stage.vars.dashEffect.push(this.direction);
      this.stage.vars.dashEffect.push(this.costume.name + "-dash");
      this.warp(this.progressAnimation)();
    }
    this.size = this.toNumber(this.stage.vars.zoom);
    this.stage.vars.dash = 0;
  }

  *progressAnimation() {
    this.costumeNumber++;
    if (this.toNumber(this.stage.vars.up) === -1) {
      if (
        this.compare(this.costumeNumber, 10) > 0 ||
        this.compare(this.costumeNumber, 7) < 0
      ) {
        this.costume = "soldierUP";
      }
    } else {
      if (this.compare(this.costumeNumber, 4) > 0) {
        this.costume = "soldier";
      }
    }
    this.vars.costume = this.costumeNumber;
    this.vars.costumeCooldown = this.timer + 0.07;
  }

  *findClosestSpaceFrom(x, y) {
    this.vars.distance = 0;
    while (true) {
      this.vars.distance += 2;
      this.vars.direction = 0;
      for (let i = 0; i < 36; i++) {
        this.vars.direction += 10;
        this.goto(this.toNumber(x), this.toNumber(y));
        this.x +=
          this.toNumber(this.vars.distance) *
          Math.sin(this.degToRad(this.toNumber(this.vars.direction)));
        this.y +=
          this.toNumber(this.vars.distance) *
          Math.cos(this.degToRad(this.toNumber(this.vars.direction)));
        if (!this.touching(this.sprites["TileSolid"].andClones())) {
          return;
        }
      }
    }
  }

  *checkToMakeParticles() {}

  *makeDirtParticles() {
    for (let i = 0; i < 18; i++) {
      this.vars.temp += 10;
      this.stage.vars.newParticles.push(this.x);
      this.stage.vars.newParticles.push(this.y);
      this.stage.vars.newParticles.push(this.vars.temp);
      this.stage.vars.newParticles.push("dirt");
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
