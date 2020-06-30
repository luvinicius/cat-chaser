class GameObject2D {
    constructor(world, layer) {
        _validate(this, " constructor").expectParameter("world", world).toBeInstanceOf(WorldGame2D);
        _validate(this, " constructor").expectParameter("layer", layer).toBeInstanceOf(Layer2D);
        this._world = world;
        this._layerInfo = layer;
    }

    get world() { return this._world; }
    get screen() { return this._world.screen; }
    get layerInfo() { return this._layerInfo; }
    get layer() { return this._layerInfo.layer; }

    get position() { return this._layerInfo.position; }
    get size() { return this._layerInfo.size; }
    get orientation() { return this._layerInfo.orientation; }

    get scale() { return this._layerInfo.scale; }
    set scale(scale) {this._layerInfo.scale = scale;}

    get x() { return this._layerInfo.x; }
    set x(x) { this._layerInfo.x = x; }
    get y() { return this._layerInfo.y; }
    set y(y) { this._layerInfo.y = y; }

    get width() { return this._layerInfo.width; }
    set width(width) { this._layerInfo.width = width; }
    get trueWidth() { return this._layerInfo.trueWidth;}

    get height() { return this._layerInfo.height; }
    set height(height) { this._layerInfo.height = height; }
    get trueHeight() { return this._layerInfo.trueHeight;}

    get attachedToTop() { return this.orientation.attachedToTop; }
    get attachedToBottom() { return this.orientation.attachedToBottom; }
    get attachedToLeft() { return this.orientation.attachedToLeft; }
    get attachedToRight() { return this.orientation.attachedToRight; }

    get trueX() { return this._layerInfo.trueX; }
    set trueX(x) { this._layerInfo.trueX = x; }
    get trueY() { return this._layerInfo.trueY; }
    set trueY(y) { this._layerInfo.trueY = y; }

    get topY() { return this._layerInfo.topY; }
    get bottomY() { return this._layerInfo.bottomY; }
    get leftX() { return this._layerInfo.leftX; }
    get rightX() { return this._layerInfo.rightX; }
}