function init_pixi ()
{
    let type="WebGL";

    if ( !PIXI.utils.isWebGLSupported () )
    {
        type = "canvas";
    }

    PIXI.utils.sayHello ( type );

    pixi_app = new PIXI.Application (
    {
        width  : w,
        height : h
    });

    texture = PIXI.Texture.fromBuffer ( undefined, w, h );

    //let sprite = PIXI.Sprite.from ( texture );
    let sprite = PIXI.Sprite.from("test.png");
    pixi_app.stage.addChild ( sprite );

    let shaderCode = shaders.get("simple.frag");
    let shader = new PIXI.Filter ( undefined, shaderCode, {} );
    sprite.filters = [ shader ];

    pixi_app.ticker.add ( () =>
    {
    });

    document.getElementById ( "canvas_div" ).appendChild ( pixi_app.view );
    return pixi_app;
}


