let canvas = document.getElementById("snake");
//contexto = renderiza o desenho que vai acontecer dentro do cavas 
//colocando 2d ele trata como um plano 2d
let context = canvas.getContext("2d");
let box = 32; //pixels
let snake = [];
snake[0] = {
    x: 8 * box, //tamanho
    y: 8 * box
}
let direction = "right";
//remove ponto flutuante (decimais - floor) e gera numeros randons
//até 16 * o tamanho do canvas
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let title = document.getElementById("title");
const apple = document.getElementById("apple");

function changeTitleColor(){
    //trocar só para tons de verde
    let r = 0;
    let g = Math.floor(Math.random() * (255 - 45) + 45);
    let b = 0; 

    title.style.color = "RGB("+r+","+g+","+b+")";
}
var changeColor = setInterval(changeTitleColor, 600);


function changeGameOverColor(){
    //trocar só para tons de vermelho       
    let r = Math.floor(Math.random() * (255 - 100) + 100);
    let g = 0;
    let b = 0;        
    
    title.style.color = "RGB("+r+","+g+","+b+")";
}


function createBG()
{
    //cor do canvas
    context.fillStyle = "lightgray"; 

    //desenha o retangula onde vai acontecer o jogo
    //X Y Posição Largura => 16 quadrados
    context.fillRect(0,0,16 * box, 16 * box); 
}

function createSnake(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.drawImage(apple, food.x,food.y, box, box);

    //  context.fillStyle = "red"; 
    //  context.fillRect(food.x,food.y, box, box); 
}


//detectar o valor da tela para que ela passe de um lado para o outro
document.addEventListener('keydown', update);

function update(event){
    //set direction based on key code pressed
    //direction cannot be oposite
    if(event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    if(event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function reload(){
    window.location.reload();
}

function startGame(){
    if(snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0;
    }
    if(snake[0].x < 0 && direction == "left"){
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == "up"){
        snake[0].y = 16 * box;
    }

    //verificar se há choque entre as partes
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            clearInterval(game);
            clearInterval(changeColor);
            document.getElementById("snake").style.display = "none";
            document.getElementById("title").innerHTML = "<h1 id='title'> GAME OVER </h1>"
            document.getElementById("start").value = "Exit"
            document.getElementById("start").addEventListener('click', reload)
            document.getElementById("start").style.display = "";
            setInterval(changeGameOverColor, 600);            
        }
    }

    createBG();
    createSnake();
    drawFood();
    
    //ter um ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas
    if(direction == "right"){
        snakeX += box;
    }
    if(direction == "left"){
        snakeX -= box;
    }
    if(direction == "up"){
        snakeY -= box;
    }
    if(direction == "down"){
        snakeY += box;
    }

    if(snakeX !== food.x || snakeY !== food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //acrescenta 1 ao primeiro elemento
    snake.unshift(newHead);
}

let x = 100;
//dar continuidade no jogo sem travar
let game = setInterval(startGame, x);
setInterval(hurryUp, 60000); //Snake faster every 1 min

function hurryUp() {
    if(x >= 70) // LOL - limited to 70 the min interval
        x --;

    game = setInterval(startGame, x);
}

document.getElementById("start").onclick = function(){
    document.getElementById("snake").style.display = "";
    document.getElementById("start").style.display = "none";
    document.getElementById("image").style.display = "none";    
}