let textures = [];
let pixi_app;
let sprite;
let uniforms = {
    curr : undefined,
    prev : undefined,
};

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

    textures = [ PIXI.Texture.from ( "test.png" ),
                 PIXI.Texture.from ( "test.png" ) ];

    
    sprite = PIXI.Sprite.from( PIXI.Texture.fromBuffer ( undefined, w, h ) );
    pixi_app.stage.addChild ( sprite );

    pixi_app.ticker.add ( () =>
    {
        let t = textures.shift ();
        textures.push ( t );

        uniforms.curr = textures [ 0 ];
        uniforms.prev = textures [ 1 ];

    });

    document.getElementById ( "canvas_div" ).appendChild ( pixi_app.view );
    return pixi_app;
}


function set_active_shader ( s )
{
    let shaderCode = shaders.get( s );
    let shader = new PIXI.Filter ( undefined, shaderCode, uniforms );
    sprite.filters = [ shader ];
}

