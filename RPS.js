let playerScore = 0;
let compScore = 0;
let playerWonEasy;

let playerMoveFreq = { Rock: 0, Paper: 0, Scissors: 0 };

// Retrieve stored data from session storage
if (sessionStorage.getItem("playerWonEasy")) {
  playerWonEasy = JSON.parse(sessionStorage.getItem("playerWonEasy"));
} else {
  playerWonEasy = false;
}

if (sessionStorage.getItem("playerMoveFreq")) {
  playerMoveFreq = JSON.parse(sessionStorage.getItem("playerMoveFreq"));
}

const playerBtns = document.querySelectorAll("input");

/*checks the scores to see if anyone has reached 5, if so returns true, otherwise false*/
function checkScore() {
  return playerScore == 5 || compScore == 5;
}
/*returns the appropriate result when the player wins */
function playerWin() {
  playerWonEasy = true;
  return "</br>You won the game! </br><button onclick='location.reload()'>Play Hard Mode</button>";
}
/*returns the appropriate result when the computer wins */
function compWin() {
  return "</br>You lost the game. :( </br><button onclick='location.reload()'>Play Again</button>";
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

/*randomly selects a move for the computer and returns it, if the player has won easy, use the hard mode function instead*/
function compSelect() {
  if (playerWonEasy) {
    return hardCompSelect();
  } else {
    let moves = ["Rock", "Paper", "Scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
  }
}

/*hard mode function, main difference here. takes into account the frequency the player chose each move*/
function hardCompSelect() {
  let mostFrequentMove = Object.keys(playerMoveFreq).reduce((a, b) =>
    playerMoveFreq[a] > playerMoveFreq[b] ? a : b
  );

  let counterMove;
  if (mostFrequentMove === "Rock") {
    counterMove = "Paper";
  } else if (mostFrequentMove === "Paper") {
    counterMove = "Scissors";
  } else {
    counterMove = "Rock";
  }

  if (playerMoveFreq[mostFrequentMove] == 0) {
    let moves = ["Rock", "Paper", "Scissors"];
    let random = Math.floor(Math.random() * 3);
    counterMove = moves[random];
  }
  return counterMove;
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
      "</br>Player score: " +
      playerScore +
      "</br>Computer score: " +
      compScore
    );
  } else {
    compScore += 1;
    return (
      "You lose! " +
      compSelection +
      " beats " +
      playerSelection +
      "</br>Player score: " +
      playerScore +
      "</br>Computer score: " +
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

  playerMoveFreq[playerSelection] = playerMoveFreq[playerSelection] + 1;

  document.getElementById("result").innerHTML = result;

  if (checkScore()) {
    document.getElementById("gameResult").innerHTML = endGame();

    // Store the updated values in sessionStorage
    sessionStorage.setItem("playerMoveFreq", JSON.stringify(playerMoveFreq));
    sessionStorage.setItem("playerWonEasy", JSON.stringify(playerWonEasy));
  }
}
playerBtns.forEach((playerBtn) => {
  playerBtn.addEventListener("click", function () {
    playGame(playerBtn.value);
  });
});
