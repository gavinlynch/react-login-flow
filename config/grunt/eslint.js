module.exports = function (grunt, options) {
  return {
    target: [options.CLIENT.JS.SRC_FILES],
    options: {
      configFile: 'config/eslint.json'
    }
  }
};
