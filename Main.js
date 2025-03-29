//game
let GameBoard;
let GameBoardWith = 360;
let GameBoardHeight = 640;
let Frame;

let FlappyBirdWidth = 34;
let FlappyBirdHeight = 24;
let FlappyBirdX = GameBoardWith/8;
let FlappyBirdY = GameBoardHeight/2;
let FlappyBirdImage; 

let FlappyBird = {
    x : FlappyBirdX,
    y : FlappyBirdY,
    width : FlappyBirdWidth,
    height : FlappyBirdHeight,
}

let pipeArray = [];
let pipeWidth = 64; 
let pipeHeight = 512;
let pipeX = GameBoardWith;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -0.6; 
let velocityY = 0;
let gravity = 0.1;

let gameOver = false;
let score = 0; 

window.onload = function(){
    GameBoard = document.getElementById("game");
    GameBoard.height = GameBoardHeight;
    Frame = GameBoard.getContext("2d");
    Frame.fillStyle = "green"
    Frame.fillRect(FlappyBird.x,FlappyBird.y, FlappyBird.width, FlappyBird.height);

    FlappyBirdImage = new Image();
    FlappyBirdImage.src = "./Flappybird.png";
    Frame.drawImage(FlappyBirdImage, FlappyBird.x, FlappyBird.y, FlappyBird.width, FlappyBird.
height);

    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    setInterval(PlacePipes, 2000);
    document.addEventListener("keydown", moveFlappyBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    Frame.clearRect(0, 0, GameBoard.width, GameBoard.height);

    velocityY += gravity;
    FlappyBird.y = Math.max(FlappyBird.y + velocityY, 0);
    Frame.drawImage(FlappyBirdImage, FlappyBird.x, FlappyBird.y, FlappyBird.width, FlappyBird.
height);

    if (FlappyBird.y > GameBoard.height) {
        gameOver = true;
    }


    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        Frame.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && FlappyBird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }
        if (collisionDetec(FlappyBird, pipe)){ 
            gameOver = true;
        }
    }

    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    Frame.fillStyle = "white";
    Frame.font="40px Arial";
    Frame.fillText(score, 20, 60);

    if (gameOver) {
        Frame.fillText("GAME OVER",30, 330);
    }
}

function PlacePipes() {
    if (gameOver){
        return;
    }

    let randomPipeY = pipeY -pipeHeight/4 - Math.random()*(pipeHeight/2);2
    let openingSpace = GameBoard.height/3.8;

    let topPipe = {
        img : topPipeImg,
        x : pipeX, 
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(bottomPipe);
}

function moveFlappyBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){
        velocityY = -3.8;
    }

}

function collisionDetec(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;

}
