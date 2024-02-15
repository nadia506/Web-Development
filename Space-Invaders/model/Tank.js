import Sprite from "./Sprite.js";
import Missile from "./Missile.js";
import Invader from "./Invader.js";

class Tank extends Sprite {
  constructor(
    x,
    y,
    width,
    height,
    dx,
    dy,
    img,
    shootAudio,
    explosionAudio,
    bulletImg,
    invaderImg,
    canvasWidth,
    canvasHeight,
    invaders
  ) {
    super(x, y, width, height, dx, dy, img);
    this.shootAudio = shootAudio;
    this.sxplosionAudio = explosionAudio;
    this.bulletImg = bulletImg;
    this.invaderImg = invaderImg;
    this.missiles = [];
    this.invaders = invaders;
    this.score = 0;
    this.missileCount = 10;
    this.displacement = 3;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
    document.addEventListener("keypress", this.shoot.bind(this));
    setInterval(this.counter.bind(this), 500);
  }
  counter() {
    if (this.missileCount < 10) {
      this.missileCount++;
    }
  }

  keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = this.displacement;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = -this.displacement;
    }
  }
  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = 0;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = 0;
    }
  }

  shoot(e) {
    if (this.missileCount > 0 && e.key === " ") {
      var missile = new Missile(this.x, this.y, this.bulletImg);
      this.missiles.push(missile);
      this.missileCount--;
    }
  }

  move(canvasWidth) {
    super.move();
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > canvasWidth) {
      this.x = canvasWidth - this.width;
    }
  }
}

export default Tank;
