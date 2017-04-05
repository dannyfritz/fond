module.exports = [
  {
    entry: './src/fond.ts',
    output: {
      filename: './dist/fond.js',
    },
    devtool: "source-map",
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
  },
  {
    entry: './demoes/bouncing_ball/bouncing_ball.ts',
    output: {
      filename: './demoes/bouncing_ball/dist/bouncing_ball.js',
    },
    devtool: "source-map",
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
      ],
    },
  },
]
