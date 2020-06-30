
var mix = (superclass) => new MixinBuilder(superclass);

class MixinBuilder {
    constructor(superclass) {
        this.superclass = superclass;
    }

    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
    }
}

var Drawable = superclass => superclass.isDrawable ? superclass : class Drawable extends superclass {
    draw() { throw new Error(this.constructor.name + " must implements draw()"); }
    get isDrawable() { return true; }
    static get isDrawable() { return true; }
}
Drawable.isMixin = true;

var Updatable = superclass => superclass.isUpdatable ? superclass : class Updatable extends superclass {
    update() { throw new Error(this.constructor.name + " must implements update()"); }
    get isUpdatable() { return true; }
    static get isUpdatable() { return true; }
}
Updatable.isMixin = true;

var Playable = superclass => superclass.isPlayable ? superclass : class Playable extends superclass {
    play() { throw new Error(this.constructor.name + " must implements update()"); }
    get isPlayable() { return true; }
    static get isPlayable() { return true; }
}
Playable.isMixin = true;
