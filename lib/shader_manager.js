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

    generate_shader ( { num_states, params } ) 
    {
        let header = this.generate_shader_header ()
        let init_birth = 
            this.generate_shader_set_init ( "birth", params.get ( "Birth" ));
        let init_death = 
            this.generate_shader_set_init ( "survive", 
                                            params.get ( "Survive" ));
        let state_change = this.generate_shader_state_change ();
        let sample_neighbour = this.generate_shader_sample_neighbour ();
        let shader = `
        
            ${header}
            
            bool birth [9];
            bool survive [9];

            ${init_birth}
            ${init_death}
            ${sample_neighbour}
            ${state_change}

            void main ()
            {
                init_birth ();
                init_survive ();
                gl_FragColor = state_change ();
            }

        `;

        console.log ( shader );

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

    generate_shader_set_init ( set_name, param_int_set )
    {
        let val_set_array = [];

        for ( const i of param_int_set.domain () )
        {
            let bool = param_int_set.has ( i );
            val_set_array.push ( `    ${set_name}[${i}]=${bool};\n` );
        }

        let val_set_str = val_set_array.reduce ( 
            ( acc, val ) => acc + val, "" );

        return `
            void init_${set_name} ()
            {
            ${val_set_str}
            }

            bool get_${set_name} ( int idx )
            {
                for ( int i=0; i<=${param_int_set.max}; i++ )
                {
                    if ( i == idx ) return ${set_name} [ i ];
                }
            }
        `;
    }

    generate_shader_sample_neighbour ()
    {
        return `
            vec4 sample_neighbour ( int xoff, int yoff )
            {
               vec2 step = vec2 ( 1.0/float ( width ), 1.0/float ( height ));

               vec2 n = vec2 ( vTextureCoord.x + float ( xoff ) * step.x,
                               vTextureCoord.y + float ( yoff ) * step.y );

               return texture2D ( uSampler, n );

            }
        `;
    }

    generate_shader_state_change ()
    {
        let do_n_count = "";

        for ( let i = -1; i <= 1; i++ )
        {
            for ( let j = -1; j <= 1; j++ ) {
                if ( j==0 && i==0 ) continue;
                do_n_count += `n_count+=sample_neighbour(${i},${j});\n`;
            }
        }
        return `
            vec4 state_change ()
            {
                bool s0 = sample_neighbour ( 0, 0 ).r == 1.0;
                vec4 n_count = vec4 ( 0.0, 0.0, 0.0, 0.0 );

                ${do_n_count}

                int idx=int(n_count.r);

                bool s1 = ( s0 && get_survive(idx) ) 
                       || (!s0 && get_birth(idx) );

                return vec4 ( s1 ? 1.0 : 0.0, 0.0, 0.0, 0.0 );
            }
        `;
    }
}
