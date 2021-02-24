const w = 512;
const h = 512;

let pixi_app;

let texture;

let shader_files = [ "simple.frag" ]
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

    console.log ( shaders.get ( "simple.frag" ) );

    init_pixi ();
}

