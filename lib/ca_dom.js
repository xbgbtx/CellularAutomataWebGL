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

function set_pen_options ( opt_mapping )
{
    let el = document.getElementById ( "pen_select" );

    el.options.length = 0;

    for ( const o of opt_mapping.keys () )
    {
        let option = document.createElement('option');
        option.text = o;
        el.add ( option );
    }
}

function pen_size_slider_move ()
{
    let el = document.getElementById ( "pen_size_slider" );

    ca_system.set_pen_size ( el.value );
}

function automata_select ()
{
    let el = document.getElementById ( "automata_select" );

    ca_system.set_automaton ( el.value );
}

