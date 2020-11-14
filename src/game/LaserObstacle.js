/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.game = scene;

    const top = scene.add.image(0, 0, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0);

    const middle = scene.add.image(
      0,
      top.y + top.displayHeight,
      TextureKeys.LaserMiddle,
    )
      .setOrigin(0.5, 0);

    middle.setDisplaySize(middle.width, 130);

    const bottom = scene.add.image(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd)
      .setOrigin(0.5, 0)
      .setFlipY(true);

    this.add(top);
    this.add(middle);
    this.add(bottom);

    scene.physics.add.existing(this, true);
    const { body } = this;
    const width = top.displayWidth;
    const height = top.displayHeight + middle.displayHeight + bottom.displayHeight;
    body.setSize(width * 0.6, height * 0.9);
    body.setOffset(-width * 0.3, 16);
    body.position.x = this.x + body.offset.x;
    body.position.y = this.y + body.offset.y;
  }

  wrapLaserObtacle() {
    const { scrollX } = this.game.cameras.main;
    const rightEdge = scrollX + this.game.scale.width;


    const { body } = this.game.laserObstacle;

    const { width } = body;
    if (this.game.laserObstacle.x + width < scrollX) {
      this.game.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000,
      );
      this.game.laserObstacle.y = Phaser.Math.Between(0, 300);

      body.position.x = this.game.laserObstacle.x + body.offset.x;
      body.position.y = this.game.laserObstacle.y + body.offset.y;
    }
  }
}
