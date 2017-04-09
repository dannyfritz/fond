#version 300 es

in vec2 v_position;
uniform vec2 v_resolution;

void main()
{
  vec2 zeroToOne = v_position / v_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
