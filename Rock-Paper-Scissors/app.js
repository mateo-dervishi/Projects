const game = () => { //Placing all code within this function ensures there are no global variables
    let pScore = 0;
    let cScore = 0;
  
    //Start the Game
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro"); //Here we are setting introScreen to the class: intro allowing us to manipluate it later on
      const match = document.querySelector(".match");
  
      playBtn.addEventListener("click", () => { 
        introScreen.classList.add("fadeOut"); //This fades out the intro screen as we add on a class which makes the opacity 0
        match.classList.add("fadeIn"); //This fades in the match screen as we add on a class which makes the opacity 1
      });
    };
    //Play Match
    const playMatch = () => {
      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");

      //Computer Options are randomly generated
      const computerOptions = ["rock", "paper", "scissors"];
  
      options.forEach((option) => { //Here im looping through each and getting an indvidual button for each option chosen
        option.addEventListener("click", function() {
          //Computer Choice
          const computerNumber = Math.floor(Math.random() * 3); //Generates a random integer, 0-2
          const computerChoice = computerOptions[computerNumber]; //Choses rock, paper or scissors depending on randomly generated number
  
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice); //This updates the text after each battle by calling the function and feeding in the 2 values
          //Here We Update Images
          playerHand.src = `./images/${this.textContent}.png`; //This will select one of the rock, paper or scissors images
          computerHand.src = `./images/${computerChoice}.png`;
        });
      });
    };
  
    const updateScore = () => { //This function updates the score
      const playerScore = document.querySelector(".player-score p"); 
      const computerScore = document.querySelector(".computer-score p");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
    };
  
    const compareHands = (playerChoice, computerChoice) => {

        const winner = document.querySelector(".winner");

      if (playerChoice === computerChoice) {
        winner.textContent = "It is a tie";
        return;
      }
      //Here we are checking for rock
      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = "Player Wins";
          pScore++;
          updateScore(); //Running this function every time a variable chnages in order for the score board to update
          return;
        } else {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        }
      }
      //Here we are checking for paper
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Player Wins";
          pScore++;
          updateScore();
          return;
        }
      }
      //Here we are checking for Scissors
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.textContent = "Player Wins";
          pScore++;
          updateScore();
          return;
        }
      }
    };
  
    //Is call all the inner function
    startGame();
    playMatch();
  };
  
  //start the game function
  game();
