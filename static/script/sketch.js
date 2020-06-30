let imagemCenario;
let imagemPersonagem;
let imagemGota;
let imageTroll;
let imagemGotaVoadora;
let cenario;
let somDoJogo;
let personagem;

function preload() {
  imagemCenario = loadImage('../image/cenario/floresta.png');
  imagemPersonagem = loadImage('../image/personagem/correndo.png');
  imagemGota = loadImage('../image/inimigos/gotinha.png');
  imagemTroll = loadImage('../image/inimigos/troll.png');
  imagemGotaVoadora = loadImage('../image/inimigos/gotinha-voadora.png');
  somDoJogo = loadSound('../sound/trilha_jogo.mp3');
  somDoPulo = loadSound('../sound/somPulo.mp3');
}

function setup() {
  createCanvas(920, 500);
  frameRate(20)

  cenario = new FullParallax(imagemCenario);
  personagem = new Personagem(imagemPersonagem, somDoPulo);
  gota = new Gota(imagemGota);
  troll = new Troll(imagemTroll);
  gotaVoadora = new GotaVoadora(imagemGotaVoadora);

  somDoJogo.loop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) personagem.pula();
}


function draw() {
  
  world.speedingUp = keyIsDown(RIGHT_ARROW) ? world.speed/2 : keyIsDown(LEFT_ARROW) ? -(world.speed/2) : 0;


  cenario.update();
  personagem.update();
  gota.update();
  gotaVoadora.update();
  troll.update();



  cenario.draw();
  personagem.draw();
  gota.draw();
  gotaVoadora.draw();
  troll.draw();

  // if(personagem.estaColidindo(gota)){
  //   personagem.receberDano();
  //   noLoop();
  // }

}