function get_automata ( shader_manager ) 
{
    let automata = new Map ();
    automata.set('rps', new RockPaperScissors ());
    automata.set('game_of_life', new GameOfLife ());
    automata.set('brians_brain', new BriansBrain ());
    return automata;
}

class Automaton
{
    constructor ( name, shader_options, states )
    {
        this.name = name;
        this.shader_options = shader_options;
        this.states = states;
    }

    get_shader ()
    {
        return shader_manager.get_shader ( this.shader_options );
    }

    get_random_fill ()
    {
        return this.states [ 0 ];
    }

    get_random_palette ()
    {
        return this.states;
    }

    get_pen_options ()
    {
        throw "get_pen_options not implemented";
    }

    get_default_pen_option ()
    {
        throw "get_default_pen_option not implemented";
    }
}

class GameOfLife extends Automaton
{
    constructor ()
    {
        super ( "Conway's Game of Life", "game_of_life.frag", 
            [ 0x000000, 0xFF0000 ] );
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
        super ( "Brian's Brain", "brians_brain.frag", 
            [ 0x000000, 0xFFFFFF, 0x0000FF ] );
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
        super ( "Rock Paper Scissors", "rps.frag", 
            [ 0x000000, 0xFF0000, 0x00FF00, 0x0000FF ] );
    }

    get_random_fill ()
    {
        return this.states [ 1 ];
    }

    get_random_palette ()
    {
        return this.states.slice ( 1 );
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
