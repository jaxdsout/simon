const tileBox = document.querySelector('.tile-box');
const reset = document.querySelector(".reset-dot");
let yellow = document.querySelector("#yellow");
let red = document.querySelector("#red");
let blue = document.querySelector("#blue");
let green = document.querySelector("#green");
let start = document.querySelector(".start-dot");
let timer = document.querySelector(".timer");
let slider = document.querySelector("#difficulty-slider");

let level = 1;
let timerInterval;
let timerValue = 0;
let gameStarted;
let tiles = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let index = 0;
let userSequence = [];

slider.addEventListener("input", function() {
        level = parseInt(slider.value);
})

function countdown() {
    timerValue = (level === 1) ? 30 : 25;
    timer.innerHTML = timerValue;
    timerInterval = setInterval(function () {
            timerValue--;
            timer.innerHTML = timerValue;
            if (timerValue < 0) {
                gameOver();
            }
    }, 1000);
}

start.addEventListener("click", function() {
        start.disabled = true;
        slider.disabled = true;
        start.style.backgroundColor = 'black';
        gameStarted = true;
        tileSequence();
        visualize();
});


function tileSequence() {
    for (let i = 0; i < 13; i++) {
        const wildNum = (i % 4) + 1;
        sequence.push(wildNum);
    }
        for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    sequence = sequence.map(wildNum => tiles[wildNum - 1]); 
    console.log(sequence);
}

function visualize() {
    if (index < sequence.length) {
        const tileColor = sequence[index];
        const tileElement = document.querySelector(`#${tileColor}`);
        const tileSound = document.getElementById(`sound-${tileColor}`);
        
        tileElement.classList.add('highlighted');
        tileSound.play();
        
        setTimeout(() => {
            tileElement.classList.remove('highlighted');
            index++;
            console.log("Index:", index); // Log the current index
        }, 500);

        enableInput();
        countdown();
        console.log("User input enabled");
    }
}

function enableInput() {
    tileBox.addEventListener("click", function (event) {
        if (gameStarted) {
          const clickedTile = event.target.id;
          const inputSound = document.getElementById(`sound-${clickedTile}`);
          inputSound.play();
          console.log(userSequence);
          userSequence.push(clickedTile);
          checkUserInput();
        }
    });
}

function checkUserInput() {
    const correctTile = sequence[userSequence.length - 1];
    const userTile = userSequence[userSequence.length - 1];
    if (userTile !== correctTile) {
        gameOver();
    }
    if (userSequence.length === sequence.length) {
        if (userSequence.length === 12) {
            gameWin()
        } else {
            index ++;
            visualize();
            resetClock();
        }
    }
}

function gameOver() {
    alert('Game over!');
    resetGame();
}

function gameWin() {
    alert('You win!');
    resetGame();
}

function resetGame() {
    gameStarted = false;
    userSequence = [];
    sequence = [];
    start.disabled = false;
    slider.disabled = false;
    start.style.backgroundColor = '';
    resetClock();
}
reset.addEventListener("click", resetGame)

function resetClock() {
    clearInterval(timerInterval);
    timerValue = 0;
    timer.innerHTML = timerValue;
}