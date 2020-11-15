/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import Score from '../game/Score';
import StarterKeys from '../consts/StarterKeys';
import Button from '../objects/Button';
import Api from '../controller/api';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.LeaderBoardScene);
  }

  create() {
    const COLOR_PRIMARY = 0x4e342e;
    const COLOR_DARK = 0x260e04;

    const loading = this.add.text(250, 50, 'Please waite ...', {
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
    });


    Api.getScores().then((response) => {
      loading.destroy();

      this.add.text(250, 50, 'LeaderBoard', {
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
      });

      const textArea = this.rexUI.add.textArea({
        x: 380,
        y: 300,
        width: 400,
        height: 350,
        background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
        text: this.rexUI.add.BBCodeText(),
        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
        },
      }).layout().drawBounds(this.add.graphics(), COLOR_DARK);
      const arr = [...response];
      textArea.setText(Score.allScore(arr));
    }).catch(() => {
      loading.destroy();
      this.add.text(265, 240, 'Problem to connect with API \n Try again later', { color: 'red', fontSize: '20px ' });
    });

    this.menuButton = new Button(this, 400, 550, StarterKeys.BlueButton2, StarterKeys.BlueButton3, 'Menu', SceneKeys.TitleScene);
  }
}
