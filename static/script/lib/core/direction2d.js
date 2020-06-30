class Direction2D {
    constructor(description, degree, ...composition = undefined, freezedDegree = undefined) {
        this._degree = degree;
        if (composition) {
            composition.forEach(direction => {
                _validate(this, " constructor").expectParameter("composition", direction).toBeInstanceOf(Direction2D);
            });
            this._composition = composition;
        } else {
            this._description = description;
        }
        this._freezedDegree = freezedDegree ? freezedDegree : false;
    }

    get degree() { return this.degree; }
    set degree(degree) { if (!this._freezedDegree) this._degree = degree; }

    get description() {
        return this._composition
            ? this._composition.reduce((direction, next) => direction.description + " and " + next.description)
            : this._description;
    }

    is(direction) {
        if (this._composition) {
            for (i in this._composition) {
                if (this._composition[i] === direction) return true;
            }
            return false;
        } else if (direction instanceof Direction2D) {
            return this.direction.description == direction.description;
        } else if (typeof (direction) === "string") {
            return this.direction.description === direction;
        }
        return false;
    }

    in(...direction) {
        for (index in direction) if (this.is(direction[index])) return true;
        return false;
    }
}

class Direction2DFactory {
    static UP(degree, freezedDegree = undefined) {
        return new Direction2D("UP", degree, freezedDegree);
    }
    static DOWN(degree, freezedDegree = undefined) {
        return new Direction2D("DOWN", degree, freezedDegree);
    }
    static RIGHT(degree, freezedDegree = undefined) {
        return new Direction2D("RIGHT", degree, freezedDegree);
    }
    static LEFT(degree, freezedDegree = undefined) {
        return new Direction2D("LEFT", degree, freezedDegree);
    }
    static FRONT(degree, freezedDegree = undefined) {
        return new Direction2D("FRONT", degree, freezedDegree);
    }
    static BACK(degree, freezedDegree = undefined) {
        return new Direction2D("BACK", degree, freezedDegree);
    }
    static composedBy(...directions) {
        return new Direction2D(undefined, 0, directions);
    }
}

Direction2D.UP = Direction2DFactory.UP(0, true);
Direction2D.DOWN = Direction2DFactory.DOWN(0, true);
Direction2D.RIGHT = Direction2DFactory.RIGHT(0, true);
Direction2D.LEFT = Direction2DFactory.LEFT(0, true);
Direction2D.FRONT = Direction2DFactory.FRONT(0, true);
Direction2D.BACK = Direction2DFactory.BACK(0, true);
Direction2D.NONE = new Direction2D("None", 0, true);