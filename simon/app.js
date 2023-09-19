// LISTENERS & VARIABLES

const tileBox = document.querySelector('#outerrim');


const reset = document.querySelector("#reset-dot");
let start = document.querySelector("#start-dot");
let timer = document.querySelector("#timer");
let slider = document.querySelector("#slider");

let level = 1;
let timerInterval;
let timerValue = 0;
let gameStarted;

let tiles = ["green", "red", "yellow", "blue"];
let sequence = [];
let index = 0;
let userSequence = [];


// GAME FLOW

slider.addEventListener("input", function() {
        level = parseInt(slider.value);
        // WILL BUILD OUT FURTHER LEVELS ONCE GAME CAN FUNCTION
})

start.addEventListener("click", function() {
    start.disabled = true;
    slider.disabled = true;
    start.style.backgroundColor = 'black';
    gameStarted = true;
    console.log('game started', gameStarted)
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
    } // fisher-yates shuffle formula; prevents any excessive repeats
    sequence = sequence.map(wildNum => tiles[wildNum - 1]); 
    console.log("generated tile sequence")
    console.log(sequence);
}

// I NEED THIS FUNCTION TO HOLD ALL OF THE TILES IN SUCCESSION, LIKE IT NEEDS TO KEEP ADDING ON AS WE GO
// PROBABLY NEEDS A FOR LOOP INSTEAD TO PREVENT IT BEING LIMITED
// function visualize(index) {
//     const interval = setInterval(() => {
//         const tileColor = sequence[index];
//         const tileElement = document.querySelector(`#${tileColor}`);
//         const tileSound = document.getElementById(`sound-${tileColor}`);

//         tileElement.classList.add('highlighted');
//         tileSound.play();

//         setTimeout(() => {
//             tileElement.classList.remove('highlighted');
//         }, 500);
//         if (index >= sequence.length) {
//         clearInterval(interval);
//         userInput();
//     }
// }, 1000);
//     countdown();
//     console.log("Countdown started")
// }

// function countdown() {
//     timerValue = (level === 1) ? 30 : 20; // time is lessened for levels 2 & 3
//     timer.innerHTML = timerValue;
//     timerInterval = setInterval(function () {
//             timerValue--;
//             timer.innerHTML = timerValue;
//             if (timerValue < 0) {
//                 gameOver();
//             }
//     }, 1000);
//     userInput();
//     console.log("User input enabled");
// }

function userInput() {
    tileBox.addEventListener("click", function (event) {
        const clickedTile = event.target.id;
        const inputSound = document.getElementById(`sound-${clickedTile}`);
        inputSound.play();
        userSequence.push(clickedTile);
        // verifyInput();
    });
}

userInput()

// function verifyInput() {
//     let userInputCorrect = true;
//     for (let i = 0; i < userSequence.length; i++) {
//         if (userSequence[i] !== sequence[i]) {
//             userInputCorrect = false;
//             break;
//         }
//     }
//     if (userInputCorrect) {
//         if (userSequence.length === sequence.length) {
//             if (index === sequence.length) {
//                 gameWin();
//             } else {
//                 visualize(index++);
//             }
//         }
//     } else { 
//         gameOver();
//     }
// }



// RESETS & ALERTS

function gameOver() {
    console.log('Game over!');
    resetGame();
}

function gameWin() {
    console.log('You win!');
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