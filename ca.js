const w = 512;
const h = 512;


let shader_files = [ "rps.frag", "scroll.frag" ]
let shaders;
let graphics;

async function page_loaded () 
{
    console.log ( "Cellular Automata starting..." );

    shaders = new Map ();

    for ( const s of shader_files )
    {
        const response = await fetch ( `shaders/${s}` );
        const text = await response.text ();
        shaders.set ( s, text );
    }

    let cp_pixi = new CAPixi ();

    graphics = new PIXI.Graphics ();
    graphics
        .beginFill ( 0x00FF00, 1 )
        .drawRect ( 0, 0, w, h )
        .beginFill ( 0xFF0000, 1 )
        .drawRect ( 200, 200, 100, 200 )
        .beginFill ( 0x0000FF, 1 )
        .drawRect ( 250, 250, 80, 160 )
        .beginFill ( 0x00FF00, 1 )
        .drawRect ( 210, 210, 80, 80 )
        .beginFill ( 0x0000FF, 1 )
        .drawRect ( 240, 240, 40, 40 )
        .drawCircle ( 10, 10, 100 )
        .drawCircle ( 150, 10, 100 );

    cp_pixi.draw_queue.push ( graphics );

    cp_pixi.set_active_shader ( shaders.get("rps.frag") );
}

