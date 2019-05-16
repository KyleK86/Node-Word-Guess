var Letter = require("./letter.js");


function Word(word) {

    //Pick a word and make the letters for it

    this.word = word
    this.letters = this.buildLetters(this.word)
    this.blankSpaces = []

}
Word.prototype.buildLetters = function (word) {
    var letters = [];
    word.split("").forEach(letter => {
        var char = new Letter(letter)
        letters.push(char)

    });
    return letters;
}

Word.prototype.wordProgress = function () {
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
var newWord = new Word("dog");
console.log(newWord.userGuess("d"));