let playerScore = 0;
let compScore = 0;

const playerBtns = document.querySelectorAll("input");

/*checks the scores to see if anyone has reached 5, if so returns true, otherwise false*/
function checkScore() {
  return playerScore == 5 || compScore == 5;
}
/*returns the appropriate result when the player wins */
function playerWin() {
  return "</br>You won the game! Reload the page to play again";
}
/*returns the appropriate result when the computer wins */
function compWin() {
  return "</br>You lost the game. :( Reload the page to play again";
}

/* checks whose score is greater and returns the result from each respective function*/
function endGame() {
  playerBtns.forEach((btn) => {
    btn.disabled = true;
  });
  if (playerScore > compScore) {
    return playerWin();
  } else {
    return compWin();
  }
}
/*randomly selects a choice for the computer and returns it*/
function compSelect() {
  let choice = ["Rock", "Paper", "Scissors"];
  return choice[Math.floor(Math.random() * choice.length)];
}

/*returns player selection if player won, otherwise returns computer selection*/
function getRoundWinner(playerSelection, compSelection) {
  if (
    (playerSelection.toUpperCase() == "ROCK" &&
      compSelection.toUpperCase() == "SCISSORS") ||
    (playerSelection.toUpperCase() == "SCISSORS" &&
      compSelection.toUpperCase() == "PAPER") ||
    (playerSelection.toUpperCase() == "PAPER" &&
      compSelection.toUpperCase() == "ROCK")
  ) {
    return playerSelection;
  } else return compSelection;
}

/*gets winner of the round, then returns the appropriate result after incrementing the appropriate score*/
function getResult(playerSelection, compSelection) {
  let winner = getRoundWinner(playerSelection, compSelection);
  if (winner == playerSelection) {
    playerScore = playerScore + 1;
    return (
      "You win! " +
      playerSelection +
      " beats " +
      compSelection +
      "<br><br>Player score: " +
      playerScore +
      "<br>Computer score: " +
      compScore
    );
  } else {
    compScore += 1;
    return (
      "You lose! " +
      compSelection +
      " beats " +
      playerSelection +
      "<br><br>Player score: " +
      playerScore +
      "<br>Computer score: " +
      compScore
    );
  }
}

/*main gameplay function*/
function playGame(playerSelection) {
  let compSelection = compSelect();
  let result = "";

  /*checks if the round was a tie*/
  if (playerSelection == compSelection) {
    result =
      "It's a tie. You both chose " +
      playerSelection +
      "</br>Player score: " +
      playerScore +
      "</br>Computer score: " +
      compScore;
  } else {
    /*otherwise gets the result of the round*/
    result = getResult(playerSelection, compSelection);
  }
  document.getElementById("result").innerHTML = result;

  if (checkScore()) {
    document.getElementById("gameResult").innerHTML = endGame();
  }
}

playerBtns.forEach((playerBtn) => {
  playerBtn.addEventListener("click", function () {
    playGame(playerBtn.value);
  });
});
