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

        
        let t0= new PIXI.RenderTexture ( 
            new PIXI.BaseRenderTexture({width:w,height:h}));

        let t1= new PIXI.RenderTexture ( 
            new PIXI.BaseRenderTexture({width:w,height:h}));

        this.draw_sprite = PIXI.Sprite.from ( t0 );
        this.display_sprite = PIXI.Sprite.from ( t1 );

        this.pixi_app.stage.addChild ( this.display_sprite );

        this.draw_queue = [];

        //graphics = new PIXI.Graphics ();
        //graphics.beginFill ( 0x00FFFF, 1 );
        //graphics.drawRect ( 100, 100, 100, 100 );
        //draw_queue.push ( graphics );

        this.pixi_app.ticker.add ( () =>
        {
            //for ( const d of draw_queue ) 
            //{
            //    this.pixi_app.renderer.render ( d, draw_sprite.texture );
            //}

            //draw_queue = [];

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


    set_active_shader ( s )
    {
        let shaderCode = shaders.get( s );
        let shader = new PIXI.Filter ( undefined, shaderCode, {} );
        draw_sprite.filters = [ shader ];

    }
}
