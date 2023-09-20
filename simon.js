let sequence = [];
let userSequence = [];
let round = 0;
let level;

const start = document.querySelector('#start-dot');
const reset = document.querySelector("#reset-dot");
const slider = document.querySelector("#slider");
const buttonContainer = document.querySelector('.button-container');
const timer = document.querySelector("#timer");

slider.addEventListener("input", setLevel);
reset.addEventListener("click", resetGame)
start.addEventListener('click', startGame);

function startGame() {
    start.disabled = true;
    slider.disabled = true;
    setLevel();
    simonSays();
}

function setLevel () {
    level = parseInt(slider.value);
}

function simonSays() {
  round++;
  buttonContainer.disabled = true;

  const progress = [...sequence];
  progress.push(randoSequence());
  nextSimon(progress);
  sequence = [...progress];

  setTimeout(() => {
    userTurn(round);
  }, round * 350 + 350);

  if (resetGame) {
    exit
  }
}

function randoSequence() {
  const buttons = ['red', 'green', 'blue', 'yellow'];
  const randomize = buttons[Math.floor(Math.random() * buttons.length)];
  return randomize;
}

function nextSimon(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      visualize(color);
    }, (index + 1) * 350);
  });
}

function visualize(color) {
    const button = document.querySelector(`[data-button='${color}']`);
    const sound = document.querySelector(`#sound-${color}`);
  
    button.classList.add('visualized');
    sound.play();
  
    setTimeout(() => {
      button.classList.remove('visualized');
    }, 350);
}

// function countdown() {
//     timerValue = (slider.value === 1) ? 30 : 20; // time is lessened for levels 2 & 3
//     timer.innerHTML = timerValue;
//     timerInterval = setInterval(function () {
//             timerValue--;
//             timer.innerHTML = timerValue;
//             if (timerValue < 0) {
//                 gameOver();
//             }
//     }, 1000);
// }

function userTurn() {
    buttonContainer.disabled = false;
    // countdown();
}

function userInput(button) {
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
    }, 800);
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
}

function gameWin() {
    alert('You win!');
    resetGame();
}

function resetGame() {
  start.disabled = false;
  slider.disabled = false;
  buttonContainer.disabled = true;
  sequence = [];
  userSequence = [];
  round = 0;
//   resetClock();
}

// function resetClock() {
//     clearInterval(timerInterval);
//     timerValue = 0;
//     timer.innerHTML = timerValue;
// }