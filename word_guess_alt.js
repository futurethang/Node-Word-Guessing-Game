var inquirer = require('inquirer');
var colors = require('colors/safe');
var Word = require('./Word');

colors.setTheme({
  warning: ['red', 'underline'],
  winner: ['cyan', 'bold'],
  wrong: ['red', 'bold'],
  correct: ['green', 'bold'],
  info: ['red', 'bgBlack']
});

var guessesLeft = 13;
var answers = [
  "TESTING"
]
var wordObject = {};

//// INQUIRER VARIABLES AND FUNCTIONS: ////
var inquirerGameStart = {
  type: 'confirm',
  message: 'Welcome to the word guess game! Are you ready to play?',
  name: 'gameStart'
};

function inquirerGameGuess() {  // UP TO DATE WITH CONSTRUCTOR MODULES
  inquirer.prompt([
    {
      type: 'input',
      message: 'guess a letter . . .',
      name: 'userGuess'
    }
  ]).then(function (entry) {
    var guess = entry.userGuess.toUpperCase();
    if (!varifyThatGuessIsALetter(guess)) {
      console.log("That is not a letter.")
    }
    else {
      console.log("search for letter");
      console.log(wordObject.alphaCheck(guess));
    }
  }).then(function () {
    // console.log(arrayToString(correctAnswer));
    gameOverState();
  });
}

var inquirerGameOver = {
  type: 'confirm',
  message: 'Would you like to play again?',
  name: 'gameOver'
};
//// END INQUIRER VARIABLES: ////

//// HELPER FUNCTIONS ////
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

function gameOverState() {  // UP TO DATE WITH CONSTRUCTOR MODULES
  if (guessesLeft == 0) {
    // failState();
    console.log(colors.winner("game lose"));
    gameReset();
  } else if (!wordObject.wordArrayToString().includes("_")) {
    // successState();
    console.log(colors.rainbow("You guessed it!"));
    gameReset();
  } else {
    console.log(colors.winner(wordObject.wordArrayToString()));
    inquirerGameGuess()
  }
}
//// END HELPER FUNCTIONS ////

function gameSetup() {   // UP TO DATE WITH CONSTRUCTOR MODULES
    var randomPick = answers[Math.floor(Math.random() * answers.length)];
    guessesLeft = 13;
    wordObject = new Word(randomPick);
    wordObject.letterObjectArray();
    console.log(colors.winner(wordObject.wordArrayToString()));
    console.log(colors.info("[contains " + randomPick.length + " letters]"));
}

function gameInitialization() {   // UP TO DATE WITH CONSTRUCTOR MODULES
  inquirer.prompt([
    inquirerGameStart
  ]).then(function (input) {
    if (input.gameStart) {
      gameSetup();
    }
  }).then(function () {
    inquirerGameGuess();
  })
}

function gameReset() {   // UP TO DATE WITH CONSTRUCTOR MODULES
  inquirer.prompt([
    inquirerGameOver
  ]).then(function (input) {
    if (input.gameOver) {
      gameSetup();
    } else {
      console.log("Goodbye!");
      process.exit();
    }
  }).then(function () {
    inquirerGameGuess();
  })
}

gameInitialization();

/// FURTHER DEVELOPMENT GOALS:
// ADD WHEEL OF FORTUNE API FOR GAME STRINGS