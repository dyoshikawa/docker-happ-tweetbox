const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  resolve: {
    alias: {
      'hyperapp$': 'hyperapp/dist/hyperapp.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};