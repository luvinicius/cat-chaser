
class Paralax2D extends mix(Object).width(Drawable, Updatable) {
  constructor(world, frameList, direction, speed = undefined) {
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

      for (index in this.frameList) {
        if (direction.in(Direction2D.FRONT, Direction2D.BACK)) {
          let frame = this.frameList[index];
          frame.layer.inicitialScale = frame.layer.scale;
        }
      }
    }

    this.speed = speed ? speed : 1;

  }

  get screen() { return this.world.screen; }

  get speed() { return this.world.speed * this._speed; }

  updateFrame(frame) {
    if (!frame.position instanceof RelativePosition2D) {
      if (direction.is(Direction2D.UP)) {
        frame.layer.trueY -= this.speed;
      }
      if (direction.is(Direction2D.DOWN)) {
        frame.layer.trueY += this.speed;
      }


      if (direction.is(Direction2D.LEFT)) {
        frame.layer.trueX -= this.speed;
      }
      if (direction.is(Direction2D.RIGHT)) {
        frame.layer.trueX += this.speed;
      }
    }
    if (direction.is(Direction2D.FRONT)) {
      frame.layer.scale += this.speed;
      if (frame.layer.width > this.screen.width
        && frame.layer.height > this.screen.height) {
        frame.layer.scale = frame.layer.inicitialScale;
      }
    }
    if (direction.is(Direction2D.BACK)) {
      frame.layer.scale -= this.speed;
      if (frame.layer.scale < 0) frame.layer.scale = frame.layer.inicitialScale;
    }
  }

  update() {
    for (index in this.frameList) {
      this.updateFrame(this.frameList[index]);
    }
  }

  draw() {
    this.frameList.draw();
  }

}


class Floor2D extends Updatable(GameObject2D) {
  constructor(world, layer, stepSpeed) {
    super(world, layer);
    this._stepSpeed = stepSpeed;
  }

  get stepSpeed() { return world.speed + this._stepSpeed; }

  isAbove(entity) {

  }
  isBellow(entity) {

  }
  in(entity) {

  }
  update() { }
  draw() { }

}



class Scenary2D extends DrawableStateMachine(GameObject2D) {
  constructor(layer) {
    super(layer);
    this._paralax = [];
    this._floors = [];
    this._entities = [];
    this._applyGravity = [];
    this._checkColisions = [];
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
    _validate(this, ".pushEntity").expectParameter("entity", entity).toBeInstanceOf(DrawableStateMachine);
    ExpectedInstance.expect(this, entity, DrawableStateMachine, ".pushEntity must recieve a entity that implements Entity");
    if (!this._entities.includes(entity)) this._entities.push(entity);
    return this;
  }

  applyGravity(body) {
    _validate(this, ".applyGravity").expectParameter("body", body).toBeInstanceOf(Body);
    ExpectedInstance.expect(this, body, Body, ".applyGravity must recieve a body that implements Body");
    this.pushEntity(body);
    this._applyGravity.push(body);
    return this;
  }

  checkColisions(body) {
    _validate(this, ".applyGravity").expectParameter("body", body).toBeInstanceOf(Body);
    this.pushEntity(body);
    this._checkColisions.push(body);
    return this;
  }

  getFlowBellow(entity) { return this._floors.filter(floor => floor.isBellow(entity))[0]; }

  update() {
    for (background in this._paralax) { background.update(); }
    for (floor in this._floors) { floor.update(); }
    for (entity in this._entities) {
      if (this._applyGravity.includes(entity)) {
        let floorBellow = this.getFlowBellow(entity);
        if (!floorBellow || entity.trueY > floorBellow.topY) {
          mundo.applyGravity(entity);
          if (floorBellow && entity.trueY <= floorBellow.topY) {
            entity.land(floorBellow);
          }
        }
      }

      if (this._checkColisions.includes(entity)) {

        for (other in this._entities) {
          if (other != entity && entity.isColliding(other) && entity.colide instanceof Function) {
            entity.colide(other);
          }
        }
      }
      entity.update();
    }
  }

  draw() {
    for (background in this._paralax) { background.draw(); }
    for (floor in this._floors) { floor.draw(); }
    for (entity in this._entities) { entity.draw(); }
  }
}

