module.exports = function (grunt, options) {
  return {
    js: [options.CLIENT.JS.BUILD_DIR],
    css: [
      options.CLIENT.CSS.SRC_DIR,
      options.CLIENT.CSS.BUILD_DIR
    ]
  };
};
