class Resources {
    put(name, resource) {
        _validate(this, ".put").expectParameter("resource", resource).toBeInstanceOf(Resource);
        resource.name = name;
        
        this[name] = resource;
    }

    draw(name) { this[name].draw(); }
    play(name) { this[name].play(); }
    loop(name) { this[name].loop(); }
}
class Resource {
    constructor(content) {
        this._content = content;
    }
    get content() { return this._content; }
    
    play() { throw new Error(`Resource ${this.name} is not Playable`); }
    loop() { throw new Error(`Resource ${this.name} is not Playable`); }
}
class AbsDrawableResource extends Drawable(Resource) {}
class AbsPlayableResource extends Playable(Resource) {}

var assets = new Resources();