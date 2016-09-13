module.exports = function (grunt, options) {
  return {
    options: {
      map: true,
      processors: [
        require('autoprefixer')({browsers: 'last 2 versions'})
      ]
    },
    dist: {
      src: options.CLIENT.CSS.BUILD_DIR + '/*.css'
    }
  };
};
