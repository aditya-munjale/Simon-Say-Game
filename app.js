let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highestScore = localStorage.getItem(`highestScore`) || 0;

let h2 = document.querySelector("h2");
let scoreDisplay = document.querySelector("#highestScore");
let btns = ["red", "yellow", "green", "purple"];

scoreDisplay.innerText = `Highest score : ${highestScore}`;

//1]
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
  }

  levelUp();
});

//3]
function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 200);
}

//3]
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

//2]
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3) + 1;
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);

  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}

//6]
function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 300);
    }
  } else {
    h2.innerHTML = `Game over! <b>Your score was ${level}</b> <br> Press any key to start game`;
    document.querySelector("body").style.backgroundColor = "red";

    if (level > highestScore) {
      highestScore = level;
      localStorage.setItem("Highest score", highestScore);
      scoreDisplay.innerText = `Highest score : ${highestScore}`;
    }

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

//4]
function btnPress() {
  let btn = this; // this return the button color
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  console.log(userColor);

  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
