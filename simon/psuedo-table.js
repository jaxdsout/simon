/*function visualize() {
    if (level === 1) {
        for (let i = 0; i < masterSequence.length; i++) {
            masterSequence.e
        }
        // Initialize tile visual start count to 1
        // Repeat the following steps until the end of the array:
        //   - Visualize the next tile
        //   - Computer waits for user input
        // End of visualization for level 1
    }
    else if (level === 2) {
        // Initialize tile visual start count to 2
        // Repeat the following steps until reaching NUMBER 8 (7th in array) (5th iteration into the game):
        //   - Visualize the next tile
        //   - Computer waits for user input
        // From 8th to 13th tiles (7th to 12th in the array), visualize 2 at a time:
        //   - Visualize the next 2 tiles
        //   - Computer waits for user input
        // End of visualization for level 2
    }
    else if (level === 3) {
        // Initialize tile visual start count to 3
        // Repeat the following steps until reaching NUMBER 8 (7th in array):
        //   - Visualize the next 2 tiles
        //   - Computer waits for user input
        // Once you get to the 8th tile (7th in the array), visualize 3 at a time:
        //   - Visualize the next 3 tiles
        //   - Computer waits for user input
        // End of visualization for level 3
    }
    countdown();

}
*/


// USER CLICKING THE TILES & LOGGING RESPONSE

// let userSequence = [];
// tileBox.addEventListener('click', handleTileClick);

// function playerMoves(event) {
//     if (gameStarted === true) {
//         const clickedColor = event.target.id;
//         const audioElement = document.getElementById(`sound-${clickedColor}`);
//         audioElement.play();
//         userSequence.push(clickedColor);
//         console.log(userSequence);

//         // Check if the user sequence matches the generated sequence
//         const isCorrect = checkUserSequence();
//         if (isCorrect) {
//             // Continue the game or check for a win
//             if (userSequence.length === sequence.length) {
//                 // User has completed the level
//                 handleLevelCompletion();
//             }
//         } else {
//             // User made a mistake, handle game over
//             handleGameOver();
//         }
//     }
// }

// function verifyMove () {
//     if (userSequence)
// }

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

// function GameOver() {
//     console.log('Game over!');
//     resetGame();
// }

// function GameWin() {
//     console.log('You win!');
//     resetGame();
// }

// function resetGame() {
//     gameStarted = false;
//     userSequence = [];
//     sequence = [];
//     start.disabled = false;
//     slider.disabled = false;
//     start.style.backgroundColor = '';
//     clearInterval(timerInterval);
//     timerValue = 0;
//     timer.innerHTML = timerValue;
// }
// reset.addEventListener("click", resetGame)