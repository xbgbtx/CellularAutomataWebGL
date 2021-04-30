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
            show_ui_menu ( "Pen Options", get_menu_pen () );
            break;

        case "automaton" :
            show_ui_menu ( "Automaton Options", get_menu_automaton () );
            break;
    }
}

function show_ui_menu ( title, content )
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
    container.innerHTML += "<h1>Pen Menu</h1>";
    container.innerHTML += "<h1>Pen Menu</h1>";
    container.innerHTML += "<h1>Pen Menu</h1>";
    container.innerHTML += "<h1>Pen Menu</h1>";

    return container;
}

function get_menu_automaton ()
{
    let container = document.createElement ( "div" );

    let size_select_div = document.createElement ( "div" );
    let sim_w = document.createElement("input");
    let sim_h = document.createElement("input");
    sim_w.setAttribute("type", "text");
    sim_h.setAttribute("type", "text");

    sim_w.value = ca_system.sim_size.width;
    sim_h.value = ca_system.sim_size.height;

    size_select_div.appendChild ( sim_w );
    size_select_div.appendChild ( sim_h );
    container.appendChild ( size_select_div );

    let apply = document.createElement ( "button" );
    apply.textContent = "Apply";

    apply.onclick = () =>
    {
        let w = parseInt ( sim_w.value );
        let h = parseInt ( sim_h.value );
        
        let clamp = ( x ) => Math.max ( 1, Math.min ( x, 1024 ) );

        ca_system.resize_automaton ( clamp ( w ), clamp ( h ) );
    };

    container.appendChild ( apply );

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

