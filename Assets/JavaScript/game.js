let startKey = document.getElementById("start-key");
let image = document.getElementById("image");
let wins = document.getElementById("wins");
let displayWord = document.getElementById("word");
let key = document.getElementById("key");
let remainingGuesses = document.getElementById("remaining-guesses");
let guessedLetters = document.getElementById("guessed-letters");
let correctAnswer = document.getElementById("correctAnswer");
let play = document.getElementById("play");
let word;
let letter;
let winsCount = 0;
let totalGuesses = 18;
let pressedLetters = [];
let string = [];
let outputString = [];

let data = [
  {
    song: "Prey",
    artist: "The Neighbourhood",
    imgURL: "./Assets/Images/theneighbourhood.jpg"
  },
  {
    song: "Californication",
    artist: "Red Hot Chili Peppers",
    imgURL: "./Assets/Images/redhotchilipeppers.jpg"
  },
  {
    song: "Still D.R.E.",
    artist: "Dr. Dre, Snoop Dogg",
    imgURL: "./Assets/Images/drdre.jpg"
  },
  {
    song: "All eyez on me",
    artist: "2Pac",
    imgURL: "./Assets/Images/2pack.jpg"
  },
  {
    song: "Young wild & free",
    artist: "Snoop Dogg",
    imgURL: "./Assets/Images/snoopdog.jpg"
  },
  {
    song: "High by the beach",
    artist: "Lana Del Ray",
    imgURL: "./Assets/Images/lanadelrey.jpg"
  },
  {
    song: "Kids",
    artist: "MGMT",
    imgURL: "./Assets/Images/mgmt.jpg"
  }
];

let generateRandom = value => Math.floor(Math.random() * value); // function that generates a random number - that would be an index of an object in our array "data"

function setNewWord() {
  number = generateRandom(data.length);
  word = data[number].song;
  image.setAttribute("src", data[number].imgURL);
  console.log(word);
  string = [""];

  for (let i = 0; i < word.length; i++) {
    string[i] = "_ ";
  }
  displayWord.textContent = string.join("");
  guessedLetters.textContent = "";

  console.log(displayWord);
}
setNewWord();

function checkLetter(letter) {
  let letterIndex = word.toLowerCase().indexOf(letter);
  if (letterIndex > -1) {
    while (letterIndex >= 0) {
      string[letterIndex] = letter;
      displayWord.textContent = string.join("");
      letterIndex = word.indexOf(letter, letterIndex + 1);
    }
    alreadyPressedLetters(letter);
    return string;
  } else {
    return false;
  }
}

function alreadyPressedLetters(letter) {
  pressedLetters.push(letter.toUpperCase());
  guessedLetters.textContent = pressedLetters.join(" ");
  return pressedLetters;
}

function winTheGame(value) {
  value = value.toString().replace(/,/g, "");
  if (value === word.toLowerCase()) {
    winsCount++;
    wins.textContent = winsCount;
    correctAnswer.innerHTML =
      'Song "' + data[number].song + '" by ' + data[number].artist + "!";
    setNewWord();
    totalGuesses = 18;
    pressedLetters = [];
  } else {
    return false;
  }
}
remainingGuesses.textContent = totalGuesses;

window.addEventListener("keydown", event => {
  if (totalGuesses > 0) {
    key.textContent = event.key;
    letter = event.key;
    totalGuesses--;
    outputString = checkLetter(letter);
    winTheGame(outputString);
  } else {
    alert("You LOST!!!");
    setNewWord();
    totalGuesses = 12;
    guessedLetters.textContent = "";
  }
  remainingGuesses.textContent = totalGuesses;
});
