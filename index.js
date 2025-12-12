import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import _ from "./_/_.js";
import Instructions from "./Instructions/Instructions.js";
import Cloud from "./Cloud/Cloud.js";
import TileSolid from "./TileSolid/TileSolid.js";
import TileAction from "./TileAction/TileAction.js";
import TileEnemyHit from "./TileEnemyHit/TileEnemyHit.js";
import Overlay from "./Overlay/Overlay.js";
import ToolbarArrow from "./ToolbarArrow/ToolbarArrow.js";
import Enemy from "./Enemy/Enemy.js";
import Brush from "./Brush/Brush.js";
import LevelComplete from "./LevelComplete/LevelComplete.js";
import Counter from "./Counter/Counter.js";
import Particles from "./Particles/Particles.js";
import DashEffect from "./DashEffect/DashEffect.js";
import Player from "./Player/Player.js";
import Play from "./Play/Play.js";
import Reset from "./Reset/Reset.js";
import Home from "./Home/Home.js";
import SaveGame from "./SaveGame/SaveGame.js";
import Levels from "./Levels/Levels.js";
import Arrows from "./Arrows/Arrows.js";
import Text from "./Text/Text.js";
import Hints from "./Hints/Hints.js";
import Menu from "./Menu/Menu.js";
import GreenFlag from "./GreenFlag/GreenFlag.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  _: new _({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 16,
  }),
  Instructions: new Instructions({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2,
  }),
  Cloud: new Cloud({
    x: 36,
    y: 28,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3,
  }),
  TileSolid: new TileSolid({
    x: -224,
    y: 208,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 1,
  }),
  TileAction: new TileAction({
    x: -224,
    y: 208,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 4,
  }),
  TileEnemyHit: new TileEnemyHit({
    x: -224,
    y: 208,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 5,
  }),
  Overlay: new Overlay({
    x: -9.485676320901356e-8,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 5,
    size: 100,
    visible: false,
    layerOrder: 20,
  }),
  ToolbarArrow: new ToolbarArrow({
    x: -184.00000009485677,
    y: 43,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 23,
  }),
  Enemy: new Enemy({
    x: -228,
    y: 182,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 10,
    size: 75,
    visible: false,
    layerOrder: 6,
  }),
  Brush: new Brush({
    x: -192,
    y: 176,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 11,
    size: 100,
    visible: false,
    layerOrder: 24,
  }),
  LevelComplete: new LevelComplete({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 18,
  }),
  Counter: new Counter({
    x: -180.00000007588542,
    y: -120,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 90,
    visible: false,
    layerOrder: 7,
  }),
  Particles: new Particles({
    x: 36,
    y: -12,
    direction: 0,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 8,
  }),
  DashEffect: new DashEffect({
    x: 5.2192713088787315,
    y: -18.288431514820555,
    direction: -90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 13,
  }),
  Player: new Player({
    x: -85,
    y: -100,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 19,
  }),
  Play: new Play({
    x: 220,
    y: -155,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 9,
  }),
  Reset: new Reset({
    x: -220,
    y: -155,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 10,
  }),
  Home: new Home({
    x: 220,
    y: 155,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 22,
  }),
  SaveGame: new SaveGame({
    x: 210,
    y: 155,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 21,
  }),
  Levels: new Levels({
    x: -100,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 25,
    size: 100,
    visible: false,
    layerOrder: 15,
  }),
  Arrows: new Arrows({
    x: 140,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 100,
    visible: false,
    layerOrder: 17,
  }),
  Text: new Text({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 14,
  }),
  Hints: new Hints({
    x: -165,
    y: -145,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 13,
    size: 100,
    visible: false,
    layerOrder: 12,
  }),
  Menu: new Menu({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 4,
    size: 100,
    visible: false,
    layerOrder: 11,
  }),
  GreenFlag: new GreenFlag({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 25,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
