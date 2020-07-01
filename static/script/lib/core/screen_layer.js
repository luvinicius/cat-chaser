class ScreenLayer2D extends Layer2D {
    constructor(screen, x, y, width, height, layer = undefined, scale = undefined, orientation = undefined, position, size) {
        super(x, y, width, height, position, size);

        if (_validate(this, " constructor").expectParameter("screen", screen).toBeInstanceOf(Screen2D)) {
            this._screen = screen;
        }

        if (layer) {
            if (typeof (layer) == "number") {
                this._layer = new LayerPosition(layer);
            } else if (_validate(this, " constructor").expectParameter("layer", layer).toBeInstanceOf(LayerPosition)) {
                this._layer = layer;
            }
        }

        if (scale) {
            if (typeof (scale) == "number") {
                this._scale = new Scale2D(scale);
            } else if (_validate(this, " constructor").expectParameter("scale", scale).toBeInstanceOf(Scale2D)) {
                this._scale = scale;
            }
        }

        if (orientation) {
            if (_validate(this, " constructor").expectParameter("orientation", orientation).toBeInstanceOf(Orientation2D)) {
                this._orientation = orientation;
            }
        }
    }

    get screen() { return this._screen; }
    set screen(screen) {
        if (_validate(this, " constructor").expectParameter("screen", screen).toBeInstanceOf(Screen2D)) {
            this._layer = layer;
        }
    }

    get splitX() { return (this.screen.width - (this.trueWidth + this.x)); }
    get trueX() { return this.attachedToLeft ? this.x : this.splitX; }
    set trueX(x) { this.x = this._attachedToLeft ? x : this.screen.width - (x + this.trueWidth); }

    get splitY() { return (this.screen.height - (this.trueHeight + this.y)); }
    get trueY() { return this.attachedToTop ? this.y : this.splitY; }
    set trueY(y) { this.y = this._attachedToTop ? y : this.screen.height - (y + this.trueHeight) }

    get topY() { return this.trueY; }
    get bottomY() { return this.trueY + this.trueHeight; }
    get leftX() { return this.trueX; }
    get rightX() { return this.trueX + this.trueWidth; }
}