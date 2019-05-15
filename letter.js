var action = "";
var input = "";


function letter(action, input) {
    this.character = " ",
        this.hasBeenGuessed = false,
        this.returnLetter = function () {
            var placeholder = "_";
            if (hasBeenGuessed === true) {
                return character
            } else {
                return placeholder;
            }
        }
    this.checkLetter = function () {
        if (letter === character) {
            hasBeenGuessed = true;
        }
    }


}