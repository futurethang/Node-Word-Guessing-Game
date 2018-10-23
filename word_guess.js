var inquirer = require('inquirer');

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

//// INQUIRER VARIABLES: ////
var inquirerGameStart = {
  type: 'confirm',
  message: 'Welcome to the word guess game! Are you ready to play?',
  name: 'gameStart'
};

var inquirerGameGuess = {
  type: 'input',
  message: 'guess a letter . . .',
  name: 'userGuess'
};

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
  console.log(correctAnswer);
  for (let i = 0; i < correctAnswer.length; i++) {
    gameWorkSpace.push("_");
  };
}

function arrayToString(input) { // helper function
  return input = input.join("");
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
  })
}

function guessPrompt() { // function to take another user guess

}

function checkUserGuess() { // analyzes the user guess against answer and updates the display sting

}

gameInitialization();