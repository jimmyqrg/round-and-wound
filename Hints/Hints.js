/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hints extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./Hints/costumes/01.png", { x: 31, y: 31 }),
      new Costume("02", "./Hints/costumes/02.png", { x: 32, y: 32 }),
      new Costume("03", "./Hints/costumes/03.png", { x: 32, y: 32 }),
      new Costume("04", "./Hints/costumes/04.png", { x: 30, y: 29 }),
      new Costume("05", "./Hints/costumes/05.png", { x: 31, y: 20 }),
      new Costume("06", "./Hints/costumes/06.png", { x: 29, y: 20 }),
      new Costume("08", "./Hints/costumes/08.png", { x: 32, y: 32 }),
      new Costume("07", "./Hints/costumes/07.png", { x: 26, y: 26 }),
      new Costume("09", "./Hints/costumes/09.png", { x: 31, y: 21 }),
      new Costume("10", "./Hints/costumes/10.png", { x: 30, y: 5 }),
      new Costume("11", "./Hints/costumes/11.png", { x: 42, y: 35 }),
      new Costume("12", "./Hints/costumes/12.png", { x: 32, y: 32 }),
      new Costume("13", "./Hints/costumes/13.svg", { x: 15.5, y: 15.5 }),
    ];

    this.sounds = [new Sound("click", "./Hints/sounds/click.mp3")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "Hint" }, this.whenIReceiveHint),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset Level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game from Level" },
        this.whenIReceiveStartGameFromLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "GO" }, this.whenIReceiveGo),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
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

    this.vars._ = 49;
    this.vars.clonetyp = 0;
    this.vars.hintsPlacement = [
      "level num",
      "tile costume name (in this sprite)",
      "tile x",
      "tile y",
      "hint num",
      0,
      1,
      4,
      128,
      -112,
      1,
      0,
      1,
      5,
      128,
      16,
      2,
      0,
      1,
      6,
      -160,
      -112,
      3,
      0,
      2,
      4,
      160,
      -112,
      1,
      0,
      2,
      5,
      160,
      48,
      2,
      0,
      2,
      10,
      32,
      48,
      3,
      0,
      2,
      6,
      -160,
      -112,
      4,
      0,
      3,
      10,
      160,
      -112,
      1,
      0,
      3,
      4,
      192,
      -48,
      2,
      0,
      3,
      5,
      192,
      -16,
      3,
      0,
      3,
      6,
      -160,
      -112,
      4,
      0,
      4,
      5,
      -36,
      -132,
      1,
      0,
      4,
      4,
      -132,
      -132,
      2,
      0,
      4,
      6,
      -180,
      -12,
      3,
      0,
      4,
      4,
      -156,
      -36,
      4,
      0,
      4,
      10,
      60,
      -12,
      5,
      0,
      4,
      4,
      132,
      36,
      6,
      0,
      4,
      5,
      180,
      132,
      7,
    ];
  }

  *whenIReceiveHint() {
    if (this.toNumber(this.vars.clonetyp) === 0) {
      this.stage.vars.hintTyp++;
      this.createClone();
    }
  }

  *positionHints() {
    this.vars._ = 1;
    for (let i = 0; i < this.vars.hintsPlacement.length / 6; i++) {
      if (
        this.compare(
          this.stage.vars.hintTyp,
          this.itemOf(this.vars.hintsPlacement, this.toNumber(this.vars._) + 3)
        ) === 0 &&
        this.compare(
          this.stage.vars.level,
          this.itemOf(this.vars.hintsPlacement, this.toNumber(this.vars._) + -1)
        ) === 0
      ) {
        this.visible = true;
        this.effects.ghost = 70;
        this.moveAhead();
        this.costume = this.itemOf(
          this.vars.hintsPlacement,
          this.toNumber(this.vars._)
        );
        this.size = 75;
        this.goto(
          this.toNumber(
            this.itemOf(
              this.vars.hintsPlacement,
              this.toNumber(this.vars._) + 1
            )
          ),
          this.toNumber(
            this.itemOf(
              this.vars.hintsPlacement,
              this.toNumber(this.vars._) + 2
            )
          )
        );
        return;
      }
      this.vars._ += 6;
    }
  }

  *addHintToHintsListLevelNumCostumeNameXPosYPosHintNum(
    level,
    cost,
    xPos,
    yPos,
    hint
  ) {
    this.vars.hintsPlacement.push("");
    this.vars.hintsPlacement.push(level);
    this.vars.hintsPlacement.push(cost);
    this.vars.hintsPlacement.push(xPos);
    this.vars.hintsPlacement.push(yPos);
    this.vars.hintsPlacement.push(hint);
  }

  *startAsClone() {
    this.vars.clonetyp = 1;
    yield* this.positionHints();
  }

  *whenIReceiveResetLevel() {
    this.stage.vars.hintTyp = 0;
    this.deleteThisClone();
  }

  *whenIReceiveNextLevel() {
    this.stage.vars.hintTyp = 0;
    this.deleteThisClone();
  }

  *whenIReceiveStartGameFromLevel() {
    this.stage.vars.hintTyp = 0;
    this.deleteThisClone();
  }

  *whenIReceiveGo() {
    this.stage.vars.hintTyp = 0;
    this.deleteThisClone();
  }

  *deleteLastHint() {
    for (let i = 0; i < 6; i++) {
      this.vars.hintsPlacement.splice(this.vars.hintsPlacement.length - 1, 1);
    }
  }

  *startAsClone2() {
    yield* this.wait(0);
    while (true) {
      if (
        this.touching(this.sprites["TileAction"].andClones()) ||
        this.touching(this.sprites["TileEnemyHit"].andClones())
      ) {
        this.visible = false;
        return;
      }
      yield;
    }
  }

  *whenIReceiveGreenFlag() {
    this.stage.vars.hintTyp = 0;
    this.deleteThisClone();
  }

  *whenIReceiveGreenFlag2() {
    this.vars.clonetyp = 0;
    this.stage.vars.hintTyp = 0;
    this.visible = false;
  }
}
