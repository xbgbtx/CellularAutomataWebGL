class ShaderManager
{
    constructor ()
    {
        this.shader_files = [  
            "rps.frag",
            "game_of_life.frag",
            "brians_brain.frag",
        ]; 

        this.shader_file_text = new Map ();
    }

    async fetch_shaders ()
    {
        for ( const s of this.shader_files )
        {
            const response = await fetch ( `lib/shaders/${s}` );
            const text = await response.text ();
            this.shader_file_text.set ( s, text );
        }
    }

    get_shader ( s )
    {
        if ( this.shader_file_text.has ( s ) )
            return this.shader_file_text.get ( s );

        return this.generate_shader ( s );
    }

    generate_shader ( shader_options ) 
    {
        console.log ( shader_options );
    }
}
