/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class GreenFlag extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./GreenFlag/costumes/costume1.svg", {
        x: 0,
        y: 0,
      }),
      new Costume("Flag", "./GreenFlag/costumes/Flag.svg", {
        x: 241,
        y: 180.75,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.TIMER_GREATER_THAN,
        { VALUE: () => this.vars.timer },
        this.whengreaterthan
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag2
      ),
    ];

    this.vars.timer = 0.875;
  }

  *whengreaterthan() {
    this.moveAhead();
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
  }

  *whenIReceiveGreenFlag() {
    while (true) {
      this.vars.timer = this.timer;
      yield;
    }
  }

  *whenthisspriteclicked() {
    this.broadcast("Green Flag");
  }

  *whenIReceiveGreenFlag2() {
    this.effects.ghost = 0;
    this.visible = false;
  }
}
