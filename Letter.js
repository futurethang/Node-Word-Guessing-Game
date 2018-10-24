function Letter(alpha) {
  this.alpha = alpha;
  this.guessed = false;
  this.placeholder = function () {
    if (this.guessed) {
      return this.alpha;
    } else {return "_"}
  }
  this.guessCheck = function (guess) {
    if (guess === this.alpha) {
      this.guessed = true;
      // console.log("guesscheck: " + this.guessed);
      this.placeholder();
    }
    else { return false }
  }
}

// var a = new Letter("a");

// console.log("1: ")
// a.placeholder();
// console.log("2: ")
// a.guessCheck("b");
// console.log("3: ")
// a.guessCheck("a");


module.exports = Letter;


// * A string value to store the underlying character for the letter

// * A boolean value that stores whether that letter has been guessed yet

// * A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed

// * A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly