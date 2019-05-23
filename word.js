const Letter = require("./letter.js");


function Word(word) {


    this.word = word
    this.letters = this.buildLetters(this.word)
    this.blankSpaces = []

}
Word.prototype.buildLetters = function (word) {
    var letters = [];
    word.split("").forEach(letter => {
        var char = new Letter(letter.toLowerCase())
        letters.push(char)

    });
    // console.log(letters);

    return letters;
}

Word.prototype.wordProgress = function () {
    this.blankSpaces = [];
    this.letters.forEach(letter => {
        if (letter.hasBeenGuessed === true) {
            this.blankSpaces.push(letter.letter)
        } else {
            this.blankSpaces.push("_")
        }
    })
    console.log(this.blankSpaces.join(""));


    return this.blankSpaces.join("");
}

Word.prototype.userGuess = function (character) {
    this.letters.forEach(letter => {
        letter.guess(character)
    })
    this.wordProgress();
}


module.exports = Word;