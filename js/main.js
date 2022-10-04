/*high = [15,25,35]; // localStorage
translate value = 20px
count = 0  1 2 3 4 5 6
translate value = 20px + 2 * (count)

count = 0
flag = 0
while(flag <= 5){


speed = count//10
card.style.transformY = 20 + speed * 10;

if(white.isClicked() or !black.isclicked()){
    flag += 1;
}
count += 1
}

if(count > max(high)){
    high.push(count)
    remove min of high
    new screen, show(new high score) show(podium);
}
*/

const tiles = document.querySelector("#tiles");
const rows = document.querySelector(".rows");
const counter = document.querySelector("#counter");
const modal = document.querySelector(".modal");
const best = document.querySelector(".best");
const speedDisplay = document.querySelector('.speed');
const speedMe = document.querySelector('.speedMe');


// always start from this value in mind
const tilesPosition = tiles.getBoundingClientRect().top;
let growth;
let len;
let score = 0;
let speed = 100;
const scoreIncreaseMultiple = 5;
let letters = ["A", "S", "D", "F"];
let currentSpeed = speed;
const keyboadLetters = [];

// initialize variables

const cardsNumber = 4;
const numberOfBlackTile = 1;
const numberOfRows = 4;
let gameIsOver = 0;
let gameMode = 'normal';
let isTest = true;



// get the size of the element.
const rowSize = 100;

// Show the Modal
function showModal() {
  modal.style.display = "block";
}

/**
 * delete all the rows inside the row container
 */
function clearRows() {
  if (rows.hasChildNodes()) {
    //e.firstElementChild can be used.
    let child = rows.lastElementChild;
    while (child) {
      rows.removeChild(child);
      child = rows.lastElementChild;
    }
  }
  clearInterval(growth);
  // no rows to click we can score again
  localStorage.setItem("canScore", "true");
}

function gameOver() {
  clearInterval(growth);
  let canScore = localStorage.setItem("canScore", "false");
  showModal();
  clearRows();
}

if (!localStorage.hasOwnProperty("maxScore")) {
  localStorage.setItem("maxScore", "0");
}

// close modal
document.querySelector(".close").addEventListener("click", () => {
  modal.style.display = "none";
  clearRows();
});


/**
 * Add more the speed
 */
document.querySelector('.speedMe').addEventListener('click',(e) => {
    speed += 5;
    speedDisplay.textContent = speed - 100;

    // add a little blink animation during 2sec
    e.target.classList.add('blink');
    setTimeout(() => {
       e.target.classList.remove('blink');
    }, 2000)
})

// close modal
document.querySelector(".confirm").addEventListener("click", () => {
  location.reload();
  modal.style.display = "none";
});

const updateCounter = () => {
  let maxScoreStr = localStorage.hasOwnProperty("maxScore")
    ? localStorage.getItem("maxScore")
    : "0";
  let maxScoreNbr = Number(maxScoreStr);
  score = Number(counter.textContent) + 1;
  if (score > maxScoreNbr) {
    localStorage.setItem("maxScore", score);
    best.textContent = score;
  }
  counter.textContent = score;
};

