/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class LevelComplete extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("base", "./LevelComplete/costumes/base.png", {
        x: 154,
        y: 80,
      }),
      new Costume("x", "./LevelComplete/costumes/x.svg", {
        x: 6.717857142857099,
        y: 6.457465083056491,
      }),
      new Costume("complete", "./LevelComplete/costumes/complete.png", {
        x: 165,
        y: 85,
      }),
      new Costume("continue", "./LevelComplete/costumes/continue.png", {
        x: 105,
        y: 25,
      }),
      new Costume(
        "ALL LEVELS COMPLETED",
        "./LevelComplete/costumes/ALL LEVELS COMPLETED.svg",
        { x: 82.5, y: 42.5 }
      ),
    ];

    this.sounds = [new Sound("click", "./LevelComplete/sounds/click.mp3")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Hide Complete Card" },
        this.whenIReceiveHideCompleteCard
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
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

    this.vars.clone = 0;
    this.vars.target = 0;
    this.vars.shown = 0;
  }

  *whenIReceiveHideCompleteCard() {
    if (this.costume.name === "continue") {
      this.goto(180, -160);
    } else {
      this.visible = false;
      this.vars.shown = 0;
    }
  }

  *startAsClone() {
    this.vars.clone = 1;
    while (true) {
      this.visible = false;
      this.vars.shown = 0;
      while (!(this.toNumber(this.stage.vars.complete) === 1)) {
        yield;
      }
      this.visible = true;
      this.vars.shown = 1;
      if (this.costume.name === "continue") {
        this.goto(0, -40);
        if (
          this.compare(this.stage.vars.level, this.stage.vars.levels.length) ===
          0
        ) {
          this.deleteThisClone();
        }
      }
      this.moveAhead();
      this.vars.target = this.y;
      this.effects.ghost = 100;
      this.y += 20;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 10;
        this.y += (this.toNumber(this.vars.target) - this.y) / 3;
        yield;
      }
      while (!(this.toNumber(this.stage.vars.complete) === 0)) {
        yield;
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.touching("mouse") && this.toNumber(this.vars.shown) === 1) {
        this.effects.brightness = 20;
        if (this.mouse.down) {
          if (this.costume.name === "continue") {
            this.broadcast("Next Level");
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
            while (!!this.mouse.down) {
              yield;
            }
          } else {
            if (this.costume.name === "x") {
              this.broadcast("Hide Complete Card");
            }
          }
        }
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *whenIReceiveGameStart() {
    this.stage.vars.complete = 0;
    this.costume = "continue";
    this.goto(0, -40);
    this.createClone();
    this.costume = "x";
    this.goto(68, 29);
    this.createClone();
    this.moveAhead();
    this.vars.clone = 0;
    this.goto(0, 0);
    while (true) {
      this.visible = false;
      while (!(this.toNumber(this.stage.vars.complete) === 1)) {
        yield;
      }
      this.moveAhead();
      this.effects.ghost = 100;
      this.broadcast("Hide Save Gam");
      this.y = 20;
      this.visible = true;
      if (
        this.compare(this.stage.vars.level, this.stage.vars.levels.length) === 0
      ) {
        this.costume = "ALL LEVELS COMPLETED";
      } else {
        this.costume = "complete";
      }
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 10;
        this.y += this.y / -3;
        yield;
      }
      while (!(this.toNumber(this.stage.vars.complete) === 0)) {
        yield;
      }
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        this.y += (-20 - this.y) / 3;
        yield;
      }
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
  }
}
