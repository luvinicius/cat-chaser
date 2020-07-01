
class Paralax2D extends mix(Object).with(Drawable, Updatable) {
  constructor(world, layer, frameList, direction, speed = undefined) {
    super();
    this.layer = layer;
    if (_validate(this, " constructor")
      .expectParameter("world", world)
      .toBeInstanceOf(WorldGame2D)) {
      this.world = world;
    }
    if (_validate(this, " constructor")
      .expectParameter("frameList", frameList)
      .toBeInstanceOf(Frame2DList)) {
      this.frameList = frameList;
    }
    if (_validate(this, " constructor")
      .expectParameter("direction", direction)
      .toBeInstanceOf(Direction2D)) {
      this.direction = direction;

      for (let index in this.frameList) {
        if (direction.in(Direction2D.FRONT, Direction2D.BACK)) {
          let frame = this.frameList[index];
          frame.layer.inicitialScale = frame.layer.scale;
        }
      }
    }

    this._speed = speed ? speed : 1;

  }

  get screen() { return this.world.screen; }

  get speed() { return this.world.speed * this._speed; }

  updateFrame(frame) {
    if (!frame.position instanceof RelativePosition2D) {
      if (this.direction.is(Direction2D.UP)) {
        frame.layer.trueY -= this.speed;
      }
      if (this.direction.is(Direction2D.DOWN)) {
        frame.layer.trueY += this.speed;
      }


      if (this.direction.is(Direction2D.LEFT)) {
        frame.layer.trueX -= this.speed;
      }
      if (this.direction.is(Direction2D.RIGHT)) {
        frame.layer.trueX += this.speed;
      }
    }
    if (this.direction.is(Direction2D.FRONT)) {
      frame.layer.scale += this.speed;
      if (frame.layer.width > this.screen.width
        && frame.layer.height > this.screen.height) {
        frame.layer.scale = frame.layer.inicitialScale;
      }
    }
    if (this.direction.is(Direction2D.BACK)) {
      frame.layer.scale -= this.speed;
      if (frame.layer.scale < 0) frame.layer.scale = frame.layer.inicitialScale;
    }
  }

  update() {
    for (let index in this.frameList) {
      this.updateFrame(this.frameList[index]);
    }
  }

  draw() {
    this.frameList.draw();
  }

}


class Floor2D extends Updatable(GameObject2D) {
  constructor(world, layerInfo, stepSpeed) {
    super(world, layerInfo);
    this._stepSpeed = stepSpeed;
  }

  get stepSpeed() { return jogo.speed + this._stepSpeed; }

  isAbove(entity) {

  }
  isBellow(entity) {

  }
  in(entity) {

  }
  update() { }
  draw() { }

}



class Scenary2D extends mix(GameObject2D).with(Updatable, Drawable) {
  constructor(world) {
    super(world, Layer2DFactory.fromScreen(world.screen));
    this._paralax = [];
    this._floors = [];
    this._entities = [];
    this._applyGravity = [];
    this._checkColisions = [];
    this._drawEntities = [];
  }

  pushParalax(paralax) {
    _validate(this, ".pushParalax").expectParameter("paralax", paralax).toBeInstanceOf(Paralax2D);
    this._paralax.push(paralax); return this;
  }

  pushFloor(floor) {
    _validate(this, ".pushFloor").expectParameter("floor", floor).toBeInstanceOf(Floor2D);
    this._floors.push(floor);
    this._floors.sort((floorA, floorB) => floorB.trueY - floorA.trueY);
  }

  pushEntity(entity) {
    _validate(this, ".pushEntity").expectParameter("entity", entity).toBeInstanceOf(Updatable);

    if (!this._entities.includes(entity)) this._entities.push(entity);
    return this;
  }

  applyGravity(body) {
    _validate(this, ".applyGravity").expectParameter("body", body).toBeInstanceOf(Body2D);

    this.pushEntity(body);
    this._applyGravity.push(body);
    return this;
  }

  checkColisions(body) {
    _validate(this, ".applyGravity").expectParameter("body", body).toBeInstanceOf(Body2D);
    this.pushEntity(body);
    this._checkColisions.push(body);
    return this;
  }

  getFlowBellow(entity) { return this._floors.filter(floor => floor.isBellow(entity))[0]; }

  update() {
    this._paralax.forEach(paralax => paralax.update());
    this._floors.forEach(floor => floor.update());
    for (let i in this._entities) {
      let entity = this._entities[i];

      if (this._applyGravity.includes(entity)) {
        let floorBellow = this.getFlowBellow(entity);
        if (!floorBellow || entity.trueY > floorBellow.topY) {
          this.world.applyGravity(entity);
          if (floorBellow && entity.trueY <= floorBellow.topY) {
            entity.land(floorBellow);
          }
        }
      }

      if (this._checkColisions.includes(entity)) {
        for (let j in this._entities) {
          let other = this._entities[j];
          if (other != entity && other instanceof Body2D
            && entity.isColliding(other)
            && entity.colide instanceof Function) {
            entity.colide(other);
          }
        }
      }
      entity.update();
    }
  }

  draw(entity = undefined) {
    if (entity) {
      _validate(this, ".draw").expectParameter("entity", entity).toBeInstanceOf(Drawable);
      this._drawEntities.push(entity);
    } else {
      this._paralax.forEach(paralax => paralax.draw());
      this._floors.forEach(floor => floor.draw());
      this._drawEntities.forEach(entity => entity.draw());
    }

  }
}
