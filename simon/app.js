// QUERY SELECTORS

const tileBox = document.querySelector('.tile-box');
const yellow = document.querySelector("#yellow");
const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");


const start = document.querySelector(".start-dot");
let timer = document.querySelector(".timer");
let slider = document.querySelector("#difficulty-slider");

// CHOOSE STARTING LEVEL OF DIFFICULTY // 

let currentLevel = 1;

slider.addEventListener("input", function() {
    currentLevel = parseInt(slider.value);
})


// TIMER //

function countdown () {
    if (currentLevel === 1) {
        timer.innerHTML = 30
    } else {
        timer.innerHTML = 25
    }
}


// START THE GAME // 

start.addEventListener("click", function() {
    tileSequence();
    // visualize();
    countdown();
    start.disabled = true;
    slider.disabled = true;
    start.style.backgroundColor = 'black';
});

// TILE SEQUENCE GENERATION // 

let sequence = [];
let maxRando

function tileSequence () {
    let maxLimit = 13;
    if (currentLevel === 2) {
        maxRando > 2;
    } else if (currentLevel === 3) {
        maxRando > 1;
    }
    for (let i = 0; i <= maxLimit; i++) {
        const number = (i % 4) + 1;
        sequence.push(number);
    }
    for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    console.log(sequence)
}


// parseInt.sequence[1] = yellow
// parseInt.sequence[2] = blue
// parseInt.sequence[3] = red
// parseInt.sequence[4] =  green


// VISUALIZE THE TILES //

// function visualize() {
    // if (currentLevel === 1) {
        // tile visual start count = 1
        // tiles continue to add 1 at a time until they reach the end of the array
        // computer needs to wait on user input before running next item in array
    // }
    // else if (currentLevel === 2) {
        // tile visual start count = 2
        // tiles continue to add 1 at a time until NUMBER 8 (7th in array) (5th iteration into game)
        // from 8th to 13th tiles they are visualized 2 at a time
        // computer needs to wait on user input before running next item(s) in array
    // } else if (currentLevel === 3) {
        // tile visual start count = 3
        // tiles conitnue to add 2 at a time until NUMBER 8 (7th in array) 
        // once you get to 8th tile they come 3 at a time
        // computer needs to wait on user input before running next items in array
//     }
// }


// SOMEHOW THE GAME NEEDS TO WAIT FOR USER INPUT EACH TIME THEN RESPOND BACK TO THE USER UNTIL THE USER WINS OR FAILS


// USER CLICKING THE TILES & LOGGING RESPONSE

let userSequence = [];


function handleTileClick(event) {
    const clickedColor = event.target.id;
    const audioElement = document.getElementById(`sound-${clickedColor}`);
    audioElement.play();
    userSequence.push(clickedColor);
    console.log(userSequence);

}

tileBox.addEventListener('click', handleTileClick);



// WINNING THE GAME

//once userSequence > 13 user WINS


