var chalk = require('chalk');
var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var tsconfig = require('../tsconfig.json');

var aliases = {};

// Retrieve aliases from tsconfig and build array for webpack aliases
let pathKeyArray = Object.keys(tsconfig.compilerOptions.paths);
pathKeyArray.forEach(currentPath => {
  let correctPath = currentPath.replace("/*", "");
  let currentPathValue = tsconfig.compilerOptions.paths[currentPath][0].replace('*', '');
  aliases[correctPath] = path.resolve(tsconfig.compilerOptions.baseUrl + '/' + currentPathValue);
})

aliases['@app/env'] = path.resolve(environmentPath(env));

function environmentPath(env) {
  var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
  if (!fs.existsSync(filePath)) {
      console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
      return filePath;
  }
}

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
      path.resolve('node_modules'),
      path.resolve(tsconfig.compilerOptions.baseUrl)
    ],
    alias: aliases
  },

  module: {
    rules: [{
        test: /\.ts$/,
        loaders: [{
          loader: 'ts-loader'
        }, 'angular2-template-loader']
      },
      {
        test: /.+\.ts$/,
        exclude: /(index.ts|mocks.ts|\.spec\.ts$)/,
        loader: 'istanbul-instrumenter-loader',
        enforce: 'post',
        query: {
          esModules: true
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs=false'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /(ionic-angular)|(angular(\\|\/)core(\\|\/)@angular)/,
      root('./src'), // location of your src
      {} // a map of your routes
    )
  ]
};

function root(localPath) {
  return path.resolve(__dirname, localPath);
}
