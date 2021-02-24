let pixi_app;
let draw_sprite, display_sprite;
let graphics;
let uniforms = { };
let draw_queue = [];

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

    graphics = new PIXI.Graphics ();
    graphics.beginFill ( 0x00FFFF, 1 );
    graphics.drawRect ( 100, 100, 100, 100 );
    draw_queue.push ( graphics );

    pixi_app.ticker.add ( () =>
    {
        for ( const d of draw_queue ) 
        {
            pixi_app.renderer.render ( d, draw_sprite.texture );
        }

        draw_queue = [];

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
    draw_sprite.filters = [ shader ];
}

