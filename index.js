const Word = require('./word.js');
const inquirer = require('inquirer');
const fs = require('fs');

// import a list of long words from the Scrabble dictionary
var wordBank = fs.readFileSync('./wordBank.txt').toString().split('\n');
var numberOfWords = wordBank.length;

// Messages displayed during the game
var inGameMessages = ['Welcome to Word Guess!', 'Choose a letter!', 'Already guessed!', 'Incorrect guess!', 'Correct guess!', '--------------------------You Won!---------------------------'];

//In-game variables
var livesRemaining;
var currentWord;


// startup function/ choose from three difficulties or the option to quit
function startUp() {
    inquirer.prompt([{
        type: "list",
        name: "startup",
        message: inGameMessages[0],
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
            case 'Quit -- Cancel':
            default:
        }


    });
}

function userGuesses() {
    // Prompt to begin game
    inquirer.prompt([{
        type: "input",
        name: "guess",
        message: inGameMessages[1]

    }]).then(function (response) {
        currentWord.userGuess(response.guess);
        if (currentWord.blankSpaces.includes("_") && livesRemaining > 0) {
            livesRemaining--;
            userGuesses();
        } else {
            console.log(inGameMessages[5])
            startUp();
        }
        if (currentWord.blankSpaces.includes(response.guess)) {
            console.log(inGameMessages[4]);
        } else {
            console.log(inGameMessages[3]);

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