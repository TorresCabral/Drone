console.log('[Iohana] Drone 2D');

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

var moveEsquerda = false, moveDireita = false, moveCima = false, moveBaixo = false;

const ufu = new Image();
ufu.src = './images/ufu.png';

const drone = new Image();
drone.src = './images/drone3.png';

const start = new Image();
start.src = './images/start.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//////////////////////////////////// [Tela de Início] /////////////////////////////////
const telaInicio = {
  startX: 0,
  startY: 0,
  largura: 400,
  altura: 200,
  x: (canvas.width/2) - (400/2),
  y: (canvas.height/2) - (200/2),   
  desenha() {
    contexto.drawImage(
      start,
      telaInicio.startX, telaInicio.startY,
      telaInicio.largura, telaInicio.altura,
      telaInicio.x, telaInicio.y,
      telaInicio.largura, telaInicio.altura,
    );    
  },
};

//////////////////////////////////// [Plano de Fundo] /////////////////////////////////
const planoDeFundo = {
  ufuX: 0,
  ufuY: 0,
  largura: 1475,
  altura: 627,
  x: 0,
  y: 0,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height)

    contexto.drawImage(
      ufu,
      planoDeFundo.ufuX, planoDeFundo.ufuY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      ufu,
      planoDeFundo.ufuX, planoDeFundo.ufuY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

//////////////////////////////////// [Chão] /////////////////////////////////
const chao = {
  x: 0,
  y: canvas.height - 30,
}

//////////////////////////////////// [Drone] /////////////////////////////////
/*function fazColisao(drone2D, chao) {
  const drone2DY = drone2D.y + drone2D.altura;
  const chaoY = chao.y;
  
  if (drone2D.y >=chaoY) {
    return true;
  }

  return false;
}*/

const drone2D = {
  droneX: 0,
  droneY: 0,
  largura: 500,
  altura: 300,
  x: canvas.width/2 - 150,
  y: chao.y - 100,
  gravidade: 0.25,
  velocidade: 0,
  /*
  atualiza(){    
    drone2D.velocidade = drone2D.velocidade + drone2D.gravidade;
    drone2D.y = drone2D.y + drone2D.velocidade;
  },*/
  desenha() {
    contexto.drawImage(
      drone,
      drone2D.droneX, drone2D.droneY, 
      drone2D.largura, drone2D.altura, // Tamanho do recorte
      drone2D.x, drone2D.y,
      drone2D.largura, drone2D.altura,
    );
  }
};

//////////////////////////////////// [Telas] /////////////////////////////////
let telaAtiva = {};
function mudaTela(novaTela) {
  telaAtiva = novaTela
};

const telas = {
  inicio: {
    desenha() {
      planoDeFundo.desenha();
      drone2D.desenha();
      telaInicio.desenha();
    },
    click() {
      mudaTela(telasJogo);
    },
    atualiza() {

    },
  },
};

telasJogo = {
  desenha() {
    planoDeFundo.desenha();
    drone2D.desenha();
  },
  click() {
    drone2D.pula();
  },
  /*atualiza() {
    drone2D.atualiza();
  }*/
};

//////////////////////////////////// [Movimentos] /////////////////////////////////
window.addEventListener("keydown", keydownHandler);

function keydownHandler(e){
  var key = e.keyCode;

  if (key === LEFT){
    drone2D.x--;
  };
  if (key === RIGHT){
    drone2D.x++;
  };
  if (key === UP){
    drone2D.y--;
  };
  if (key === DOWN){
    drone2D.y++;
  };
}

//////////////////////////////////// [Loop] /////////////////////////////////
function loop() {
  /*drone2D.atualiza();
  planoDeFundo.desenha();
  drone2D.desenha(); 
  telaInicio.desenha();*/  
  telaAtiva.desenha();
  //telaAtiva.atualiza();

  requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaTela(telas.inicio);
loop();