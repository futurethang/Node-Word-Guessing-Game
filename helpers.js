//// HELPER FUNCTIONS ////
function stringToArrayAndSetGameArrays(string) { // helper function, needs update to new variables
  console.log("string to array before: " + string);
  correctAnswer = string.toUpperCase().split("");
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] !== " ") {
      gameWorkSpace.push("_");
    } else { gameWorkSpace.push(" "); }
  };
  console.log(correctAnswer);
  console.log(arrayToString(gameWorkSpace));
}

function arrayToString(input) { // helper function
  return input = input.join("");
}

function varifyThatGuessIsALetter(val) { // CHECK THE USER INPUT FOR ALPHA ENTRY, REJECT OTHER
  return (val.length === 1 && val.match(/[a-z]/i));
};

function alreadyCorrect(val) {
  return gameWorkSpace.includes(val);
};

function alreadyWrong(val) {
  return wrongGuesses.includes(val);
};

function correctGuess(indices, guess) {
  if (alreadyCorrect(guess)) {
    console.log("You already guessed that one!")
  } else {
    for (let i = 0; i < indices.length; i++) {
      gameWorkSpace[indices[i]] = guess;
    }
    console.log(colors.correct(arrayToString(gameWorkSpace)));
  }
};

function incorrectGuess(val) {
  if (alreadyWrong(val)) {
    console.log("That has already been guessed");
  } else {
    wrongGuesses.push(val);
    guessesLeft--;
    console.log(colors.wrong("Wrong: " + wrongGuesses + "   |   only " + guessesLeft + " guesses left . . ."));
    console.log(colors.correct(arrayToString(gameWorkSpace)));
  }
}

function gameOverState() {
  if (guessesLeft == 0) {
    // failState();
    console.log(colors.winner("game lose"));
    gameReset();
  } else if (arrayToString(correctAnswer) == arrayToString(gameWorkSpace)) {
    // successState();
    console.log(colors.rainbow("You guessed it!"));
    gameReset();
  } else { inquirerGameGuess() }
}
//// END HELPER FUNCTIONS ////

