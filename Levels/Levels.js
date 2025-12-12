/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Levels extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Levels/costumes/1.png", { x: 37, y: 37 }),
      new Costume("2", "./Levels/costumes/2.png", { x: 37, y: 37 }),
      new Costume("3", "./Levels/costumes/3.png", { x: 37, y: 37 }),
      new Costume("4", "./Levels/costumes/4.png", { x: 37, y: 37 }),
      new Costume("5", "./Levels/costumes/5.png", { x: 37, y: 37 }),
      new Costume("6", "./Levels/costumes/6.png", { x: 37, y: 37 }),
      new Costume("7", "./Levels/costumes/7.png", { x: 37, y: 37 }),
      new Costume("8", "./Levels/costumes/8.png", { x: 37, y: 37 }),
      new Costume("9", "./Levels/costumes/9.png", { x: 37, y: 37 }),
      new Costume("10", "./Levels/costumes/10.png", { x: 37, y: 37 }),
      new Costume("11", "./Levels/costumes/11.png", { x: 37, y: 37 }),
      new Costume("12", "./Levels/costumes/12.png", { x: 37, y: 37 }),
      new Costume("13", "./Levels/costumes/13.png", { x: 37, y: 37 }),
      new Costume("14", "./Levels/costumes/14.png", { x: 37, y: 37 }),
      new Costume("15", "./Levels/costumes/15.png", { x: 37, y: 37 }),
      new Costume("16", "./Levels/costumes/16.png", { x: 37, y: 37 }),
      new Costume("17", "./Levels/costumes/17.png", { x: 37, y: 37 }),
      new Costume("18", "./Levels/costumes/18.png", { x: 37, y: 37 }),
      new Costume("19", "./Levels/costumes/19.png", { x: 37, y: 37 }),
      new Costume("20", "./Levels/costumes/20.svg", { x: 18.5, y: 18.5 }),
      new Costume("21", "./Levels/costumes/21.svg", { x: 18.5, y: 18.5 }),
      new Costume("22", "./Levels/costumes/22.svg", { x: 18.5, y: 18.5 }),
      new Costume("BIG", "./Levels/costumes/BIG.svg", { x: 76, y: 76 }),
      new Costume("locked", "./Levels/costumes/locked.png", { x: 37, y: 37 }),
      new Costume("coming soon", "./Levels/costumes/coming soon.svg", {
        x: 18.5,
        y: 18.5,
      }),
      new Costume("blank", "./Levels/costumes/blank.svg", { x: 18.5, y: 18.5 }),
    ];

    this.sounds = [new Sound("click", "./Levels/sounds/click.mp3")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Levels" },
        this.whenIReceiveShowLevels
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart2
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "u" }, this.whenKeyUPressed),
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

    this.vars.id = 25;
    this.vars.offset = 1100;
  }

  *whenIReceiveShowLevels() {
    yield* this.createClones();
  }

  *startAsClone() {
    yield* this.wait(0);
    yield* this.wait(0);
    this.visible = true;
    this.size = 100;
    this.effects.ghost = 0;
    this.costume = "BIG";
    yield* this.goToPosition();
    while (true) {
      this.costume = "BIG";
      this.x =
        this.toNumber(this.vars.offset) -
        this.toNumber(this.stage.vars.levelScroll);
      this.costume = "" + this.toString(this.vars.id);
      if (this.compare(this.vars.id, this.stage.vars.levels.length) > 0) {
        this.costume = "coming soon";
      } else {
        if (
          this.compare(
            this.vars.id,
            this.toNumber(this.stage.vars.farthestLevel) + 1
          ) < 0
        ) {
          this.costume = "" + this.toString(this.vars.id);
        } else {
          this.costume = "locked";
        }
      }
      if (
        this.touching("mouse") &&
        !(
          this.stringIncludes(this.costume.name, "locked") ||
          this.compare(this.vars.id, this.stage.vars.levels.length) > 0
        )
      ) {
        this.effects.brightness = 10;
        if (this.toNumber(this.stage.vars.clickTime) === 1) {
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("click");
          }
          this.stage.vars.level = this.costume.name;
          this.broadcast("Start Game from Level");
          this.broadcast("Game Start");
        }
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }

  *createClones() {
    this.vars.id = 0;
    for (let i = 0; i < this.stage.vars.levels.length; i++) {
      this.vars.id++;
      this.createClone();
    }
    if (!(this.toNumber(this.vars.id) % 5 === 0)) {
      while (!(this.toNumber(this.vars.id) % 5 === 0)) {
        this.vars.id++;
        this.createClone();
      }
    }
  }

  *whenIReceiveGameStart() {
    this.effects.ghost = 0;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.deleteThisClone();
  }

  *goToPosition() {
    if (this.compare(this.vars.id, 9) < 0) {
      if (this.compare(this.vars.id, 5) < 0) {
        this.warp(this.goToPositionWithOffsetTopOrBottom)(0, 1);
      } else {
        this.warp(this.goToPositionWithOffsetTopOrBottom)(4, -1);
      }
    } else {
      if (this.compare(this.vars.id, 17) < 0) {
        if (this.compare(this.vars.id, 13) < 0) {
          this.warp(this.goToPositionWithOffsetTopOrBottom)(0.5, 1);
        } else {
          this.warp(this.goToPositionWithOffsetTopOrBottom)(4.5, -1);
        }
      } else {
        if (this.compare(this.vars.id, 25) < 0) {
          if (this.compare(this.vars.id, 21) < 0) {
            this.warp(this.goToPositionWithOffsetTopOrBottom)(1, 1);
          } else {
            this.warp(this.goToPositionWithOffsetTopOrBottom)(5, -1);
          }
        } else {
          null;
        }
      }
    }
  }

  *goToPositionWithOffsetTopOrBottom(xOffset, _11) {
    this.y = 25 * this.toNumber(_11);
    this.vars.offset =
      -125 + 50 * (this.toNumber(this.vars.id) - this.toNumber(xOffset));
  }

  *whenIReceiveGameStart2() {
    while (true) {
      if (
        this.compare(this.stage.vars.level, this.stage.vars.farthestLevel) > 0
      ) {
        this.stage.vars.farthestLevel = this.stage.vars.level;
      }
      if (this.toNumber(this.stage.vars.complete) === 1) {
        this.stage.vars.farthestLevel =
          this.toNumber(this.stage.vars.level) + 1;
      }
      yield;
    }
  }

  *whenKeyUPressed() {}

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.visible = false;
  }
}
