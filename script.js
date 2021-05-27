let canvas = document.getElementById("snake");
//contexto = renderiza o desenho que vai acontecer dentro do cavas 
//colocando 2d ele trata como um plano 2d
let context = canvas.getContext("2d");
let box = 32; //pixels

function criarBG()
{
    //cor do canvas
    context.fillStyle = "lightgreen"; 

    //desenha o retangula onde vai acontecer o jogo
    //X Y Posição Largura => 16 quadrados
    context.fillRect(0,0,16 * box, 16 * box); 
}

criarBG();