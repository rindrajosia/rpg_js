/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import Preloader from '../scenes/Preloader';
import Game from '../scenes/Game';
import BootScene from '../scenes/BootScene';
import PreloaderScene from '../scenes/PreloaderScene';
import TitleScene from '../scenes/TitleScene';
import PlayerScene from '../scenes/PlayerScene';
import OptionsScene from '../scenes/OptionsScene';
import LeaderBoardScene from '../scenes/LeaderBoardScene';
import GameOver from '../scenes/GameOver';
import SceneKeys from '../consts/SceneKeys';

const config = {
  parent: SceneKeys.PlayerScene,
  dom: {
    createContainer: true,
  },
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
  scene: [BootScene, PreloaderScene,
    TitleScene, PlayerScene, OptionsScene,
    LeaderBoardScene, Preloader, Game, GameOver],
};

export default config;
