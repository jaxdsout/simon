let sequence = [];
let userSequence = [];
let round = 0;
let level;

const start = document.querySelector('#start-dot');
const reset = document.querySelector("#reset-dot");
const slider = document.querySelector("#slider");
const buttonContainer = document.querySelector('.button-container');

slider.addEventListener("input", setLevel);
reset.addEventListener("click", resetGame)
start.addEventListener('click', startGame);

function disable () {
  buttonContainer.classList.add("disabled");
}
function enable () {
  buttonContainer.classList.remove("disabled")
}
disable();

function setLevel () {
  level = parseInt(slider.value);
  console.log(level)
}

function startGame() {
    start.disabled = true;
    slider.disabled = true;
    simonSays();
}

async function simonSays() {
  disable();
  round++;
  const progress = [...sequence];
  progress.push(randoSequence());
  await nextSimon(progress);
  sequence = [...progress];
  const simonDelay = 400;
  setLevel()
  setTimeout(() => {
    userTurn(round);
  }, simonDelay);
}

function randoSequence() {
  const buttons = ['red', 'green', 'blue', 'yellow'];
  const rando = buttons[Math.floor(Math.random() * buttons.length)];
  if (level === 1) {
    return rando;
  } 
  if (level === 2 || 3) {
    console.log('level 2 sequence')
    for (let i = rando.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rando[i], rando[j]] = [rando[j], rando[i]];
    };
    return rando;
  }
}

async function nextSimon(nextSequence) {
  for (const color of nextSequence) {
    console.log('visualizing color:', color)
    await visualize(color);
  }
}

function visualize(color) {
  return new Promise((resolve) => {
    const button = document.querySelector(`[data-button='${color}']`);
    const sound = document.querySelector(`#sound-${color}`);
    const visuDelay = 375;
    if (level === 1 || 2) {
      button.classList.add('visualized');
      sound.play();
      setTimeout(() => {
        button.classList.remove('visualized');
        resolve();
      }, visuDelay);
    }
    if (level === 3) {
      button.classList.add('blacklist');
      sound.play();
      setTimeout(() => {
        button.classList.remove('blacklist');
        resolve();
      }, visuDelay);
    }
    }
  )}

function userTurn() {
    enable();
}

function userInput(button) {
  console.log('userInput called with button:', button);
  const index = userSequence.push(button) - 1;
  const sound = document.querySelector(`#sound-${button}`);
  sound.play();
  if (userSequence[index] !== sequence[index]) {
    gameOver()
    return;
  }
  if (userSequence.length === sequence.length) {
    if (userSequence.length === 2 && level === 3) {
      ultimateWin();
      return
    }
    if (userSequence.length === 2) {
      gameWin();
      return
    }
    userSequence = [];
    setTimeout(() => {
      simonSays();
    }, 250);
    return;
  }
}
buttonContainer.addEventListener('click', event => {
  const {button} = event.target.dataset;
  if (button) userInput(button);
});

function gameOver() {
  loser.classList.remove("hidden");
  overlay.classList.remove("hidden")
  resetGame();
}

function gameWin() {
  winner.classList.remove("hidden");
  overlay.classList.remove("hidden");
  resetGame();
}

function ultimateWin() {
  bigWinner.classList.remove("hidden");
  overlay.classList.remove("hidden");
  resetGame();
}

function resetGame() {
  start.disabled = false;
  slider.disabled = false;
  disable();
  sequence = [];
  userSequence = [];
  round = 0;
}


// MODALS //
const overlay = document.querySelector(".overlay");
const instructions = document.querySelector("#instructions");
const howToPlay = document.querySelector("#how-to-play");
const loser = document.querySelector("#you-lose");
const winner = document.querySelector('#you-win');
const bigWinner = document.querySelector("#big-win")

const closeModal = function () {
  instructions.classList.add("hidden");
  overlay.classList.add("hidden");
  loser.classList.add("hidden");
  winner.classList.add("hidden");
  bigWinner.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && 
  (!instructions.classList.contains("hidden") || loser.classList.contains("hidden") || winner.classList.contains("hidden") || bigWinner.classList.contains("hidden")) ) {
    closeModal();
  }
});

const openInstructions = function () {
  instructions.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
howToPlay.addEventListener("click", openInstructions);


