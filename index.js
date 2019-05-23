const Word = require('./word.js');
const inquirer = require('inquirer');
const fs = require('fs');

// import a list of long words from the Scrabble dictionary
var wordBank = fs.readFileSync('./wordBank.txt').toString().split('\n');
var numberOfWords = wordBank.length;

// Messages displayed during the game
var inGameMessages = ['Guess a letter!', 'Already guessed!', 'Incorrect guess!', 'Correct guess!'];

//In-game variables
var livesRemaining;
var currentWord;


// startup function/ choose from three difficulties and the option to quit
function startUp() {
    inquirer.prompt([{
        type: "list",
        name: "startup",
        message: "Welcome to Word Guess!",
        choices: ["Play -- Easy", "Play -- Medium", "Play -- Hard", "Quit"]
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
            case 'Quit':
            default:
        }


    });
}

function userGuesses() {
    // Prompt to begin game
    inquirer.prompt([{
        type: "input",
        name: "guess",
        message: "Choose a letter to begin"

    }]).then(function (response) {
        currentWord.userGuess(response.guess);
        if (currentWord.blankSpaces.includes("_") && livesRemaining > 0) {
            livesRemaining--;
            userGuesses();
        } else {
            startUp();
        }

    })
}


// Start Game function
function startGame(lives) {
    livesRemaining = lives;
    currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
    console.log(currentWord);

    currentWord.wordProgress();
    userGuesses();
}
startUp();