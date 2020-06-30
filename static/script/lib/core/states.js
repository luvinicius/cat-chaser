class State extends Updatable(Object) {

    constructor(handler = undefined) {
        super();
        this.handler = handler;
    }

    update() { if (this.handler) this.handler(); }
}

const STATES = {
    RUNNING: "running",
    JUMPPING: "jumpping",
    FALLING: "falling",
    DAMAGE_FALLING: "damageFalling",
    DAMAGE: "damage",
    OUT_OF_SCREEN: "outOfScreen",
};
State.DO_NOTHING = new State();

