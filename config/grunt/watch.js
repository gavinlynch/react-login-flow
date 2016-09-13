module.exports = function (grunt, options) {
  return {
    script: {
      files: options.CLIENT.JS.SRC_DIR,
      tasks: ['jshint', 'webpack:local']
    },
    style: {
      files: options.CLIENT.SCSS.SRC_FILES,
      tasks: ['sass', 'postcss'],
      options: {
        livereload: true
      }
    },
    assets: {
      files: options.CLIENT.SVG.SRC_DIR,
      tasks: ['svg_symbols']
    }
  };
};
