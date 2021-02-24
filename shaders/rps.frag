varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main()
{
   vec4 p = texture2D ( uSampler, vTextureCoord );

   gl_FragColor = p;
}

