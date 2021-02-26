class ShaderManager
{
    constructor ()
    {
        this.shader_files = [ "rps.frag", "pixi_header.frag" ]; 

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
        return this.shader_file_text.get("pixi_header.frag") +
               this.shader_file_text.get("rps.frag" );
    }
}
