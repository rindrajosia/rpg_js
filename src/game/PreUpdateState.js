import SceneKeys from '../consts/SceneKeys';
import AnimationKeys from '../consts/AnimationKeys';
import MouseState from '../consts/MouseState';

export default class PreUpdateState {
  constructor(rocketMouse) {
    this.rocketMouse = rocketMouse;
    this.cursors = this.rocketMouse.scene.input.keyboard.createCursorKeys();
  }

  running() {
    const { body } = this.rocketMouse;
    if (this.cursors.up?.isDown) {
      body.setAccelerationY(-600);
      this.rocketMouse.enableJetpack(true);
      this.rocketMouse.mouse.play(AnimationKeys.RocketMouseFly, true);
    } else if (this.cursors.down?.isDown) {
      body.setAccelerationY(600);
      this.rocketMouse.enableJetpack(true);
    } else if (this.cursors.left?.isDown && !body.blocked.down) {
      if (body.velocity.x > 250) {
        body.velocity.x -= 30;
        body.setAccelerationX(-200);
      }
      this.rocketMouse.enableJetpack(true);
    } else if (this.cursors.right?.isDown) {
      body.velocity.x += 30;
      body.setAccelerationX(200);
      this.rocketMouse.enableJetpack(true);
    } else {
      body.velocity.x = 250;
      body.setAccelerationX(100);
      body.setAccelerationY(0);
      this.rocketMouse.enableJetpack(false);
    }

    if (body.blocked.down) {
      this.rocketMouse.enableJetpack(false);
      this.rocketMouse.mouse.play(AnimationKeys.RocketMouseRun, true);
    } else if (body.velocity.y > 0) {
      this.rocketMouse.mouse.play(AnimationKeys.RocketMouseFall, true);
    }
  }

  kill() {
    this.rocketMouse.mouseState = MouseState.Killed;
    this.rocketMouse.mouse.play(AnimationKeys.RocketMouseDead);
    const { body } = this.rocketMouse;
    this.rocketMouse.enableJetpack(false);
    body.setAccelerationY(500);
    body.setAccelerationX(0);
    body.setVelocity(0, 500);
    this.dead();
  }

  dead() {
    this.rocketMouse.mouseState = MouseState.Dead;
    if (!this.rocketMouse.scene.scene.isActive(SceneKeys.GameOver)) {
      this.rocketMouse.body.setVelocity(0, 0);
      this.rocketMouse.scene.scene.run(SceneKeys.GameOver);
    }
  }

  preUpdate(state = this.rocketMouse.mouseState) {
    switch (state) {
      case MouseState.Running:
      {
        this.running();
        break;
      }
      default:
        break;
    }
  }
}
