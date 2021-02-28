const w = 512;
const h = 512;

let ca_system;
let pen_color;

async function page_loaded () 
{
    console.log ( "Cellular Automata starting..." );

    let shader_manager = new ShaderManager ();

    await shader_manager.fetch_shaders ();

    let renderer = new CAPixi ( 512, 512 );

    let automata = 
    {
        rps : new Automaton ( "rps", 
                              shader_manager.get_shader ( "rps.frag" ),
            [ 0x000000, 0xFF0000, 0x00FF00, 0x0000FF ] ),
    }

    ca_system = new CASystem ( renderer, shader_manager );
    ca_system.set_automaton ( automata.rps );

}

class CASystem
{
    constructor ( renderer, shader_manager, automata )
    {
        this.shader_manager = shader_manager;
        this.renderer = renderer;
        this.pen_color = 0xFF0000;

        this.automaton = undefined;
    }

    set_automaton ( a )
    {
        this.automaton = a;
        this.renderer.set_automaton ( a );
    }

    randomize ()
    {
        this.renderer.randomize ();
    }

    mouse_down ( x, y )
    {
        this.renderer.draw ( x, y, pen_color, 10 );
    }
}

function randomize_button_click ()
{
    ca_system.randomize ();
}

function canvas_mouse ( x, y )
{
    ca_system.mouse_down ( x, y );
}

function pen_select ()
{
    let el = document.getElementById ( "pen_select" );

    switch ( el.value )
    {
        case "red" : pen_color = 0xFF0000;break;
        case "blue" : pen_color = 0x0000FF;break;
        case "green" : pen_color = 0x00FF00;break;
        case "black" : pen_color = 0x000000;break;
    }
}
