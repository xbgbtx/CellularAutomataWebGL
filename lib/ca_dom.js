function init_dom ()
{
    hide_ui_menu ();
}

function ui_option_click ( option_id )
{
    switch ( option_id )
    {
        case "randomize" :
            ca_system.randomize ();
            break;

        case "pen" :
            show_ui_menu ( get_menu_pen () );
            break;
    }
}

function show_ui_menu ( content )
{
    let ui_menu = document.getElementById ( "ui_menu" );

    if ( ui_menu == null )
        throw "Can't find ui_menu.";

    ui_menu.innerHTML = "";
    ui_menu.appendChild ( content );
    ui_menu.style.visibility = 'visible';
}

function hide_ui_menu ()
{
    let ui_menu = document.getElementById ( "ui_menu" );
    if ( ui_menu == null )
        throw "Can't find ui_menu.";

    ui_menu.style.visibility = 'hidden';

}


function get_menu_pen ()
{
    let container = document.createElement ( "div" );

    container.innerHTML = "<h1>Pen Menu</h1>";

    return container;
}


function canvas_mouse ( x, y )
{
    ca_system.mouse_down ( x, y );
}

function pen_select ()
{
    let el = document.getElementById ( "pen_select" );

    ca_system.set_pen_color ( el.value );
}

function set_pen_options ( opt_mapping )
{
    let el = document.getElementById ( "pen_select" );

    if ( el == null )
        return;

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

