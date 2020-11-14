import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import StarterKeys from '../consts/StarterKeys';
import Button from '../objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.OptionsScene);
  }

  preload() {

  }

  create() {
    this.model = this.sys.game.globals.model;
    this.getMusicOn = this.model.getMusicOn();

    this.text = this.add.text(300, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(200, 200, StarterKeys.CheckedBox);
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24 });


    this.musicButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.getMusicOn = !this.getMusicOn;
      this.model.setMusicOn(this.getMusicOn);
      this.updateAudio();
    });


    this.menuButton = new Button(this, 400, 500, StarterKeys.BlueButton2, StarterKeys.BlueButton3, 'Menu', SceneKeys.TitleScene);

    this.updateAudio();
  }

  updateAudio() {
    if (this.getMusicOn === false) {
      this.musicButton.setTexture(StarterKeys.Box);
      this.sys.game.globals.bgMusic.stop();
      this.model.setBgMusicPlaying(false);
    } else {
      this.musicButton.setTexture(StarterKeys.CheckedBox);
      if (this.model.getBgMusicPlaying() === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.setBgMusicPlaying(true);
      }
    }
  }
}
