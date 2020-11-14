import Phaser from 'phaser';
import bootLogo from '../assets/boot/zenva_logo.png';
import SceneKeys from '../consts/SceneKeys';
import StarterKeys from '../consts/StarterKeys';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.BootScene);
  }

  preload() {
    this.load.image(StarterKeys.BootLogo, bootLogo);
  }

  create() {
    this.scene.start(SceneKeys.PreloaderScene);
  }
}
