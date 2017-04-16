#version 300 es
precision mediump float;

in vec2 v_position;
in vec2 v_texcoord;

uniform float love_PointSize;
uniform mat4 u_transformMatrix;
uniform mat4 u_projectionMatrix;

out vec4 f_color;
out vec2 f_texcoord;

vec4 position(vec2 v_position) {
  return u_projectionMatrix * u_transformMatrix * vec4(v_position, 0, 1);
}

void main()
{
  f_texcoord = v_texcoord;
  gl_PointSize = love_PointSize;
  gl_Position = position(v_position);
}
