varying vec2 vTextureCoord;

uniform sampler2D uSampler;
//uniform sampler2D prev;

void main()
{
   vec4 p = texture2D ( uSampler, vTextureCoord );
   p.r = mod ((p.r + 0.01), 1.0 );
   gl_FragColor = p;
}
