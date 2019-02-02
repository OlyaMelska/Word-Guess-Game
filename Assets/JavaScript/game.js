let startKey = document.getElementById("start-key");
let wins = document.getElementById("wins");
let displayWord = document.getElementById("word");
let key = document.getElementById("key");
let remainingGuesses = document.getElementById("remaining-guesses");
let guessedLetters = document.getElementById("guessed-letters");
let word;
let letter;
let winsCount = 0;
let totalGuesses = 12;
let pressedLetters = [];
let string = [];
let outputString = [];

let data = [
  {
    song: "Mama",
    artist: "The Neighbourhood",
    imgURL: "../Images/theneighbourhood.jpg"
  },
  {
    song: "Father",
    artist: "Red Hot Chili Peppers",
    imgURL: "../Images/redhotchilipeppers.jpg"
  },
  {
    song: "friend",
    artist: "Dr. Dre, Snoop Dogg",
    imgURL: "../Images/drdre.jpeg"
  },
  {
    song: "cat",
    artist: "2Pac",
    imgURL: "../Images/2pack.jpg"
  }
];
// for (let item of data) {
//   console.log(item.artist);
// }

let generateRandom = value => Math.floor(Math.random() * value); // function that generates a random number - that would be an index of an object in our array "data"

function setNewWord() {
  number = generateRandom(data.length);
  word = data[number].song;
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
    setNewWord();
    totalGuesses = 12;
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
