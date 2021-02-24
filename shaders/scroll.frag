varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D curr;
uniform sampler2D prev;

void main()
{
  // gl_FragColor = vec4(vTextureCoord.x,vTextureCoord.y,0.0,1.0);

   gl_FragColor = texture2D ( curr, vTextureCoord );
}
