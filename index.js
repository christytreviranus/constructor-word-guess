const Word = require("./word.js");
const inquirer = require("inquirer");

const wordStore = [
    "blackhole",
    "asteroid", 
    "constellation",
    "dobsonian",
    "equinox",
    "focalratio",
    "galaxy",
    "histogram",
    "inclination",
    "libration",
    "meteor",
    "nebula",
    "occultation",
    "parallax",
    "retrograde",
    "supernova",
    "twilight",
    "universaltime",
    "variablestar",
    "zenith"
  ];

  let guesses;
  let pickedWords;
  let word;
  let pickedWord;

  //Initialize game and display welcome message
  function init() {
    pickedWords = [];
    console.log("Welcome to the Astronomy Word Guess Game!");
    console.log("------------------------------------------");
    play();
  }

  //Initiate game play to start game
  function play() {
    pickedWord = "";
    guesses = 15;
    if(pickedWords.length < wordStore.length) {
      pickedWord = getNewWord();
    } else {
      //If the User Wins, Show message
      console.log("Yay you win!  Looks like you are an astronomy pro!");
      //Allow user to decide if they want to keep playing the game
      continuePrompt();
    }
    if(pickedWord) {
      word = new Word(pickedWord);
      word.createLetters();
      guess();
    }
  }

  //Get Word from the Word Store to use for game play
  function getNewWord() {
    let random = Math.floor(Math.random() * wordStore.length);
    let randomWord = wordStore[random];
    if(pickedWords.indexOf(randomWord) === -1) {
      pickedWords.push(randomWord);
      return randomWord;
    } else {
      return getNewWord();
    }
  }

  //User guess function
  function guess() {
    let checker = [];
    inquirer.prompt([
      {
        name: "guessedLetter",
        message: word.update() + 
                "\nGuess a letter!" +
                "\nGuesses Left: " + guesses
      }
    ])
    .then(data => {
      word.letters.forEach(letter => {
        letter.checkLetter(data.guessedLetter);
        checker.push(letter.getCharacter());
      });
      if(guesses > 0 && checker.indexOf("_") !== -1) {
        guesses--;
        if(guesses === 0) {
          console.log("OOPS! YOU HAVE NO MORE GUESSES LEFT! GAME OVER.");
          continuePrompt();
        } else {
          guess();
        }
      } else {
        console.log("HOORAY, LOOKS LIKE ALL YOUR GUESS WORK PAID OFF!  YOU WIN!");
        console.log(word.update());
        play();
      }
    });
  }
  
  //Continue or End Option for user game play
  function continuePrompt() {
    inquirer.prompt([
        {
          name: "continue",
          type: "list",
          message: "Would you like to play again?",
          choices: ["Yes", "No"]
        }
      ])
    .then(data => {
        if(data.continue === "Yes") {
          init();
        } else {
          console.log("Thanks for playing today! Come back soon!");
        }
    });
  }
  
  //Call init function to start game
  init();