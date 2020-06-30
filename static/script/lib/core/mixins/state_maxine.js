var StateMachine = superclass => superclass.isStateMachine ? superclass : class StateMachine extends mix(superclass).with(Updatable) {
    constructor(...args) {
        super(...args);
        this._states = {};
    }

    addState(name, state) {
        _validate(this, ".addState").expectParameter("state", state).toBeInstanceOf(Updatable);
        if (this.currentStateName == undefined) this.currentStateName = name;
        this._states[name] = state;
        return this;
    }

    getState(name) { return this._states ? this._states[name] : undefined; }

    get currentState() { return this.currentStateName ? this.getState(this.currentStateName) : undefined; }

    changeToState(name) { this.currentStateName = name; }

    update() {
        if (super.update instanceof Function) try { super.update() } catch (e) { };
        if (this.currentState != undefined) this.currentState.update();
    }

    isUpdatable() { return true; }

    get isStateMachine() { return true; }
    static get isStateMachine() { return true; }
}
StateMachine.isMixin = true;