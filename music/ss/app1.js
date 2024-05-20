let inputDir = { x: 0, y: 0 }
let foodSound = new Audio('../music/food.mp3');
let gameOverSound = new Audio('../music/gameover.mp3');
let moveSound = new Audio('../music/move.mp3');
let gameMusic = new Audio('../music/music.mp3');
let speed = 2;
let lastPaintTime = 0;
const playBoard = document.querySelector('.playBoard');
let snakeArr = [{ x: 12, y: 13 }];
let food = { x: 4, y: 8 };

//rendering the window (painting the background)
function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    cTime === lastPaintTime;
    gameFunc();
}

function isCollide(sArr) {
    return false;
}


let gameFunc = () => {
    //display the snake head
    playBoard.innerText = "";
    snakeArr.forEach((snakeElement, index) => {
        let newEle = document.createElement('div');
        newEle.style.gridColumnStart = snakeElement.x;
        newEle.style.gridRowStart = snakeElement.y;
        playBoard.appendChild(newEle);
        if (index === 0) {
            newEle.classList.add('head');
        }
        else {
            newEle.classList.add('snakeBody');
        }

    })

    // Display snake food location
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playBoard.append(foodElement);


    // when snake eat food and food get regeneration
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: a + Math.round((b - a) * Math.random()), y: a + Math.round((b - a) * Math.random()) };
    }

    // update the snake game after game over
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameMusic.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game is over. Press any key to restart');
        gameMusic.play();
        snakeArr = [{ x: 12, y: 13 }];
        score = 0;
    }

    // move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

}


window.requestAnimationFrame(main);
window.addEventListener('keydown', (evt) => {
    inputDir = { x: 0, y: -1 };
    // gameMusic.play();
    switch (evt.code) {
        case 'Numpad8':
            inputDir.x = 0;
            inputDir.y = -1;

        case 'Numpad6':
            inputDir.x = 1;
            inputDir.y = 0;

        case 'Numpad4':
            inputDir.x = -1;
            inputDir.y = 0;

        case 'Numpad5':
            inputDir.x = 0;
            inputDir.y = 1;
    }
})