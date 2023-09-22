let sequence = [];
let userSequence = [];
let buttons = ['yellow', 'red', 'green', 'blue'];
let round = 0;
let level;

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

function disableUser () {
  buttonContainer.classList.add("disabled");
}
disableUser(); // PREVENTS USER FROM MISFIRING A GAME OVER

// CONTROLS
function setLevel () {
  level = parseInt(slider.value);
}

function resetGame() {
  start.disabled = false;
  slider.disabled = false;
  howToPlay.disabled = false;
  disableUser();
  sequence = [];
  userSequence = [];
  round = 0;
}

function startGame() {
  start.disabled = true;
  slider.disabled = true;
  howToPlay.disabled = true;
  simonSays();
}

// GAMEFLOW
function randomizer() {
  const rando = buttons[Math.floor(Math.random() * buttons.length)];
  return rando;
}

// DISABLES USER INPUT; ADVANCES ROUND & PUSHES ANOTHER RANDOM BUTTON TO SEQUENCE; RUNS VISUALIZE THROUGH EACH COLOR; ENABLES USER INPUT 
// TIMEOUT UTILIZES AN INDEX TO KEEP PLACE IN LINE
function simonSays() { 
  disableUser();
  round++;
  sequence.push(randomizer());
  sequence.forEach((color, index) => {
    setTimeout(() => {
      visualize(color);
      }, (index + 1) * 300)
    });
  buttonContainer.classList.remove("disabled");
}

// USES COLOR ARGUMENT TO AVOID MULTIPLE QUERY CALLS; THEN ADDS CERTAIN CSS STYLES, PLAYS THE SOUND, AND REMOVES CSS STYLE
function visualize(color) {
  const button = document.querySelector(`.${color}`); 
  const sound = document.querySelector(`#sound-${color}`);
  if (level === 3) {
    button.classList.add('slight'); 
    sound.play();
    setTimeout(() => {
      button.classList.remove('slight');
    }, 180);
  } else {
    button.classList.add('visualized');
    sound.play();
    setTimeout(() => {
      button.classList.remove('visualized')
    }, 180);
  }
}

// HANDLES BUTTON CLICKS BY TARGETING ID OF EVENT THEN SENDS TO VERIFY
buttonContainer.addEventListener('click', event => {
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
  resetGame();
}

function gameWin() {
  winner.classList.remove("hidden");
  resetGame();
}

function ultimateWin() {
  bigWinner.classList.remove("hidden");
  resetGame();
}

function openInstructions () {
  instructions.classList.remove("hidden");
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
};

function openInstructions () {
  instructions.classList.remove("hidden");
};

