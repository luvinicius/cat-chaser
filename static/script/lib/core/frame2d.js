class Frame2D extends Drawable(Object) {

    constructor(layer, drawableResource, delay = undefined) {
        super();
        _validate(this, " constructor").expectParameter("layer", layer).toBeInstanceOf(Layer2D);
        _validate(this, " constructor").expectParameter("drawableResource", drawableResource).toBeInstanceOf(AbsDrawableResource);
        this._layer = layer;
        this._drawableResource = drawableResource;
        this.delay = delay ? delay : 1;
    }

    get layer() { return this._layer; }

    isRelativeTo(frame) {

    }

    get drawableResource() { return this._drawableResource; }

    draw(...args) {
        this.drawableResource.scale = this._layer.scale;
        this.drawableResource.draw(this._layer.trueX, this._layer.trueY,
            this._layer.trueWidth, this._layer.trueHeight, ...args);
    }
}

class CropedFrame2D extends Frame2D {
    constructor(layer, canvas,
        cropWidth, cropHeight, nline, ncolumn,
        delay = undefined) {
        super(layer, canvas, delay);
        this.cropWidth = cropWidth;
        this.cropHeight = cropHeight;
        this.cropX = ncolumn * cropWidth;
        this.cropY = nline * cropHeight;
    }

    draw() {
        super.draw(this.cropX, this.cropY, this.cropWidth, this.cropHeight);
    }
}

class FramesFactory {
    static cropDrawable(layer, drawableResource, nlines, ncolumns, cropWidth, cropHeight, nframes = undefined, startingFrame = undefined, defaultFrameDelay = undefined, finishHandler = undefined) {
        _validate(FramesFactory, ".cropImage").expectParameter("layer", layer).toBeInstanceOf(Layer2D);
        _validate(FramesFactory, ".cropImage").expectParameter("drawableResource", drawableResource).toBeInstanceOf(AbsDrawableResource);
        let frames = new Fames2DAnimation(defaultFrameDelay, finishHandler);

        if (!cropWidth) cropWidth = frames.width;
        if (!cropHeight) cropHeight = frames.height;

        if (!startingFrame) startingFrame = 0;
        if (!nframes || nframes + startingFrame > nlines * ncolumns) nframes = nlines * ncolumns - startingFrame;


        for (let line = 0; line < nlines; line++) {
            for (let column = 0; column < ncolumns; column++) {
                let currentFrame = line * ncolumns + column + 1;
                if (currentFrame > startingFrame) {
                    let frame = new CropedFrame2D(
                        layer, drawableResource,
                        cropWidth, cropHeight, line, column,
                        frames.defaultFrameDelay
                    );
                    frames.push(frame);
                }
                if (frames.length > nframes) break;
            }
            if (frames.length > nframes) break;
        }
        return frames;
    }

    static animate(frameList, defaultFrameDelay = undefined, finishHandler = undefined) {
        _validate(FramesFactory, ".animate").expectParameter("frameList", frameList).toBeInstanceOf(Frame2DList);
        let frames = new Fames2DAnimation(defaultFrameDelay, finishHandler);
        frames.concat(frameList);
        return frames;
    }

    static screenFrame(screen, drawableResource) {
        return new Frame2D(Layer2DFactory.fromScreen(screen), drawableResource);
    }


}

class Frame2DList extends Drawable(Array) {
    constructor() {
        super();
    }

    push(frame) {
        _validate(this, " .add").expectParameter("frame", frame).toBeInstanceOf(Frame2D);
        super.push(frame);
    }

    appendRelativeToLast(frame, xpad = undefined, ypad = undefined) {
        let last = this.last;
        if (last) frame.layer.position = new RelativePosition2D(last.layer.position, xpad, ypad);
        this.push(frame);
    }

    append(frame, xpad = undefined, ypad = undefined) {
        let last = this.last;
        if (last) {
            frame.layer.position.x += xpad;
            frame.layer.position.y += ypad;
        }
        this.push(frame);
    }

    getRelativeTo(frame) {
        let relatives = [];
        this.forEach(frame => { frame.draw(); });

        return relatives;
    }

    get last() {
        return this.length > 0 ? this[this.length - 1] : undefined;
    }

    get first() {
        return this[0];
    }

    drawAll() {
        this.forEach(frame => { frame.draw(); });
    }

    draw() {
        this.drawAll();
    }
}

class Fames2DAnimation extends Updatable(Frame2DList) {
    constructor(defaultFrameDelay = undefined, finishHandler = undefined) {
        super();
        this.defaultFrameDelay = defaultFrameDelay ? defaultFrameDelay : 1;
        this._frameIndex = 0;
        this._timeInFrame = 0;
        this.finishHandler = finishHandler;
    }

    get frame() { return this[this._frameIndex]; }

    update() {
        this._timeInFrame++;
        if (this._timeInFrame > this.frame.delay) {
            this._frameIndex++;
            this._timeInFrame = 0;

            if (this._frameIndex >= this._frames.length - 1) {
                if (this.finishHandler instanceof Function) this.finishHandler();
                this._frameIndex = 0;
            }
        }
    }

    draw() { this.frame.draw(); }
}