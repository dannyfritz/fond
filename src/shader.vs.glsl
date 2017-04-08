#version 300 es

in vec2 position;

out vec3 f_color;

void main()
{
  f_color = vec3(1, 1, 0);
  gl_Position = vec4(position, 0, 1);
}
