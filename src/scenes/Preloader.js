/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';
import StarterKeys from '../consts/StarterKeys';
import blueButton2 from '../assets/ui/blue_button02.png';
import blueButton3 from '../assets/ui/blue_button03.png';
import bgRepeat from '../assets/house/bg_repeat_340x640.png';
import rocketMouse from '../assets/characters/rocket-mouse.png';
import rocketMouseJson from '../assets/characters/rocket-mouse.json';
import mouseHole from '../assets/house/object_mousehole.png';
import window1 from '../assets/house/object_window1.png';
import window2 from '../assets/house/object_window2.png';
import bookCase1 from '../assets/house/object_bookcase1.png';
import bookCase2 from '../assets/house/object_bookcase2.png';
import laserEnd from '../assets/house/object_laser_end.png';
import laserMiddle from '../assets/house/object_laser.png';
import objectCoin from '../assets/house/object_coin.png';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(TextureKeys.Background, bgRepeat);

    this.load.image(
      TextureKeys.MouseHole,
      mouseHole,
    );

    this.load.image(TextureKeys.Window1, window1);
    this.load.image(TextureKeys.Window2, window2);

    this.load.image(TextureKeys.Bookcase1, bookCase1);
    this.load.image(TextureKeys.Bookcase2, bookCase2);

    this.load.atlas(
      TextureKeys.RocketMouse,
      rocketMouse,
      rocketMouseJson,
    );

    this.load.image(TextureKeys.LaserEnd, laserEnd);
    this.load.image(TextureKeys.LaserMiddle, laserMiddle);

    this.load.image(TextureKeys.Coin, objectCoin);

    this.load.image(StarterKeys.BlueButton2, blueButton2);
    this.load.image(StarterKeys.BlueButton3, blueButton3);
  }

  create() {
    this.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.RocketMouseFall,
      frames: [{
        key: TextureKeys.RocketMouse,
        frame: 'rocketmouse_fall01.png',
      }],
    });

    this.anims.create({
      key: AnimationKeys.RocketMouseFly,
      frames: [{
        key: TextureKeys.RocketMouse,
        frame: 'rocketmouse_fly01.png',
      }],
    });

    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.RocketMouseDead,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_dead',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 10,
    });

    this.scene.start(SceneKeys.Game);
  }
}
