import Sprite from "./Sprite.js";

class Invader extends Sprite {
  constructor(x, y, img, invaderSpeed) {
    super(x, y, 50, 50, 0, invaderSpeed, img);
    this.visible = true;
    this.state = "active";
  }

  draw(ctx) {
    if (this.visible) {
      super.draw(ctx);
    }
  }

  move(canvasHeight) {
    super.move();
    let rand = Math.random();
    if (rand > 0.5) {
      this.dx = Math.sin(Math.random()) + 0.4;
    } else {
      this.dx = -(Math.sin(Math.random()) + 0.4);
    }
    if (this.y === canvasHeight) {
      this.visible = false;
      this.state = "inactive";
    }
  }
  colidesWithTank(tank) {
    if (this.visible && this.intersects(tank)) {
      return true;
    }
    return false;
  }
  hitBottom(canvasHeight) {
    if (this.y >= canvasHeight - 5 && this.visible === true) {
      return true;
    } else {
      return false;
    }
  }
}

export default Invader;
