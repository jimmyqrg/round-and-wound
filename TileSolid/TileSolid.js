/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TileSolid extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("hit", "./TileSolid/costumes/hit.png", { x: 32, y: 32 }),
      new Costume("big", "./TileSolid/costumes/big.svg", {
        x: 118.92537084955774,
        y: 118.92537084955747,
      }),
      new Costume("blank", "./TileSolid/costumes/blank.svg", {
        x: 23.08758047317471,
        y: 23.087580473174768,
      }),
      new Costume("grass0111", "./TileSolid/costumes/grass0111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0011", "./TileSolid/costumes/grass0011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0110", "./TileSolid/costumes/grass0110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0001", "./TileSolid/costumes/grass0001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0101", "./TileSolid/costumes/grass0101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0010", "./TileSolid/costumes/grass0010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0100", "./TileSolid/costumes/grass0100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("grass0000", "./TileSolid/costumes/grass0000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1111", "./TileSolid/costumes/dirt1111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1011", "./TileSolid/costumes/dirt1011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0111", "./TileSolid/costumes/dirt0111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0011", "./TileSolid/costumes/dirt0011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1101", "./TileSolid/costumes/dirt1101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1001", "./TileSolid/costumes/dirt1001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1110", "./TileSolid/costumes/dirt1110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1100", "./TileSolid/costumes/dirt1100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0110", "./TileSolid/costumes/dirt0110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0101", "./TileSolid/costumes/dirt0101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1010", "./TileSolid/costumes/dirt1010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0001", "./TileSolid/costumes/dirt0001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt1000", "./TileSolid/costumes/dirt1000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0100", "./TileSolid/costumes/dirt0100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0010", "./TileSolid/costumes/dirt0010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("dirt0000", "./TileSolid/costumes/dirt0000.png", {
        x: 46,
        y: 46,
      }),
      new Costume("wood1111", "./TileSolid/costumes/wood1111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0110", "./TileSolid/costumes/wood0110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1100", "./TileSolid/costumes/wood1100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1110", "./TileSolid/costumes/wood1110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1011", "./TileSolid/costumes/wood1011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0010", "./TileSolid/costumes/wood0010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0000", "./TileSolid/costumes/wood0000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1010", "./TileSolid/costumes/wood1010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0111", "./TileSolid/costumes/wood0111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0100", "./TileSolid/costumes/wood0100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0011", "./TileSolid/costumes/wood0011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1101", "./TileSolid/costumes/wood1101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0101", "./TileSolid/costumes/wood0101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1000", "./TileSolid/costumes/wood1000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood0001", "./TileSolid/costumes/wood0001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("wood1001", "./TileSolid/costumes/wood1001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0111", "./TileSolid/costumes/plank0111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0101", "./TileSolid/costumes/plank0101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0100", "./TileSolid/costumes/plank0100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0011", "./TileSolid/costumes/plank0011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0010", "./TileSolid/costumes/plank0010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0001", "./TileSolid/costumes/plank0001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0110", "./TileSolid/costumes/plank0110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("plank0000", "./TileSolid/costumes/plank0000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0111", "./TileSolid/costumes/rug0111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0101", "./TileSolid/costumes/rug0101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0110", "./TileSolid/costumes/rug0110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0100", "./TileSolid/costumes/rug0100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0011", "./TileSolid/costumes/rug0011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0000", "./TileSolid/costumes/rug0000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0010", "./TileSolid/costumes/rug0010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("rug0001", "./TileSolid/costumes/rug0001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1111", "./TileSolid/costumes/carpet1111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1110", "./TileSolid/costumes/carpet1110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1010", "./TileSolid/costumes/carpet1010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0110", "./TileSolid/costumes/carpet0110.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0010", "./TileSolid/costumes/carpet0010.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0000", "./TileSolid/costumes/carpet0000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1101", "./TileSolid/costumes/carpet1101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0101", "./TileSolid/costumes/carpet0101.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1100", "./TileSolid/costumes/carpet1100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1000", "./TileSolid/costumes/carpet1000.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1001", "./TileSolid/costumes/carpet1001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0001", "./TileSolid/costumes/carpet0001.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0111", "./TileSolid/costumes/carpet0111.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0100", "./TileSolid/costumes/carpet0100.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet1011", "./TileSolid/costumes/carpet1011.png", {
        x: 32,
        y: 32,
      }),
      new Costume("carpet0011", "./TileSolid/costumes/carpet0011.png", {
        x: 32,
        y: 32,
      }),
      new Costume(
        "checkerboard0111",
        "./TileSolid/costumes/checkerboard0111.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0101",
        "./TileSolid/costumes/checkerboard0101.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0011",
        "./TileSolid/costumes/checkerboard0011.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0110",
        "./TileSolid/costumes/checkerboard0110.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0010",
        "./TileSolid/costumes/checkerboard0010.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0001",
        "./TileSolid/costumes/checkerboard0001.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0100",
        "./TileSolid/costumes/checkerboard0100.png",
        { x: 32, y: 33 }
      ),
      new Costume(
        "checkerboard0000",
        "./TileSolid/costumes/checkerboard0000.png",
        { x: 32, y: 33 }
      ),
      new Costume("tile1111", "./TileSolid/costumes/tile1111.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1010", "./TileSolid/costumes/tile1010.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0101", "./TileSolid/costumes/tile0101.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1110", "./TileSolid/costumes/tile1110.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0010", "./TileSolid/costumes/tile0010.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0000", "./TileSolid/costumes/tile0000.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0100", "./TileSolid/costumes/tile0100.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0110", "./TileSolid/costumes/tile0110.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1100", "./TileSolid/costumes/tile1100.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1101", "./TileSolid/costumes/tile1101.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1001", "./TileSolid/costumes/tile1001.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1000", "./TileSolid/costumes/tile1000.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile1011", "./TileSolid/costumes/tile1011.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0001", "./TileSolid/costumes/tile0001.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0111", "./TileSolid/costumes/tile0111.png", {
        x: 32,
        y: 33,
      }),
      new Costume("tile0011", "./TileSolid/costumes/tile0011.png", {
        x: 32,
        y: 33,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Render Tiles" },
        this.whenIReceiveRenderTiles
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "Clear" }, this.whenIReceiveClear),
      new Trigger(Trigger.KEY_PRESSED, { key: "r" }, this.whenKeyRPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Next Level" },
        this.whenIReceiveNextLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "Reset" }, this.whenIReceiveReset),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Start" },
        this.whenIReceiveGameStart
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "e" }, this.whenKeyEPressed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Update Mouse" },
        this.whenIReceiveUpdateMouse
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Reset Level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game from Level" },
        this.whenIReceiveStartGameFromLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Save Game" },
        this.whenIReceiveSaveGame
      ),
    ];

    this.vars.row = 13;
    this.vars.column = 1;
    this.vars.gridId = 180;
    this.vars.type = "dirt";
    this.vars.string = null;
    this.vars.i = 13;
    this.vars.temp = 3;
    this.vars.clone = 0;
    this.vars.tilesInDirections = [];
  }

  *whenIReceiveRenderTiles() {
    yield* this.renderTiles();
  }

  *renderTiles() {
    this.moveBehind();
    this.vars.row = 1;
    this.vars.column = 1;
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
        this.warp(this.tickEdit)();
        this.vars.type = this.itemOf(
          this.stage.vars.tileNames,
          this.itemOf(this.stage.vars.grid, this.vars.gridId - 1) - 1
        );
        if (this.toNumber(this.stage.vars.theme) === 4) {
          if (this.toString(this.vars.type) === "grass") {
            this.vars.type = "checkerboard";
          } else {
            if (this.toString(this.vars.type) === "dirt") {
              this.vars.type = "tile";
            }
          }
        } else {
          if (this.toNumber(this.stage.vars.theme) === 3) {
            if (this.toString(this.vars.type) === "grass") {
              this.vars.type = "rug";
            }
            if (this.toString(this.vars.type) === "dirt") {
              this.vars.type = "carpet";
            }
          } else {
            if (this.toNumber(this.stage.vars.theme) === 2) {
              if (this.toString(this.vars.type) === "grass") {
                this.vars.type = "plank";
              }
              if (this.toString(this.vars.type) === "dirt") {
                this.vars.type = "wood";
              }
            } else {
              null;
            }
          }
        }
        if (this.arrayIncludes(this.stage.vars.collideable, this.vars.type)) {
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

  *setupNewGrid(height, width) {
    this.stage.vars.grid = [];
    for (let i = 0; i < this.toNumber(height) * this.toNumber(width); i++) {
      this.stage.vars.grid.push(1);
    }
  }

  *processClick() {
    this.vars.temp =
      this.indexInArray(
        this.stage.vars.toolsInLevel,
        this.stage.vars.selectedBrush
      ) + 1;
    if (
      this.toNumber(
        this.itemOf(this.stage.vars.toolCounts, this.vars.temp - 1)
      ) === 0 &&
      this.compare(this.stage.vars.editor, 2) < 0
    ) {
      this.stage.vars.failedToSelect = this.stage.vars.selectedBrush;
      this.stage.vars.selectedBrush = "";
    } else {
      if (
        !(
          this.toNumber(
            this.itemOf(this.stage.vars.restricted, this.vars.gridId - 1)
          ) === 1
        ) ||
        this.toNumber(this.stage.vars.editor) === 2
      ) {
        if (
          !(
            this.compare(
              this.itemOf(this.stage.vars.grid, this.vars.gridId - 1),
              this.stage.vars.selectedBrush
            ) === 0
          )
        ) {
          if (
            !(
              this.toNumber(this.sprites["Overlay"].vars.scrolling) === 1 ||
              this.toNumber(this.sprites["Brush"].vars.touchingTool) === 1 ||
              this.toNumber(this.sprites["ToolbarArrow"].vars.touching) === 1
            ) &&
            this.toString(this.sprites["Overlay"].vars.touchingMouse) ===
              "false"
          ) {
            if (
              this.toNumber(this.stage.vars.selectedBrush) === 4 ||
              this.toNumber(this.stage.vars.selectedBrush) === 10
            ) {
              if (
                !this.arrayIncludes(
                  this.stage.vars.collideable,
                  this.itemOf(
                    this.stage.vars.tileNames,
                    this.itemOf(
                      this.stage.vars.grid,
                      this.toNumber(this.vars.gridId) -
                        this.toNumber(this.stage.vars.worldWidth) -
                        1
                    ) - 1
                  )
                )
              ) {
                return;
              }
            }
            this.stage.vars.toolCounts.splice(
              this.vars.temp - 1,
              1,
              this.toNumber(
                this.itemOf(this.stage.vars.toolCounts, this.vars.temp - 1)
              ) - 1
            );
            this.vars.temp =
              this.indexInArray(
                this.stage.vars.toolsInLevel,
                this.itemOf(this.stage.vars.grid, this.vars.gridId - 1)
              ) + 1;
            this.stage.vars.toolCounts.splice(
              this.vars.temp - 1,
              1,
              this.toNumber(
                this.itemOf(this.stage.vars.toolCounts, this.vars.temp - 1)
              ) + 1
            );
            this.stage.vars.grid.splice(
              this.vars.gridId - 1,
              1,
              this.stage.vars.selectedBrush
            );
            if (
              this.toNumber(
                this.itemOf(this.stage.vars.toolCounts, this.vars.temp - 1)
              ) === 0
            ) {
              this.stage.vars.selectedBrush = "";
            }
          }
        }
      }
    }
  }

  *tickEdit() {
    if (this.compare(this.stage.vars.editor, 0) > 0) {
      if (this.touching("mouse")) {
        this.stage.vars.roundMouseX = this.x;
        this.stage.vars.roundMouseY = this.y;
        this.stage.vars.mouseGrid = this.vars.gridId;
        if (this.toString(this.stage.vars.moveMode) === "move") {
          if (!this.mouse.down) {
            this.warp(this.processClick)();
          }
        } else {
          if (
            this.toNumber(this.stage.vars.clickTime) === 1 &&
            !(this.toNumber(this.stage.vars.selectedBrush) === 1)
          ) {
            this.warp(this.checkToMove)();
          } else {
            if (this.compare(this.stage.vars.selectedBrush, "") > 0) {
              if (
                this.toString(this.stage.vars.moveMode) === "drag" &&
                this.compare(this.stage.vars.editor, 2) < 0
              ) {
                if (!this.mouse.down) {
                  this.warp(this.processClick)();
                }
              } else {
                if (this.mouse.down) {
                  this.warp(this.processClick)();
                }
              }
            }
          }
        }
      }
    }
  }

  *startAsClone() {
    this.vars.clone = 1;
    this.visible = true;
    if (this.toNumber(this.itemOf(this.stage.vars.settings, 2)) === 1) {
      this.costume = "big";
      this.y += -3 * (this.toNumber(this.stage.vars.zoom) / 100);
      this.costume = this.vars.type;
      yield* this.blendTile();
      this.effects.brightness = -100;
      this.effects.ghost = 50;
      this.stamp();
      this.y += 3 * (this.toNumber(this.stage.vars.zoom) / 100);
    }
    this.effects.clear();
    this.costume = this.vars.type;
    yield* this.blendTile();
  }

  *whenIReceiveClear() {
    this.clearPen();
    this.deleteThisClone();
  }

  *saveAsLevel(level) {
    this.vars.string = "";
    this.vars.i = 0;
    for (let i = 0; i < this.stage.vars.grid.length; i++) {
      this.vars.i++;
      this.vars.string =
        this.toString(this.vars.string) +
        this.toString(this.itemOf(this.stage.vars.grid, this.vars.i - 1));
    }
    if (this.compare(level, this.stage.vars.levels.length) > 0) {
      this.stage.vars.levels.push(this.vars.string);
    } else {
      this.stage.vars.levels.splice(level - 1, 1, this.vars.string);
    }
  }

  *loadLevel(level) {
    this.stage.vars.grid = [];
    this.stage.vars.restricted = [];
    this.vars.i = -1;
    for (
      let i = 0;
      i < this.itemOf(this.stage.vars.levels, level - 1).length / 2;
      i++
    ) {
      this.vars.i += 2;
      this.vars.type =
        this.letterOf(
          this.itemOf(this.stage.vars.levels, level - 1),
          this.vars.i - 1
        ) +
        this.letterOf(
          this.itemOf(this.stage.vars.levels, level - 1),
          this.toNumber(this.vars.i)
        );
      this.stage.vars.grid.push(this.vars.type);
      if (this.toNumber(this.vars.type) === 1) {
        this.stage.vars.restricted.push(0);
      } else {
        this.stage.vars.restricted.push(1);
      }
    }
    this.stage.vars.worldHeight = this.itemOf(
      this.stage.vars.levelHeights,
      level - 1
    );
    this.stage.vars.worldWidth = this.itemOf(
      this.stage.vars.levelWidths,
      level - 1
    );
    this.stage.vars.zoom =
      (480 / this.toNumber(this.stage.vars.worldWidth) / 32) * 100;
    this.stage.vars.tileWidth =
      32 * (this.toNumber(this.stage.vars.zoom) / 100);
    this.stage.vars.worldYOffset =
      (360 -
        this.toNumber(this.stage.vars.worldHeight) *
          this.toNumber(this.stage.vars.tileWidth)) /
      2;
    this.stage.vars.toolsInLevel = [];
    this.stage.vars.toolCounts = [];
    this.stage.vars.toolsInLevel.push(1);
    this.stage.vars.toolCounts.push("");
    this.vars.i = -3;
    for (
      let i = 0;
      i < this.itemOf(this.stage.vars.toolsInLevels, level - 1).length / 4;
      i++
    ) {
      this.vars.i += 4;
      this.stage.vars.toolCounts.push(
        0 +
          this.toNumber(
            this.letterOf(
              this.itemOf(this.stage.vars.toolsInLevels, level - 1),
              this.vars.i - 1
            ) +
              this.letterOf(
                this.itemOf(this.stage.vars.toolsInLevels, level - 1),
                this.toNumber(this.vars.i)
              )
          )
      );
      this.stage.vars.toolsInLevel.push(
        this.letterOf(
          this.itemOf(this.stage.vars.toolsInLevels, level - 1),
          this.toNumber(this.vars.i) + 1
        ) +
          this.letterOf(
            this.itemOf(this.stage.vars.toolsInLevels, level - 1),
            this.toNumber(this.vars.i) + 2
          )
      );
    }
  }

  *whenKeyRPressed() {
    if (
      this.toNumber(this.stage.vars.complete) === 0 &&
      this.toNumber(this.stage.vars.started) === 1
    ) {
      this.stage.vars.editor = 1;
      this.broadcast("Reset");
    }
  }

  *findGridIdFor(column, row) {
    this.vars.gridId =
      (this.toNumber(row) - 1) * this.toNumber(this.stage.vars.worldWidth) +
      this.toNumber(column);
  }

  *whenIReceiveNextLevel() {
    if (!null) {
      this.deleteThisClone();
    }
    this.stage.vars.complete = 0;
    this.stage.vars.level++;
    if (
      this.compare(this.stage.vars.level, this.stage.vars.levels.length) > 0
    ) {
      /* TODO: Implement stop all */ null;
    }
    yield* this.loadLevel(this.stage.vars.level);
    this.stage.vars.editor = 1;
    this.broadcast("Reset");
  }

  *whenIReceiveReset() {
    while (true) {
      while (!!this.keyPressed("space")) {
        yield;
      }
      while (!this.keyPressed("space")) {
        yield;
      }
      if (this.toNumber(this.stage.vars.editor) === 1) {
        this.stage.vars.editor = 0;
        this.broadcast("GO");
        return;
      }
      if (this.toNumber(this.stage.vars.editor) === 2) {
        this.stage.vars.editor = 1;
      }
      yield;
    }
  }

  *blendTile() {
    this.vars.tilesInDirections = [];
    this.warp(this.checkForOffset)(this.stage.vars.worldWidth);
    this.warp(this.checkForOffset)(1);
    this.warp(this.checkForOffset)(
      0 - this.toNumber(this.stage.vars.worldWidth)
    );
    this.warp(this.checkForOffset)(-1);
    this.vars.temp =
      this.toString(this.itemOf(this.vars.tilesInDirections, 0)) +
      this.toString(this.itemOf(this.vars.tilesInDirections, 1));
    this.vars.temp =
      this.toString(this.vars.temp) +
      (this.toString(this.itemOf(this.vars.tilesInDirections, 2)) +
        this.toString(this.itemOf(this.vars.tilesInDirections, 3)));
    this.costume =
      this.toString(this.vars.type) + this.toString(this.vars.temp);
  }

  *checkForOffset(gridOffset) {
    this.vars.temp = this.itemOf(
      this.stage.vars.tileNames,
      this.itemOf(
        this.stage.vars.grid,
        this.toNumber(this.vars.gridId) + this.toNumber(gridOffset) - 1
      ) - 1
    );
    this.vars.tilesInDirections.push(
      0 +
        this.toNumber(
          this.arrayIncludes(this.stage.vars.collideable, this.vars.temp) ||
            this.toNumber(this.vars.temp) === 0
        )
    );
  }

  *whenIReceiveGameStart() {
    this.visible = false;
    this.stage.vars.editor = 1;
    yield* this.loadLevel(this.stage.vars.level);
    while (true) {
      this.broadcast("Clear");
      this.broadcast("Update Mouse");
      this.broadcast("Render Tiles");
      this.broadcast("Update Player");
      yield;
    }
  }

  *whenKeyEPressed() {}

  *whenIReceiveUpdateMouse() {
    if (this.toNumber(this.vars.clone) === 0) {
      if (this.mouse.down) {
        this.stage.vars.clickTime++;
      } else {
        this.stage.vars.clickTime = 0;
      }
    }
  }

  *checkToMove() {
    if (this.toNumber(this.stage.vars.editor) === 2) {
      return;
    }
    if (this.toString(this.sprites["Overlay"].vars.touchingMouse) === "false") {
      if (
        this.compare(
          this.itemOf(this.stage.vars.grid, this.vars.gridId - 1),
          1
        ) > 0 &&
        this.compare(
          this.itemOf(this.stage.vars.restricted, this.vars.gridId - 1),
          1
        ) < 0
      ) {
        this.stage.vars.moveMode = "move";
        this.stage.vars.selectedBrush = this.itemOf(
          this.stage.vars.grid,
          this.vars.gridId - 1
        );
        this.stage.vars.grid.splice(this.vars.gridId - 1, 1, 1);
        this.vars.temp =
          this.indexInArray(
            this.stage.vars.toolsInLevel,
            this.stage.vars.selectedBrush
          ) + 1;
        this.stage.vars.toolCounts.splice(
          this.vars.temp - 1,
          1,
          this.toNumber(
            this.itemOf(this.stage.vars.toolCounts, this.vars.temp - 1)
          ) + 1
        );
      }
    }
  }

  *switchLevels(level1, level2) {
    this.vars.temp = this.itemOf(this.stage.vars.levels, level1 - 1);
    this.stage.vars.levels.splice(
      level1 - 1,
      1,
      this.itemOf(this.stage.vars.levels, level2 - 1)
    );
    this.stage.vars.levels.splice(level2 - 1, 1, this.vars.temp);
    this.vars.temp = this.itemOf(this.stage.vars.levelHeights, level1 - 1);
    this.stage.vars.levelHeights.splice(
      level1 - 1,
      1,
      this.itemOf(this.stage.vars.levelHeights, level2 - 1)
    );
    this.stage.vars.levelHeights.splice(level2 - 1, 1, this.vars.temp);
    this.vars.temp = this.itemOf(this.stage.vars.levelWidths, level1 - 1);
    this.stage.vars.levelWidths.splice(
      level1 - 1,
      1,
      this.itemOf(this.stage.vars.levelWidths, level2 - 1)
    );
    this.stage.vars.levelWidths.splice(level2 - 1, 1, this.vars.temp);
    this.vars.temp = this.itemOf(
      this.stage.vars.spawnPositions,
      this.toNumber(level1) * 2 - 1
    );
    this.stage.vars.spawnPositions.splice(
      this.toNumber(level1) * 2 - 1,
      1,
      this.itemOf(this.stage.vars.spawnPositions, this.toNumber(level2) * 2 - 1)
    );
    this.stage.vars.spawnPositions.splice(
      this.toNumber(level2) * 2 - 1,
      1,
      this.vars.temp
    );
    this.vars.temp = this.itemOf(
      this.stage.vars.spawnPositions,
      this.toNumber(level1) * 2 - 2
    );
    this.stage.vars.spawnPositions.splice(
      this.toNumber(level1) * 2 - 2,
      1,
      this.itemOf(this.stage.vars.spawnPositions, this.toNumber(level2) * 2 - 2)
    );
    this.stage.vars.spawnPositions.splice(
      this.toNumber(level2) * 2 - 2,
      1,
      this.vars.temp
    );
    this.vars.temp = this.itemOf(this.stage.vars.toolsInLevels, level1 - 1);
    this.stage.vars.toolsInLevels.splice(
      level1 - 1,
      1,
      this.itemOf(this.stage.vars.toolsInLevels, level2 - 1)
    );
    this.stage.vars.toolsInLevels.splice(level2 - 1, 1, this.vars.temp);
  }

  *whenIReceiveResetLevel() {
    if (!null) {
      this.deleteThisClone();
    }
    yield* this.loadLevel(this.stage.vars.level);
    this.stage.vars.editor = 1;
  }

  *insertLevelAt(level, target) {
    this.vars.i = 0;
    for (let i = 0; i < this.toNumber(level) - this.toNumber(target); i++) {
      this.warp(this.switchLevels)(
        level,
        this.toNumber(target) + this.toNumber(this.vars.i)
      );
      this.vars.i++;
    }
  }

  *whenIReceiveStartGameFromLevel() {
    yield* this.loadGameFromLevel();
  }

  *loadGameFromLevel() {
    if (!null) {
      this.deleteThisClone();
    }
    this.warp(this.loadLevel)(this.stage.vars.level);
  }

  *whenIReceiveGreenFlag() {
    this.vars.clone = 0;
    /* TODO: Implement stop other scripts in sprite */ null;
    if (!null) {
      this.deleteThisClone();
    }
    this.visible = false;
    while (true) {
      this.broadcast("Update Mouse");
      yield;
    }
  }

  *whenIReceiveSaveGame() {
    if (this.toNumber(this.vars.clone) === 0) {
      this.stage.vars.saveGame = [];
      if (this.toNumber(this.stage.vars.saveGame2) === 0) {
        this.stage.vars.saveGame.push(
          this.itemOf(
            this.stage.vars.levelsPrefixes,
            this.stage.vars.farthestLevel - 1
          )
        );
        this.stage.watchers.saveGame.visible = true;
        this.stage.vars.saveGame2 = 1;
      } else {
        this.stage.watchers.saveGame.visible = false;
        this.stage.vars.saveGame2 = 0;
      }
    }
  }
}
