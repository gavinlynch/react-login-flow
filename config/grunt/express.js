module.exports = function (grunt, options) {
  return {
    dev: {
      options: {
        script: options.ROOT_DIR + '/app.dev.js'
      }
    }
  };
};
