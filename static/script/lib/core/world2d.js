class Screen2D extends Size2D {
  constructor(width, height) {
    super(width, height);
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

  set speed(speed) {
    if (this.scenary) {
      this.scenary.speed = speed;
    } else {
      this._speed = stepSpeed;
    }
  }

  get gravity() { return this._gravity; }
  set gravity(gravity) { this._gravity = gravity; }

  update() {
    if (this.menu) this.menu.update();
    else if (this.scenary) this.scenary.update();
  }

  draw() {
    if (this.scenary) this.scenary.draw();
    if (this.menu) this.menu.update();

  }

  resume(scenary = undefined) { if (scenary) this.scenary = scenary; }
  stop() { }
  pause(menu, resume_scenary = false) {
    this.stop();
    this.menu = menu;
    if (resume_scenary) {
      this.scenary = undefined;
    }
  }
  game_over(menu, resume_scenary = false) {
    this.stop();
    this.menu = menu;
    if (resume_scenary) {
      this.scenary = undefined;
    }
  }
  end(menu, resume_scenary = false) {
    this.stop();
    this.menu = menu;
    if (resume_scenary) {
      this.scenary = undefined;
    }
  }

  quit() {
    this.stop();
  }
}
