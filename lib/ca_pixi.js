class CAPixi
{
    constructor ( width, height )
    {
        this.create_pixi_app ( width, height );
        this.create_display_sprite ( width, height );
        this.create_sim ( width, height )
        this.create_input_sprite ( width, height );

        //TODO: create input buffer sprite with RGBA -> State
        this.input_queue = [];

        this.pixi_app.ticker.add ( () => this.update () );

        document.getElementById ( "canvas_div" )
            .appendChild ( this.pixi_app.view );
    }

    create_pixi_app ( width, height ) 
    {
        let type="WebGL";

        if ( !PIXI.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        PIXI.utils.sayHello ( type );

        this.pixi_app = new PIXI.Application ( { width, height });
    }

    create_display_sprite ( width, height )
    {
        this.display_sprite = 
            PIXI.Sprite.from ( this.create_render_texture ( width, height ) );

        this.pixi_app.stage.addChild ( this.display_sprite );
    }

    create_input_sprite ( width, height )
    {
        this.input_sprite = 
            PIXI.Sprite.from ( this.create_render_texture ( width, height ) );

        let u = 
        { 
            state_colors : [   0,   0,   0,
                             255,   0,   0,
                               0, 255,   0,
                               0,   0, 255 ],
        };

        this.set_shader ( "color_to_state.frag", this.input_sprite, u );
    }

    create_render_texture ( width, height )
    {
        let brt = new PIXI.BaseRenderTexture({ width, height });
        let rt = new PIXI.RenderTexture ( brt )

        return rt;
    }

    create_sim ( width, height )
    {
        this.sim = new RenderFeedback ( 
            () => this.create_render_texture ( width, height )
        );

        //TODO: attach CA filter on input sprite
        //TODO: attach State -> RGBA filter on output sprite
    }
    

    set_shader ( s, target, uniforms )
    {
        let vert = shader_manager.get_shader ( "default.vert" );
        let shaderCode = shader_manager.get_shader ( s );
        let shader = new PIXI.Filter ( vert, shaderCode, uniforms );
        target.filters = [ shader ];
    }

    update ()
    {
        let renderer = this.pixi_app.renderer;

        this.process_input ();

        this.sim.update ( renderer );
        this.sim.render ( this.display_sprite.texture, renderer );

    }

    process_input ()
    {
        let renderer = this.pixi_app.renderer;

        this.poll_mouse ( renderer.plugins.interaction.mouse );

        for ( const i of this.input_queue )
            renderer.render ( i, this.input_sprite.texture, false );

        this.input_queue = [];

        renderer.render ( this.input_sprite, this.sim.get_input_texture () );
    }

    poll_mouse ( mouse )
    {
        //exit it mouse main button not down
        if ( mouse.pointerType == "mouse" &&  mouse.buttons != 1 )
        {
            return;
        }

        if ( mouse.global.x >= 0 && 
             mouse.global.x < this.pixi_app.renderer.width &&
             mouse.global.y >= 0 &&
             mouse.global.y < this.pixi_app.renderer.height )
        {
            canvas_mouse ( mouse );
        }
    }

}
