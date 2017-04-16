#version 300 es
precision mediump float;

in vec4 f_color;
in vec4 f_texcoord;

uniform sampler2D tex0;
// uniform vec4 love_ScreenSize;
// uniform float love_PointSize;
// uniform vec4 u_constantColor;
// uniform mat4 u_transformMatrix;
// uniform mat4 u_projectionMatrix;
// uniform mat4 u_transformProjectionMatrix;
// uniform mat3 u_normalMatrix;

out vec4 outColor;

void main()
{
  // outColor = f_color;
  // outColor = f_texcoord;
  outColor = texture(tex0, f_texcoord.st) * f_color;
}
