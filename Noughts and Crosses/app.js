let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box')) //Here we are creating an array from an array like object (a document with mutliple elements i.e. a HTML collection)

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks') 
let gameOver = false;

const gameOverSound = new Audio("Sound/game_over_sound.wav");
const clickSound = new Audio("Sound/click-sound.wav");

function playClickSound() {
    if (gameOver !== true){ //This ensures the sound will only be played whilst the game has not ended (the game ends when gameOver = true)
        clickSound.play()
    }
}

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT //Start the game off with the x
let spaces = Array(9).fill(null) //Spaces now has an array of 9 empty/null spaces, where each space is filled with an id

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked)) //This adds an event listener to each of the 9 boxes
}

function boxClicked(param) {
    const id = param.target.id

    if(!spaces[id] && !gameOver){ //If this index is equal to null, meaning it hasnt been filled with an id and gameover does not equal false it passes through
        spaces[id] = currentPlayer
        param.target.innerText = currentPlayer

        if(playerHasWon() !== false){

            if (currentPlayer == X_TEXT){ //This changes the title to a message stating which player has won
                playerText.innerHTML = "Crosses Win!";
                gameOver = true;
             } else if (currentPlayer == O_TEXT) {
                playerText.innerHTML = "Noughts Win!";
                gameOver = true;
             } 

            gameOverSound.play(); //Plays game over sound

            let winning_blocks = playerHasWon() //The winning indicator varaible highlights the winners sequence

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator) //Here im mapping over the each element in the winning array so it can be highlighted
			return //This is important otherwise the winning message will keep changing if a player decides to keep on playing after the match has been won 
        } else {
            let counter = 0
            spaces.forEach( Element => {
                if(typeof Element == 'object') {counter++;}
            })
            if(counter == 0) {
                playerText.innerHTML = "It's a Draw!";
                gameOver = true; //This ensures that no other buttons can be clicked meaning no other noughts and crosses appear
            }

        }

        if (currentPlayer == X_TEXT) { //This code alternates the players between x and o
            currentPlayer = O_TEXT;
        } else {
            currentPlayer = X_TEXT;
        }
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) { //This means that if spaces at index a, b and c all share the same text, either x or o, then that player has won with that combination
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart) //This event listener allows us to run the restart function once the click occurs

function restart() {
    spaces.fill(null) //This function clears out the spaces array with null values

    boxes.forEach( box => {
        box.innerText = '' //Here we are removing the x, o, x, o text by now making it equal nothing
        box.style.backgroundColor = '' //Here we are also reseting the highlighted background color shown on a win
    })

    playerText.innerHTML = 'Noughts and Crosses' //This resets the text which displyaed with player won or drew back to the title
    gameOver = false //Resets game over to default
    currentPlayer = X_TEXT //Here we are resetting our current player so we start a new game with the x player (our default player)
}

startGame()