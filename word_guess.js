var inquirer = require('inquirer');
var colors = require('colors');

var guessPhrase; // Can I auto generate from an API? Or just pull from answers array
var guessesLeft = 13;
var correctAnswer = []; // answer laid out as an array for internal reference
var gameWorkSpace = []; // answer laid out as an array with hidden gaps
var wrongGuesses = []; // repository of already guessed letters
var answers = [
  "this is a phrase",
  "two ducks and a cheese",
  "test test test"
]

//// INQUIRER VARIABLES AND FUNCTIONS: ////
var inquirerGameStart = {
  type: 'confirm',
  message: 'Welcome to the word guess game! Are you ready to play?',
  name: 'gameStart'
};

function inquirerGameGuess() {
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
    else if (alreadyCorrect(guess)) {
      console.log("that has already been guessed!");
      inquirerGameGuess();
    } else {
      console.log("search for letter");
      let analyzeIndices = [];
      for (let i = 0; i < correctAnswer.length; i++) {
        if (correctAnswer[i] === guess) {
          analyzeIndices.push(i);
        }
      };
      console.log("ANALYZE ENTRY: " + analyzeIndices);
      if (analyzeIndices.length !== 0) {
        correctGuess(analyzeIndices, guess);
      } else {
        incorrectGuess(guess);
      }
    }
  }).then(function () {
    console.log(arrayToString(correctAnswer));
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
  return gameWorkSpace.includes(val);
};

function correctGuess(indices, guess) {
  if (alreadyCorrect(guess)) {
    Console.log("You already guessed that one!")
  } else {
    for (let i = 0; i < indices.length; i++) {
      gameWorkSpace[indices[i]] = guess;
    }
    console.log("game work space: " + arrayToString(gameWorkSpace));
  }
};

function incorrectGuess(val) {
  if (alreadyWrong(val)) {
    console.log("That has already been guessed");
  } else {
    wrongGuesses.push(val);
    guessesLeft--;
    console.log("Wrong guesses: " + wrongGuesses + "   |   only " + guessesLeft + " guesses left . . .");
  }
}

function gameOverState() {
  if (guessesLeft == 0) {
    // failState();
    console.log("game lose");
  } else if (arrayToString(correctAnswer) == arrayToString(gameWorkSpace)) {
    // successState();
    console.log("game win");
  } else { inquirerGameGuess() }
}
//// END HELPER FUNCTIONS ////


function gameInitialization() { // inquirer function to begin the game
  inquirer.prompt([
    inquirerGameStart
  ]).then(function (input) {
    if (input.gameStart) {
      // INITIALIZE THE GAME WITH NEW PHRASE, LOG THE SPACES TO THE SCREEN, PROMPT GUESS
      var randomPick = answers[Math.floor(Math.random() * answers.length)];
      wrongGuesses = [];
      correctAnswer = [];
      gameWorkSpace = [];
      guessesLeft = 13;
      stringToArrayAndSetGameArrays(randomPick);
    }
  }).then(function () {
    inquirerGameGuess();
  })
}

function guessPrompt() { // function to take another user guess

}

function checkUserGuess() { // analyzes the user guess against answer and updates the display sting

}

gameInitialization();