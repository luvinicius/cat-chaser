
class Gota extends mix(Body2D).with(StateMachine, DrawableMachine) {
    constructor(world) {
        super(world,
            new ScreenLayer2D(
                x = 0, y = 10,
                width = world.screen.width / 10,
                height = world.screen.height / 10,
                orientation = DRAW_STRATING_POINT.BOTTOM_RIGHT),
            weight = .5,
            facing = Direction2D.LEFT);

        this.stepSpeed = 2;
        //this.addRunningState(UpdatableFames2D.cropImage(Layer2D.from(this), canvas, 7, 4, 104, 104));
    }

}

class Troll extends mix(Body2D).with(StateMachine, DrawableMachine) {
    constructor(world) {
        super(world,
            new ScreenLayer2D(world.screen,
                x = 0, y = 0,
                width = world.screen.width / 3,
                heightworld.screen.height / 3,
                orientation = DRAW_STRATING_POINT.BOTTOM_RIGHT),
            weight = 200,
            facing = Direction2D.LEFT);
        this.stepSpeed = 1;
        //this.addRunningState(UpdatableFames2D.cropImage(Layer2D.from(this), canvas, 6, 5, 400, 400, 28));
    }
}

class GotaVoadora extends mix(Body2D).with(StateMachine, DrawableMachine) {
    constructor(world) {
        super(world,
            new ScreenLayer2D(world.screen,
                x = 0, y = world.screen.height / 3,
                width = world.screen.width / 8,
                height = world.screen.height / 8,
                orientation = DRAW_STRATING_POINT.TOP_RIGHT),
            weight = .2,
            facing = Direction2D.LEFT);

        this.stepSpeed = 3;
        //this.addRunningState(UpdatableFames2D.cropImage(Layer2D.from(this), canvas, 6, 3, 200, 150, 16));
        this.defaulHeight = this.y;
    }
}