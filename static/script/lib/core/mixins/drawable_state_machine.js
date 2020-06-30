var DrawableStateMachine = superclass => superclass.isEntity? superclass: class Entity  extends mix(superclass).with(Sprite, StateMachine) {
    changeTo(name) {
        this.changeToState(name);
        this.changeToDrawable(name);
    }
    is(name) {
        return this.currentStateName == name;
    }
    in(...names) {
        for (name in names) if (this.is(names[name])) return true;
        return false;
    }

    get isDrawableStateMachine(){return true;}
    static get isDrawableStateMachine(){return true;}
}
DrawableStateMachine.isMixin = true;