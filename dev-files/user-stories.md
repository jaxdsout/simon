## SIMON 

### HOW TO PLAY:

The app will randomly create a series of sound tones and lights and requires a user to repeat the sequence. 

This process is visualized on four uniquely-colored tiles. The user repeats the sequence by selecting the appropriate tile in order.

If the user succeeds, the series will become progressively longer and more complex. Once the user fails or the time limit runs out, the game is over.


## GAME FLOW
    1. User selects difficulty scale [1 to 3] (see below)
    2. User then clicks small circle button to begin game
    2. Game will randomize an order of tiles based on difficulty
    3. Game illuminates the first one (or first few) of the tiles in the sequence
    4. User then selects tile(s) in order that game displayed
    5. If user enters correctly, user advances and game increases amount of tiles into pattern based on difficulty.
    6. Game ends when user is able to repeat 13 tiles in the sequence (regardless of difficulty level)
    7. If user is ever incorrect, game makes error noise and prompts user 'game over'
    8. Game will reset and allow user to change difficulty scale if needed



## DIFFICULTY SCALE
##### LEVEL 1
- 1 tile illuminated to start
- upon each successful reiteration, 1 more random tile is added into visual pattern
- RANDO RULE: tile cannot be repeated more than 3x in sequence
- TIMER: 30 seconds


##### LEVEL 2
- 2 tiles illuminated to start
- upon each successful reiteration, 1 more random tile is added into visual pattern
- ONCE USER GETS to 5-tile sequence, 2 tiles are now added into visual pattern upon every success (instead of 1)
- RANDO RULE: tile cannot be repeated more than 2x in sequence
- TIMER: 25 seconds


##### LEVEL 3
- 3 tiles illuminated to start
- upon each successful reiteration, 2 more random tiles are added into visual pattern
- ONCE USER GETS to 7-tile sequence, 3 tiles are now added into visual pattern
- RANDO RULE: no tile can be repeated in sequence
- TIMER: 20 seconds





## USER STORIES

#### AS A PLAYER, I WANT TO...

- be able to select difficulty level
- be able to start the game
- be able to SEE & HEAR which tile the game is activating
- be able to select which tile I want
- be able to SEE & HEAR my responses being recorded (live feedback on buttons)
- have my responses be recorded/cached correctly
- be able to see how much time I have left to return the visual pattern
- want to know whenver I completed the sequence of 13 (fanfare or something amazing)



#### AS A GAME, I WANT TO...

- prevent players from do-overs (NO GO BACKSIES)
- prevent players from seeing the current visual pattern more than once
- be able to auto compare users inputs versus mine (the correct way)
- be purely random regardless of difficulty level so player can never remember sequencing
- don't want to signify when player can begin repeating visual pattern; just start counting the clock
- don't want to inform player they got it right; simply move on to the next tile(s) in the visual pattern




## STRETCH GOALS

- instead of a standard timer (00:00), it would be cool if the tiles started to slowly fade into background (LUDICROUS MODE?)

- try to achieve the shape of traditional Simon game (oval shaped with irregular tile-buttons)

- make the difficulty scale a slider

- more visual aesthetics
