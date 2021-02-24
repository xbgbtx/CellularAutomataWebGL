let pixi_app;
let sprite;
let uniforms = {
    prev : undefined,
};
let curr_render_texture, next_render_texture;

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

    
    curr_render_texture = new PIXI.RenderTexture ( 
        new PIXI.BaseRenderTexture({width:w,height:h}));

    next_render_texture = new PIXI.RenderTexture ( 
        new PIXI.BaseRenderTexture({width:w,height:h}));

    sprite = PIXI.Sprite.from("test.png");

    pixi_app.stage.addChild ( sprite );

    pixi_app.ticker.add ( () =>
    {
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

