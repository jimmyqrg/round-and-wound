/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class DashEffect extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("soldier-dash", "./DashEffect/costumes/soldier-dash.png", {
        x: 29,
        y: 38,
      }),
      new Costume(
        "soldier-walk-dash",
        "./DashEffect/costumes/soldier-walk-dash.png",
        { x: 29, y: 38 }
      ),
      new Costume(
        "soldier-walk2-dash",
        "./DashEffect/costumes/soldier-walk2-dash.png",
        { x: 29, y: 38 }
      ),
      new Costume(
        "soldier-walk3-dash",
        "./DashEffect/costumes/soldier-walk3-dash.png",
        { x: 29, y: 38 }
      ),
      new Costume(
        "soldierUP-dash",
        "./DashEffect/costumes/soldierUP-dash.png",
        { x: 29, y: 38 }
      ),
      new Costume(
        "soldier-walkUP-dash",
        "./DashEffect/costumes/soldier-walkUP-dash.png",
        { x: 29, y: 38 }
      ),
      new Costume(
        "soldier-walk2UP-dash",
        "./DashEffect/costumes/soldier-walk2UP-dash.png",
        { x: 29, y: 38 }
      ),
      new Costume(
        "soldier-walk3UP-dash",
        "./DashEffect/costumes/soldier-walk3UP-dash.png",
        { x: 29, y: 38 }
      ),
    ];

    this.sounds = [new Sound("pop", "./DashEffect/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
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
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag2
      ),
    ];
  }

  *cloneNewParticles() {
    while (!(this.stage.vars.dashEffect.length === 0)) {
      this.goto(
        this.toNumber(this.itemOf(this.stage.vars.dashEffect, 0)),
        this.toNumber(this.itemOf(this.stage.vars.dashEffect, 1))
      );
      this.direction = this.toNumber(
        this.itemOf(this.stage.vars.dashEffect, 2)
      );
      this.costume = this.itemOf(this.stage.vars.dashEffect, 3);
      this.createClone();
      for (let i = 0; i < 4; i++) {
        this.stage.vars.dashEffect.splice(0, 1);
      }
    }
  }

  *startAsClone() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 2)) === 0) {
      this.deleteThisClone();
    }
    this.visible = true;
    this.moveAhead();
    this.moveBehind(5);
    if (this.toNumber(this.stage.vars.complete) === 1) {
      this.moveBehind(10);
    }
    this.size = this.toNumber(this.stage.vars.zoom);
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.effects.ghost = Math.hypot(
      this.sprites["Player"].x - this.x,
      this.sprites["Player"].y - this.y
    );
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveGameStart() {
    this.visible = false;
    this.stage.vars.dashEffect = [];
    while (true) {
      yield* this.cloneNewParticles();
      yield;
    }
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveReset() {
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.visible = false;
    this.stage.vars.dashEffect = [];
  }
}
