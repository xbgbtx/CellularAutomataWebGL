//This class uses two textures to create a render feedback loop.
//t0 is rendered onto t1 and then then textures are flipped.
class RenderFeedback
{
    constructor ( width, height )
    {
        this.create_textures ( width, height );
        this.create_sprites ( width, height );
    }

    create_textures ( width, height )
    {
        let make_render_texture = () =>
        {
            let brt = new PIXI.BaseRenderTexture({ width, height });
            let rt = new PIXI.RenderTexture ( brt )
            return rt;
        }
        
        this.t0 = make_render_texture ();
        this.t1 = make_render_texture ();
    }

    create_sprites ()
    {
        this.s0 = PIXI.Sprite.from ( this.t0 );
        this.s1 = PIXI.Sprite.from ( this.t1 );
    }

    render ( output_texture, renderer )
    {
        renderer.render ( this.s1, output_texture );
    }

    update ( renderer )
    {
        renderer.render ( this.s0, this.s1.texture );

        this.flip ();
    }

    get_input_texture ()
    {
        return this.t0;
    }

    get_input_sprite ()
    {
        return this.s0;
    }

    get_output_sprite ()
    {
        return this.s1;
    }

    //swap buffers
    flip ()
    {
        let tmp = this.s0.texture;
        this.s0.texture = this.s1.texture;
        this.s1.texture = tmp;
    }
}

