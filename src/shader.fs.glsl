#version 300 es
precision mediump float;

in vec2 f_texcoord;

uniform sampler2D tex0;
uniform vec4 u_constantColor;

out vec4 outColor;

void main()
{
  outColor = texture(tex0, f_texcoord) * u_constantColor;
}
