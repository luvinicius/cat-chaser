
let jogo;
let resources;
let personagem;

const STATES = {
  RUNNING: "running",
  JUMPPING: "jumpping",
  FALLING: "falling",
  DAMAGE_FALLING: "damageFalling",
  DAMAGE: "damage",
  OUT_OF_SCREEN: "outOfScreen",
};

const IMGS = {
  FLORESTA: "floresta",
  PERSONAGEM: "personagem_principal_correndo",
  GOTA: "gota",
  TROLL: "troll",
  GOTA_VOADORA: "gota_voadora",
}

const SOUNDS = {
  TRILHA_SONORA: "trila_sonora_do_jogo",
  PULO: "som_de_pulo"
}

const LAYERS = {
  FUNDO_CENARIO: 0,
  PARALAX_1: 1,
  PARALAX_2: 2,
  CHAO: 3,
  PERSONAGEM: 4,
  INIMIGOS: 5,
  FRENTE_CENARIO: 6,
  HUD: 7,
  MENU: 8,
}

function preload() {
  resources = new Resources();
  resources.put(IMGS.FLORESTA, new ImageResource(loadImage('../image/cenario/floresta.png')));
  resources.put(IMGS.PERSONAGEM, new ImageResource(loadImage('../image/personagem/correndo.png')));
  resources.put(IMGS.GOTA, new ImageResource(loadImage('../image/inimigos/gotinha.png')));
  resources.put(IMGS.TROLL, new ImageResource(loadImage('../image/inimigos/troll.png')));
  resources.put(IMGS.GOTA_VOADORA, new ImageResource(loadImage('../image/inimigos/gotinha-voadora.png')));

  resources.put(SOUNDS.TRILHA_SONORA, new SoundResource(loadSound('../sound/trilha_jogo.mp3')));
  resources.put(SOUNDS.PULO, new SoundResource(loadSound('../sound/somPulo.mp3')));
}

function setup() {
  createCanvas(window.screen.width-50, window.screen.height-200);
  frameRate(20);
  jogo = new WorldGame2D(new Screen2D(width, height));

  let fase = new Fase1(jogo);
  personagem = new Personagem(jogo);
  fase.pushEntity(personagem);
  fase.applyGravity(personagem);
  fase.checkColisions(personagem);
  fase.draw(personagem);

  //gota = new Gota(imagemGota);
  //troll = new Troll(imagemTroll);
  //gotaVoadora = new GotaVoadora(imagemGotaVoadora);



  jogo.resume(fase);
}

function keyPressed() {
  if (keyCode === UP_ARROW) personagem.pula();
}


function draw() {

  jogo.speedingUp = keyIsDown(RIGHT_ARROW) ? jogo.speed / 2 : keyIsDown(LEFT_ARROW) ? -(jogo.speed / 2) : 0;
  jogo.update();

  jogo.draw();
}