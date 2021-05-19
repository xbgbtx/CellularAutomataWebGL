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
        let shader = `

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform int width, height;

void main ()
{
    gl_FragColor = vec4 ( 1.0, 0.0, 0.0, 1.0 );
}

        `;

        return shader;
    }
}
