!include pixi_header.frag
!include state_conversion.frag



void main()
{
   vec4 c0 = texture2D ( uSampler, vTextureCoord );

   gl_FragColor = color_to_sVec ( c0 );
}
