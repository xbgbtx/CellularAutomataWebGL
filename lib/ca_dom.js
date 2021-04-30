function init_dom ()
{
    hide_ui_menu ();
}

const ui_form_values = 
{
    automaton_menu : 
    {
        sim_width : () => ca_system.sim_size.width,
        sim_height : () => ca_system.sim_size.height
    }
}

function ui_option_click ( option_id )
{
    switch ( option_id )
    {
        case "randomize" :
            ca_system.randomize ();
            break;

        case "pen" :
            show_ui_menu ( "pen_menu", "Pen Options", 
                           clone_template ( "pen_menu_template" ) );
            break;

        case "automaton" :
            show_ui_menu ( "automaton_menu", "Automaton Options", 
                           clone_template ( "automaton_menu_template" ) );
            break;
    }
}

function show_ui_menu ( menu_id, title, content )
{
    let ui_menu = document.getElementById ( "ui_menu" );
    let ui_menu_content = document.getElementById ( "ui_menu_content" );
    let ui_menu_title = document.getElementById ( "ui_menu_title" );

    if ( ui_menu == null )
        throw "Can't find ui_menu.";

    ui_menu_title.textContent = title;
    ui_menu_content.innerHTML = "";
    ui_menu_content.appendChild ( content );
    ui_menu.style.visibility = 'visible';

    set_ui_menu_form_values ( menu_id );
}

function hide_ui_menu ()
{
    let ui_menu = document.getElementById ( "ui_menu" );
    if ( ui_menu == null )
        throw "Can't find ui_menu.";

    ui_menu.style.visibility = 'hidden';
}


function clone_template ( name )
{
    let temp = document.getElementById ( name );
    let clone = temp.content.cloneNode ( true );
    return clone;
}

function set_ui_menu_form_values ( menu_id )
{
    let form_values = ui_form_values [ menu_id ];

    if ( form_values == null )
        return;

    let ui_menu = document.getElementById ( "ui_menu_content" );

    let els = ui_menu.getElementsByTagName ( "input" );
    let inputs = Object.keys(els).map ( k => els[k] );

    console.log ( form_values );
    console.log ( inputs );

    for ( const i of inputs )
    {
        if ( form_values [ i.name ] != null )
            i.value = form_values [ i.name ] ();
    }
}

function parse_ui_menu_form ()
{
    let ui_menu = document.getElementById ( "ui_menu_content" );

    let els = ui_menu.getElementsByTagName ( "input" );
    let inputs = Object.keys(els).map ( k => els[k] );

    let input_values = inputs.reduce ( ( obj, x ) =>
    {
        obj [ x.name ] = x.value;
        return obj;
    }, {});

    return input_values;
}

function submit_automaton_menu ()
{
    console.log ( "submit_automaton_menu" );

    let input_values = parse_ui_menu_form ();

    let w = parseInt ( input_values.sim_width );
    let h = parseInt ( input_values.sim_height );
    
    let clamp = ( x ) => Math.max ( 64, Math.min ( x, 1024 ) );

    ca_system.resize_automaton ( clamp ( w ), clamp ( h ) );
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

