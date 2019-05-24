const Word = require('./word.js');
const inquirer = require('inquirer');
const fs = require('fs');
var colors = require('colors');

colors.setTheme({
    custom: ['rainbow', 'bold']
});

// import a list of long words from the Scrabble dictionary
var wordBank = fs.readFileSync('./wordBank.txt').toString().split('\n');


// Messages displayed during the game
var inGameMessages = ['Welcome to Word Guess!', 'Choose a Letter!', 'Already Guessed!', 'Incorrect Guess!', 'Correct Guess!', '--------------------------You Won!---------------------------', 'Please enter one letter only!', 'GAME OVER'];

//In-game variables
var livesRemaining;
var currentWord;
var wrongLetterArray = [];
var usedLetterArray = [];
var alreadyGuessed = false;


// startup function/ choose from three difficulties or the option to quit
function startUp() {
    inquirer.prompt([{
        type: "list",
        name: "startup",
        message: colors.cyan(inGameMessages[0]),
        choices: ["Play -- Easy", "Play -- Medium", "Play -- Hard", "Quit Game"]
    }]).then(function (response) {
        switch (response.startup) {
            case 'Play -- Easy':
                startGame(10);
                break;
            case 'Play -- Medium':
                startGame(7);
                break;
            case 'Play -- Hard':
                startGame(3);
                break;
            case 'Quit -- Cancel':
            default:
        }


    });
}


// Function to capture user's guesses and evaluate
function userGuesses() {
    // Prompt to begin game
    inquirer.prompt([{
        type: "input",
        name: "guess",
        message: colors.blue(inGameMessages[1])

    }]).then(function (response) {
        if (response.guess.length > 1) {
            console.log(inGameMessages[6]);
            userGuesses();
        } else {
            currentWord.userGuess(response.guess);
            if (currentWord.blankSpaces.includes("_") && livesRemaining > 0) {

                userGuesses();
            } else {
                console.log(colors.custom(inGameMessages[5]))
                startUp();
            }


        }
        if (usedLetterArray.includes(response.guess) && wrongLetterArray.includes(response.guess)) {
            console.log(colors.red(inGameMessages[2])); //already guessed
            alreadyGuessed = true;
        }
        if (currentWord.blankSpaces.includes(response.guess) && !alreadyGuessed) {
            console.log(colors.green(inGameMessages[4])); //correct guess
            usedLetterArray.push(response.guess);



        } else if (wrongLetterArray.indexOf(response.guess) === -1) {
            console.log(colors.red(inGameMessages[3])); //incorrect guess
            wrongLetterArray.push(response.guess);
            usedLetterArray.push(response.guess);
            livesRemaining--;

        }
        if (livesRemaining === 0) {
            console.log(colors.red(inGameMessages[7])); //Game Over

        }

    })

}


// Start Game function
function startGame(lives) {
    livesRemaining = lives;
    currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
    currentWord.wordProgress();
    userGuesses();
}
startUp();