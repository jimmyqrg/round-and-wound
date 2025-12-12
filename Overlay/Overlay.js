/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Overlay extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("3", "./Overlay/costumes/3.svg", {
        x: 233.5,
        y: 170.48920856024847,
      }),
      new Costume("3-thin", "./Overlay/costumes/3-thin.svg", {
        x: 229.4939776637168,
        y: 170.5,
      }),
      new Costume("4", "./Overlay/costumes/4.svg", { x: 233.5, y: 170.499955 }),
      new Costume("4-thin", "./Overlay/costumes/4-thin.svg", {
        x: 229.49397766371683,
        y: 170.5,
      }),
      new Costume("5", "./Overlay/costumes/5.svg", { x: 233.5, y: 170.499975 }),
      new Costume("5-thin", "./Overlay/costumes/5-thin.svg", {
        x: 229.4939776637168,
        y: 170.50000000000009,
      }),
      new Costume("6", "./Overlay/costumes/6.svg", {
        x: 233.5,
        y: 171.34766499999998,
      }),
      new Costume("6-thin", "./Overlay/costumes/6-thin.svg", {
        x: 229.49398,
        y: 170.5,
      }),
    ];

    this.sounds = [new Sound("pop", "./Overlay/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset" },
        this.whenIReceiveReset2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset" },
        this.whenIReceiveReset3
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset" },
        this.whenIReceiveReset4
      ),
      new Trigger(Trigger.BROADCAST, { name: "GO" }, this.whenIReceiveGo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart2
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

    this.vars.last = 4;
    this.vars.temp = 5;
    this.vars.firstMy = 45;
    this.vars.firstScrollY = 0;
    this.vars.scrollWheelUp = 0;
    this.vars.scrollWheelDown = 0;
    this.vars.scrolling = 0;
    this.vars.ghost = 5.353038474604416e-30;
    this.vars.touchingMouse = false;
  }

  *whenIReceiveReset() {
    this.visible = true;
    this.vars.ghost = 100;
    while (true) {
      if (this.toNumber(this.stage.vars.running) === 0) {
        this.vars.ghost += (0 - this.toNumber(this.vars.ghost)) / 3.5;
        this.moveAhead();
        this.moveBehind(6 + 4 * this.stage.vars.toolsInLevel.length);
        this.costume = "" + this.toString(this.stage.vars.toolsInLevel.length);
        if (this.compare(this.stage.vars.toolsInLevel.length, 6) > 0) {
          this.costume = 6;
        }
        if (this.toString(this.stage.vars.toolbarMode) === "hidden") {
          this.x +=
            (-50 - this.x) /
            this.toNumber(this.stage.vars.toolbarMovementSpeed);
          this.y = 0;
        } else {
          this.x +=
            (0 - this.x) / this.toNumber(this.stage.vars.toolbarMovementSpeed);
          this.y = 0;
        }
      } else {
        this.vars.ghost += (100 - this.toNumber(this.vars.ghost)) / 3.5;
      }
      this.effects.ghost = this.toNumber(this.vars.ghost);
      yield;
    }
  }

  *whenIReceiveReset2() {
    while (true) {
      if (this.mouse.down) {
        while (!!this.mouse.down) {
          if (!(this.toString(this.stage.vars.moveMode) === "move")) {
            this.vars.temp = this.costume.name;
            this.costume = this.toString(this.vars.temp) + "-thin";
            if (this.touching("mouse")) {
              this.stage.vars.moveMode = "click";
            } else {
              this.stage.vars.moveMode = "drag";
            }
            this.costume = this.vars.temp;
          }
          yield;
        }
      } else {
        this.stage.vars.moveMode = "click";
      }
      yield;
    }
  }

  *whenIReceiveGameStart() {
    this.moveAhead();
    this.moveBehind(8);
    this.visible = true;
    this.goto(0, 0);
    this.stage.vars.failedToSelect = "";
    while (true) {
      while (!(this.compare(this.stage.vars.failedToSelect, "") > 0)) {
        yield;
      }
      this.vars.last = this.stage.vars.failedToSelect;
      for (let i = 0; i < 5; i++) {
        this.stage.vars.failedToSelect = this.vars.last;
        yield* this.wait(0.15);
        this.stage.vars.failedToSelect = "";
        yield* this.wait(0.15);
        yield;
      }
      yield;
    }
  }

  *whenIReceiveReset3() {
    while (true) {
      this.vars.scrolling = 0;
      if (this.touching("mouse") && this.mouse.down) {
        yield* this.wait(0);
        this.vars.firstMy = this.mouse.y;
        this.vars.firstScrollY = this.stage.vars.toolScrollY;
        while (!!(this.touching("mouse") && this.mouse.down)) {
          this.stage.vars.toolScrollY =
            this.toNumber(this.vars.firstScrollY) +
            (this.mouse.y - this.toNumber(this.vars.firstMy));
          yield* this.limitToolScroll();
          if (
            this.compare(
              Math.abs(this.mouse.y - this.toNumber(this.vars.firstMy)),
              5
            ) > 0
          ) {
            this.vars.scrolling = 1;
          } else {
            this.vars.scrolling = 0;
          }
          yield;
        }
      }
      if (
        this.toNumber(this.vars.scrollWheelUp) +
          this.toNumber(this.vars.scrollWheelDown) ===
        0
      ) {
        yield* this.glideToLimit();
      }
      yield;
    }
  }

  *smoothGlideTo(targetY) {
    this.stage.vars.toolScrollY +=
      (this.toNumber(targetY) - this.toNumber(this.stage.vars.toolScrollY)) / 5;
  }

  *whenKeyUpArrowPressed() {
    if (null) {
      if (!this.keyPressed("up arrow")) {
        this.vars.scrollWheelUp++;
      }
      yield* this.wait(0);
      this.vars.scrollWheelUp = 0;
    }
  }

  *whenKeyDownArrowPressed() {
    if (null) {
      if (!this.keyPressed("down arrow")) {
        this.vars.scrollWheelDown++;
      }
      yield* this.wait(0);
      this.vars.scrollWheelDown = 0;
    }
  }

  *whenIReceiveReset4() {
    while (true) {
      if (
        this.compare(
          this.toNumber(this.vars.scrollWheelUp) +
            this.toNumber(this.vars.scrollWheelDown),
          0
        ) > 0
      ) {
        this.vars.firstScrollY = this.stage.vars.toolScrollY;
        while (
          !(
            this.toNumber(this.vars.scrollWheelUp) +
              this.toNumber(this.vars.scrollWheelDown) ===
            0
          )
        ) {
          this.stage.vars.toolScrollY =
            this.toNumber(this.vars.firstScrollY) +
            (this.toNumber(this.vars.scrollWheelUp) -
              this.toNumber(this.vars.scrollWheelDown));
          yield* this.limitToolScroll();
          yield;
        }
      }
      if (!(this.touching("mouse") && this.mouse.down)) {
        yield* this.glideToLimit();
      }
      yield;
    }
  }

  *limitToolScroll() {
    if (this.compare(this.stage.vars.toolScrollY, -50) < 0) {
      this.stage.vars.toolScrollY = -50;
    }
    if (this.compare(this.stage.vars.toolsInLevel.length, 6) > 0) {
      if (
        this.compare(
          this.stage.vars.toolScrollY,
          (this.stage.vars.toolsInLevel.length - 5) * 50
        ) > 0
      ) {
        this.stage.vars.toolScrollY =
          (this.stage.vars.toolsInLevel.length - 5) * 50;
      }
    } else {
      if (this.compare(this.stage.vars.toolScrollY, 50) > 0) {
        this.stage.vars.toolScrollY = 50;
      }
    }
  }

  *glideToLimit() {
    if (this.compare(this.stage.vars.toolScrollY, 0) < 0) {
      this.warp(this.smoothGlideTo)(0);
    } else {
      if (this.compare(this.stage.vars.toolsInLevel.length, 6) > 0) {
        if (
          this.compare(
            this.stage.vars.toolScrollY,
            (this.stage.vars.toolsInLevel.length - 6) * 50
          ) > 0
        ) {
          this.warp(this.smoothGlideTo)(
            (this.stage.vars.toolsInLevel.length - 6) * 50
          );
        }
      } else {
        if (this.compare(this.stage.vars.toolScrollY, 0) > 0) {
          this.warp(this.smoothGlideTo)(0);
        }
      }
    }
  }

  *whenIReceiveGo() {
    this.vars.scrolling = 0;
  }

  *whenIReceiveGameStart2() {
    while (true) {
      this.vars.touchingMouse = this.touching("mouse");
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
