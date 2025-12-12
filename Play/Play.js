/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Play extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("play", "./Play/costumes/play.png", { x: 36, y: 37 }),
      new Costume("reset", "./Play/costumes/reset.png", { x: 36, y: 37 }),
    ];

    this.sounds = [new Sound("click", "./Play/sounds/click.mp3")];

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
  }

  *whenIReceiveGameStart() {
    while (true) {
      this.goto(220, -155);
      this.size = 100;
      if (this.compare(this.stage.vars.level, 17) > 0) {
        this.size = 70;
        this.goto(220, -160);
      }
      if (
        this.toNumber(this.stage.vars.complete) === 1 ||
        this.toNumber(this.stage.vars.editor) === 2
      ) {
        this.visible = false;
      } else {
        this.visible = true;
        this.costume = "play";
        while (!!this.mouse.down) {
          yield;
        }
        while (
          !(
            this.toNumber(this.stage.vars.complete) === 1 ||
            this.toNumber(this.stage.vars.editor) === 2
          )
        ) {
          if (this.touching("mouse")) {
            this.effects.brightness = 20;
            if (this.mouse.down) {
              if (
                this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1
              ) {
                yield* this.startSound("click");
              }
              if (this.toNumber(this.stage.vars.running) === 1) {
                this.stage.vars.editor = 1;
                this.broadcast("Reset");
                this.costume = "play";
              } else {
                if (this.compare(this.stage.vars.editor, 2) < 0) {
                  this.stage.vars.editor = 0;
                  this.broadcast("GO");
                  this.costume = "reset";
                }
              }
              while (!!this.mouse.down) {
                yield;
              }
            }
          } else {
            this.effects.brightness = 0;
          }
          if (this.toNumber(this.stage.vars.running) === 1) {
            this.costume = "reset";
          } else {
            this.costume = "play";
          }
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveRenderTiles() {
    this.y -= 2;
    this.effects.brightness -= 100;
    this.effects.ghost = 50;
    this.createClone();
    this.y += 2;
    this.effects.brightness += 100;
    this.effects.ghost = 0;
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
    this.goto(210, -155);
    this.visible = false;
  }
}
