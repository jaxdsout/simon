// QUERY SELECTORS

const tileBox = document.querySelector('.tile-box');
const yellow = document.querySelector("#yellow");
const red = document.querySelector("#red");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");


const start = document.querySelector(".start-dot");
let timer = document.querySelector(".timer");
let slider = document.querySelector("#difficulty-slider");
const reset = document.querySelector(".reset-dot")

// CHOOSE STARTING LEVEL OF DIFFICULTY // 

let currentLevel = 1;
slider.addEventListener("input", function() {
    currentLevel = parseInt(slider.value);
})

// TIMER //

let timerInterval;
let timerValue = 0;

function countdown() {
    timerValue = (currentLevel === 1) ? 30 : 25;
    timer.innerHTML = timerValue;
    timerInterval = setInterval(function () {
        if (timerValue <= 0) {
            clearInterval(timerInterval);
        } else {
            timerValue--;
            timer.innerHTML = timerValue;
        }
    }, 1000);
}

// START THE GAME // 
let gameStarted;
start.addEventListener("click", function() {
    tileSequence();
    // visualize();
    countdown();
    start.disabled = true;
    slider.disabled = true;
    start.style.backgroundColor = 'black';
    gameStarted = true;
});

// TILE SEQUENCE GENERATION // 

let sequence = [];
let colorMapping = ['green', 'red', 'yellow', 'blue'];

function tileSequence () {
    let maxLimit = 12;
    // let maxRando = 3;
    // if (currentLevel === 2) {
    //     maxRando = 2;
    // } else if (currentLevel === 3) {
    //     maxRando = 1;
    // } 
    for (let i = 0; i <= maxLimit; i++) {
        const wildInteger = (i % 4) + 1;
        sequence.push(wildInteger);
    }
    for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    const coloredSequence = sequence.map(wildInteger => colorMapping[wildInteger - 1])
    console.log(coloredSequence)
}


// VISUALIZE THE TILES //

/*function visualize() {
    if (currentLevel === 1) {
        // Initialize tile visual start count to 1
        // Repeat the following steps until the end of the array:
        //   - Visualize the next tile
        //   - Computer waits for user input
        // End of visualization for level 1
    }
    else if (currentLevel === 2) {
        // Initialize tile visual start count to 2
        // Repeat the following steps until reaching NUMBER 8 (7th in array) (5th iteration into the game):
        //   - Visualize the next tile
        //   - Computer waits for user input
        // From 8th to 13th tiles (7th to 12th in the array), visualize 2 at a time:
        //   - Visualize the next 2 tiles
        //   - Computer waits for user input
        // End of visualization for level 2
    }
    else if (currentLevel === 3) {
        // Initialize tile visual start count to 3
        // Repeat the following steps until reaching NUMBER 8 (7th in array):
        //   - Visualize the next 2 tiles
        //   - Computer waits for user input
        // Once you get to the 8th tile (7th in the array), visualize 3 at a time:
        //   - Visualize the next 3 tiles
        //   - Computer waits for user input
        // End of visualization for level 3
    }
}
*/


// USER CLICKING THE TILES & LOGGING RESPONSE

let userSequence = [];
function handleTileClick(event) {
    if (gameStarted === true) {
        const clickedColor = event.target.id;
        const audioElement = document.getElementById(`sound-${clickedColor}`);
        audioElement.play();
        userSequence.push(clickedColor);
        console.log(userSequence);

        // Check if the user sequence matches the generated sequence
        const isCorrect = checkUserSequence();
        if (isCorrect) {
            // Continue the game or check for a win
            if (userSequence.length === sequence.length) {
                // User has completed the level
                handleLevelCompletion();
            }
        } else {
            // User made a mistake, handle game over
            handleGameOver();
        }
    }
}
tileBox.addEventListener('click', handleTileClick);

// function checkUserSequence(){
//     for each index i in the range from 0 to the length of userSequence - 1:
//         if userSequence[i] is not equal to the color at sequence[i]:
//             return false  # User sequence does not match the generated sequence
//     return true  # User sequence matches the generated sequence
// }


// LEVEL COMPLETTION

// function handleLevelUp() {
//     # Clear the user's sequence
//     clear userSequence

//     # Check if the user has completed the game
//     if length of sequence is greater than or equal to 13:
//         call handleGameWin()  # User has won the game
//     else:
//         # Generate the next tile and add it to the sequence
//         call tileSequence()
        
//         # Visualize the next tiles based on the current level
//         call visualize()
// }


// GAME COMPLETION & RESET GAME

function handleGameOver() {
    console.log('Game over!');
    resetGame();
}

function handleGameWin() {
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
    clearInterval(timerInterval);
    timerValue = 0;
    timer.innerHTML = timerValue;
}
reset.addEventListener("click", resetGame)

