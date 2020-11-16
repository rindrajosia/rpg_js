/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';
import MouseState from '../consts/MouseState';

export default class RocketMouse extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.mouseState = MouseState.Running;

    this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(2, 1)
      .play(AnimationKeys.RocketMouseRun);

    this.flames = scene.add.sprite(-260, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);
    this.add(this.flames);
    this.add(this.mouse);

    scene.physics.add.existing(this);
    const { body } = this;
    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7);
    body.setOffset(this.mouse.width * -1.7, -this.mouse.height + 15);
  }

  enableJetpack(enabled) {
    this.flames.setVisible(enabled);
  }
}
