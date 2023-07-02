function numToLetter(number) {
  let column = "";
  while (number > 0) {
    let remainder = (number - 1) % 26;
    column = String.fromCharCode(65 + remainder) + column;
    number = Math.floor((number - 1) / 26);
  }
  return column;
}
let bgcolor = "skyblue";
function drawPixel(row, col, color) {
  let pixel = document.getElementsByClassName(row)[col];
  pixel.style.backgroundColor = color;
  return pixel;
}
function hozLine(row, color) {
  for (let i = 0; i <= 95; i++) {
    drawPixel(row, i, color);
  }
}

function vertLine(col, color) {
  for (let i = 1; i <= 48; i++) {
    drawPixel(numToLetter(i), col, color);
  }
}

function clean(row, col) {
  drawPixel(row, col, bgcolor);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function animatePixelHoz(row, color = "dodgerblue", speed = 10) {
  async function loopWithDelay() {
    for (let i = 0; i <= 95; i++) {
      drawPixel(row, i, color);

      // Add a time delay of 1 second between iterations
      await delay(speed);
      clean(row, i);
    }
  }
  loopWithDelay();
}

function animatePixelVert(col, color = "dodgerblue", speed = 10) {
  async function loopWithDelay() {
    for (let i = 1; i <= 48; i++) {
      let row = numToLetter(i);
      drawPixel(row, col, color);

      // Add a time delay of 1 second between iterations
      await delay(speed);
      clean(row, col);
    }
  }
  loopWithDelay();
}

function animatePixelHozReverse(row, color = "dodgerblue", speed = 10) {
  async function loopWithDelay() {
    for (let i = 95; (i) => 0; i--) {
      drawPixel(row, i, color);

      // Add a time delay of 1 second between iterations
      await delay(speed);
      clean(row, i);
    }
  }
  loopWithDelay();
}

//From Here Game Code is Start

// Define the variable to be controlled by the wheel event
let playerPosition = 24;
//draw player
drawPixel(numToLetter(playerPosition), 35, "yellow");

// Define the function to be executed when the "wheel" event occurs
function handleWheel(event) {
  // Increase or decrease the variable value based on the wheel scrolling
  if (event.deltaY > 0) {
    playerPosition++; // Increase the value
    drawPixel(numToLetter(playerPosition), 35, "yellow");
    clean(numToLetter(playerPosition - 1), 35);
  } else {
    playerPosition--; // Decrease the value
    drawPixel(numToLetter(playerPosition), 35, "yellow");
    clean(numToLetter(playerPosition + 1), 35);
  }

  // Your code logic her
}

// Add the "wheel" event listener to the target element
document.addEventListener("wheel", handleWheel);

function hozblock(a, b, color) {
  for (let i = a; i <= b; i++) {
    hozLine(numToLetter(i), color);
  }
}
//This is ground pixel green and Brown
hozblock(40, 42, "#72ba28");
hozblock(42, 48, "#8e5e1c");

function gameblock(col, color, a, b) {
  for (let i = a; i <= b; i++) {
    drawPixel(numToLetter(i), col, color);
  }
}

function upblock(a, hight) {
  for (let i = a; i <= a + 4; i++) {
    gameblock(i, "#393D3F", 1, hight);
  }
}

function cleanblock(col, a, b) {
  gameblock(col, bgcolor, a, b);
}

function downblock(a, hight) {
  for (let i = a; i <= a + 4; i++) {
    gameblock(i, "#393D3F", 39 - hight, 39);
  }
}

function animateBlockHozReverse(col, hight1, hight2) {
  async function loopWithDelay() {
    for (let i = col; (i) => 0; i--) {
      upblock(i, hight1);
      downblock(i, hight2);

      let clm = i + 4;
      // Add a time delay of 1 second between iterations
      await delay(15);
      if (clm > 4) {
        cleanblock(clm, 1, hight1);
        cleanblock(clm, 39 - hight2, 39);
      } else {
        for (let i = 4; (i) => 0; i--) {
          cleanblock(i, 1, hight1);
          cleanblock(i, 39 - hight2, 39);
        }
      }
    }
  }
  loopWithDelay();
}
let sadEmoji = [
  "🥲",
  "😔",
  "😟",
  "🥺",
  "🥹",
  "😓",
  "😞",
  "😖",
  "😭",
  "😢",
  "😥",
];
let point = 0;
let gameScreen = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game Over</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }

    .game-over {
      text-align: center;
      background-color: #fff;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      margin-bottom: 40px;
    }

    .try-again-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 18px;
      font-weight: bold;
      text-decoration: none;
      color: #fff;
      background-color: #007bff;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .try-again-button:hover {
      background-color: #0056b3;
    }
  </style>
</head>

`;
function gamestart() {
  let a = Math.ceil(Math.random() * 20);
  let b = Math.ceil(Math.random() * 20);
  if (a + b > 38) {
    a = a - 2;
    b = b - 2;
  }
  animateBlockHozReverse(91, a, b);
  point++;
  updateGameScreen = `
  <body>
    <div class="game-over">
    <h1>${point - 1}</h1>
      <h1>Game Over ${sadEmoji[Math.floor(Math.random() * 11)]}</h1>
      <p>Unfortunately, you lost the game.</p>
      <a href="index.html" class="try-again-button">Try Again</a>
      <h3>Click Space button to turn on Music 🔉</h3>
    </div>
   
  </body>
  </html>
  `;
}

var audio = new Audio();

// Set the audio source
audio.src = "File/sound.mp3";

// Play the audio

// Stop the audio
audio.currentTime = 0;
// Event listener for spacebar keypress
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    audio.play();
    audio.loop = true;
  }
});

// Now you can use the `gameScreen` variable to insert the HTML into your page or manipulate it as needed.

function endGame() {
  // Get the element by class name
  var element = document.getElementsByClassName("35")[playerPosition - 1];

  // Get the computed style of the element
  var computedStyle = window.getComputedStyle(element);

  // Get the background color
  var bgColor = computedStyle.backgroundColor;

  // Display the background color
  if (bgColor != "rgb(135, 206, 235)") {
    audio.src = "File/game_over.mp3";
    audio.play();
    document.write(gameScreen + updateGameScreen);
  }
}
let gamespeed = 750;
setInterval(gamestart, gamespeed);

setInterval(endGame, 5);
