// QUERY SELECTORS
const tileBox = document.querySelector('.tile-box');
const yellow = document.querySelector("#yellow");
const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");


const start = document.querySelector(".start-dot");
const timer = document.querySelector(".timer");
const slider = document.querySelector(".difficulty-slider");

// CHOOSE STARTING LEVEL OF DIFFICULTY // 

// function chooseDifficulty () {
//     const sliderValue = parseInt(slider.value);
//     switch (sliderValue) {
//         case 1:
//             tileSequence.maxTileRepeat < 3;
//             tileSequence.tileStartCount = 1;
//             tileSequence.add = 1;
//             timerValue = 30;
//             console.log("changed to level 1")
//             break;
//         case 2:
//             tileSequence.maxTileRepeat < 2;
//             tileSequence.tileStartCount = 2;
//             if (tileSequence.currentCount >= 7) {
//                 tileSequence.add = 2;
//             } else {tileSequence.add = 1;
//             }
//             timerValue = 25;
//             console.log("changed to level 2")
//             break;
//         case 3:
//             tileSequence.maxTileRepeat < 1;
//             tileSequence.tileStartCount = 3;
//             if (tileSequence.currentCount >= 7) {
//                 tileSequence.add = 3;
//             } else {tileSequence.add = 2;
//             }
//             timerValue = 25;
//             console.log("changed to level 3");
//             break;
//         default:
//             tileSequence.tileStartCount = 1;
//             tileSequence.maxTileRepeat < 3;
//             tileSequence.add = 1;
//             timerValue = 30;
//             break;
//     }
// }
// slider.addEventListener("click", chooseDifficulty);


// START THE GAME // 

let gameStarted = false;
start.addEventListener("click", function() {
    tileSequence();
    gameStarted = true;
    start.disabled = true
    start.style.backgroundColor = 'black';
});

// TILE SEQUENCE GENERATION // 

function tileSequence () {
    let maxLimit = 13;
    let sequence = [];
    for (let i = 0; i <= maxLimit; i++) {
        const number = (i % 3) + 1;
        sequence.push(number);
    }
    for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    console.log(sequence)
}

// const colors = ['yellow', 'blue', 'red', 'green'];


// CLICKING TILES

function handleTileClick(event) {
    const clickedColor = event.target.id;
    const audioElement = document.getElementById(`sound-${clickedColor}`);
    audioElement.play();
}

tileBox.addEventListener('click', handleTileClick);


