let startKey = document.getElementById("start-key");
let image = document.getElementById("image");
let wins = document.getElementById("wins");
let displayWord = document.getElementById("word");
let key = document.getElementById("key");
let remainingGuesses = document.getElementById("remaining-guesses");
let guessedLetters = document.getElementById("guessed-letters");
let correctAnswer = document.getElementById("correctAnswer");
let musicVideo = document.getElementById("play");
let word;
let letter;
let number;
let winsCount = 0;
let totalGuesses = 18;
let pressedLetters = [];
let string = [];
let outputString = [];
let guessesArray = [];

let data = [
  {
    song: "Sweater weather",
    artist: "The Neighbourhood",
    imgURL: "./Assets/Images/theneighbourhood.jpg",
    videoURL: "https://www.youtube.com/embed/GCdwKhTtNNw"
  },
  {
    song: "Californication",
    artist: "Red Hot Chili Peppers",
    imgURL: "./Assets/Images/redhotchilipeppers.jpg",
    videoURL: "https://www.youtube.com/embed/YlUKcNNmywk"
  },
  {
    song: "Still D.R.E.",
    artist: "Dr. Dre, Snoop Dogg",
    imgURL: "./Assets/Images/drdre.jpg",
    videoURL: "https://www.youtube.com/embed/_CL6n0FJZpk"
  },
  {
    song: "All eyez on me",
    artist: "2Pac",
    imgURL: "./Assets/Images/2pack.jpg",
    videoURL: "https://www.youtube.com/embed/zSzaplTFagQ"
  },
  {
    song: "Young wild & free",
    artist: "Snoop Dogg",
    imgURL: "./Assets/Images/snoopdog.jpg",
    videoURL: "https://www.youtube.com/embed/Wa5B22KAkEk"
  },
  {
    song: "High by the beach",
    artist: "Lana Del Ray",
    imgURL: "./Assets/Images/lanadelrey.jpg",
    videoURL: "https://www.youtube.com/embed/QnxpHIl5Ynw"
  },
  {
    song: "Kids",
    artist: "MGMT",
    imgURL: "./Assets/Images/mgmt.jpg",
    videoURL: "https://www.youtube.com/embed/fe4EK4HSPkI"
  }
];

let generateRandom = value => Math.floor(Math.random() * value); // function that generates a random number - that would be an index of an object in our array "data"

function setNewWord() {
  //generates a new word from data array
  let oldNumber = -1;
  number = generateRandom(data.length);
  if (number === oldNumber) {
    //to make sure we don't randomly generate duplicates
    number = generateRandom(data.length);
    oldNumber = number;
  }

  word = data[number].song; //getting the value that use has to guess
  image.setAttribute("src", data[number].imgURL); //output of the image
  console.log(word);
  string = [""]; //array for output on the screen

  for (let i = 0; i < word.length; i++) {
    string[i] = "_ ";
  }
  displayWord.textContent = string.join(""); //to make the output without ","
  guessedLetters.textContent = "";
}

function checkLetter(letter) {
  //checks if the letter is in the guessing word
  let letterIndex = word.toLowerCase().indexOf(letter); //case sensitive, so have to make all the words lower case
  if (letterIndex > -1) {
    // if the letter has grater value than -1, meaning it is in a word string
    while (letterIndex >= 0) {
      //for all indexes where the letter appears
      string[letterIndex] = letter; //add it to a string array
      displayWord.textContent = string.join("");
      letterIndex = word.indexOf(letter, letterIndex + 1);
    }
    //output of the correctly guessed letters
    return string; //returns an array to check with initially generated word
  } else {
    alreadyPressedLetters(letter);
    return false;
  }
}

function alreadyPressedLetters(letter) {
  //outputs guessed letters on the screen
  pressedLetters.push(letter.toUpperCase());
  guessedLetters.textContent = pressedLetters.join(" ");
  return pressedLetters;
}

function winTheGame(value) {
  //checks if value is equal to generated word
  value = value.toString().replace(/,/g, ""); //converting an array to a string & removing all ','
  if (value === word.toLowerCase()) {
    //if it matches
    winsCount++;
    wins.textContent = winsCount;
    correctAnswer.innerHTML =
      'Song "' + data[number].song + '" by ' + data[number].artist + "!"; //displaying the set word and artist on display
    musicVideo.setAttribute("src", data[number].videoURL); //displaying the proper video

    setNewWord(); //generating new word
    totalGuesses = 18; //set guesses amount back to 18
    pressedLetters = []; //clearing an array
    guessesArray = []; //clearing an array
  } else {
    return false;
  }
}
remainingGuesses.textContent = totalGuesses; //displaying total guesses amount

setNewWord(); //generate a new word

window.addEventListener("keydown", event => {
  if (totalGuesses > 0) {
    if (guessesArray.includes(event.key)) {
      //if the correct letter was already pressed, nothing happens
    } else if (!guessesArray.includes(event.key)) {
      //if no
      key.textContent = event.key; // show the letter we pressed
      letter = event.key; //set the lette'rs value to letter variable
      guessesArray.push(letter); // push it to our array to keep track of letters that were already pressed
      totalGuesses--;
      outputString = checkLetter(letter); //check if the letter is in the word
      winTheGame(outputString); // check if the word matches the string
    }
  } else {
    alert("You LOST!!!");
    setNewWord(); // setting a new word, restart of the game
    totalGuesses = 18; //setiing the count to the initial value
    guessesArray = [];
    pressedLetters = [];
    key.textContent = "";
    winsCount = 0;
    wins.textContent = "";
    guessedLetters.textContent = ""; // clearing screen
  }
  remainingGuesses.textContent = totalGuesses; //output of total guesses that can be made
});
