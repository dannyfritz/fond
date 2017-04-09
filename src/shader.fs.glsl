#version 300 es
precision mediump float;

uniform vec4 f_color;

out vec4 outColor;

void main()
{
  outColor = f_color;
}
