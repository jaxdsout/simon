let sequence = [];
let userSequence = [];
let round = 0;
let level;

const start = document.querySelector('#start-dot');
const reset = document.querySelector("#reset-dot");
const howToPlay = document.querySelector("#how-to-play");
const slider = document.querySelector("#slider");
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
disableUser(); // TO PREVENT USER FROM MISFIRING A GAME OVER

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

async function simonSays() {
  disableUser();
  round++;
  sequence.push(randomizer());
  await nextSimon(sequence);
  setTimeout(() => {
    enableUser()}, 600);
}

async function nextSimon(continuation) {
  for (const color of continuation) {
    await visualize(color);
  }
}

function randomizer() {
  const buttons = ['yellow', 'red', 'green', 'blue'];
  const rando = buttons[Math.floor(Math.random() * buttons.length)];
  if (level === 1) return rando;
  if (level === 2 || 3) {
    console.log('level 2 sequence')
    for (let i = rando.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rando[i], rando[j]] = [rando[j], rando[i]];
    };
    return rando;
  }
}

function visualize(color) {
  return new Promise((resolve) => {
    const button = document.querySelector(`.${color}`);
    const sound = document.querySelector(`#sound-${color}`);
    if (level === 1 || 2) {
      button.classList.add('visualized');
      sound.play();
      setTimeout(() => {
        button.classList.remove('visualized');
        resolve()}, 300);
    }
    if (level === 3) {
      button.classList.add('blacklist');
      sound.play();
      setTimeout(() => {
        button.classList.remove('blacklist');
        resolve()}, 300);
    }
    }
)}

function verify(choice) {
  const index = userSequence.push(choice) - 1;
  const sound = document.querySelector(`#sound-${choice}`);
  sound.play();
  if (userSequence[index] !== sequence[index]) {
    return gameOver()
  }
  if (userSequence.length === sequence.length) {
    if (userSequence.length === 6 && level === 3) {
      return ultimateWin();
    }
    if (userSequence.length === 6) {
      return gameWin();
    }
    userSequence = [];
    setTimeout(() => {
      simonSays();
    }, 200);
    return;
  }
}

buttonContainer.addEventListener('click', event => {
  const {button} = event.target.dataset;
  if (button) verify(button);
});


// END OF GAME HANDLERS 

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

