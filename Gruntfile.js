'use strict()';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('load-grunt-config')(grunt, {
    data: require('./config/config.js')(),
    configPath: __dirname + '/config/grunt'
  });

  grunt.registerTask('local', [
    'sass',
    'postcss',
    'svg_symbols',
    /*
    'eslint',
    */
    'webpack:local',
    'express',
    'watch'
  ]);

  /*
  TODO
  grunt.registerTask('stage', []);
  grunt.registerTask('prod', []);
  */
};
