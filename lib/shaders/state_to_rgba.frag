!include pixi_header.frag
!include state_conversion.frag

void main()
{
   vec4 c0 = texture2D ( uSampler, vTextureCoord );

   gl_FragColor = state_to_rgba ( c0 );
}
