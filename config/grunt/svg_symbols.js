module.exports = function (grunt, options) {
  return {
    sprites: {
      files: {
        [options.CLIENT.SVG.BUILD_DIR + '/sprites.svg']: [options.CLIENT.SVG.SRC_FILES]
      }
    }
  };
};
