class Fase1 extends Scenary2D {
    constructor(world) {
        super(world);
        let backgroundFrames = new Frame2DList();
        
        backgroundFrames.push(new Frame2D(
            /*layerInfo*/ Layer2DFactory.fromScreen(world.screen),
            /*drarableResource*/ resources[IMGS.FLORESTA]));
        backgroundFrames.append(new Frame2D(
            /*layerInfo*/ Layer2DFactory.fromScreen(world.screen),
            /*drarableResource =*/ resources[IMGS.FLORESTA]),
            /*xpad*/ world.screen.width);
        let paralax = new Paralax2D(world,
            /*layer*/ LAYERS.FUNDO_CENARIO,
            /*frameList*/ backgroundFrames,
            /*direction*/ Direction2D.LEFT);

        this.pushParalax(paralax);
    }
}