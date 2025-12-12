/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Home extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("home", "./Home/costumes/home.png", { x: 35, y: 35 }),
    ];

    this.sounds = [new Sound("click", "./Home/sounds/click.mp3")];

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
        { name: "Reset Home" },
        this.whenIReceiveResetHome
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
      this.moveAhead();
      this.goto(220, 155);
      this.size = 100;
      if (this.compare(this.stage.vars.level, 17) > 0) {
        this.size = 70;
        this.goto(220, 160);
      }
      if (this.toNumber(this.stage.vars.editor) === 2) {
        this.visible = false;
      } else {
        this.visible = true;
        if (this.touching("mouse")) {
          this.effects.brightness = 20;
          if (this.toNumber(this.stage.vars.clickTime) === 1) {
            if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
              yield* this.startSound("click");
            }
            for (let i = 0; i < 2; i++) {
              yield* this.wait(0);
              this.broadcast("Green Flag");
              yield;
            }
            this.broadcast("Reset Home");
            while (!!this.mouse.down) {
              yield;
            }
          }
        } else {
          this.effects.brightness = 0;
        }
        this.costume = "home";
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
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveResetHome() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.goto(220, 155);
    this.visible = false;
  }
}
