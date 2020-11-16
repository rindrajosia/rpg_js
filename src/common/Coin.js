/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';

export default class Coin {
  constructor(Game) {
    this.game = Game;
  }

  createCoin() {
    return this.game.physics.add.staticGroup();
  }


  spawnCoins(coins) {
    coins.children.each(child => {
      const coin = child;
      coins.killAndHide(coin);
      coin.body.enable = false;
    });

    const { scrollX } = this.game.cameras.main;
    const rightEdge = scrollX + this.game.scale.width;

    let x = rightEdge + 100;
    const numCoins = Phaser.Math.Between(1, 20);
    for (let i = 0; i < numCoins; i += 1) {
      const coin = coins.get(
        x,
        Phaser.Math.Between(100, this.game.scale.height - 100),
        TextureKeys.Coin,
      );
      coin.setVisible(true);
      coin.setActive(true);

      const { body } = coin;
      body.setCircle(body.width * 0.5);
      body.enable = true;
      body.updateFromGameObject();

      x += coin.width * 1.5;
    }
  }

  avoidOverLapCoinLaser(obj1, obj2) {
    this.coins.killAndHide(obj2);
    obj2.body.enable = false;
  }

  teleportBackwards(mouse, mouseHole, wds, bookcases, laser, coins) {
    const { scrollX } = this.game.cameras.main;
    const maxX = 2380;
    if (scrollX > maxX) {
      mouse.x -= maxX;
      mouseHole.createHole().x -= maxX;

      wds.forEach(win => {
        win.x -= maxX;
      });

      bookcases.forEach(bc => {
        bc.x -= maxX;
      });

      laser.x -= maxX;
      const laserBody = laser.body;
      laserBody.x -= maxX;

      this.spawnCoins(coins);

      coins.children.each(child => {
        const coin = child;
        if (!coin.active) {
          return;
        }
        coin.x -= maxX;
        const { body } = coin;
        body.updateFromGameObject();
      });
    }
  }
}
