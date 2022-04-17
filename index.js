console.log('[Iohana] Drone 2D');

const ufu = new Image();
ufu.src = './ufu.png';

const drone = new Image();
drone.src = './drone.png';

const start = new Image();
start.src = './start.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Tela de Início]
const telaInicio = {
  startX: 0,
  startY: 0,
  largura: 1476,
  altura: 638,
  x: (canvas.width/2),
  y: (canvas.height/2),
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

const planoDeFundo = {
  ufuX: 0,
  ufuY: 0,
  largura: 1475,
  altura: 627,
  x: 0,
  y: 0,
  //y: canvas.height - 204,
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

const drone2D = {
  droneX: 0,
  droneY: 0,
  largura: 30,
  altura: 30,
  x: 10,
  y: 50,
  gravidade: 0.25,
  velocidade: 0,
  
  atualiza(){
    drone2D.velocidade = drone2D.velocidade + drone2D.gravidade;
    drone2D.y = drone2D.y + drone2D.velocidade;
  },
  desenha() {
    contexto.drawImage(
      drone,
      drone2D.droneX, drone2D.droneY, // Sprite X, Sprite Y
      drone2D.largura, drone2D.altura, // Tamanho do recorte na sprite
      drone2D.x, drone2D.y,
      drone2D.largura, drone2D.altura,
    );
  }
};

////////TELAS

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
  atualiza() {
    drone2D.atualiza();
  }
};

function loop() {
  /*drone2D.atualiza();
  planoDeFundo.desenha();
  drone2D.desenha(); 
  telaInicio.desenha();*/

  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);

}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaTela(telas.inicio);
loop();