#version 300 es
precision mediump float;

in vec3 f_color;

out vec4 outColor;

void main()
{
  outColor = vec4(f_color, 1);
}
