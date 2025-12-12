/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Reset extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("reset2", "./Reset/costumes/reset2.png", { x: 36, y: 37 }),
      new Costume("reset", "./Reset/costumes/reset.png", { x: 36, y: 37 }),
    ];

    this.sounds = [new Sound("click", "./Reset/sounds/click.mp3")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.BROADCAST, { name: "Clear" }, this.whenIReceiveClear),
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

    this.vars.ghost = 5.353038474604416e-30;
  }

  *whenIReceiveGameStart() {
    this.visible = true;
    this.vars.ghost = 100;
    while (true) {
      this.goto(-220, -155);
      this.size = 100;
      if (this.compare(this.stage.vars.level, 17) > 0) {
        this.size = 70;
        this.goto(-220, -160);
      }
      if (
        this.toNumber(this.stage.vars.complete) === 1 ||
        this.toNumber(this.stage.vars.running) === 1 ||
        this.toNumber(this.stage.vars.editor) === 2
      ) {
        this.vars.ghost += (100 - this.toNumber(this.vars.ghost)) / 3.5;
      } else {
        this.vars.ghost += (0 - this.toNumber(this.vars.ghost)) / 3.5;
        if (this.touching("mouse")) {
          this.effects.brightness = 20;
          if (this.mouse.down) {
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
            this.broadcast("Reset Level");
            while (!!this.mouse.down) {
              yield;
            }
          }
        } else {
          this.effects.brightness = 0;
        }
        this.costume = "reset";
      }
      yield;
    }
  }

  *whenIReceiveRenderTiles() {
    this.y -= 2;
    this.effects.brightness -= 100;
    this.effects.ghost = this.toNumber(this.vars.ghost) + 50;
    this.createClone();
    this.y += 2;
    this.effects.brightness += 100;
    this.effects.ghost = this.toNumber(this.vars.ghost);
  }

  *whenIReceiveClear() {
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.goto(-210, -155);
    this.visible = false;
  }
}
