module.exports = function (env) {
  var config = {},
      rootPath = require('path').join(__dirname, '../');

  var DEFAULT = {
    ROOT_DIR: rootPath,
    PUBLIC_DIR: rootPath + 'public',
    SERVER: {
      PORT: 8080
    },
    CLIENT: {
      JS: {
        ROOT_DIR: rootPath + 'public/js',
        BUILD_DIR: rootPath + 'public/js/build',
        LIB_DIR: rootPath + 'public/js/src',
        SRC_DIR: rootPath + 'public/js/src',
        SRC_FILES: [rootPath + 'public/js/src/**/*.js']
      },
      CSS: {
        ROOT_DIR: rootPath + 'public/css',
        BUILD_DIR: rootPath + 'public/css/build',
        SRC_DIR: rootPath + 'public/css/src',
        SRC_FILES: [rootPath + 'public/css/src/**/*.css']
      },
      SCSS: {
        ROOT_DIR: rootPath + 'public/scss',
        BUILD_DIR: rootPath + 'public/css',
        SRC_DIR: rootPath + 'public/scss',
        SRC_FILES: [rootPath + 'public/scss/**/*.scss']
      },
      SVG: {
        BUILD_DIR: rootPath + 'public/assets',
        SRC_DIR: rootPath + 'public/assets/svg',
        SRC_FILES: [rootPath + 'public/assets/svg/**/*.svg']
      }
    }
  };

  config.local = Object.assign({}, DEFAULT);

  /*
  TODO: dev, stage and prod config
  var config.dev = Object.assign({}, DEFUALT);
  var config.stage = Object.assign({}, DEFUALT);
  var config.prod = Object.assign({}, DEFUALT);
  */

  return config[(env in DEFAULT) ? env : 'local'];
};
