/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import Phaser from 'phaser';

export default class Decoration {
  constructor(Game) {
    this.game = Game;
  }

  createHole(texture) {
    return this.game.add.image(
      Phaser.Math.Between(900, 1500),
      501,
      texture,
    );
  }

  createWindow(abs, ord, texture) {
    return this.game.add.image(
      Phaser.Math.Between(abs, ord),
      200,
      texture,
    );
  }

  createBookCase(abs, ord, texture) {
    return this.game.add.image(
      Phaser.Math.Between(abs, ord),
      580,
      texture,
    ).setOrigin(0.5, 1);
  }

  wrapMouseHole() {
    const { scrollX } = this.game.cameras.main;
    const rightEdge = scrollX + this.game.scale.width;
    if (this.createHole.x + this.createHole.width < scrollX) {
      this.createHole.x = Phaser.Math.Between(
        rightEdge + 100,
        rightEdge + 1000,
      );
    }
  }

  wrapWindows(win1, win2, bookcases) {
    const { scrollX } = this.game.cameras.main;
    const rightEdge = scrollX + this.game.scale.width;
    let width = win1.width * 2;
    if (win1.x + width < scrollX) {
      win1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800,
      );
      const olap = bookcases.find(bc => Math.abs(win1.x - bc.x) <= win1.width);

      win1.visible = !olap;
    }

    width = win2.width;
    if (win2.x + width < scrollX) {
      win2.x = Phaser.Math.Between(
        win1.x + width,
        win1.x + width + 800,
      );
      const olap = bookcases.find(bc => Math.abs(win2.x - bc.x) <= win2.width);

      win2.visible = !olap;
    }
  }

  wrapBookcases(book1, book2, windows) {
    const { scrollX } = this.game.cameras.main;
    const rightEdge = scrollX + this.game.scale.width;
    let width = book1.width * 2;
    if (book1.x + width < scrollX) {
      book1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800,
      );

      const olap = windows.find(win => Math.abs(book1.x - win.x) <= book1.width);
      book1.visible = !olap;
    }
    width = book2.width;
    if (book2.x + width < scrollX) {
      book2.x = Phaser.Math.Between(
        book1.x + width,
        book1.x + width + 800,
      );

      const olap = windows.find(win => Math.abs(book2.x - win.x) <= book2.width);
      book2.visible = !olap;
    }
  }
}
