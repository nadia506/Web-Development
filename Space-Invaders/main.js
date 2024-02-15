import Game from "./model/Game.js";
import "./style.css";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (game.continue() === true) {
    game.draw(ctx);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.redraw(ctx);
  }
  window.requestAnimationFrame(draw);
}
draw();
