'use strict()';

module.exports = function (grunt) {
  var env = (grunt.option('target') || 'local').toLowerCase();
  if (!/^(local|dev|stage|prod)$/.test(env)) {
    env = 'local';
  }

  require('load-grunt-tasks')(grunt);
  require('load-grunt-config')(grunt, {
    data: require('./config/config.js')(env),
    configPath: __dirname + '/config/grunt'
  });

  grunt.registerTask('local', [
    'sass',
    'postcss',
    'svg_symbols',
    'eslint',
    'webpack:local',
    'express',
    'watch'
  ]);

  /*
  TODO: dev, stage and prod config
  grunt.registerTask('stage', []);
  grunt.registerTask('prod', []);
  */
};
