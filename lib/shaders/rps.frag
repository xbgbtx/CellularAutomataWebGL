varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform int width, height;

void main()
{
   vec4 c0 = texture2D ( uSampler, vTextureCoord );

   float px = 1.0/float ( width );
   float py = 1.0/float ( height );

   vec4 count = c0.rgba * -1.0;

   for ( int i = -1; i <= 1; i++ )
   {
      float offx = px * float (i);
      float nx = mod ( vTextureCoord.x + offx, 1.0 );

      for ( int j = -1; j <= 1; j++ )
      {
         float offy = px * float (j);
         float ny = mod ( vTextureCoord.y + offy, 1.0 );

         count += texture2D ( uSampler, vec2 ( nx, ny ) );
      }
   }

   if ( c0.r > 0.0 && count.g >= 3.0 )
   {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
      return;
   }

   if ( c0.g > 0.0 && count.b >= 3.0 )
   {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
      return;
   }

   if ( c0.b > 0.0 && count.r >= 3.0 )
   {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      return;
   }

   gl_FragColor = c0;
}

