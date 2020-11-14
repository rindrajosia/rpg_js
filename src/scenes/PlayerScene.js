/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import StarterKeys from '../consts/StarterKeys';
import Button from '../objects/Button';


export default class PlayerScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PlayerScene);
  }

  create() {
    this.add.text(250, 100, 'Enter your name', {
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

    const name = this.add.text(250, 200, 'Your name', {
      fixedWidth: 300,
      fixedHeight: 36,
      backgroundColor: '#696969',
      color: '#fff',
      fontSize: '18px',
      letterSpacing: '0.5ch',
      padding:
      {
        left: 15,
        right: 15,
        top: 10,
        bottom: 10,
      },
    });

    name.setInteractive().on('pointerdown', () => {
      console.log(name.text);
      if (name.text === 'Your name') {
        name.text = '';
      }
      this.rexUI.edit(name);
    });


    this.startButton = this.add.sprite(400, 450, StarterKeys.BlueButton2).setInteractive();
    this.startText = this.add.text(0, 0, 'Start', { fontSize: '24px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.startText, this.startButton);

    this.menuButton = new Button(this, 400, 550, StarterKeys.BlueButton2, StarterKeys.BlueButton3, 'Menu', SceneKeys.TitleScene);

    this.startButton.on('pointerdown', (pointer) => {
      if (name.text !== 'Your name' && name.text !== '') {
        this.sys.game.globals.player.setName(name.text);
        this.scene.start(SceneKeys.Preloader);
      } else {
        this.add.text(265, 240, 'Please enter your name', { color: 'red', fontSize: '20px ' });
      }
    });
  }
}
