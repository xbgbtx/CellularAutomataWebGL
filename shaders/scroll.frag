varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D prev;

void main()
{
   gl_FragColor = texture2D ( prev, vTextureCoord );
}
