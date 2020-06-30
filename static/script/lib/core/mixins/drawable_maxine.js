var DrawableMachine = superclass => superclass.isDrawableMachine ? superclass : class Sprite extends mix(superclass).with(Drawable, Updatable) {
    constructor(...args) {
        super(...args);
        this._drawables = {};
    }

    addDrawable(name, drawable, facingTo = undefined) {
        _validate(this, ".addDrawable").expectParameter("drawable", drawable).toBeInstanceOf(Drawable);
        if (facingTo) _validate(this, ".addDrawable").expectParameter("facingTo", facingTo).toBeInstanceOf(Direction2D);
        else facingTo = this.facing ? this.facing : Direction2D.NONE;

        if (this.currentDrawableName == undefined) this.currentDrawableName = name;
        if (!this._drawables[name]) this._drawables[name] = {};
        this._drawables[name][facingTo] = drawable;
        return this;
    }

    getDrawable(name) { return this._drawables[name][this.facing ? this.facing : Direction2D.NONE]; }

    get currentDrawable() { return this.currentDrawableName ? this.getDrawable(this.currentDrawableName) : undefined; }

    changeToDrawable(name) { this.currentDrawableName = name; }

    update() {
        if (super.update instanceof Function) try { super.update() } catch (e) { };
        if (this.currentDrawable != undefined && this.currentDrawable.update instanceof Function) this.currentDrawable.update();
    }

    draw() {
        if (this.currentDrawable != undefined) this.currentDrawable.draw();
    }

    get isDrawableMachine() { return true; }
    static get isDrawableMachine() { return true; }
}
DrawableMachine.isMixin = true;