const frontPage =document.getElementById("front-page");
const gamePage=document.getElementById("game-page");
const startButton =document.getElementById("start-btn");
const gameOverPage = document.getElementById("last-page");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");
const upButton =document.getElementById("up-btn");
const leftButton =document.getElementById("left-btn");
const rightButton =document.getElementById("right-btn");
const downButton =document.getElementById("down-btn");
const highScoreDisplay = document.getElementById("high-score");
const pauseButton = document.getElementById("pause-btn");
let isPaused =false;

let score = 0;
let level = 1;
let gameSpeed =200;
let hightest = localStorage.getItem("hightestScore")||0;
let gameLoop;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);
upButton.addEventListener("click",()=>{
    if(direction !=="down"){
    console.log("UP BUTTON");

        nextDirection="up";
        console.log("up button")
     console.log("Next direction",nextDirection);
    }
});
downButton.addEventListener("click",()=>{
    if(direction!=="up"){
     nextDirection="down";
     console.log("down")
     console.log("Next direction",nextDirection);
    }
});
rightButton.addEventListener("click",()=>{
    if(direction!=="left"){
     nextDirection="right";
     console.log("right")
     console.log("Next direction",nextDirection);
    }

});
leftButton.addEventListener("click",()=>{
    if(direction!=="right"){
     nextDirection="left";
     console.log("left")
     console.log("Next direction",nextDirection);
    }

});

pauseButton.addEventListener("click",togglePause);


const snake =[
    {x:5, y:5},
    {x:4, y:5},
    {x:3, y:5}
]

const gameBoard =document.getElementById("game-board");
const rows =20;
const columns =20;

for (let row=0; row<rows; row++){
    for(let column =0; column<columns; column++){
        const cell =document.createElement("div");
        gameBoard.appendChild(cell);
    }
}


const cells = gameBoard.children;


function drawSnake(){
snake.forEach(part => {
    //use part.x and part.y
const cell_index = part.y * columns + part.x;
cells[cell_index].classList.add("snake")
});
}

function clearSnake(){
    for (const element of cells) {
        element.classList.remove("snake");
    }
}

const food= {
    x:10,
    y:8
};

food.x=Math.floor(Math.random() * columns)
food.y=Math.floor(Math.random() * rows)

const foodIndex = food.y *columns + food.x
// const startButton =document.getElementById("start-btn")


function gameOver(){
    clearInterval(gameLoop);
    finalScore.textContent="Score :" + score;
    gameOverPage.style.display ="block";
}

function restartGame(){  
    location.reload();
}

// let gameLoop;

function checkFoodCollision(){
    const head = snake[0];

    if (head.x=== food.x && head.y === food.y){
        return true;
    }
    return false;
}


highScoreDisplay.textContent="Highest Score: " + hightest;

function startGame(){
    frontPage.style.display= "none";
    gamePage.style.display = "block";

    gameLoop = setInterval(runGame, gameSpeed);
}


function moveSnake() {
        direction = nextDirection;
    for(let i=snake.length - 1; i>0; i--){
        console.log(direction);
        snake[i].x =snake[i-1].x;
        snake[i].y =snake[i-1].y;
    }
    if(direction === "right"){
        snake[0].x++;
    }
    if(direction === "left"){
        snake[0].x--;
    }
    if(direction === "up"){
        snake[0].y--;
    }
    if(direction === "down"){
        snake[0].y++;
    }
    if(snake[0].x>=columns){
        snake[0].x=0;
    }
    if(snake[0].x<0){
        snake[0].x =columns -1;
    }
    if(snake[0].y>=rows){
        snake[0].y=0;
    }
    if(snake[0].y<0){
        snake[0].y=rows-1;
    }
}



let direction="right";
let nextDirection ="right";
document.addEventListener("keydown",changeDirection);

function changeDirection(event){
    event.preventDefault();

    console.log(event.key);
    if(event.key==="ArrowUp" && direction != "down"){
        nextDirection ="up";
    }
     if(event.key==="ArrowDown" && direction !== "up"){
        nextDirection ="down";
    }
     if(event.key==="ArrowLeft" && direction!=="right"){
        nextDirection ="left";
    }
     if(event.key==="ArrowRight" && direction!=="left"){
        nextDirection ="right";
    }
    
}
function checkWallCollision(){
    const head = snake[0];
    if(
        head.x<0||
        head.x>=columns||
        head.y<0||
        head.y>= rows
    ){
        return true;
    }
    return false;
}



function growSnake(){
    console.log("Grow Snake Game")
    const tail = snake[snake.length - 1];
    snake.push({
        x: tail.x,
        y: tail.y
    })
}

function placeFood(){
    let newX;
    let newY;
    do{
    newX= Math.floor(Math.random()*columns);
    newY= Math.floor(Math.random()*rows);
}while(
        (newX === food.x && newY === food.y)||
        snake.some(part=>part.x===newX && part.y ===newY)
);

        food.x = newX;
        food.y = newY;

        console.log("New Food: ",food.x,food.y);

}

function drawFood(){
    for(const cell of cells){
        cell.classList.remove("food");
    }

    const foodIndex = food.y * columns + food.x;
    cells[foodIndex].classList.add("food");
}

function clearFood(){
    const foodIndex =food.y *columns + food.x;
    cells[foodIndex].classList.remove("food");
}

const scoreDisplay =document.getElementById("score");
const levelDisplay = document.getElementById("level");

function checkSelfCollision(){
    const head = snake[0];

    for (let i=1; i<snake.length; i++){
        if(head.x === snake[i].x && head.y===snake[i].y){
            return true;
        }
    }
    return false;
}

function increaseSpeed(){
    clearInterval(gameLoop);
    gameSpeed -= 20;
    gameLoop = 
    setInterval(runGame, gameSpeed);
}

function runGame() {

    if(isPaused){
        return;
    }

    clearSnake();
    moveSnake();

    if (checkWallCollision()) {
        gameOver();
        return;
    }

    if (checkSelfCollision()) {
        gameOver();
        return;
    }

    if (checkFoodCollision()) {
        clearFood();
        growSnake();

        score++;
        scoreDisplay.textContent = "Score: " + score;

        if(score > hightest){
            hightest = score;
            localStorage.setItem("hightestScore",hightest);
            highScoreDisplay.textContent = "Highest Score: " + hightest;
        }

        placeFood();

        if (score % 5 === 0) {
            level++;
            levelDisplay.textContent = "Level: " + level;
            increaseSpeed();
        }
    }

    drawSnake();
    drawFood();
}

function togglePause(){
    if(isPaused){
        isPaused = false;
        pauseButton.textContent = "Pause";
        }else{
            isPaused =true;
            pauseButton.textContent = "Resume";
        }
}


