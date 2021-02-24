const w = 512;
const h = 512;


let shader_files = [ "rps.frag" ]
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
        .drawRect ( 200, 200, 100, 100 )
        .beginFill ( 0x0000FF, 1 )
        .drawRect ( 200, 300, 100, 100 );

    cp_pixi.draw_queue.push ( graphics );

    cp_pixi.set_active_shader ( shaders.get("rps.frag") );
}

