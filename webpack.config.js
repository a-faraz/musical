module.exports = {
  entry: './src/app/app.js',
  output: {
    filename: 'bundle.js',
    path: 'dist'
  },
  debug: true,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: [/node_modules/] }
    ]
  }
}
