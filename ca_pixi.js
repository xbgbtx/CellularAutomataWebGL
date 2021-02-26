class CAPixi
{
    constructor ( width, height )
    {
        this.create_pixi_app ( width, height );
        this.create_display_sprite ( width, height );
        this.create_sim ( width, height )

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
        let brt = new PIXI.BaseRenderTexture({ width, height });
        let rt = new PIXI.RenderTexture ( brt )

        this.display_sprite = PIXI.Sprite.from ( rt );
        this.pixi_app.stage.addChild ( this.display_sprite );
    }

    create_sim ( width, height )
    {
        this.sim = new RenderFeedback ( width, height );

        //TODO: attach State -> RGBA filter on output sprite
    }
    

    set_sim_shader ( shaderCode )
    {
        let shader = new PIXI.Filter ( undefined, shaderCode, {} );
        let s = this.sim.get_input_sprite ();
        s.filters = [ shader ];
    }

    update ()
    {
        let renderer = this.pixi_app.renderer;

        this.poll_mouse ( this.pixi_app.renderer.plugins.interaction.mouse );

        for ( const i of this.input_queue )
            renderer.render ( i, this.sim.get_input_texture (), false );

        this.input_queue = [];

        this.sim.update ( renderer );
        this.sim.render ( this.display_sprite.texture, renderer );

        renderer.render ( this.sim.get_output_sprite (), 
                          this.display_sprite.texture );
    }

    poll_mouse ( mouse )
    {
        //exit it mouse main button not down
        if ( mouse.pointerType == "mouse" &&  mouse.buttons != 1 )
        {
            return;
        }

        canvas_mouse ( mouse );

    }

}
