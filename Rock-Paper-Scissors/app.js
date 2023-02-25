const game = () => {
    let pScore = 0;
    let cScore = 0;
  
    //Start the Game
    const startGame = () => {
      const playBtn = document.querySelector(".intro button");
      const introScreen = document.querySelector(".intro");
      const match = document.querySelector(".match");
  
      playBtn.addEventListener("click", () => {
        introScreen.classList.add("fadeOut"); //Fades out the intro screen
        match.classList.add("fadeIn"); //Fades in the match screen
      });
    };
    //Play Match
    const playMatch = () => {
      const options = document.querySelectorAll(".options button");
      const playerHand = document.querySelector(".player-hand");
      const computerHand = document.querySelector(".computer-hand");

      const computerOptions = ["rock", "paper", "scissors"];
  
      options.forEach((option) => {
        option.addEventListener("click", function() {
          //Computer Choice
          const computerNumber = Math.floor(Math.random() * 3);
          const computerChoice = computerOptions[computerNumber]; //Choses hand dependant on rgn
  
          //compare hands called
          compareHands(this.innerHTML, computerChoice); //Updates the text after each battle by calling the function and feeding in the 2 values
          //Imgs updated
          playerHand.src = `./images/${this.innerHTML}.png`; //Will select one of the imgs
          computerHand.src = `./images/${computerChoice}.png`;
        });
      });
    };
  
    const updateScore = () => {
      const playerScore = document.querySelector(".player-score p"); 
      const computerScore = document.querySelector(".computer-score p");
      playerScore.innerHTML = pScore;
      computerScore.innerHTML = cScore;
    };
  
    const compareHands = (playerChoice, computerChoice) => {

        const winner = document.querySelector(".winner");

      if (playerChoice === computerChoice) {
        winner.innerHTML = "It is a tie";
        return;
      }
      //Here we are checking for rock
      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.innerHTML = "Player Wins";
          pScore++;
          updateScore();
          return;
        } else {
          winner.innerHTML = "Computer Wins";
          cScore++;
          updateScore();
          return;
        }
      }
      //Here we are checking for paper
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.innerHTML = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.innerHTML = "Player Wins";
          pScore++;
          updateScore();
          return;
        }
      }
      //Here we are checking for Scissors
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.innerHTML = "Computer Wins";
          cScore++;
          updateScore();
          return;
        } else {
          winner.innerHTML = "Player Wins";
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
