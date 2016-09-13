module.exports = function (grunt, options) {
  return {
    options: {
      includePaths: [options.ROOT_DIR + '/bower_components/']
    },
    dev: {
      options: {
        sourceMap: true,
        outputStyle: 'expanded'
      },
      files: {
        [options.CLIENT.CSS.BUILD_DIR + '/main.css']: options.CLIENT.SCSS.ROOT_DIR + '/main.scss'
      }
    }
  };
};
