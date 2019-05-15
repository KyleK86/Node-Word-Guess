function Letter(character) {
    this.letter = character,
        this.hasBeenGuessed = false,
        this.returnLetter = function () {
            if (this.letter === " ") {
                this.hasBeenGuessed = true;
                return " ";
            } else {
                if (this.hasBeenGuessed === false) {
                    return "_";
                } else {
                    return this.letter;
                }
            }
        };
    this.guess = function (guess) {
        if (guess === this.letter) {
            this.hasBeenGuessed = true;
        }
    };
}

module.exports = Letter;