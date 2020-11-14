/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import Api from '../controller/api';


export default class GameOver extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }

  create() {
    const { width, height } = this.scale;
    const x = width * 0.5;
    const y = height * 0.5;

    this.add.text(x, y, 'Press ENTER to Play Again', {
      fontSize: '32px',
      color: '#fff',
      backgroundColor: '#000000',
      shadow:
      {
        fill: true,
        blur: 0,
        offsetY: 0,
      },
      padding:
      {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
      },
    }).setOrigin(0.5);

    this.add.text(x, y * 0.5, 'Press SPACE to go to the menu page', {
      fontSize: '32px',
      color: '#fff',
      backgroundColor: '#000000',
      shadow:
      {
        fill: true,
        blur: 0,
        offsetY: 0,
      },
      padding:
      {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
      },
    }).setOrigin(0.5);


    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.stop(SceneKeys.GameOver);
      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.stop(SceneKeys.GameOver);
      this.scene.stop(SceneKeys.Game);
      Api.setScores(this.sys.game.globals.data);
      this.scene.start(SceneKeys.TitleScene);
    });
  }
}
