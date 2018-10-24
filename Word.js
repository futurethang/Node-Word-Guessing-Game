var Letter = require("./Letter.js");

function Word(string) {
  this.stringToArray = string.split("");
  this.wordArray = [];
  this.letterObjectArray = function () {
    this.stringToArray.forEach((alpha) =>
      this.wordArray.push(new Letter(alpha))
    )
  }
  this.wordArrayToString = function () {
    var stringOutput = "";
    this.wordArray.forEach((letter) =>
      stringOutput += letter.placeholder()
    )
    return stringOutput;
  }
  this.alphaCheck = function (alpha) {
    this.wordArray.forEach((letter) => {
      if (letter.guessCheck(alpha)) {
        return letter.guessCheck(alpha);
      } else { return false }
    })
    this.wordArrayToString()
  }
}

// var test = new Word("test");

// console.log(test.stringToArray);
// test.letterObjectArray();
// console.log(test.wordArray);
// test.wordArrayToString();
// test.alphaCheck("e");
// console.log(test.wordArray);

module.exports = Word;

// * **Word.js**: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

//   * An array of `new` Letter objects representing the letters of the underlying word

//   * A function that returns a string representing the word. This should call the function on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

//   * A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in `Letter.js`)