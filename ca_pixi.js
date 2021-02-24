class CAPixi
{
    constructor ()
    {
        let type="WebGL";

        if ( !PIXI.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        PIXI.utils.sayHello ( type );

        this.pixi_app = new PIXI.Application (
        {
            width  : w,
            height : h
        });

        let tOpt = 
        {
            width : w,
            height : h,
        };
        
        let make_render_texture = () =>
        {
            let brt = new PIXI.BaseRenderTexture(tOpt)
            return new PIXI.RenderTexture ( brt )
        }
        
        let t0 = make_render_texture ();
        let t1 = make_render_texture ();

        this.draw_sprite = PIXI.Sprite.from ( t0 );
        this.display_sprite = PIXI.Sprite.from ( t1 );

        this.pixi_app.stage.addChild ( this.display_sprite );

        this.draw_queue = [];


        this.pixi_app.ticker.add ( () =>
        {
            for ( const d of this.draw_queue ) 
            {
                this.pixi_app.renderer.render ( d,this. draw_sprite.texture );
            }

            this.draw_queue = [];

            this.pixi_app.renderer.render ( 
                this.draw_sprite, this.display_sprite.texture );

            //swap textures
            let tmp = this.draw_sprite.texture;
            this.draw_sprite.texture = this.display_sprite.texture;
            this.display_sprite.texture = tmp;
        });

        document.getElementById ( "canvas_div" )
            .appendChild ( this.pixi_app.view );
    }


    set_active_shader ( shaderCode )
    {
        let shader = new PIXI.Filter ( undefined, shaderCode, {} );
        this.draw_sprite.filters = [ shader ];
    }
}
