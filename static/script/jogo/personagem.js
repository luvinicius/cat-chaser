class Personagem extends mix(Body2D).with(StateMachine, DrawableMachine) {
  constructor(world) {
    super(world,
      new ScreenLayer2D(world.screen,
        /*x*/ 0, /*y*/ 10,
        /*width*/ world.screen.width / 5,
        /*height*/ world.screen.height / 5,
        /*layer*/ LAYERS.PERSONAGEM, /*scale*/ 1,
        /*orientation*/ Orientation2D.BOTTOM_LEFT),
      /*weight*/ 10,
      /*facing*/ Direction2D.RIGHT);

    const IMG_CROP = 512;

    let animacaoCorrendo = FramesFactory.cropDrawable(
      /*layerInfo*/         this.layerInfo,
      /*drawableResource*/  resources[IMGS.PERSONAGEM],
      /*nlines*/ 1,           /*ncolumns*/ 10,
      /*cropWidth*/ IMG_CROP, /*cropHeight*/ IMG_CROP,
      /*nframes*/undefined,   /*startingFrame*/1);

    this.addDrawable(STATES.RUNNING, animacaoCorrendo);

    let imagemParado = new CropedFrame2D(
      /*layerInfo*/         this.layerInfo,
      /*drawableResource*/  resources[IMGS.PERSONAGEM],
      /*cropWidth*/ IMG_CROP, /*cropHeight*/ IMG_CROP,
      /*line*/ 0,             /*column*/ 0);

    this.addStateHandler(STATES.JUMPPING, () => { if (this.speedUp <= 0) this.changeTo(STATES.FALLING); });

    this.addDrawable(STATES.JUMPPING, imagemParado);
    this.addDrawable(STATES.FALLING, imagemParado);
    this.addDrawable(STATES.DAMAGE_FALLING, imagemParado);
    this.addDrawable(STATES.DAMAGE, imagemParado);

    this.foot = 10;
    this.nJumps = 0;
    this.somDoPulo = resources[SOUNDS.PULO];
  }

  pula() {
    if (this.in(STATES.RUNNING, STATES.JUMPPING, STATES.FALLING) && this.nJumps < 2) {
      this.changeTo(STATES.JUMPPING);
      this.nJumps++;
      this.somDoPulo.play();

      let jumpForce = this.weight * 5;
      if (this.is(STATES.RUNNING)) jumpForce += this.world.gravityForceFor(this);
      this.pullUp(jumpForce);
    }
  }

  receberDano() {
    if (this.in(STATES.JUMPPING, STATES.FALLING)) this.changeTo(STATES.DAMAGE_FALLING);
    else this.changeTo(STATES.DAMAGE);
  }

  land() {
    super.land();
    this.changeTo(STATES.RUNNING);
    this.nJumps = 0;
  }

  colide(body) {
    // TODO
  }
}
