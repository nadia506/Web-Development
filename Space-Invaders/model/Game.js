import Tank from "./Tank.js";
import Invader from "./Invader.js";
const spaceshuttle_img = new Image(50, 50);
spaceshuttle_img.src = "./assets/tank.png";
const missile_audio = new Audio("./assets/shoot.wav");
const invader_audio = new Audio("./assets/explosion.wav");
const missiles_img = new Image();
missiles_img.src = "./assets/missile.png";
const invader_img = new Image();
invader_img.src = "./assets/invader.png";
const game_audio = new Audio("./assets/music.mpeg");
game_audio.loop = true;
let score = 0;
let gameover = false;

let invader = {};

let invaders = [];

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.gameStart = false;
    const tank = new Tank(
      this.canvas.width / 2 - 25,
      this.canvas.height - 60,
      50,
      50,
      0,
      0,
      spaceshuttle_img,
      missile_audio,
      invader_audio,
      missiles_img,
      invader_img,
      this.canvas.width,
      this.canvas.height,
      invaders
    );
    this.tank = tank;
    this.missileNum = tank.missileCount;
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        game_audio.play();
        this.gameStart = true;
      }
    });
    setInterval(this.invader.bind(this), Math.random() * (5000 - 3000) + 3000);
  }

  invader() {
    if (this.gameStart === true) {
      let invader_width = Math.floor(Math.random() * (450 - 60) - 0);
      let invader_speed = Math.floor(Math.random() * (5 - 1)) + 1;
      invader = new Invader(invader_width, 0, invader_img, invader_speed);
      invaders.push(invader);
    }
  }

  draw(ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "rgb(0, 149, 246)";
    ctx.fillText(`Invaders shot down: ${score}`, 10, 20);
    ctx.fillText(`Missiles remaining: ${this.tank.missileCount}`, 10, 40);
    this.tank.draw(ctx);
    this.tank.move(this.canvas.width);

    invaders.forEach((invader) => {
      invader.draw(ctx);
      invader.move();
      if (invader.hitBottom(this.canvas.height)) {
        invader_audio.play();
        gameover = true;
      }
      if (invader.colidesWithTank(this.tank)) {
        invader_audio.play();
        gameover = true;
      }
    });

    this.tank.missiles.forEach(function (missile) {
      missile.draw(ctx);
      missile.move();
      if (missile.colides(invader)) {
        invader.visible = false;
        invader_audio.play();
        score++;
      }
    });
  }

  continue() {
    if (gameover === true) {
      game_audio.pause();
      return false;
    } else {
      return true;
    }
  }

  redraw(ctx) {
    (this.tank.x = this.canvas.width / 2 - 25),
      (this.tank.y = this.canvas.height - 60);
    this.tank.draw(ctx);
    ctx.fillText(`Invaders shot down: ${score}`, 10, 20);
    ctx.fillText(`Gameover!`, 10, 40);
  }
}
export default Game;
