/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import StarterKeys from '../consts/StarterKeys';
import Button from '../objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.TitleScene);
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }


  create() {
    this.gameButton = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 100, StarterKeys.BlueButton2, StarterKeys.BlueButton3, 'Play', SceneKeys.PlayerScene);

    this.optionsButton = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, StarterKeys.BlueButton2, StarterKeys.BlueButton3, 'Options', SceneKeys.OptionsScene);

    this.creditsButton = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 100, StarterKeys.BlueButton2, StarterKeys.BlueButton3, 'LeaderBoard', SceneKeys.LeaderBoardScene);


    this.model = this.sys.game.globals.model;
    this.musicOn = this.model.getMusicOn();
    this.bgMusicPlaying = this.model.getBgMusicPlaying();

    if (this.musicOn === true && this.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add(StarterKeys.BgMusic, { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.setBgMusicPlaying(true);
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
