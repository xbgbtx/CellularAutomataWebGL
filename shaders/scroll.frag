varying vec2 vTextureCoord;

uniform sampler2D uSampler;
//uniform sampler2D prev;

void main()
{
   vec2 c = vec2 ( vTextureCoord.x, 
                   mod ( vTextureCoord.y - 0.01, 512.0 ) );
   vec4 p = texture2D ( uSampler, c );
   gl_FragColor = p;
}
