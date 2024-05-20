let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameOver = new Audio('../music/gameover.mp3');
const snakeMove = new Audio('../music/move.mp3');
const gameMusic = new Audio('../music/music.mp3');
const playBoard = document.querySelector('.playBoard');
const scoreCard = document.querySelector('.score');
const hiScoreValue = document.querySelector('.hiScore');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let foodLocation = { x: 6, y: 8 };

function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = cTime;
        gameEngine();
    }

    // console.log(lastPaintTime);
}

function isCollide(sArr) {
    //if snake bump into itself
    for (let i = 1; i < sArr.length; i++) {
        if (sArr[0].x === sArr[i].x && sArr[0].y === sArr[i].y) {
            return true;
        }

    }
    //if snake bump into the wall of playBoard
    if (sArr[0].x <= 0 || sArr[0].x >= 19 || sArr[0].y >= 19 || sArr[0].y <= 0) {
        return true;

    }

}

function gameEngine() {
    //par4: update the snake array after game over
    if (isCollide(snakeArr)) {
        gameOver.play();
        gameMusic.pause();
        inputDir = { x: 0, y: 0 },
            alert('game Over. Press any key to start the game again');
        gameMusic.play();
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    //part1: display Snake head
    playBoard.innerText = "";
    snakeArr.forEach((head, index) => {
        let snakeHead = document.createElement('div');
        snakeHead.style.gridRowStart = head.y;
        snakeHead.style.gridColumnStart = head.x;
        playBoard.appendChild(snakeHead);
        if (index === 0) {
            snakeHead.classList.add('head');
        } else {
            snakeHead.classList.add('snakeBody');
        }
    })

    //part2: display food
    let food = document.createElement('div');
    food.style.gridRowStart = foodLocation.y;
    food.style.gridColumnStart = foodLocation.x;
    food.classList.add('food');
    playBoard.appendChild(food);


    //part3: if you have eaten the food, increament the body and regenerate the food
    if (snakeArr[0].x === foodLocation.x && snakeArr[0].y === foodLocation.y) {
        foodSound.play();
        score++;
        // if (score >= hiScore) {
        //     localStorage.setItem('hiScore', JSON.parse(score));
        //     // hiScoreValue.innerText = 'Hi-Score : ', score;
        // }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        console.log(snakeArr);
        let a = 1;
        let b = 18;
        foodLocation = { x: a + Math.round((b - a) * Math.random()), y: a + Math.round((b - a) * Math.random()) }
    }

    //part5: moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    // gameMusic.play();
    scoreCard.innerText = score;
    snakeArr[0].x = snakeArr[0].x + inputDir.x;
    snakeArr[0].y = snakeArr[0].y + inputDir.y;

}

//hiscore logic goes here
// let hiScore = localStorage.getItem('hiScore');
// if (hiScore === null) {
//     localStorage.setItem(hiScore, JSON.stringify(0));
// } else {
//     hiScoreValue.innerText = 'Hi-Score : ' + score;
// }


window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: -1 };
    snakeMove.play();
    switch (e.code) {
        case 'Numpad8':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'Numpad6':
            inputDir.x = 1
            inputDir.y = 0
            break;
        case 'Numpad4':
            inputDir.x = -1
            inputDir.y = 0
            break;
        case 'Numpad5':
            inputDir.x = 0
            inputDir.y = 1
            break;
    }
})