(() => {
  // add EventListener for keyboad Letters
  document.addEventListener("keydown", (e) => {
    console.log(e);
    console.log(e.key);
    console.log(e.keyCode);
    let letter = e.key.toUpperCase();

    // Ignore others letters
    if (letters.includes(letter)) {
      if (letter !== keyboadLetters[0]) {
        gameOver();
        return false;
      }

      // if the letter is correct and rows as an row element
      if (letter === keyboadLetters[0] && rows.hasChildNodes()) {
        // delete the fisrt letter
        keyboadLetters.splice(0, 1);
        // we remore the last element
        rows.removeChild(rows.lastElementChild);
        // we increase the speed
 //       speed++;

        // don't let people increase the score if game has ended
        let canScore = localStorage.getItem("canScore");
        if (canScore === "true") updateCounter();


        len = Array.from(rows.querySelectorAll(".row")).length;
        if(len === 0) createARow(true)
        else  if(gameMode === 'insane') createARow()
      }
    }
  });

  // add click on children
  rows.addEventListener("click", (e) => {
    if (e.target !== null) {
      if (e.target.classList.contains("black")) {
        e.target.classList.remove("black");


        const index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
        console.log(index)
        // get the length of row in the board
        len = Array.from(rows.querySelectorAll(".row")).length;

        // don't let people increase the score if game has ended
        let canScore = localStorage.getItem("canScore");
        if (canScore === "true") updateCounter();
      } else {
        //   const music = new Audio(src="/assets/piano.mp3");
        gameOver();

        return false;
      }
    }
  });

  // number of rows used
  let initialPosition = numberOfRows * rowSize;

  // initial + the position of the tiles in the window + 1 more rowSize for the hidden element where our last one will be in
  let limitPosition = initialPosition + tilesPosition + 1 * rowSize;

  function createARow(addColor = true) {
    // create a  new row
    let row = document.createElement("div");
    row.classList.add("newRow");

    switch (cardsNumber) {
        case 3: row.classList.add('three'); break;
        case 4: row.classList.add('four'); break;
        case 5: row.classList.add('five'); break;
        case 6: row.classList.add('six'); break;
        case 7: row.classList.add('seven'); break;
        default: row.classList.add('three'); break;
    }

    let arrOfBlack = [];

    if (addColor) {
      /* get the number of black tile area */
      for (let j = 0; j < numberOfBlackTile; j++) {
        // don't repeat it
        let isBlackNumber = Math.floor(Math.random() * cardsNumber);
        if (!arrOfBlack.includes(isBlackNumber)) {
          arrOfBlack.push(isBlackNumber);
        } else {
          j--;
        }
      }
    }

    for (let i = 0; i < cardsNumber ; i++) {
      let c = document.createElement("span");
      c.classList.add("card");

      // only add it to one
      if (arrOfBlack.includes(i)) {
        c.classList.add("black");
        let text = letters[Math.floor(Math.random() * cardsNumber)];
        c.dataset.value = text;
        c.textContent = text.toUpperCase();
        keyboadLetters.push(text);
      }
      row.append(c);
    }
    rows.insertAdjacentElement("afterbegin", row);

    return row;
  }

  function checkNewRowOrLoose() {
    let lastElement = rows.lastElementChild;
    if (lastElement) {
      // if has black => loose position
      while (lastElement.hasChildNodes()) {
        if (lastElement.firstChild.classList.contains("black")) {
          //     const music = new Audio(src="/assets/piano.mp3");
          //    music.play();
          // we can't continue, he loose a life
          return false;
        } else {
          lastElement.removeChild(lastElement.firstChild);
        }
      }
      // we didn't loose, we remove this last one
      rows.removeChild(rows.lastElementChild);
    }
    // we can continue, add a new raw
    return true;
  }

  let idCount = 0;
  // 3012 : 200

  let startingCoordonate = 0;

  let endOfGame = false;
  let newRow;


function play() {
    let maxScoreStr = localStorage.hasOwnProperty("maxScore")
      ? localStorage.getItem("maxScore")
      : "0";
    best.textContent = maxScoreStr;

    // we start a party, so we can score
    localStorage.setItem("canScore", "true");



    // get the length of row in the board
    len = Array.from(rows.querySelectorAll(".row")).length;

    if(len === 0) {
        createARow(true);
    }

    currentSpeed = speed + (score * scoreIncreaseMultiple);
    speedDisplay.textContent = Number(currentSpeed) -100;

    if (len < 6) {
      createARow(isTest);
      let height = 1;
      let growth = setInterval(
        (selector) => {
          if (height === 100) {
            selector.classList.remove("newRow");
            selector.classList.add("row");

            // get the position of the last element.

            let lastElement = rows.lastElementChild;
            if (lastElement) {
              let top = lastElement.getBoundingClientRect().top;

              if (Math.ceil(top) >= Math.ceil(limitPosition)) {
                let canContinue = checkNewRowOrLoose();
                if (!canContinue) {
                  localStorage.setItem("canScore", "false");
                  len = 20;
                  showModal();
                  clearInterval(growth);
                  return false;
                }
              }
              clearInterval(growth);
              // we continue to play here, if was false, we don't access here
              play();
            }
          }

          selector.style.height = `${height++}px`;

          // speed of the game will automatically increase with the score going up
        },
        1000 / currentSpeed,
        rows.firstElementChild
      );
    }
  }

  play();
})();