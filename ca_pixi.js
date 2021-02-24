let pixi_app;
let draw_sprite, display_sprite;
let uniforms = {
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

    
    let t0= new PIXI.RenderTexture ( 
        new PIXI.BaseRenderTexture({width:w,height:h}));

    let t1= new PIXI.RenderTexture ( 
        new PIXI.BaseRenderTexture({width:w,height:h}));

    draw_sprite = PIXI.Sprite.from ( t0 );
    display_sprite = PIXI.Sprite.from ( t1 );

    pixi_app.stage.addChild ( display_sprite );

    pixi_app.ticker.add ( () =>
    {
        uniforms.prev = display_sprite.texture;
        pixi_app.renderer.render ( draw_sprite, display_sprite.texture );

        //swap textures
        let tmp = draw_sprite.texture;
        draw_sprite.texture = display_sprite.texture;
        display_sprite.texture = tmp;
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

