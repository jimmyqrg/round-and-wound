/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ToolbarArrow extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("left", "./ToolbarArrow/costumes/left.svg", {
        x: -5.707812499999989,
        y: 9.900000000000034,
      }),
      new Costume("right", "./ToolbarArrow/costumes/right.svg", {
        x: -5.707815000000011,
        y: 9.900000000000006,
      }),
      new Costume("hit", "./ToolbarArrow/costumes/hit.svg", {
        x: -5.707815000000011,
        y: 9.900000000000006,
      }),
    ];

    this.sounds = [new Sound("click", "./ToolbarArrow/sounds/click.mp3")];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
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

    this.vars.touching = 0;
  }

  *whenthisspriteclicked() {
    if (this.toString(this.stage.vars.toolbarMode) === "hidden") {
      this.stage.vars.toolbarMode = "regular";
      this.costume = "left";
    } else {
      this.stage.vars.toolbarMode = "hidden";
      this.costume = "right";
    }
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
      yield* this.startSound("click");
    }
  }

  *whenIReceiveRenderTiles() {
    if (
      this.toNumber(this.stage.vars.complete) === 1 ||
      this.toNumber(this.stage.vars.running) === 1 ||
      this.toNumber(this.stage.vars.editor) === 2
    ) {
      this.visible = false;
    } else {
      this.visible = true;
      this.moveAhead();
    }
    this.goto(
      -184 + this.toNumber(this.stage.vars.toolScrollX),
      168 - (this.stage.vars.toolsInLevel.length / 2) * 50
    );
    if (this.compare(this.stage.vars.toolsInLevel.length, 6) > 0) {
      this.y = 18;
    }
    if (this.toString(this.stage.vars.toolbarMode) === "hidden") {
      this.stage.vars.toolScrollX +=
        (-50 - this.toNumber(this.stage.vars.toolScrollX)) /
        this.toNumber(this.stage.vars.toolbarMovementSpeed);
    } else {
      this.stage.vars.toolScrollX +=
        (0 - this.toNumber(this.stage.vars.toolScrollX)) /
        this.toNumber(this.stage.vars.toolbarMovementSpeed);
    }
  }

  *whenIReceiveGreenFlag() {
    this.visible = false;
  }

  *whenIReceiveGreenFlag2() {
    this.stage.vars.toolbarMode = "regular";
    this.stage.vars.toolbarMovementSpeed = 5;
    this.stage.vars.toolScrollX = 0;
    this.direction = 90;
    this.visible = false;
    this.costume = "left";
    this.vars.touching = 0;
    while (true) {
      while (!this.mouse.down) {
        yield;
      }
      if (this.touching("mouse")) {
        this.vars.touching = 1;
      } else {
        this.vars.touching = 0;
      }
      while (!!this.mouse.down) {
        yield;
      }
      yield;
    }
  }
}
