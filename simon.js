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
const bigWinner = document.querySelector('#big-win');

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
    button.classList.add('visualized');
    sound.play();
    setTimeout(() => {
      button.classList.remove('visualized');
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
  setTimeout(() => {
    verify(choice)
  }, 200)
}

function verify(choice) { 
  const answer = userSequence.push(choice) - 1;

  if (userSequence[answer] !== sequence[answer]) {
    loser.classList.remove("hidden");
    const error = document.querySelector("#sound-error");
    error.play();
    resetGame();
  }

  else if (userSequence.length === sequence.length) {
    if (userSequence.length === 13 && level === 1) {
      winner.classList.remove("hidden");
      resetGame();
    } else if (userSequence.length === 20 && level === 2) {
      bigWinner.classList.remove("hidden");
      resetGame();
    } else {
      setTimeout(() => {
        simonSays()
      }, 500)
    }
    buttonContainer.removeEventListener('click', userClicked);
  }
}


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