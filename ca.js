const w = 512;
const h = 512;

let pixi_app;

let texture;

function page_loaded () 
{
    console.log ( "Cellular Automata starting..." );

    init_pixi ();
}

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

    pixi_app.ticker.add ( () =>
    {
    });

    document.getElementById ( "canvas_div" ).appendChild ( pixi_app.view );
    return pixi_app;
}

