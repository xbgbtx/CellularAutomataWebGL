const w = 512;
const h = 512;

let ca_system;

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
        this.pen_size = 10;

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
        this.renderer.draw ( x, y, this.pen_color, this.pen_size );
    }

    set_pen_size ( s )
    {
        this.pen_size = s;
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

    let c = 0x000000;

    switch ( el.value )
    {
        case "red"   : c = 0xFF0000; break;
        case "blue"  : c = 0x0000FF; break;
        case "green" : c = 0x00FF00; break;
        case "black" : c = 0x000000; break;
    }

    ca_system.pen_color = c;
}

function pen_size_slider_move ()
{
    let el = document.getElementById ( "pen_size_slider" );

    ca_system.set_pen_size ( el.value );
}
