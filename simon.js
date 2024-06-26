const start = document.querySelector('.start-dot');
const reset = document.querySelector(".reset-dot");
const howToPlay = document.querySelector(".how-to-play");
const slider = document.querySelector(".slider");
const buttonContainer = document.querySelector('.button-container');
const modals = document.querySelectorAll(".modal")
const overlay = document.querySelector(".overlay");
const instructions = document.querySelector("#instructions");
const loser = document.querySelector("#you-lose");
const winner = document.querySelector('#you-win');
const bigWinner = document.querySelector("#big-win");

slider.addEventListener("input", setLevel);
reset.addEventListener("click", resetGame)
start.addEventListener('click', startGame);
howToPlay.addEventListener("click", openInstructions);

let sequence = [];
let userSequence = [];
let buttons = ['yellow', 'red', 'green', 'blue'];
let round = 0;
let level;

function openInstructions () {
  instructions.classList.remove("hidden");
};

function setLevel () {
  level = parseInt(slider.value);
}

function resetGame() {
  start.disabled = false;
  slider.disabled = false;
  howToPlay.disabled = false;
  buttonContainer.classList.add("disabled");
  sequence = [];
  userSequence = [];
  round = 0;
}

function startGame() {
  start.disabled = true;
  slider.disabled = true;
  howToPlay.disabled = true;
  setLevel()
  simonSays();
}


async function simonSays() { 
  buttonContainer.classList.add("disabled");
  round++;
  sequence.push(buttons[Math.floor(Math.random() * buttons.length)]);
  for (const color of sequence) {
    await visualize(color);
  };
  buttonContainer.classList.remove("disabled");
  userInput()
}


function visualize(color) {
  return new Promise(resolve => {
    const button = document.querySelector(`.${color}`);
    const sound = document.querySelector(`#sound-${color}`);
    button.classList.add(level === 3 ? 'slight' : 'visualized');
    sound.play();
    setTimeout(() => {
      button.classList.remove(level === 3 ? 'slight' : 'visualized');
      setTimeout(resolve, 200); 
    }, 500); 
  });
}

function userInput() {
  userSequence = [];
  buttonContainer.addEventListener('click', userClicked)
}

function userClicked(event) {
  const choice = event.target.id;
  const sound = document.querySelector(`#sound-${choice}`);
  sound.play();
  verify(choice);
});

// PUSHES CHOICE TO USER SEQUENCE & RUNS THROUGH VERIFY PROTOCOL
// IF NO MESS UPS & NO WIN, PROCEED BACK TO SIMONSAYS
function verify(choice) { 
  const answer = userSequence.push(choice) - 1;

  if (userSequence[answer] !== sequence[answer]) {
    return gameOver();
  }
  if (userSequence.length === sequence.length) {
    if (userSequence.length === 20 && level === 3) {
      return ultimateWin();
    }
    if (userSequence.length === 13) {
      return gameWin();
    }
    userSequence = [];
    setTimeout(() => {
      simonSays();
    }, 600);
    return;
  }
}

// END OF GAME HANDLERS & MODALS
function gameOver() {
  loser.classList.remove("hidden");
  const error = document.querySelector("#sound-error");
  error.play();
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

function openInstructions () {
  instructions.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

modals.forEach((modal) => {
  modal.addEventListener("click", function () {
  closeModal();
  })
});

function closeModal () {
  modals.forEach((modal) => {
    modal.classList.add("hidden");
  });
  overlay.classList.add("hidden");
};

