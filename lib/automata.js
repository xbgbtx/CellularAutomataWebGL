class Automaton
{
    constructor ( name, shader, states )
    {
        this.name = name;
        this.shader = shader;
        this.states = states;
    }

    //TODO: add 'pen states' and 'random states'
    // -> used to limit the availablity of states to the random
    // (e.g. no black in rps )
}

function get_automata ( shader_manager ) 
{
    return {
        rps : new Automaton ( "rps", 
                              shader_manager.get_shader ( "rps.frag" ),
            [ 0x000000, 0xFF0000, 0x00FF00, 0x0000FF ] ),

        game_of_life : new Automaton ( "game_of_life", 
            shader_manager.get_shader ( "game_of_life.frag" ),
            [ 0x000000, 0xFF0000 ] ),
    }
}
