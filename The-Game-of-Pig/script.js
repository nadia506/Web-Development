const holdBtn = document.getElementById("hold");
const rollBtn = document.getElementById("roll");
const turn = document.getElementById("result");
holdBtn.addEventListener("click", hold);
rollBtn.addEventListener("click", roll);

let player = 1;
let scoreBar = document.getElementById("p" + player + "-score");
let progressBar = document.getElementById("p" + player + "-hold");
let holdValue = 0;
let score1 = 0;
let score2 = 0;

function hold() {
  if (player === 1) {
    score1 += holdValue;
    holdValue = 0;
    progressBar.setAttribute("style", "width: " + 0 + "%");
    scoreBar.setAttribute("style", "width:" + score1 + "%");
    document.getElementById("p" + player + "-score").innerText = score1;
  } else {
    score2 += holdValue;
    holdValue = 0;
    progressBar.setAttribute("style", "width: " + 0 + "%");
    scoreBar.setAttribute("style", "width:" + score2 + "%");
    document.getElementById("p" + player + "-score").innerText = score2;
  }
  changeTurn();
}

function roll() {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  const output = "&#x268" + (faceValue - 1) + "; ";
  const die = document.getElementById("die");
  let tempScore;

  if (player === 1) {
    tempScore = score1;
  } else {
    tempScore = score2;
  }
  die.innerHTML = output;

  if (faceValue !== 1) {
    holdValue += faceValue;
    tempScore += holdValue;
    if (tempScore >= 100) {
      turn.innerHTML = "Player-" + player + " won!";
      holdBtn.setAttribute("disabled", true);
      rollBtn.setAttribute("disabled", true);
      scoreBar.setAttribute("class", "progress-bar bg-success");
      scoreBar.setAttribute("style", "width:" + 100 + "%");
      progressBar.setAttribute("class", "d-none");
      document.getElementById("p" + player + "-score").innerText = "100 🎉";
    }
    progressBar.setAttribute("style", "width:" + holdValue + "%");
    document.getElementById("p" + player + "-hold").innerText = holdValue;
  } else {
    holdValue = 0;
    progressBar.setAttribute("style", "width:" + holdValue + "%");
    changeTurn();
  }
}

function changeTurn() {
  if (player === 1) {
    player = 2;
    turn.innerHTML = "Player-2 turn!";
    scoreBar = document.getElementById("p" + player + "-score");
    progressBar = document.getElementById("p" + player + "-hold");
  } else {
    player = 1;
    turn.innerHTML = "Player-1 turn!";
    scoreBar = document.getElementById("p" + player + "-score");
    progressBar = document.getElementById("p" + player + "-hold");
  }
}
