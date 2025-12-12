/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("play", "./Menu/costumes/play.png", { x: 181, y: 66 }),
      new Costume("instructions", "./Menu/costumes/instructions.png", {
        x: 181,
        y: 53,
      }),
      new Costume("settings", "./Menu/costumes/settings.png", {
        x: 181,
        y: 53,
      }),
      new Costume("title", "./Menu/costumes/title.svg", { x: 240, y: 180 }),
      new Costume(
        "instructions-real",
        "./Menu/costumes/instructions-real.svg",
        { x: 222.19306326115444, y: 169.4956127083443 }
      ),
      new Costume(
        "instructions-real2",
        "./Menu/costumes/instructions-real2.svg",
        { x: 222.19306536380032, y: 169.4956156807549 }
      ),
      new Costume(
        "instructions-real3",
        "./Menu/costumes/instructions-real3.svg",
        { x: 222.19306536380032, y: 169.4956156807549 }
      ),
      new Costume(
        "instructions-real4",
        "./Menu/costumes/instructions-real4.svg",
        { x: 222.19306036380033, y: 169.49561068075488 }
      ),
      new Costume("box0", "./Menu/costumes/box0.png", { x: 40, y: 38 }),
      new Costume("box1", "./Menu/costumes/box1.png", { x: 40, y: 38 }),
      new Costume("screen", "./Menu/costumes/screen.svg", {
        x: 209.94329101792013,
        y: 154.68768289682993,
      }),
      new Costume("back", "./Menu/costumes/back.png", { x: 27, y: 27 }),
      new Costume("arrow", "./Menu/costumes/arrow.png", { x: 29, y: 20 }),
      new Costume("levels", "./Menu/costumes/levels.svg", { x: 240, y: 180 }),
      new Costume("note", "./Menu/costumes/note.svg", {
        x: 129.63595837618993,
        y: 98.89023990853549,
      }),
      new Costume("load progress", "./Menu/costumes/load progress.png", {
        x: 378,
        y: 56,
      }),
      new Costume("save code", "./Menu/costumes/save code.svg", {
        x: 203.08910576698693,
        y: 127.89022834939648,
      }),
    ];

    this.sounds = [
      new Sound("Low Whoosh", "./Menu/sounds/Low Whoosh.wav"),
      new Sound("click", "./Menu/sounds/click.mp3"),
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Instructions" },
        this.whenIReceiveInstructions
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Settings" },
        this.whenIReceiveSettings
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Page" },
        this.whenIReceiveNextPage
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Previous Page" },
        this.whenIReceivePreviousPage
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Levels" },
        this.whenIReceiveShowLevels
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart3
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.KEY_PRESSED, { key: "z" }, this.whenKeyZPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Save Game" },
        this.whenIReceiveSaveGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Hide Save Gam" },
        this.whenIReceiveHideSaveGam
      ),
      new Trigger(Trigger.BROADCAST, { name: "GO" }, this.whenIReceiveGo),
    ];

    this.vars.cloneid = 0;
    this.vars.startSize = 100;
  }

  *whenIReceiveGreenFlag() {
    this.clearPen();
    this.stage.vars.started = 0;
    this.stage.vars.page = 0;
    if (this.stringIncludes(this.costume.name, "box")) {
      this.deleteThisClone();
    }
    if (!(this.costume.name === "title")) {
      if (this.compare(this.vars.cloneid, 1) > 0) {
        this.effects.ghost = 0;
        for (let i = 0; i < 10; i++) {
          this.effects.ghost += 10;
          yield;
        }
        this.deleteThisClone();
      }
    }
    this.visible = false;
    this.vars.cloneid = 0;
    yield* this.createCloneXYSizeCloneidSettingId("play", 0, 25, 70, 1, 0);
    yield* this.createCloneXYSizeCloneidSettingId(
      "instructions",
      0,
      -25,
      70,
      2,
      0
    );
    yield* this.createCloneXYSizeCloneidSettingId("settings", 0, -75, 70, 3, 0);
    yield* this.createCloneXYSizeCloneidSettingId("title", 0, 0, 100, 4, 0);
  }

  *createCloneXYSizeCloneidSettingId(costume, x, y, size, cloneid, settingId) {
    this.goto(this.toNumber(x), this.toNumber(y));
    this.costume = costume;
    if (this.compare(settingId, "") > 0) {
      this.costume =
        "box" +
        this.toString(this.itemOf(this.stage.vars.settings, settingId - 1));
    }
    this.size = this.toNumber(size);
    this.effects.ghost = 0;
    this.vars.startSize = size;
    this.vars.cloneid = cloneid;
    this.createClone();
    this.vars.cloneid = 0;
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      if (this.toNumber(this.vars.cloneid) === 1) {
        yield* this.smoothUpAndDownMovementYPos(-10);
      }
      if (this.toNumber(this.vars.cloneid) === 2) {
        yield* this.smoothUpAndDownMovementYPos(-57);
      }
      if (this.toNumber(this.vars.cloneid) === 3) {
        yield* this.smoothUpAndDownMovementYPos(-105);
      }
      if (this.costume.name === "title") {
        this.moveBehind();
        this.moveAhead(1);
      }
      if (
        (this.toNumber(this.vars.cloneid) === 14 &&
          this.toNumber(this.stage.vars.page) === 1) ||
        (this.toNumber(this.vars.cloneid) === 13 &&
          this.toNumber(this.stage.vars.page) === 4)
      ) {
        this.effects.brightness = -20;
      } else {
        if (
          this.compare(this.costumeNumber, 4) < 0 ||
          this.costumeNumber === 13 ||
          this.costumeNumber === 12 ||
          this.costumeNumber === 16
        ) {
          if (
            this.touching("mouse") ||
            (this.toNumber(this.vars.cloneid) === 8 &&
              this.compare(
                Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y),
                10
              ) < 0)
          ) {
            this.size +=
              (this.toNumber(this.vars.startSize) + 4 - this.size) / 2;
            this.effects.brightness +=
              this.toNumber(this.vars.startSize) + 4 - this.size;
          } else {
            this.size += (this.toNumber(this.vars.startSize) - this.size) / 2;
            this.effects.brightness = 0;
          }
        }
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    yield* this.clicked();
  }

  *whenIReceiveGameStart() {
    this.effects.ghost = 0;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveInstructions() {
    if (!null) {
      this.deleteThisClone();
    }
    this.stage.vars.page = 1;
    yield* this.createCloneXYSizeCloneidSettingId(
      "instructions-real",
      0,
      0,
      100,
      5,
      0
    );
    yield* this.createCloneXYSizeCloneidSettingId(
      "arrow",
      190,
      -150,
      100,
      13,
      0
    );
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.direction = -90;
    yield* this.createCloneXYSizeCloneidSettingId(
      "arrow",
      -190,
      -150,
      100,
      14,
      0
    );
    this.direction = 90;
    yield* this.createCloneXYSizeCloneidSettingId("back", 195, 145, 60, 8, 0);
  }

  *whenIReceiveSettings() {
    if (!null) {
      this.deleteThisClone();
    }
    yield* this.createCloneXYSizeCloneidSettingId("screen", 0, 0, 100, 6, 0);
    yield* this.createCloneXYSizeCloneidSettingId(
      "box0",
      -10,
      115,
      60,
      "7a",
      1
    );
    yield* this.createCloneXYSizeCloneidSettingId("box0", -10, 70, 60, "7b", 2);
    yield* this.createCloneXYSizeCloneidSettingId("box0", -10, 25, 60, "7c", 3);
    yield* this.createCloneXYSizeCloneidSettingId(
      "box0",
      -10,
      -20,
      60,
      "7d",
      4
    );
    yield* this.createCloneXYSizeCloneidSettingId(
      "box0",
      -10,
      -65,
      60,
      "7e",
      5
    );
    yield* this.createCloneXYSizeCloneidSettingId(
      "box0",
      -10,
      -110,
      60,
      "7f",
      5
    );
    yield* this.createCloneXYSizeCloneidSettingId("back", 185, 132, 60, 8, 0);
  }

  *whenGreenFlagClicked() {
    this.broadcast("Green Flag");
    this.stage.vars.settings = [];
    for (let i = 0; i < 6; i++) {
      this.stage.vars.settings.push(1);
      yield;
    }
  }

  *setSettingCostumeAndList(num) {
    this.warp(this.clickSound)();
    if (this.toNumber(this.itemOf(this.stage.vars.settings, num - 1)) === 0) {
      this.costume = "box1";
      this.stage.vars.settings.splice(num - 1, 1, 1);
      if (this.toNumber(num) === 1) {
        this.broadcast("Play Music after settings");
      }
    } else {
      this.costume = "box0";
      this.stage.vars.settings.splice(num - 1, 1, 0);
    }
  }

  *smoothUpAndDownMovementYPos(yPos) {
    this.y =
      this.toNumber(yPos) + Math.sin(this.degToRad(this.timer * 200)) * 3;
  }

  *whenIReceiveNextPage() {
    if (this.stringIncludes(this.costume.name, "instructions-real")) {
      this.effects.ghost = 0;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 8;
        yield;
      }
      this.costumeNumber++;
      this.stage.vars.page = this.costumeNumber - 4;
      if (!this.stringIncludes(this.costume.name, "instructions-real")) {
        this.broadcast("Green Flag");
      }
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 8;
        yield;
      }
    }
  }

  *clickSound() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
      yield* this.startSound("click");
    }
  }

  *clicked() {
    if (this.toNumber(this.vars.cloneid) === 1) {
      this.broadcast("Show Levels");
      this.warp(this.clickSound)();
      this.warp(this.createCloneXYSizeCloneidSettingId)(
        "levels",
        0,
        0,
        100,
        15,
        0
      );
      this.warp(this.createCloneXYSizeCloneidSettingId)(
        "load progress",
        0,
        -70,
        50,
        21,
        0
      );
    }
    if (this.toNumber(this.vars.cloneid) === 2) {
      this.broadcast("Instructions");
      this.warp(this.clickSound)();
    }
    if (this.toNumber(this.vars.cloneid) === 3) {
      this.broadcast("Settings");
      this.warp(this.clickSound)();
    }
    if (this.toString(this.vars.cloneid) === "7a") {
      this.warp(this.setSettingCostumeAndList)(1);
      this.warp(this.clickSound)();
    }
    if (this.toString(this.vars.cloneid) === "7b") {
      this.warp(this.setSettingCostumeAndList)(2);
      this.warp(this.clickSound)();
    }
    if (this.toString(this.vars.cloneid) === "7c") {
      this.warp(this.setSettingCostumeAndList)(3);
      this.warp(this.clickSound)();
    }
    if (this.toString(this.vars.cloneid) === "7d") {
      this.warp(this.setSettingCostumeAndList)(4);
      this.warp(this.clickSound)();
    }
    if (this.toString(this.vars.cloneid) === "7e") {
      this.warp(this.setSettingCostumeAndList)(5);
      this.warp(this.clickSound)();
    }
    if (this.toString(this.vars.cloneid) === "7f") {
      this.warp(this.setSettingCostumeAndList)(6);
      this.warp(this.clickSound)();
    }
    if (this.toNumber(this.vars.cloneid) === 8) {
      this.broadcast("Green Flag");
      this.warp(this.clickSound)();
    }
    if (
      this.toNumber(this.vars.cloneid) === 13 &&
      !(this.toNumber(this.stage.vars.page) === 4)
    ) {
      this.broadcast("Next Page");
      this.warp(this.clickSound)();
    }
    if (
      this.toNumber(this.vars.cloneid) === 14 &&
      !(this.toNumber(this.stage.vars.page) === 1)
    ) {
      this.broadcast("Previous Page");
      this.warp(this.clickSound)();
    }
    if (this.toNumber(this.vars.cloneid) === 20) {
      this.deleteThisClone();
    }
    if (this.toNumber(this.vars.cloneid) === 21) {
      this.broadcast("Load Game");
      this.warp(this.clickSound)();
    }
    if (this.toNumber(this.vars.cloneid) === 24) {
      this.broadcast("Hide Save Gam");
      this.warp(this.clickSound)();
    }
  }

  *startAsClone2() {
    if (this.costume.name === "save code") {
      this.moveAhead();
      this.moveBehind(1);
      this.effects.ghost = 100;
      for (let i = 0; i < 4; i++) {
        this.effects.ghost -= 25;
        yield;
      }
    } else {
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 10;
        yield;
      }
    }
    if (this.costume.name === "back") {
      this.moveAhead();
    }
  }

  *whenIReceiveReset() {
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 0)) === 1) {
      yield* this.startSound("Low Whoosh");
    }
  }

  *whenIReceiveGameStart2() {
    this.stage.vars.started = 1;
  }

  *whenIReceivePreviousPage() {
    if (this.stringIncludes(this.costume.name, "instructions-real")) {
      this.effects.ghost = 0;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 8;
        yield;
      }
      this.costume = this.costumeNumber - 1;
      this.stage.vars.page = this.costumeNumber - 4;
      if (!this.stringIncludes(this.costume.name, "instructions-real")) {
        this.broadcast("Green Flag");
      }
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost -= 8;
        yield;
      }
    }
  }

  *whenIReceiveShowLevels() {
    yield* this.createCloneXYSizeCloneidSettingId("back", 148, 140, 60, 8, 0);
    this.effects.ghost = 0;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveGameStart3() {
    this.stage.vars.theme = 1;
    while (true) {
      if (this.toNumber(this.itemOf(this.stage.vars.settings, 5)) === 1) {
        if (this.compare(this.stage.vars.level, 7) > 0) {
          this.stage.vars.theme = 2;
        }
        if (this.compare(this.stage.vars.level, 15) > 0) {
          this.stage.vars.theme = 3;
        }
        if (this.compare(this.stage.vars.level, 20) > 0) {
          this.stage.vars.theme = 4;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    yield* this.wait(0.1);
    if (
      /* no username */ "" === "-Schnauzers-" ||
      /* no username */ "" === "SchnauzersForever"
    ) {
      yield* this.createCloneXYSizeCloneidSettingId("note", 0, 0, 100, 20, 0);
    }
  }

  *whenKeyZPressed() {
    if (
      /* no username */ "" === "-Schnauzers-" ||
      /* no username */ "" === "SchnauzersForever"
    ) {
      this.stage.vars.farthestLevel = null;
    }
  }

  *whenIReceiveSaveGame() {
    yield* this.wait(0);
    if (this.toNumber(this.stage.vars.saveGame2) === 1) {
      if (this.toNumber(this.vars.cloneid) === 0) {
        yield* this.createCloneXYSizeCloneidSettingId(
          "save code",
          0,
          0,
          60,
          22,
          0
        );
        yield* this.createCloneXYSizeCloneidSettingId(
          "back",
          110,
          60,
          60,
          24,
          0
        );
      }
    }
    if (this.toNumber(this.stage.vars.saveGame2) === 0) {
      if (this.costume.name === "save code" || this.costume.name === "back") {
        this.effects.ghost = 0;
        for (let i = 0; i < 4; i++) {
          this.effects.ghost += 25;
          yield;
        }
        this.deleteThisClone();
      }
    }
  }

  *whenIReceiveHideSaveGam() {
    if (this.costume.name === "save code" || this.costume.name === "back") {
      this.stage.watchers.saveGame.visible = false;
      this.stage.vars.saveGame2 = 0;
      this.effects.ghost = 0;
      for (let i = 0; i < 4; i++) {
        this.effects.ghost += 25;
        yield;
      }
      this.deleteThisClone();
    }
  }

  *whenIReceiveGo() {
    if (this.costume.name === "save code" || this.costume.name === "back") {
      this.stage.watchers.saveGame.visible = false;
      this.stage.vars.saveGame2 = 0;
      this.effects.ghost = 0;
      for (let i = 0; i < 4; i++) {
        this.effects.ghost += 25;
        yield;
      }
      this.deleteThisClone();
    }
  }
}
