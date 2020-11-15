/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';
import RocketMouse from '../game/RocketMouse';
import LaserObstacle from '../game/LaserObstacle';
import PreUpdateState from '../game/PreUpdateState';
import Score from '../game/Score';
import Decoration from '../common/Decoration';
import Coin from '../common/Coin';


export default class Game extends Phaser.Scene {
  init() {
    this.bookcases = [];
    this.wds = [];
    this.laserObstacle = null;
    this.mouse = null;
    this.coins = null;
  }

  constructor() {
    super(SceneKeys.Game);
  }

  create() {
    Score.resetScore();
    const { width } = this.scale;
    const { height } = this.scale;
    this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);


    this.decoration = new Decoration(this);

    this.mouseHole = this.decoration.createHole(TextureKeys.MouseHole);

    this.window1 = this.decoration.createWindow(900, 1300, TextureKeys.Window1);

    this.window2 = this.decoration.createWindow(1600, 2000, TextureKeys.Window2);

    this.wds = [this.window1, this.window2];

    this.bookcase1 = this.decoration.createBookCase(2200, 2700, TextureKeys.Bookcase1);

    this.bookcase2 = this.decoration.createBookCase(2900, 3400, TextureKeys.Bookcase2);


    this.bookcases = [this.bookcase1, this.bookcase2];

    this.laserObstacle = new LaserObstacle(this, 900, 100);
    this.add.existing(this.laserObstacle);


    this.coinDecoration = new Coin(this);
    this.coins = this.coinDecoration.createCoin();
    this.coinDecoration.spawnCoins(this.coins);

    this.physics.add.overlap(
      this.laserObstacle,
      this.coins,
      this.coinDecoration.avoidOverLapCoinLaser,
      undefined,
      this,
    );


    this.mouse = new RocketMouse(this, width * 0.5, height - 30);
    this.add.existing(this.mouse);

    this.preUpdateState = new PreUpdateState(this.mouse);


    const { body } = this.mouse;
    body.setCollideWorldBounds(true);
    body.setVelocityX(250);

    this.physics.world.setBounds(
      0, 0,
      Number.MAX_SAFE_INTEGER, height - 55,
    );

    this.cameras.main.startFollow(this.mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.physics.add.overlap(
      this.laserObstacle,
      this.mouse,
      this.handleOverlapLaser,
      undefined,
      this,
    );


    this.labelScore = this.add.text(10, 10, `Score: ${Score.getScore()}`, {
      fontSize: 24,
      color: '#080808',
      backgroundColor: '#F8E71C',
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
    }).setScrollFactor(0);


    this.physics.add.overlap(
      this.mouse,
      this.coins,
      this.handleCollectCoin,
      undefined,
      this,
    );
  }

  update() {
    this.decoration.wrapMouseHole();
    this.decoration.wrapWindows(this.window1, this.window2, this.bookcases);
    this.decoration.wrapBookcases(this.bookcase1, this.bookcase2, this.wds);
    this.laserObstacle.wrapLaserObtacle();
    this.preUpdateState.preUpdate();
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.coinDecoration.teleportBackwards(this.mouse, this.decoration,
      this.wds, this.bookcases, this.laserObstacle, this.coins);
  }

  handleCollectCoin(obj1, obj2) {
    const coin = obj2;
    this.coins.killAndHide(coin);
    coin.body.enable = false;
    Score.incrementScore();
    this.labelScore.text = `Score: ${Score.getScore()}`;
  }

  handleOverlapLaser() {
    this.preUpdateState.kill();
    this.sys.game.globals.data = {
      user: this.sys.game.globals.player.getName(),
      score: Score.getScore(),
    };
  }
}
