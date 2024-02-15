import Sprite from "./Sprite.js";
class Missile extends Sprite {
  constructor(x, y, img) {
    super(x + 15, y, 20, 20, 0, -5, img);
    this.visible = true;
    this.state = "active";
  }

  draw(ctx) {
    if (this.visible) {
      super.draw(ctx);
    }
  }
  move() {
    super.move();
    if (this.y <= 0) {
      this.visible = false;
      this.state = "inactive";
    }
  }
  colides(invader) {
    if (this.visible && this.intersects(invader)) {
      this.visible = false;
      return true;
    }
    return false;
  }
}

export default Missile;
