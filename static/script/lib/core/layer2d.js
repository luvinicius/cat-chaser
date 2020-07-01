
class Orientation2D {
    constructor(attachedToTop, attachedToLeft) {
        this._attachedToTop = attachedToTop;
        this._attachedToLeft = attachedToLeft;
    }
    get attachedToTop() { return this._attachedToTop; }
    get attachedToBottom() { return !this._attachedToTop; }
    get attachedToLeft() { return this._attachedToLeft; }
    get attachedToRight() { return !this._attachedToLeft; }
}

Orientation2D.TOP_LEFT = new Orientation2D(true, true);
Orientation2D.TOP_RIGHT = new Orientation2D(true, false);
Orientation2D.BOTTOM_LEFT = new Orientation2D(false, true);
Orientation2D.BOTTOM_RIGHT = new Orientation2D(false, false);
Orientation2D.DEFAULT = Orientation2D.TOP_LEFT;

class Position2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class RelativePosition2D extends Position2D {
    constructor(position, xpad = undefined, ypad = undefined) {
        super(undefined, undefined);
        this.position = position;
        this.xpad = xpad ? xpad : 0;
        this.ypad = ypad ? ypad : 0;
    }

    get x() { return this.position.x + xpad; }
    get y() { return this.position.y + ypad; }
}

class Size2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Scale2D {
    constructor(value) { this.value = value; }
}

class LayerPosition {
    constructor(position) { this.position = position; }
}

class Layer2D {
    constructor(x, y, width, height, position = undefined, size = undefined) {
        if (position === undefined) {
            this._position = new Position2D(x, y);
        } else if (_validate(this, " constructor").expectParameter("position", position).toBeInstanceOf(Position2D)) {
            this._position = position;
        }

        if (size === undefined) {
            this._size = new Size2D(width, height);
        } else if (_validate(this, " constructor").expectParameter("size", size).toBeInstanceOf(Size2D)) {
            this._size = size;
        }

        this._scale = new Scale2D(1);
        this._layer = new LayerPosition(0);
        this._orientation = Orientation2D.DEFAULT;
    }

    get position() { return this._position; }
    set position(position) {
        if (_validate(this, "  position setter").expectParameter("position", position).toBeInstanceOf(Position2D)) {
            this._position = position;
        }
    }
    get size() { return this._size; }

    get layer() { return this._layer; }
    set layer(layer) {
        if (_validate(this, " layer setter").expectParameter("layer", layer).toBeInstanceOf(LayerPosition)) {
            this._layer = layer;
        }
    }


    get orientation() { return this._orientation; }

    get scale() { return this._scale.value; }
    set scale(scale) {
        if (typeof (scale) == "number") {
            this._scale.value = scale;
        } else if (_validate(this, " scale setter").expectParameter("scale", scale).toBeInstanceOf(Scale2D)) {
            this._scale = scale;
        }
    }

    get x() { return this._position.x; }
    set x(x) { this._position.x = x; }
    get y() { return this._position.y; }
    set y(y) { this._position.y = y; }

    get width() { return this._size.width; }
    set width(width) { this._size.width = width; }

    get height() { return this._size.height; }
    set height(height) { this._size.height = height; }

    get trueWidth() { return this.width * this.scale; }
    get trueHeight() { return this.height * this.scale; }

    get attachedToTop() { return this.orientation.attachedToTop; }
    get attachedToBottom() { return this.orientation.attachedToBottom; }
    get attachedToLeft() { return this.orientation.attachedToLeft; }
    get attachedToRight() { return this.orientation.attachedToRight; }


    get trueX() { return this.x; }
    set trueX(x) { this.x = x; }


    get trueY() { return this.y; }
    set trueY(y) { this.y = y; }

    get topY() { return this.trueY; }
    get bottomY() { return this.trueY + this.trueHeight; }
    get leftX() { return this.trueX; }
    get rightX() { return this.trueX + this.trueWidth; }
}

class Layer2DFactory {
    static from(container) {
        _validate(Layer2DFactory, " .from")
            .expectParameter("container", container)
            .withKeys("screen", "position", "size", "layer", "orientation", "width", "height", "scale", "layer");

        return this.fromObj(
            container.screen,
            container.position,
            container.size,
            container.layer,
            container.scale,
            container.orientation);
    }

    static fromObj(screen, position, size, layer = undefined, scale = undefined, orientation = undefined) {
        return new Layer2D(screen, undefined, undefined, undefined, undefined, layer, scale, orientation, position, size, layer);
    }

    static fromXYWH(screen, x, y, width, height, layer = undefined, scale = undefined, orientation = undefined) {
        return new Layer2D(screen, x, y, width, height, layer, scale, orientation, undefined, undefined, layer)
    }

    static fromScreen(screen, layer = undefined) {
        return new Layer2D(0, 0, screen.width, screen.height, layer);
    }
}