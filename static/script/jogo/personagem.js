class Personagem extends Character {

  constructor(canvas, somDoPulo) {
    super(new Box(0, 10, width / 5, height / 5, DRAW_STRATING_POINT.BOTTOM_LEFT));
    this.weight = 10;

    let animacaoCorrendo = UpdatableFames2D.cropImage(Box.from(this), canvas, 1, 10, 512, 512);
    
    this.add(STATES.RUNNING, State.DO_NOTHING, animacaoCorrendo);

    let stopedDraw = new CropedFrame2D(Box.from(this), canvas, 512, 512, 1, 1);
    
    let jumppingState = new State(()=>{if (this.speedUp <= 0) { this.changeTo(STATES.FALLING);}});
    this.add(STATES.JUMPPING, jumppingState, stopedDraw);

    let estadoCaindo = new State(aplicarGravidade);
    this.add(STATES.FALLING, estadoCaindo, stopedDraw);
    this.add(STATES.DAMAGE_FALLING, estadoCaindo, stopedDraw);

    this.add(STATES.DAMAGE, estadoCorrendo, stopedDraw);

    this.foot = 10;
    this.nJumps = 0;
    this.somDoPulo = somDoPulo;
  }

  pula() {
    if (this.in(STATES.RUNNING, STATES.JUMPPING, STATES.FALLING) && this.nJumps < 2) {
      this.changeTo(STATES.JUMPPING);
      this.nJumps++;
      somDoPulo.play();

      let jumpForce = this.weight * 5;
      if (this.is(STATES.RUNNING)) jumpForce += world.gravityForceFor(this);
      this.pullUp(jumpForce);
    }
  }

  receberDano() {
    if (this.in(STATES.JUMPPING, STATES.FALLING)) this.changeTo(STATES.DAMAGE_FALLING);
    else this.changeTo(STATES.DAMAGE);
  }

  caiNoChao() {
    this.land();
    this.changeTo(STATES.RUNNING);
    this.nJumps = 0;
  }

  estaColidindo(body) {
    const precisao = .7;

    return collideRectRect(
      this.trueX, this.trueY, this.width * precisao, this.height * precisao,
      body.trueX, body.trueY, body.width * precisao, body.height * precisao,
    );
  }
}
