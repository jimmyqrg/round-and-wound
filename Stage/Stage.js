/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [
      new Sound("from-pixaby", "./Stage/sounds/from-pixaby.mp3"),
      new Sound(
        "game-music-player-console-8bit-b",
        "./Stage/sounds/game-music-player-console-8bit-b.mp3"
      ),
      new Sound(
        "pixel-dreams-259187",
        "./Stage/sounds/pixel-dreams-259187.mp3"
      ),
      new Sound("8-bit-219384", "./Stage/sounds/8-bit-219384.mp3"),
      new Sound(
        "sawsquarenoise-OST-07-Lets-Rest",
        "./Stage/sounds/sawsquarenoise-OST-07-Lets-Rest.mp3"
      ),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Play Music after settings" },
        this.whenIReceivePlayMusicAfterSettings
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Green Flag" },
        this.whenIReceiveGreenFlag
      ),
      new Trigger(
        Trigger.TIMER_GREATER_THAN,
        {
          VALUE: () =>
            this.timer - this.toNumber(this.toNumber(this.vars.theme) === 1),
        },
        this.whengreaterthan
      ),
      new Trigger(
        Trigger.TIMER_GREATER_THAN,
        {
          VALUE: () =>
            this.timer - this.toNumber(this.toNumber(this.vars.theme) === 2),
        },
        this.whengreaterthan2
      ),
      new Trigger(
        Trigger.TIMER_GREATER_THAN,
        {
          VALUE: () =>
            this.timer - this.toNumber(this.toNumber(this.vars.theme) === 3),
        },
        this.whengreaterthan3
      ),
      new Trigger(
        Trigger.TIMER_GREATER_THAN,
        {
          VALUE: () =>
            this.timer - this.toNumber(this.toNumber(this.vars.theme) === 4),
        },
        this.whengreaterthan4
      ),
    ];

    this.vars.worldWidth = 15;
    this.vars.worldHeight = 12;
    this.vars.selectedBrush = 10;
    this.vars.editor = 1;
    this.vars.playerXVel = 0;
    this.vars.playerYVel = 0;
    this.vars.playerDirX = 1;
    this.vars.roundMouseX = -192;
    this.vars.roundMouseY = 176;
    this.vars.coins = 0;
    this.vars.level = 4;
    this.vars.complete = 0;
    this.vars.zoom = 100;
    this.vars.tileWidth = 32;
    this.vars.worldYOffset = -12;
    this.vars.coinsRequired = 2;
    this.vars.running = 0;
    this.vars.frame = 445841;
    this.vars.moveMode = "click";
    this.vars.failedToSelect = 0;
    this.vars.started = 0;
    this.vars.springFrame = 0;
    this.vars.springAnimating = 0;
    this.vars.miniSpringAnimating = 0;
    this.vars.miniSpringFrame = 0;
    this.vars.clickTime = 0;
    this.vars.mouseGrid = 167;
    this.vars.up = 1;
    this.vars.levelScroll = 0.000002127603878441217;
    this.vars.targetScroll = 0;
    this.vars.farthestLevel = 22;
    this.vars.hintTyp = 0;
    this.vars.dash = 0;
    this.vars.dashY = -36;
    this.vars.toolScrollY = 0;
    this.vars.toolsShown = 5;
    this.vars.toolbarMode = "regular";
    this.vars.toolbarMovementSpeed = 5;
    this.vars.toolScrollX = 0;
    this.vars.page = 0;
    this.vars.Cloud =
      "10252110341427443645420237371110281610221412241314270818231518231829341512171428282527242018231646292202373713281710132432121829343945390136124625271828221224131428460136122825181314271124291314310136";
    this.vars.theme = 0;
    this.vars.saveGame2 = 0;
    this.vars.grid = [
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 3, 3, 3, 3, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 1, 1, 3,
      3, 3, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 3, 3, 3, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 3, 3, 3, 1, 1, 1,
      1, 1, 1, 1, 7, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3,
    ];
    this.vars.tileNames = [
      "blank",
      "grass",
      "dirt",
      "spring",
      "left",
      "right",
      "coin",
      "flag",
      "spike",
      "mini-spring",
      "enemy",
      "enemy-hit",
      "flip",
      "dash-right",
      "dash-left",
    ];
    this.vars.collideable = [
      "grass",
      "dirt",
      "plank",
      "wood",
      "carpet",
      "rug",
      "checkerboard",
      "tile",
    ];
    this.vars.actionTiles = [
      "spring",
      "left",
      "right",
      "coin",
      "flag",
      "spike",
      "mini-spring",
      "enemy",
      "flip",
      "dash-right",
      "dash-left",
    ];
    this.vars.levels = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    this.vars.collected = [];
    this.vars.restricted = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1,
      1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
    ];
    this.vars.levelHeights = [
      12, 12, 12, 12, 12, 12, 16, 16, 16, 16, 12, 12, 16, 16, 16, 16, 12, 16,
      16, 16, 16, 16,
    ];
    this.vars.levelWidths = [
      15, 15, 15, 15, 15, 15, 20, 20, 20, 20, 15, 15, 20, 20, 20, 20, 15, 20,
      20, 20, 20, 20,
    ];
    this.vars.settings = [1, 1, 1, 1, 1, 1];
    this.vars.enemies = ["enemy"];
    this.vars.toolsInLevel = [1, 4, 10, 5, 6];
    this.vars.toolCounts = [0, 1, 1, 1, 1];
    this.vars.toolsInLevels = [
      10401050106,
      204011001050106,
      10401050106,
      104011001050106,
      20501060104,
      205020601040110,
      304011002050106,
      304011002050106,
      30401050106,
      204011002050206,
      104011001050106,
      104031001050106,
      204021001050106,
      504031004050506,
      "01040110020502060213",
      "01040510020502060413",
      "010401100105010601140115",
      "030402100105010602140115",
      "020602050304021004130114",
      "03050306041002130215",
      "0205020602100104021301140115",
      "0405040604100204021301140215",
    ];
    this.vars.newParticles = [];
    this.vars.activated = [];
    this.vars.spawnPositions = [
      -80, -100, -80, -100, -80, -100, -85, -100, -80, -105, -80, -105, -80,
      -105, -140, -10, -80, -105, -90, -105, -85, -100, -95, -100, -105, -105,
      -150, -100, -105, -105, -105, -105, -80, -100, -90, -105, -130, -110,
      -130, -110, -150, -110, -150, -110,
    ];
    this.vars.animationFrames = [0, 0, 0];
    this.vars.dashEffect = [];
    this.vars.CloudList = [
      "player9107",
      22,
      "asgamecoder",
      "infinity",
      "chessproking-tm",
      22,
      "shadowcity404",
      1,
      "-prismcodes-",
      1,
      "spiderbotdev",
      1,
    ];
    this.vars.saveGame = [14796];
    this.vars.levelsPrefixes = [
      45528, 39278, 56008, 87597, 83209, 92826, 22224, 41951, 85789, 16310,
      82435, 47614, 22002, 28416, 44112, 48665, 85271, 40616, 62092, 97173,
      50936, 14796, 83184, 48400,
    ];

    this.watchers.saveGame = new Watcher({
      label: "SAVE GAME",
      style: "normal",
      visible: false,
      value: () => this.vars.saveGame,
      x: 347,
      y: -22,
      width: 269,
      height: 68,
    });
  }

  *whenGreenFlagClicked() {
    this.vars.theme = 0;
    while (true) {
      if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 0) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 80;
        for (let i = 0; i < 25; i++) {
          this.audioEffects.pitch -= 4;
          this.audioEffects.volume -= 4;
          yield;
        }
        this.audioEffects.pitch = -100;
        this.audioEffects.volume = 0;
        this.stopAllSounds();
        /* TODO: Implement stop other scripts in sprite */ null;
        return;
      }
      yield;
    }
  }

  *whenIReceivePlayMusicAfterSettings() {
    /* TODO: Implement stop other scripts in sprite */ null;
    while (true) {
      if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 1) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 100;
        yield* this.playSoundUntilDone("from-pixaby");
      }
      yield;
    }
  }

  *whenIReceiveGreenFlag() {
    /* TODO: Implement stop other scripts in sprite */ null;
    while (true) {
      if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 1) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 100;
        yield* this.playSoundUntilDone("from-pixaby");
      }
      yield;
    }
  }

  *whengreaterthan() {
    if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 1) {
      yield* this.setUpMusic();
      while (true) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 20;
        yield* this.playSoundUntilDone("8-bit-219384");
        yield;
      }
    }
  }

  *whengreaterthan2() {
    if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 1) {
      yield* this.setUpMusic();
      while (true) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 25;
        yield* this.playSoundUntilDone("game-music-player-console-8bit-b");
        yield;
      }
    }
  }

  *whengreaterthan3() {
    if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 1) {
      yield* this.setUpMusic();
      while (true) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 30;
        yield* this.playSoundUntilDone("pixel-dreams-259187");
        yield;
      }
    }
  }

  *whengreaterthan4() {
    if (this.toNumber(this.itemOf(this.vars.settings, 1)) === 1) {
      yield* this.setUpMusic();
      while (true) {
        this.audioEffects.pitch = 0;
        this.audioEffects.volume = 25;
        yield* this.playSoundUntilDone("sawsquarenoise-OST-07-Lets-Rest");
        yield;
      }
    }
  }

  *setUpMusic() {
    this.audioEffects.pitch = 0;
    this.audioEffects.volume = 80;
    for (let i = 0; i < 25; i++) {
      this.audioEffects.pitch -= 4;
      this.audioEffects.volume -= 4;
      yield;
    }
    this.audioEffects.pitch = -100;
    this.audioEffects.volume = 0;
    this.stopAllSounds();
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
