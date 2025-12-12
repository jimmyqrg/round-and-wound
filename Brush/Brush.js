/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Brush extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blank", "./Brush/costumes/blank.png", { x: 0, y: 0 }),
      new Costume("01", "./Brush/costumes/01.png", { x: 31, y: 31 }),
      new Costume("02", "./Brush/costumes/02.png", { x: 32, y: 32 }),
      new Costume("03", "./Brush/costumes/03.png", { x: 32, y: 32 }),
      new Costume("04", "./Brush/costumes/04.png", { x: 30, y: 29 }),
      new Costume("05", "./Brush/costumes/05.png", { x: 31, y: 20 }),
      new Costume("06", "./Brush/costumes/06.png", { x: 29, y: 20 }),
      new Costume("07", "./Brush/costumes/07.png", { x: 26, y: 26 }),
      new Costume("08", "./Brush/costumes/08.png", { x: 32, y: 32 }),
      new Costume("09", "./Brush/costumes/09.png", { x: 31, y: 21 }),
      new Costume("10", "./Brush/costumes/10.png", { x: 30, y: 5 }),
      new Costume("11", "./Brush/costumes/11.png", { x: 42, y: 35 }),
      new Costume("12", "./Brush/costumes/12.png", { x: 32, y: 32 }),
      new Costume("13", "./Brush/costumes/13.png", { x: 32, y: 32 }),
      new Costume("14", "./Brush/costumes/14.png", { x: 22, y: 18 }),
      new Costume("15", "./Brush/costumes/15.png", { x: 22, y: 18 }),
      new Costume("BIG", "./Brush/costumes/BIG.svg", { x: 182, y: 149 }),
      new Costume("hit-arrow", "./Brush/costumes/hit-arrow.png", {
        x: -11,
        y: 20,
      }),
      new Costume("dog", "./Brush/costumes/dog.png", { x: 48, y: 34 }),
    ];

    this.sounds = [new Sound("click", "./Brush/sounds/click.mp3")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Clear" }, this.whenIReceiveClear),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
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
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
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
    this.vars.alreadyLinked = 0;
    this.vars.distance = 102;
    this.vars.maxDistance = 100;
    this.vars.touchingTool = 0;
  }

  *checkToChangeBrush() {
    if (this.toNumber(this.stage.vars.editor) === 2) {
      null;
    } else {
      yield* this.checkForKeypresses();
    }
  }

  *checkForKeypresses() {
    this.vars.i = 0;
    for (let i = 0; i < this.stage.vars.toolsInLevel.length; i++) {
      this.vars.i++;
      if (this.keyPressed(this.toString(this.vars.i))) {
        this.stage.vars.selectedBrush = this.itemOf(
          this.stage.vars.toolsInLevel,
          this.vars.i - 1
        );
      }
    }
  }

  *linkAfter(type2, type1) {
    if (this.toNumber(this.vars.alreadyLinked) === 1) {
      return;
    }
    if (this.compare(this.stage.vars.selectedBrush, type1) === 0) {
      this.stage.vars.selectedBrush = type2;
      this.vars.alreadyLinked = 1;
    }
  }

  *renderToolbar() {
    this.vars.touchingTool = 0;
    if (this.compare(this.stage.vars.editor, 2) < 0) {
      this.size = 100;
      this.effects.ghost = 0;
      this.costume = "BIG";
      this.x = -210 + this.toNumber(this.stage.vars.toolScrollX);
      this.y = 150 + this.toNumber(this.stage.vars.toolScrollY);
      this.vars.i = 0;
      for (let i = 0; i < this.stage.vars.toolsInLevel.length; i++) {
        this.vars.i++;
        this.costume = 2;
        if (this.touching("mouse")) {
          this.vars.touchingTool = 1;
          if (
            this.mouse.down &&
            this.toNumber(this.sprites["Overlay"].vars.scrolling) === 0
          ) {
            if (
              this.toNumber(
                this.itemOf(this.stage.vars.toolCounts, this.vars.i - 1)
              ) === 0
            ) {
              this.stage.vars.failedToSelect = this.itemOf(
                this.stage.vars.toolsInLevel,
                this.vars.i - 1
              );
              this.stage.vars.selectedBrush = "";
            } else {
              this.stage.vars.selectedBrush = this.itemOf(
                this.stage.vars.toolsInLevel,
                this.vars.i - 1
              );
            }
          }
        }
        this.costume = "BIG";
        this.y -= 2;
        this.costume = this.itemOf(
          this.stage.vars.toolsInLevel,
          this.vars.i - 1
        );
        this.stage.vars.toolsShown = this.stage.vars.toolsInLevel.length;
        if (this.compare(this.stage.vars.toolsShown, 6) > 0) {
          this.stage.vars.toolsShown = 6;
        }
        this.vars.distance = Math.abs(
          this.y - (175 - (this.toNumber(this.stage.vars.toolsShown) / 2) * 50)
        );
        this.vars.maxDistance =
          150 - (175 - (this.toNumber(this.stage.vars.toolsShown) / 2) * 50);
        this.effects.brightness = -100;
        this.effects.ghost =
          (this.toNumber(this.vars.distance) -
            this.toNumber(this.vars.maxDistance)) *
          3;
        this.effects.ghost += 50;
        this.createClone();
        this.costume = "BIG";
        this.y += 2;
        this.costume = this.itemOf(
          this.stage.vars.toolsInLevel,
          this.vars.i - 1
        );
        this.effects.brightness = 0;
        this.effects.ghost =
          (this.toNumber(this.vars.distance) -
            this.toNumber(this.vars.maxDistance)) *
          3;
        if (
          this.compare(this.costume.name, this.stage.vars.selectedBrush) === 0
        ) {
          this.effects.brightness = 30;
          this.size = 110;
        }
        if (!(this.toNumber(this.costume.name) === 1)) {
          if (
            this.compare(
              this.itemOf(this.stage.vars.toolCounts, this.vars.i - 1),
              1
            ) < 0
          ) {
            this.effects.brightness = -25;
          }
        }
        this.createClone();
        this.costume = "BIG";
        this.y -= 50;
        this.size = 100;
      }
      this.effects.ghost = 50;
      this.effects.brightness = 0;
    }
    this.goto(
      -180 + this.toNumber(this.stage.vars.toolScrollX),
      168 - (this.stage.vars.toolsInLevel.length / 2) * 50
    );
    if (this.compare(this.stage.vars.toolsInLevel.length, 6) > 0) {
      this.y = 18;
    }
    this.costume = "hit-arrow";
    if (this.touching("mouse")) {
      this.vars.touchingTool = 1;
    }
  }

  *whenIReceiveClear() {
    this.deleteThisClone();
  }

  *whenIReceiveRenderTiles() {
    if (
      this.toNumber(this.stage.vars.complete) === 0 &&
      this.toNumber(this.stage.vars.running) === 0
    ) {
      this.visible = true;
      yield* this.renderToolbar();
    }
    if (
      this.compare(this.stage.vars.editor, 0) > 0 &&
      !this.touching(this.sprites["Menu"].andClones())
    ) {
      this.moveAhead();
      this.size = this.toNumber(this.stage.vars.zoom);
      yield* this.checkToChangeBrush();
      if (this.toNumber(this.stage.vars.selectedBrush) === 0) {
        this.costume = "blank";
      } else {
        this.costume = this.stage.vars.selectedBrush;
        if (
          this.toNumber(this.stage.vars.selectedBrush) === 11 &&
          this.toNumber(this.stage.vars.theme) === 3
        ) {
          this.costume = "dog";
        }
      }
      this.goto(
        this.toNumber(this.stage.vars.roundMouseX),
        this.toNumber(this.stage.vars.roundMouseY)
      );
      this.visible = true;
      if (this.touching(this.sprites["Menu"].andClones())) {
        this.visible = false;
      }
    } else {
      this.visible = false;
      this.stage.vars.selectedBrush = 1;
    }
  }

  *whenIReceiveReset() {
    this.stage.vars.selectedBrush = 1;
    this.stage.vars.toolScrollY = 0;
  }

  *whenIReceiveGameStart() {
    this.effects.ghost = 50;
    this.stage.vars.moveMode = "";
  }

  *whenIReceiveGameStart2() {
    while (true) {
      while (!this.keyPressed("any")) {
        yield;
      }
      if (this.toNumber(this.stage.vars.editor) === 2) {
        this.vars.alreadyLinked = 0;
        if (this.keyPressed("1")) {
          if (
            this.stringIncludes(
              ",01,02,03",
              "," + (this.toString(this.stage.vars.selectedBrush) + ",")
            )
          ) {
            yield* this.linkAfter(2, 1);
            yield* this.linkAfter(3, 2);
            yield* this.linkAfter(1, 3);
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          } else {
            this.stage.vars.selectedBrush = 1;
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          }
        }
        if (this.keyPressed("2")) {
          if (
            this.stringIncludes(
              ",04,05,06,10,13,14,15,",
              "," + (this.toString(this.stage.vars.selectedBrush) + ",")
            )
          ) {
            yield* this.linkAfter(10, 15);
            yield* this.linkAfter(5, 10);
            yield* this.linkAfter(6, 5);
            yield* this.linkAfter(4, 6);
            yield* this.linkAfter(13, 4);
            yield* this.linkAfter(14, 13);
            yield* this.linkAfter(15, 14);
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          } else {
            this.stage.vars.selectedBrush = 10;
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          }
        }
        if (this.keyPressed("3")) {
          if (
            this.stringIncludes(
              ",07,08,",
              "," + (this.toString(this.stage.vars.selectedBrush) + ",")
            )
          ) {
            yield* this.linkAfter(8, 7);
            yield* this.linkAfter(7, 8);
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          } else {
            this.stage.vars.selectedBrush = 7;
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          }
        }
        if (this.keyPressed("4")) {
          if (
            this.stringIncludes(
              ",09,11,",
              "," + (this.toString(this.stage.vars.selectedBrush) + ",")
            )
          ) {
            yield* this.linkAfter(11, 9);
            yield* this.linkAfter(12, 11);
            yield* this.linkAfter(9, 12);
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          } else {
            this.stage.vars.selectedBrush = 9;
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
          }
        }
      }
      while (
        !!(
          this.keyPressed("1") ||
          this.keyPressed("2") ||
          this.keyPressed("3") ||
          this.keyPressed("4")
        )
      ) {
        yield;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
      yield* this.startSound("click");
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
