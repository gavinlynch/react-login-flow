module.exports = function (grunt, options) {
  var webpack = require('webpack');
  var config = {
    watch: true,
    entry: {
      login: options.CLIENT.JS.SRC_DIR + '/main.js'
    },
    output: {
      path: options.CLIENT.JS.BUILD_DIR,
      filename: '[name].js'
    },
    module: {
      loaders: [{
        // ES6 and react/jsx
        test: options.CLIENT.JS.SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }]
    },
    resolve: {
      modulesDirectories: [
        options.CLIENT.JS.ROOT_DIR,
        options.ROOT_DIR + '/node_modules',
        options.ROOT_DIR + '/bower_components'
      ]
    },
    plugins: [
      // move commonly used dependencies to common.js
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: 2
      }),
      // de-duplicate dependencies
      new webpack.optimize.OccurrenceOrderPlugin(),
      // check bower.json for loading dependencies
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      // jQuery should be available to all dependencies
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  };

  return {
    options: config,
    local: {},
    stage: {},
    /*
    TODO: minify/uglify et cetera for production
    prod: config.plugins.concat([
      // compress
      new webpack.optimize.UglifyJsPlugin([options])
    ])
    */
  };
};
