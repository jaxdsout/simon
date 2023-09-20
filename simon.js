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
  const userDelay = 450;
  setLevel()
  setTimeout(() => {
    userTurn(round);
  }, userDelay);
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
    if (level === 1 || 2) {
      button.classList.add('visualized');
      sound.play();
      setTimeout(() => {
        button.classList.remove('visualized');
        resolve();
      }, 450);
    }
    if (level === 3) {
      button.classList.add('blacklist');
      sound.play();
      setTimeout(() => {
        button.classList.remove('blacklist');
        resolve();
      }, 450);
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
    if (userSequence.length === 13) {
      gameWin();
      return
    }
    userSequence = [];
    setTimeout(() => {
      simonSays();
    }, 450);
    return;
  }
}

buttonContainer.addEventListener('click', event => {
    const {button} = event.target.dataset;
    if (button) userInput(button);
});

function gameOver() {
    alert('YOU LOSE!');
    resetGame();
    console.log('the game was reset')
}

function gameWin() {
    alert('You win!');
    resetGame();
    console.log('the game was reset')
}

function resetGame() {
  start.disabled = false;
  slider.disabled = false;
  disable();
  sequence = [];
  userSequence = [];
  round = 0;
}

