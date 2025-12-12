/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Counter extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("x", "./Counter/costumes/x.svg", {
        x: 5.858400000000074,
        y: 14.27985000000001,
      }),
      new Costume("1", "./Counter/costumes/1.svg", {
        x: 3.1122550000000047,
        y: 14.27985000000001,
      }),
      new Costume("2", "./Counter/costumes/2.svg", {
        x: 5.858400000000046,
        y: 14.27985000000001,
      }),
      new Costume("3", "./Counter/costumes/3.svg", {
        x: 4.943015000000031,
        y: 14.27985000000001,
      }),
      new Costume("4", "./Counter/costumes/4.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("5", "./Counter/costumes/5.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("6", "./Counter/costumes/6.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("7", "./Counter/costumes/7.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("8", "./Counter/costumes/8.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("9", "./Counter/costumes/9.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("0", "./Counter/costumes/0.svg", {
        x: 5.858400000000017,
        y: 14.27985000000001,
      }),
      new Costume("BIG", "./Counter/costumes/BIG.svg", { x: 182, y: 149 }),
    ];

    this.sounds = [new Sound("pop", "./Counter/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.BROADCAST, { name: "Clear" }, this.whenIReceiveClear),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
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

    this.vars.i = 5;
    this.vars.i2 = 1;
    this.vars.distance = 100;
    this.vars.maxDistance = 100;
  }

  *whenIReceiveRenderTiles() {
    if (
      this.toNumber(this.stage.vars.complete) === 0 &&
      this.toNumber(this.stage.vars.running) === 0
    ) {
      yield* this.renderCounts();
    }
  }

  *renderCounts() {
    this.size = 90;
    this.costume = "BIG";
    this.y = 130 + this.toNumber(this.stage.vars.toolScrollY);
    this.vars.i = 0;
    for (let i = 0; i < this.stage.vars.toolsInLevel.length; i++) {
      this.vars.i++;
      if (
        !(
          this.toNumber(
            this.itemOf(this.stage.vars.toolsInLevel, this.vars.i - 1)
          ) === 1
        )
      ) {
        this.vars.distance = Math.abs(
          this.y - (155 - (this.toNumber(this.stage.vars.toolsShown) / 2) * 50)
        );
        this.vars.maxDistance =
          150 - (175 - (this.toNumber(this.stage.vars.toolsShown) / 2) * 50);
        this.x = -190 + this.toNumber(this.stage.vars.toolScrollX);
        this.costume = "BIG";
        this.y -= 1;
        this.costume = "x";
        this.effects.brightness = -100;
        this.effects.ghost =
          (this.toNumber(this.vars.distance) -
            this.toNumber(this.vars.maxDistance)) *
          3;
        this.effects.ghost += 50;
        this.effects.ghost += this.toNumber(this.stage.vars.toolScrollX) * -2;
        this.createClone();
        this.costume = "BIG";
        this.y += 1;
        this.costume = "x";
        this.effects.clear();
        this.effects.ghost =
          (this.toNumber(this.vars.distance) -
            this.toNumber(this.vars.maxDistance)) *
          3;
        this.effects.ghost += this.toNumber(this.stage.vars.toolScrollX) * -2;
        this.warp(this.setToRedIfFailed)();
        this.createClone();
        this.vars.i2 = 0;
        for (
          let i = 0;
          i < this.itemOf(this.stage.vars.toolCounts, this.vars.i - 1).length;
          i++
        ) {
          this.vars.i2++;
          this.costume = "BIG";
          this.x += 10;
          this.y -= 1;
          this.costume = this.letterOf(
            this.itemOf(this.stage.vars.toolCounts, this.vars.i - 1),
            this.vars.i2 - 1
          );
          this.effects.brightness = -100;
          this.effects.ghost =
            (this.toNumber(this.vars.distance) -
              this.toNumber(this.vars.maxDistance)) *
              3 +
            50;
          this.effects.ghost += this.toNumber(this.stage.vars.toolScrollX) * -2;
          this.createClone();
          this.costume = "BIG";
          this.y += 1;
          this.costume = this.letterOf(
            this.itemOf(this.stage.vars.toolCounts, this.vars.i - 1),
            this.vars.i2 - 1
          );
          this.effects.clear();
          this.effects.ghost =
            (this.toNumber(this.vars.distance) -
              this.toNumber(this.vars.maxDistance)) *
            3;
          this.effects.ghost += this.toNumber(this.stage.vars.toolScrollX) * -2;
          this.warp(this.setToRedIfFailed)();
          this.createClone();
        }
      }
      this.y -= 50;
    }
  }

  *whenIReceiveClear() {
    this.deleteThisClone();
  }

  *startAsClone() {
    this.visible = true;
    this.moveAhead();
  }

  *setToRedIfFailed() {
    if (
      this.compare(
        this.itemOf(this.stage.vars.toolsInLevel, this.vars.i - 1),
        this.stage.vars.failedToSelect
      ) === 0
    ) {
      this.effects.brightness = 0;
    } else {
      this.effects.brightness = -100;
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
