class Body2D extends GameObject2D {
    constructor(world, layerInfo, weight, facing = undefined) {
        super(world, layerInfo);

        this.weight = weight;

        if (facing) {
            _validate(this, " constructor").expectParameter("facing", facing).toBeInstanceOf(Direction2D);
            this.facing = undefined;
        } else {
            this.facing = Direction2D.NONE;
        }

        this.collisionPrecision = .7;
        this._speedDown = 0;
        this._speedRight = 0;
        this._speedScale = 0;
    }
    get speedUp() { return -this._speedDown; }
    set speedUp(speedUp) { this._speedDown = -speedUp; }
    get speedDown() { return this._speedDown; }
    set speedDown(speedDown) { this._speedDown = speedDown; }
    get speedRight() { return this._speedRight; }
    set speedRight(speedRight) { this._speedRight = speedRight; }
    get speedLeft() { return -this._speedRight; }
    set speedLeft(speedLeft) { this._speedRight = -speedLeft; }

    pullUp(force) { this._speedDown -= force; }
    pullDown(force) { this._speedDown += force; }
    pullRight(force) { this._speedRight += force; }
    pullLeft(force) { this._speedRight -= force; }
    pullFront(force) { this._speedScale += force; }
    pullBack(force) { this._speedScale -= force; }

    pullTo(force, direction) {
        if (_validate(this, ".pullTo").expectParameter("direction", direction).toBeInstanceOf(Direction2DFactory)) {
            if (direction.is(Direction2D.UP)) {
                this.pullUp(force);
            }
            if (direction.is(Direction2D.DOWN)) {
                this.pullDown(force);
            }
            if (direction.is(Direction2D.RIGHT)) {
                this.pullRight(force);
            }
            if (direction.is(Direction2D.LEFT)) {
                this.pullLeft(force);
            }
            if (direction.is(Direction2D.FRONT)) {
                this.pullFront(force);
            }
            if (direction.is(Direction2D.BACK)) {
                this.pullBack(force);
            }
        }
    }
    pull(force) { this.pullTo(force, this.facing); }

    applyForces() {
        if (this._speedDown != 0) this.trueY += this._speedDown;
        if (this._speedRight != 0) this.trueX += this._speedRight;
        if (this._speedScale != 0) {
            this.trueX -= this.trueWidth - this.width * this._speedScale;
            this.trueY -= this.trueHeight - this.height * this._speedScale;
            this.scale += this._speedScale;
            this.layer += this._speedScale;
        }

        if (this.scale < 0) this.scale = 0;

        if (this.rightX < 0) this.getOutOfScreen(Direction2D.LEFT);
        if (this.leftX > this.screen.width) this.getOutOfScreen(Direction2D.RIGHT);
        if (this.bottomY < 0) this.getOutOfScreen(Direction2D.UP);
        if (this.topY > this.screen.height) this.getOutOfScreen(Direction2D.BOTTOM);

        if (this.scale == 0) this.getOutOfScreen(Direction2D.BACK);
        if (this.width > this.screen.width && this.height > this.screen.height) {
            this.getOutOfScreen(Direction2D.FRONT);
        }
    }

    getOutOfScreen(direction) { }

    isStoped() { return this._speedDown === 0 && this._speedRight === 0 && this._speedScale === 0 }

    land(floor = undefined) {
        this.trueY = this.getThisYGround(floor);
        this.speedDown = 0;
    }

    update() {
        this.applyForces();
        super.update();
    }

    isColliding(body) {
        return collideRectRect(
            this.trueX, this.trueY, this.trueWdth * this.collisionPrecision, this.trueHeight * this.collisionPrecision,
            body.trueX, body.trueY, body.trueWidth * body.collisionPrecision, body.trueHeight * body.collisionPrecision,
        );
    }

    colide(body) { }
}