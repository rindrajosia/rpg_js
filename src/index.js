/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import config from './config/config';
import Model from './model/Model';
import Player from './model/Player';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = Model;
    const player = Player();
    this.globals = {
      model, bgMusic: null, player, data: null,
    };
  }
}


export default new Game();
