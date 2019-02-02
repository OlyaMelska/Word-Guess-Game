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
  let oldNumber = -1;
  number = generateRandom(data.length);
  if (number === oldNumber) {
    number = generateRandom(data.length);
    oldNumber = number;
  }

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
    musicVideo.setAttribute("src", data[number].videoURL);

    setNewWord();
    totalGuesses = 18;
    pressedLetters = [];
  } else {
    return false;
  }
}
remainingGuesses.textContent = totalGuesses;

setNewWord();

let guessesArray = [];

window.addEventListener("keydown", event => {
  if (totalGuesses > 0) {
    if (guessesArray.includes(event.key)) {
    } else if (!guessesArray.includes(event.key)) {
      key.textContent = event.key;
      letter = event.key;
      guessesArray.push(letter);
      totalGuesses--;
      outputString = checkLetter(letter);
      winTheGame(outputString);
    }
  } else {
    alert("You LOST!!!");
    setNewWord();
    totalGuesses = 18;
    guessedLetters.textContent = "";
  }
  remainingGuesses.textContent = totalGuesses;
});
