
class Gota extends Runnable(Character) {
    constructor(canvas) {
        super(new Layer2D(0, 10, width / 10, height / 10, DRAW_STRATING_POINT.BOTTOM_RIGHT));
        this.weight = .5;
        this.stepSpeed = 2;
        this.addRunningState(UpdatableFames2D.cropImage(Layer2D.from(this), canvas, 7, 4, 104, 104));
    }

}

class Troll extends Runnable(Character) {
    constructor(canvas) {
        super(new Layer2D(0, 0, width / 3, height / 3, DRAW_STRATING_POINT.BOTTOM_RIGHT));
        this.weight = 200;
        this.stepSpeed = 1;
        this.addRunningState(UpdatableFames2D.cropImage(Layer2D.from(this), canvas, 6, 5, 400, 400, 28));
    }
}

class GotaVoadora extends mix(Character).with(Runnable) {
    constructor(canvas) {
        super(new Layer2D(0, height / 3, width / 8, height / 8, DRAW_STRATING_POINT.TOP_RIGHT));
        this.weight = .2;
        this.stepSpeed = 3;
        this.addRunningState(UpdatableFames2D.cropImage(Layer2D.from(this), canvas, 6, 3, 200, 150, 16));
        this.defaulHeight = this.y;
    }
}