let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let h3 = document.querySelector("h3");
let btns = ["red", "yellow", "green", "purple"];

document.addEventListener("keypress", () => {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);

  let color = btn.getAttribute("id");
  gameSeq.push(color);
  console.log(gameSeq);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length == userSeq.length) {
      console.log("right ans");
      setTimeout(() => {
        levelUp();
      }, 1000);
    }
  } else {
    let audio = new Audio("gameover.mp3");3
    audio.play();
    h3.innerHTML = `<b>Game Over</b><br> Press again to start you level was ${level}`;
    document.querySelector("body").style.backgroundColor = "red";
    restart();
  }
}

function btnPress() {
  console.log("clicked btn");
  let btn = this;
  userFlash(btn);

  let touchColor = btn.getAttribute("id");
  userSeq.push(touchColor);
  console.log(userSeq);

  checkAns(userSeq.length - 1);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level: ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randCol = btns[randIdx];
  let randBtn = document.querySelector(`.${randCol}`);

  gameFlash(randBtn);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function restart() {
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}
  