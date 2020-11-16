/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import StarterKeys from '../consts/StarterKeys';
import blueButton2 from '../assets/ui/blue_button02.png';
import blueButton3 from '../assets/ui/blue_button03.png';
import greyBox from '../assets/ui/grey_box.png';
import blueBoxCheckmark from '../assets/ui/blue_boxCheckmark.png';
import phaserLogo from '../assets/logo.png';
import sound from '../assets/TownTheme.mp3';

export default class PreloaderScene extends Phaser.Scene {
  init() {
    this.readyCount = 0;
  }

  constructor() {
    super(SceneKeys.PreloaderScene);
  }

  preload() {
    this.add.image(400, 200, StarterKeys.BootLogo);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const loadingText = this.make.text({
      x: 400,
      y: 340,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: 400,
      y: 385,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: 400,
      y: 430,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xfff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image(StarterKeys.BlueButton2, blueButton2);
    this.load.image(StarterKeys.BlueButton3, blueButton3);
    this.load.image(StarterKeys.Logo, phaserLogo);
    this.load.image(StarterKeys.Box, greyBox);
    this.load.image(StarterKeys.CheckedBox, blueBoxCheckmark);
    this.load.audio(StarterKeys.BgMusic, sound);
  }

  ready() {
    this.scene.start(SceneKeys.TitleScene);
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start(SceneKeys.TitleScene);
    }
  }
}
