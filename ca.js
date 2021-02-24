const w = 512;
const h = 512;


let shader_files = [ "scroll.frag" ]
let shaders;

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

    init_pixi ();

    set_active_shader ( "scroll.frag" );
}

