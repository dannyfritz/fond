#version 300 es
precision mediump float;

in vec2 v_position;
in vec2 v_texcoord;
// in vec4 v_color;

// uniform vec4 love_ScreenSize;
uniform float love_PointSize;
uniform vec4 u_constantColor;
uniform mat4 u_transformMatrix;
uniform mat4 u_projectionMatrix;
// uniform mat4 u_transformProjectionMatrix;
// uniform mat3 u_normalMatrix;

out vec4 f_texcoord;
out vec4 f_color;

vec4 position(vec2 v_position) {
  return u_projectionMatrix * u_transformMatrix * vec4(v_position, 0, 1);
}

void main()
{
  f_texcoord = vec4(v_texcoord, 0, 1);
  f_color = u_constantColor;
  gl_PointSize = love_PointSize;
  gl_Position = position(v_position);
}
