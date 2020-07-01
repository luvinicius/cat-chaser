var AbsStateMachine = superclass => superclass.isEntity ? superclass : class Entity extends superclass {
    changeTo(name) {
        this.currentStateName = name;
    }
    is(name) {
        return this.currentStateName == name;
    }
    in(...names) {
        for (name in names) if (this.is(names[name])) return true;
        return false;
    }

    get isAbsStateMachine() { return true; }
    static get isAbsStateMachine() { return true; }
}
AbsStateMachine.isMixin = true;

var StateMachine = superclass => superclass.isStateMachine ? superclass : class StateMachine extends mix(superclass).with(AbsStateMachine, Updatable) {
    constructor(...args) {
        super(...args);
        this._states_handlers = {};
    }

    addStateHandler(name, handler = undefined) {
        if (handler) {
            if (_validate(this, ".addState").expectParameter("handler", handler).toBeInstanceOf(Function)) {
                this._states_handlers[name] = handler;
            }
        }
        if (this.currentStateName == undefined) this.currentStateName = name;
        return this;
    }

    getState(name) { return this._states_handlers ? this._states_handlers[name] : undefined; }

    get currentState() { return this.currentStateName ? this.getState(this.currentStateName) : undefined; }

    update() {
        if (super.update instanceof Function) try { super.update() } catch (e) { };
        if (this.currentState instanceof Function) this.currentState();
    }

    get isStateMachine() { return true; }
    static get isStateMachine() { return true; }
}
StateMachine.isMixin = true;



var DrawableMachine = superclass => superclass.isDrawableMachine ? superclass : class Sprite extends mix(superclass).with(AbsStateMachine, Drawable, Updatable) {
    constructor(...args) {
        super(...args);
        this._drawables = {};
    }

    addDrawable(name, drawable, facingTo = undefined) {
        _validate(this, ".addDrawable").expectParameter("drawable", drawable).toBeInstanceOf(Drawable);
        if (facingTo) _validate(this, ".addDrawable").expectParameter("facingTo", facingTo).toBeInstanceOf(Direction2D);
        else facingTo = this.facing ? this.facing : Direction2D.NONE;

        if (this.currentStateName == undefined) this.currentStateName = name;
        if (!this._drawables[name]) this._drawables[name] = {};
        this._drawables[name][facingTo] = drawable;
        return this;
    }

    getDrawable(name) { return this._drawables[name][this.facing ? this.facing : Direction2D.NONE]; }

    get currentDrawable() { return this.currentStateName ? this.getDrawable(this.currentStateName) : undefined; }


    update() {
        if (super.update instanceof Function) try { super.update() } catch (e) { };
        if (this.currentDrawable && this.currentDrawable.update instanceof Function) this.currentDrawable.update();
    }

    draw() { if (this.currentDrawable) this.currentDrawable.draw();}

    get isDrawableMachine() { return true; }
    static get isDrawableMachine() { return true; }
}
DrawableMachine.isMixin = true;