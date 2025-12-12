/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Text extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("level1", "./Text/costumes/level1.svg", {
        x: 140.99974283640006,
        y: 171,
      }),
      new Costume("level2", "./Text/costumes/level2.svg", {
        x: 140.99974570910007,
        y: 171,
      }),
      new Costume("level3", "./Text/costumes/level3.svg", {
        x: 140.99974563650017,
        y: 171,
      }),
      new Costume("level4", "./Text/costumes/level4.svg", {
        x: 140.99974563650017,
        y: 171,
      }),
      new Costume("level5", "./Text/costumes/level5.svg", {
        x: 140.9997427275002,
        y: 171,
      }),
      new Costume("level8", "./Text/costumes/level8.svg", {
        x: 140.9997602372001,
        y: 171,
      }),
      new Costume("level6", "./Text/costumes/level6.svg", {
        x: 140.99975340030005,
        y: 171,
      }),
      new Costume("level7", "./Text/costumes/level7.svg", {
        x: 140.99975340030005,
        y: 171,
      }),
      new Costume("level9", "./Text/costumes/level9.svg", {
        x: 140.9997427275002,
        y: 171,
      }),
      new Costume("level10", "./Text/costumes/level10.svg", {
        x: 140.99974549130036,
        y: 170.5201335823845,
      }),
      new Costume("level11", "./Text/costumes/level11.svg", {
        x: 140.99974563650017,
        y: 171,
      }),
      new Costume("level12", "./Text/costumes/level12.svg", {
        x: 140.9997426549003,
        y: 171,
      }),
      new Costume("level13", "./Text/costumes/level13.svg", {
        x: 140.99974269120025,
        y: 171,
      }),
      new Costume("level14", "./Text/costumes/level14.svg", {
        x: 140.9997426549003,
        y: 171,
      }),
      new Costume("level15", "./Text/costumes/level15.svg", {
        x: 140.99974549130036,
        y: 171,
      }),
      new Costume("level16", "./Text/costumes/level16.svg", {
        x: 140.99974261860035,
        y: 171,
      }),
      new Costume("level17", "./Text/costumes/level17.svg", {
        x: 140.9997454550004,
        y: 171,
      }),
      new Costume("level18", "./Text/costumes/level18.svg", {
        x: 140.9997454550004,
        y: 171,
      }),
      new Costume("level19", "./Text/costumes/level19.svg", {
        x: 140.99974541870046,
        y: 171,
      }),
      new Costume("level20", "./Text/costumes/level20.svg", {
        x: 140.9997425097005,
        y: 171,
      }),
      new Costume("level21", "./Text/costumes/level21.svg", {
        x: 140.9997453824005,
        y: 171,
      }),
      new Costume("level22", "./Text/costumes/level22.svg", {
        x: 140.99974247340054,
        y: 171,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
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

  *whenIReceiveNextLevel() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 4)) === 1) {
      yield* this.wait(0);
      this.visible = true;
      this.costume = this.stage.vars.level;
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 10;
        yield;
      }
      yield* this.wait(6);
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
    }
  }

  *whenIReceiveGameStart() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 4)) === 1) {
      this.visible = true;
      this.costume = this.stage.vars.level;
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 10;
        yield;
      }
      yield* this.wait(6);
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
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
