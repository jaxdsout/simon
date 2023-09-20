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
reset.addEventListener("dblclick", resetGame)
start.addEventListener('click', startGame);

function startGame() {
    start.disabled = true;
    slider.disabled = true;
    console.log("commence game");
    setLevel();
    simonSays();
}

function setLevel () {
    level = parseInt(slider.value);
}

function simonSays() {
  round++;
  buttonContainer.disabled = true;
  console.log("wait for computer")

  const progress = [...sequence];
  progress.push(randoSequence());

  nextSimon(progress);
  sequence = [...progress];

  setTimeout(() => {
    userTurn(round);
  }, round * 500 + 1000);
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
    }, (index + 1) * 500);
  });
}

function visualize(color) {
    const button = document.querySelector(`[data-button='${color}']`);
    const sound = document.querySelector(`#sound-${color}`);
  
    button.classList.add('visualized');
    sound.play();
  
    setTimeout(() => {
      button.classList.remove('visualized');
    }, 300);
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
    resetGame('YOU LOSE');
    return;
  }
  if (userSequence.length === sequence.length) {
    if (userSequence.length === 12) {
      resetGame(`YOU WON! THAT'S AMAZING`);
      return
    }
    userSequence = [];
    setTimeout(() => {
      simonSays();
    }, 1000);
    return;
  }
}

buttonContainer.addEventListener('click', event => {
    const { button } = event.target.dataset;
    if (button) userInput(button);
});


// function gameOver() {
//     console.log('Game over!');
//     resetGame();
// }

function gameWin() {
    console.log('You win!');
    resetGame();
}

function resetGame(text) {
  alert(text);
  sequence = [];
  userSequence = [];
  round = 0;
  start.disabled = false;
  slider.disabled = false;
  buttonContainer.disabled = true;
//   resetClock();
}

// function resetClock() {
//     clearInterval(timerInterval);
//     timerValue = 0;
//     timer.innerHTML = timerValue;
// }