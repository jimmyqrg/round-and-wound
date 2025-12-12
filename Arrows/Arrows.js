/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Arrows extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("left", "./Arrows/costumes/left.png", { x: 18, y: 24 }),
      new Costume("left-inactive", "./Arrows/costumes/left-inactive.png", {
        x: 18,
        y: 24,
      }),
      new Costume("right", "./Arrows/costumes/right.png", { x: 18, y: 24 }),
      new Costume("right-inactive", "./Arrows/costumes/right-inactive.png", {
        x: 18,
        y: 24,
      }),
    ];

    this.sounds = [new Sound("click", "./Arrows/sounds/click.mp3")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Levels" },
        this.whenIReceiveShowLevels
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Levels" },
        this.whenIReceiveShowLevels2
      ),
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
  }

  *whenIReceiveShowLevels() {
    if (!null) {
      this.deleteThisClone();
    }
    this.visible = true;
    this.costume = "right";
    this.goto(140, 0);
    this.createClone();
    this.stage.vars.targetScroll = 0;
    while (true) {
      this.stage.vars.levelScroll +=
        (this.toNumber(this.stage.vars.targetScroll) -
          this.toNumber(this.stage.vars.levelScroll)) /
        4;
      yield;
    }
  }

  *startAsClone() {
    this.costume = "left";
    this.goto(-140, 0);
    while (true) {
      if (this.compare(this.stage.vars.targetScroll, 0) > 0) {
        this.costume = "left";
        if (
          (this.touching("mouse") &&
            this.toNumber(this.stage.vars.clickTime) === 1) ||
          this.keyPressed("left arrow")
        ) {
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("click");
          }
          this.stage.vars.levelScroll = this.stage.vars.targetScroll;
          this.stage.vars.targetScroll -= 375;
          if (this.toNumber(this.stage.vars.targetScroll) === 0) {
            this.costume = "left-inactive";
          }
          while (!!this.keyPressed("left arrow")) {
            yield;
          }
        }
      } else {
        this.costume = "left-inactive";
      }
      yield;
    }
  }

  *whenIReceiveShowLevels2() {
    while (true) {
      if (
        this.compare(
          this.stage.vars.targetScroll,
          (Math.ceil(this.stage.vars.levels.length / 10) - 1) * 375
        ) < 0
      ) {
        this.costume = "right";
        if (
          (this.touching("mouse") &&
            this.toNumber(this.stage.vars.clickTime) === 1) ||
          this.keyPressed("right arrow")
        ) {
          if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
            yield* this.startSound("click");
          }
          this.stage.vars.levelScroll = this.stage.vars.targetScroll;
          this.stage.vars.targetScroll += 375;
          if (
            this.compare(
              this.stage.vars.targetScroll,
              (Math.ceil(this.stage.vars.levels.length / 10) - 1) * 375
            ) === 0
          ) {
            this.costume = "right-inactive";
          }
          while (!!this.keyPressed("right arrow")) {
            yield;
          }
        }
      } else {
        this.costume = "right-inactive";
      }
      yield;
    }
  }

  *whenIReceiveGameStart() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.stage.vars.levelScroll = 0;
    this.stage.vars.targetScroll = 0;
    this.visible = false;
  }
}
