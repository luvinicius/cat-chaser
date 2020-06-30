class Screen2D extends Layer2D {
  constructor(width, height, orientation = Orientation2D.DEFAULT) {
    super(0, 0, width, height, orientation, undefined, undefined);
  }
}

class WorldGame2D {
  constructor(screen) { 
    this.screen = screen;
    this._gravity = 1; 
    this.speedingUp = 0; 
    this._speed = this.screen.width / 250;
  }

  gravityForceFor(body) { return (body.weight * this.gravity); }

  applyGravity(body) { body.pullDown(this.gravityForceFor(body)); }

  get speed() {
    let speed = this.scenary ? this.scenary.speed : this._speed;
    return speed + this.speedingUp;
  }

  set speed(stepSpeed) { this._speed = stepSpeed; }

  get gravity() { return this._gravity; }
  set gravity(gravity) { this._gravity = gravity; }
}

