uniform vec3 state_colors [ 4 ];

vec4 state_to_rgba ( int s )
{
   return vec4 ( (1.0/4.0) * float ( s ), 0, 0, 1 );
}

int rgba_to_state ( vec4 v )
{
   return int ( v.r * 4.0 );
}
