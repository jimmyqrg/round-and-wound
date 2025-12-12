/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class _ extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cover2 copy", "./_/costumes/cover2 copy.png", {
        x: 480,
        y: 360,
      }),
    ];

    this.sounds = [];

    this.triggers = [];
  }
}
