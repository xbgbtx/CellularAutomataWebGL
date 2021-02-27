class CAPixi
{
    constructor ( width, height )
    {
        this.create_pixi_app ( width, height );
        this.create_display_sprite ( width, height );
        this.create_sim ( width, height )

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
