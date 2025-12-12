/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cloud extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Cloud/costumes/costume1.svg", { x: 0, y: 0 }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.last = 22;
    this.vars.i = 5;
    this.vars.string = 1;
    this.vars.temp = 1;
    this.vars.myItem = 5;
    this.vars.characters = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      "-",
      "_",
    ];
  }

  *loadFromCloud() {
    this.stage.vars.CloudList = [];
    this.vars.i = 0;
    while (!(this.compare(this.vars.i, this.stage.vars.Cloud.length) === 0)) {
      this.vars.i++;
      this.vars.string = "";
      for (
        let i = 0;
        i <
        this.toNumber(
          this.letterOf(this.stage.vars.Cloud, this.vars.i - 1) +
            this.letterOf(this.stage.vars.Cloud, this.toNumber(this.vars.i))
        );
        i++
      ) {
        this.vars.i += 2;
        this.vars.temp = this.itemOf(
          this.vars.characters,
          this.letterOf(this.stage.vars.Cloud, this.vars.i - 1) +
            this.letterOf(this.stage.vars.Cloud, this.toNumber(this.vars.i)) -
            1
        );
        this.vars.string =
          this.toString(this.vars.string) + this.toString(this.vars.temp);
      }
      this.stage.vars.CloudList.push(this.vars.string);
      this.vars.i++;
    }
  }

  *updateCloud() {
    this.stage.vars.Cloud = "";
    for (let i = 0; i < this.stage.vars.CloudList.length; i++) {
      this.vars.string = "";
      this.vars.i = 0;
      for (
        let i = 0;
        i < this.itemOf(this.stage.vars.CloudList, 0).length;
        i++
      ) {
        this.vars.i++;
        this.vars.string =
          this.toString(this.vars.string) +
          this.toString(
            this.indexInArray(
              this.vars.characters,
              this.letterOf(
                this.itemOf(this.stage.vars.CloudList, 0),
                this.vars.i - 1
              )
            ) + 1
          );
      }
      if (this.itemOf(this.stage.vars.CloudList, 0).length.length === 1) {
        this.stage.vars.Cloud =
          this.toString(this.stage.vars.Cloud) +
          ("0" +
            (this.toString(this.itemOf(this.stage.vars.CloudList, 0).length) +
              this.toString(this.vars.string)));
      } else {
        this.stage.vars.Cloud =
          this.toString(this.stage.vars.Cloud) +
          (this.toString(this.itemOf(this.stage.vars.CloudList, 0).length) +
            this.toString(this.vars.string));
      }
      this.stage.vars.CloudList.splice(0, 1);
    }
  }

  *setInfo() {
    this.vars.i = 1;
    while (
      !(
        this.compare(
          this.itemOf(this.stage.vars.CloudList, this.vars.i - 1),
          /* no username */ ""
        ) === 0 ||
        this.compare(this.vars.i, this.stage.vars.CloudList.length) > 0
      )
    ) {
      this.vars.i += 2;
    }
    this.stage.vars.farthestLevel = this.itemOf(
      this.stage.vars.CloudList,
      this.toNumber(this.vars.i)
    );
    if (this.toString(this.stage.vars.farthestLevel) === "infinity") {
      this.stage.vars.farthestLevel = null;
    }
    if (this.compare(this.vars.i, this.stage.vars.CloudList.length) > 0) {
      this.stage.vars.CloudList.push(/* no username */ "");
      this.stage.vars.CloudList.push(1);
      this.warp(this.updateCloud)();
      this.warp(this.loadFromCloud)();
      this.stage.vars.farthestLevel = 1;
    }
    this.vars.myItem = this.vars.i;
  }

  *whenIReceiveGreenFlag() {
    yield* this.loadFromCloud();
    yield* this.setInfo();
    this.vars.last = this.stage.vars.farthestLevel;
    while (true) {
      if (this.compare(this.stage.vars.farthestLevel, this.vars.last) > 0) {
        yield* this.loadFromCloud();
        this.stage.vars.CloudList.splice(
          this.toNumber(this.vars.myItem),
          1,
          this.stage.vars.farthestLevel
        );
        yield* this.updateCloud();
      }
      this.vars.last = this.stage.vars.farthestLevel;
      yield;
    }
  }
}
