module.exports = {
  entry: './src/app/app.js',
  output: {
    filename: 'bundle.js',
    path: 'dist'
  },
  debug: true,
  module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
