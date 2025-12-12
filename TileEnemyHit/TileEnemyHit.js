/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TileEnemyHit extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("hit", "./TileEnemyHit/costumes/hit.png", { x: 32, y: 32 }),
      new Costume("big", "./TileEnemyHit/costumes/big.svg", {
        x: 93.5833350000002,
        y: 93.58333499999995,
      }),
    ];

    this.sounds = [new Sound("pop", "./TileEnemyHit/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Clear" }, this.whenIReceiveClear),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
    ];

    this.vars.row = 13;
    this.vars.column = 1;
    this.vars.type = "dirt";
    this.vars.gridId = 180;
    this.vars.id = 0;
  }

  *whenIReceiveRenderTiles() {
    yield* this.renderTiles();
  }

  *renderTiles() {
    this.vars.row = 1;
    this.vars.column = 1;
    this.vars.id = 0;
    this.costume = "big";
    this.size = this.toNumber(this.stage.vars.zoom);
    this.goto(
      -240 + this.toNumber(this.stage.vars.tileWidth) / 2,
      -180 + this.toNumber(this.stage.vars.tileWidth) / 2
    );
    this.y += this.toNumber(this.stage.vars.worldYOffset);
    for (let i = 0; i < this.toNumber(this.stage.vars.worldHeight); i++) {
      for (let i = 0; i < this.toNumber(this.stage.vars.worldWidth); i++) {
        this.warp(this.findGridIdFor)(this.vars.column, this.vars.row);
        this.costume = "hit";
        this.vars.type = this.itemOf(
          this.stage.vars.tileNames,
          this.itemOf(this.stage.vars.grid, this.vars.gridId - 1) - 1
        );
        if (this.toString(this.vars.type) === "enemy-hit") {
          this.vars.id++;
          this.createClone();
        }
        this.costume = "big";
        this.x += this.toNumber(this.stage.vars.tileWidth);
        this.vars.column++;
      }
      this.y += this.toNumber(this.stage.vars.tileWidth);
      this.x = -240 + this.toNumber(this.stage.vars.tileWidth) / 2;
      this.vars.column = 1;
      this.vars.row++;
    }
  }

  *startAsClone() {
    this.visible = true;
    if (this.toNumber(this.stage.vars.editor) === 2) {
      this.effects.ghost = 50;
    } else {
      this.effects.ghost = 100;
    }
  }

  *whenIReceiveClear() {
    this.deleteThisClone();
  }

  *findGridIdFor(column, row) {
    this.vars.gridId =
      (this.toNumber(row) - 1) * this.toNumber(this.stage.vars.worldWidth) +
      this.toNumber(column);
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }
}
