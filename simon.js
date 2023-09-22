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
function enableUser () {
  buttonContainer.classList.remove("disabled")
}
disableUser(); // PREVENTS USER FROM MISFIRING A GAME OVER

// CONTROLS
function setLevel () {
  level = parseInt(slider.value);
}

function resetGame() {
  start.disabled = false;
  slider.disabled = false;
  disableUser();
  sequence = [];
  userSequence = [];
  round = 0;
}

function startGame() {
  start.disabled = true;
  slider.disabled = true;
  simonSays();
}

// GAMEFLOW
function randomizer() {
  let rando = buttons[Math.floor(Math.random() * buttons.length)];
  let lastColor;
  if (rando === lastColor && (level === 2 || level === 3)) {
    return rando;
  } else {
    lastColor = rando;
    return rando;
  }
}

function simonSays() { 
  disableUser();
  round++;
  sequence.push(randomizer());
  sequence.forEach((color, index) => {
      setTimeout(() => {
        visualize(color);
      }, (index + 1) * 300)
    });
  enableUser();
}

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
// USES COLOR ARGUMENT TO AVOID MULTIPLE QUERY CALLS; THEN ADDS CERTAIN CSS STYLES, PLAYS THE SOUND, AND REMOVES CSS STYLE

buttonContainer.addEventListener('click', event => {
  const choice = event.target.id;
  const sound = document.querySelector(`#sound-${choice}`);
  sound.play();
  verify(choice);
});

function verify(choice) { 
  const answer = userSequence.push(choice) - 1; // SUBTRACTING BY 1 TO TARGET THE LAST BUTTON 
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

// END OF GAME HANDLERS 
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

// MODALS //
function closeModal () {
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

function openInstructions () {
  instructions.classList.remove("hidden");
  overlay.classList.remove("hidden");
};