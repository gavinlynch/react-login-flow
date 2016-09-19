module.exports = function (grunt, options) {
  return {
    local: {
      options: {
        script: options.ROOT_DIR + '/app.local.js'
      }
    }
  };
};
