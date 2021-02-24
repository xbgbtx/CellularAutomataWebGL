varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main()
{
   vec2 c = vec2 ( vTextureCoord.x,  mod ( vTextureCoord.y + 0.01, 1.0 ) );
   //vec4 p = texture2D ( uSampler, c );

   float g = mod(vTextureCoord.y * 8.0, 1.0 );
   vec4 p = vec4 ( 0, g, 0, 0 );
   gl_FragColor = p;
}
