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

//Game Code

function hozblock(a, b, color) {
  for (let i = a; i <= b; i++) {
    hozLine(numToLetter(i), color);
  }
}

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

function gamestart() {
  let a = Math.ceil(Math.random() * 20) + 2;
  let b = Math.ceil(Math.random() * 10) + 2;
  animateBlockHozReverse(91, a, b);
}

// Define the variable to be controlled by the wheel event
let variableValue = 24;
drawPixel(numToLetter(variableValue), 35, "yellow");

// Define the function to be executed when the "wheel" event occurs
function handleWheel(event) {
  // Increase or decrease the variable value based on the wheel scrolling
  if (event.deltaY > 0) {
    variableValue++; // Increase the value
    drawPixel(numToLetter(variableValue), 35, "yellow");
    clean(numToLetter(variableValue - 1), 35);
  } else {
    variableValue--; // Decrease the value
    drawPixel(numToLetter(variableValue), 35, "yellow");
    clean(numToLetter(variableValue + 1), 35);
  }

  // Your code logic here
}

// Add the "wheel" event listener to the target element
document.addEventListener("wheel", handleWheel);

setInterval(gamestart, 750);
