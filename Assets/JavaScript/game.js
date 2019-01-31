let startKey = document.getElementById("start-key");
let wins = document.getElementById("wins");
let displayWord = document.getElementById("word");
let key = document.getElementById("key");
let remainingGuesses = document.getElementById("remaining-guesses");
let guessedLetters = document.getElementById("guessed-letters");
let word;
let letter;
let number;
let winsCount = 0;
let totalGuesses = 12;
let lettersArray = [];
let pressedLetters = [];

let data = [
  {
    song: "West Coast",
    artist: "The Neighbourhood",
    imgURL: "../Images/theneighbourhood.jpg"
  },
  {
    song: "Californication",
    artist: "Red Hot Chili Peppers",
    imgURL: "../Images/redhotchilipeppers.jpg"
  },
  {
    song: "Still D.R.E.",
    artist: "Dr. Dre, Snoop Dogg",
    imgURL: "../Images/drdre.jpeg"
  },
  {
    song: "All Eyez On Me",
    artist: "2Pac",
    imgURL: "../Images/2pack.jpg"
  }
];
// for (let item of data) {
//   console.log(item.artist);
// }

let generateRandom = value => Math.floor(Math.random() * value); // function that generates a random number - that would be an index of an object in our array "data"

number = generateRandom(data.length);
console.log(number);
word = data[number].song;
console.log(word);
let string = [];
for (let i = 0; i < word.length; i++) {
  string[i] = "_ ";
}

displayWord.textContent = string.join("");
console.log(displayWord);

function checkLetter(letter) {
  let letterIndex = word.toLowerCase().indexOf(letter);
  if (letterIndex > -1) {
    while (letterIndex >= 0) {
      string[letterIndex] = letter;
      displayWord.textContent = string.join("");
      letterIndex = word.indexOf(letter, letterIndex + 1);
    }
    alreadyPressedLetters(letter);
    console.log("displayword ", string.toString());
    winTheGame(string.toString());
    return true;
  } else {
    return false;
  }
}

function alreadyPressedLetters(letter) {
  pressedLetters.push(letter.toUpperCase());
  guessedLetters.textContent = pressedLetters.join(" ");
  return pressedLetters;
}
remainingGuesses.textContent = totalGuesses;

function winTheGame(value) {
  if (value === word) {
    winsCount++;
    wins.textContent = winsCount;
    console.log("you WON");
    return true;
  } else {
    console.log("you Lost");
    return false;
  }
}

window.addEventListener("keydown", event => {
  totalGuesses--;
  key.textContent = event.key;
  letter = event.key;

  console.log(letter);
  checkLetter(letter);

  remainingGuesses.textContent = totalGuesses;
});
