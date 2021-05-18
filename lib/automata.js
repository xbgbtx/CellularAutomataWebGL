function get_automata ( shader_manager ) 
{
    let automata = new Map ();
    automata.set('rps', new RockPaperScissors ());
    automata.set('game_of_life', new GameOfLife ());
    automata.set('life_like', new LifeLike ());
    automata.set('brians_brain', new BriansBrain ());
    return automata;
}

class Automaton
{
    constructor ( name, states )
    {
        this.name = name;
        this.states = states;
    }
    
    //Should return a mapping of parameter names and expected types
    //(for displaying the options)
    get_parameters ()
    {
        return null;
    }

    //Should return the full shader text to compile as fragment shader
    get_shader ()
    {
        throw "get_shader not implemented";
    }

    //Return array of colours used to store states on the texture
    get_states ()
    {
        throw "get_states not implemented";
    }

    //Return colour to fill whole texture at start of random
    get_random_fill ()
    {
        return this.get_states() [ 0 ];
    }

    //Return a list of colours that can be used as random values
    get_random_palette ()
    {
        return this.get_states ();
    }

    //Mapping of names -> colours for pen selection
    get_pen_options ()
    {
        throw "get_pen_options not implemented";
    }

    //Default pen key to use
    get_default_pen_option ()
    {
        throw "get_default_pen_option not implemented";
    }
}

class AutomatonParamInt
{
    constructor ( min, max )
    {
        this.min = min;
        this.max = max;
    }
}

class GameOfLife extends Automaton
{
    constructor ()
    {
        super ( "Conway's Game of Life" );
    }
    get_states ()
    {
        return [ 0x000000, 0xFF0000 ];
    }
    get_shader ()
    {
        return shader_manager.get_shader ( "game_of_life.frag" );
    }
    get_pen_options ()
    {
        let o = new Map ();
        o.set ( "Live", 0xFF0000 );
        o.set ( "Dead", 0x000000 );
        return o;
    }

    get_default_pen_option ()
    {
        return "Live";
    }
}

class LifeLike extends Automaton
{
    constructor ()
    {
        super ( "Life-Like" );
    }
    get_states ()
    {
        return [ 0x000000, 0xFF0000 ];
    }
    get_parameters ()
    {
        let params = new Map ();
        params.set ( "Lonesome", new AutomatonParamInt ( 0, 8 ) );
        params.set ( "Crowded", new AutomatonParamInt ( 0, 8 ) );
        return params;
    }

    get_shader ()
    {
        return shader_manager.get_shader ( "game_of_life.frag" );
    }
    get_pen_options ()
    {
        let o = new Map ();
        o.set ( "Live", 0xFF0000 );
        o.set ( "Dead", 0x000000 );
        return o;
    }

    get_default_pen_option ()
    {
        return "Live";
    }
}

class BriansBrain extends Automaton
{
    constructor ()
    {
        super ( "Brian's Brain" );
    }
    get_states ()
    {
        return [ 0x000000, 0xFFFFFF, 0x0000FF ];
    }
    get_shader ()
    {
        return shader_manager.get_shader ( "brians_brain.frag" );
    }
    get_pen_options ()
    {
        let o = new Map ();
        o.set ( "Live", 0xFFFFFF );
        o.set ( "Dead", 0x000000 );
        return o;
    }

    get_default_pen_option ()
    {
        return "Live";
    }
}

class RockPaperScissors extends Automaton
{
    constructor ()
    {
        super ( "Rock Paper Scissors" );
    }
    get_states ()
    {
        return [ 0xFF0000, 0x00FF00, 0x0000FF, 0x000000 ];
    }
    get_shader ()
    {
        return shader_manager.get_shader ( "rps.frag" );
    }

    get_random_palette ()
    {
        return this.states.slice ( 0, -1 );
    }

    get_pen_options ()
    {
        let o = new Map ();
        o.set ( "Red", 0xFF0000 );
        o.set ( "Green", 0x00FF00 );
        o.set ( "Blue", 0x0000FF );
        o.set ( "Black", 0x000000 );
        return o;
    }

    get_default_pen_option ()
    {
        return "Red";
    }
}
