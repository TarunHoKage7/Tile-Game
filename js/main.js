

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


const tiles = document.querySelector('#tiles')
const rows = document.querySelector('.rows')
const counter = document.querySelector('#counter');
// always start from this value in mind
const tilesPosition =  tiles.getBoundingClientRect().top;
let growth;

// get the size of the element.
const rowSize = 100;

const updateCounter = () => {
    counter.textContent = Number(counter.textContent) + 1
}

(() => {
    console.log('in function')
// initialize variables

const cardsNumber = 3;
const numberOfBlackTile = 1;
const numberOfRows = 4;
let gameIsOver = 0;

let top = 0;
let tries = 0;
let score = 0;

let isTest = true;

// add click on children
rows.addEventListener('click',(e) => {
    if(e.target !== null) {
        if(e.target.classList.contains('black')) {
            console.log('click on black')
            e.target.classList.remove('black');
            const music = new Audio(src="/assets/mario_coin.mp3", volume="1");
            music.play();
            updateCounter();

        } else {
            const music = new Audio(src="/assets/mario_die.mp3");
            music.play();
            clearInterval();
            console.log('you loose!')
            return false;
        }
    }
})

// number of rows used
let initialPosition = (numberOfRows * rowSize)

// initial + the position of the tiles in the window + 1 more rowSize for the hidden element where our last one will be in
let limitPosition = initialPosition + tilesPosition + (1 * rowSize);

function createARow(addColor = true) {

    // get the length of row in the board
    let len = Array.from(rows.querySelectorAll('.newRow')).length;

                    // create a  new row
        let row = document.createElement('div')
        row.classList.add('newRow');
        let arrOfBlack = [];

        if(addColor) {
         /* get the number of black tile area */
        for(let j = 0; j < numberOfBlackTile; j++) {
            // don't repeat it
            let isBlackNumber = Math.floor(Math.random() * cardsNumber)
            console.log(isBlackNumber)
            if (!arrOfBlack.includes(isBlackNumber)) {
                arrOfBlack.push(isBlackNumber);
            } else {
                j--;
            }
        }
        }

        for(let i = 0; i < cardsNumber; i++) {
            let c = document.createElement('span');
                    c.classList.add('card');
            // only add it to one
                if(arrOfBlack.includes(i)) {
                    c.classList.add('black');
                }
                row.append(c);
            }
        let speed = 40;
        rows.insertAdjacentElement('afterbegin',row)

        return row;
}


function checkNewRowOrLoose() {
        let lastElement = rows.lastElementChild;
        if(lastElement) {

                // if has black => loose position
                while(lastElement.hasChildNodes()) {
                    if(lastElement.firstChild.classList.contains("black")) {
                        console.log('you loose position l-107');
                        const music = new Audio(src="/assets/mario_die.mp3");
                        music.play();
                        // we can't continue, he loose a life
                        return false
                    } else {
                        lastElement.removeChild(lastElement.firstChild)
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
let speed = 60;
let newRow;

function play(){

    // get the length of row in the board
    let len = Array.from(rows.querySelectorAll('.row')).length;
    if(len < 6) {
        createARow(isTest);
        let height = 1;
        let growth = setInterval((selector) => {
            if(height === 100) {
                selector.classList.remove('newRow');
                selector.classList.add('row')

                // get the position of the last element.

                let lastElement = rows.lastElementChild;
                let top = lastElement.getBoundingClientRect().top
                if(Math.ceil(top)  === Math.ceil(limitPosition)) {
                    console.log('top here is ' + top);
                    let canContinue = checkNewRowOrLoose()
                    console.log('can continue ' + canContinue);
                }
                play()
                clearInterval(growth)
            }




            selector.style.height =  `${height++}px`


        },1000/speed,rows.firstElementChild)
     }

}

play()
})()