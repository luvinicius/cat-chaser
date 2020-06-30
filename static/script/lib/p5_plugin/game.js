var world = new WorldGame2D();

class ImageResource extends AbsDrawableResource {
    draw(args) {
        args.unshift(this.content);
        image(...args);
    }
}

class SoundResource extends AbsPlayableResource {
    play(args) { this.content.play(...args); }
    loop(args) { this.content.loop(...args); }
}