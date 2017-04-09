#version 300 es
precision mediump float;

in vec4 f_color;
in vec4 f_texcoord;

uniform sampler2D _tex0_;
// uniform vec4 love_ScreenSize;
// uniform float love_PointSize;
// uniform vec4 u_constantColor;
// uniform mat4 u_transformMatrix;
// uniform mat4 u_projectionMatrix;
// uniform mat4 u_transformProjectionMatrix;
// uniform mat3 u_normalMatrix;

out vec4 outColor;

vec4 effect(vec4 color, sampler2D tex, vec2 texcoord, vec2 pixcoord) {
  return texture(tex, texcoord) * color;
}

void main()
{
  // vec2 pixelcoord = vec2(gl_FragCoord.x, (gl_FragCoord.y * love_ScreenSize.z) + love_ScreenSize.w);
  // outColor = effect(f_color, _tex0_, f_texcoord.st, pixelcoord);
  outColor = f_color;
}
