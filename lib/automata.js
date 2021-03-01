class Automaton
{
    constructor ( name, shader_file, states )
    {
        this.name = name;
        this.shader_file = shader_file;
        this.states = states;
    }

    get_shader ()
    {
        return shader_manager.get_shader ( this.shader_file );
    }

    get_random_fill ()
    {
        return this.states [ 0 ];
    }

    get_random_palette ()
    {
        return this.states;
    }

    //TODO - add pen palette
}

function get_automata ( shader_manager ) 
{
    return {
        rps : new RockPaperScissors (),
        game_of_life : new GameOfLife (),
        brians_brain : new BriansBrain (),
    }
}

class GameOfLife extends Automaton
{
    constructor ()
    {
        super ( "game_of_life", "game_of_life.frag", 
            [ 0x000000, 0xFF0000 ] );
    }
}

class BriansBrain extends Automaton
{
    constructor ()
    {
        super ( "brians_brain", "brians_brain.frag", 
            [ 0x000000, 0xFFFFFF, 0x0000FF ] );
    }
}

class RockPaperScissors extends Automaton
{
    constructor ()
    {
        super ( "rps", "rps.frag", 
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
}
