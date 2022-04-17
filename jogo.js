console.log('[DevSoutinho] Flappy Bird');

const ufu = new Image();
ufu.src = './ufu.png';

const drone = new Image();
drone.src = './drone.png';

/*
const sprites = new Image();
sprites.src = './sprites.png';
*/
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// [Plano de Fundo]
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
/*
// [Chao]
const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 224,
  altura: 112,
  x: 0,
  y: canvas.height - 112,
  desenha() {
    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      chao.x, chao.y,
      chao.largura, chao.altura,
    );

    contexto.drawImage(
      sprites,
      chao.spriteX, chao.spriteY,
      chao.largura, chao.altura,
      (chao.x + chao.largura), chao.y,
      chao.largura, chao.altura,
    );
  },
};
*/
const flappyBird = {
  droneX: 0,
  droneY: 0,
  largura: 30,
  altura: 30,
  x: 10,
  y: 50,
  desenha() {
    contexto.drawImage(
      drone,
      flappyBird.droneX, flappyBird.droneY, // Sprite X, Sprite Y
      flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
      flappyBird.x, flappyBird.y,
      flappyBird.largura, flappyBird.altura,
    );
  }
}

function loop() {
  planoDeFundo.desenha();
  //chao.desenha();
  flappyBird.desenha();

  flappyBird.y = flappyBird.y + 1;

  requestAnimationFrame(loop);
}

loop();