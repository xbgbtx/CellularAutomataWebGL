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

    generate_shader ( {num_states} ) 
    {
        let header = this.generate_shader_header ()
        let state_change = this.generate_shader_state_change ();
        let shader = `
        
            ${header}
            
            int num_states = ${num_states};

            ${state_change}

            void main ()
            {
                gl_FragColor = state_change ();
            }

        `;

        return shader;
    }

    generate_shader_header () 
    {
        return `
            varying vec2 vTextureCoord;

            uniform sampler2D uSampler;

            uniform int width, height;
        `;
    }

    generate_shader_state_change ()
    {
        return `
            vec4 state_change ()
            {
                return vec4 ( 0.0, 1.0, 0.0, 1.0 );
            }
        `;
    }
}
