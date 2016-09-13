var config = require(__dirname + '/config/config.js')(),
    path = require('path'),
    express = require('express'),
    server = express();

// static files
server.use(express.static(config.PUBLIC_DIR));
// catch all remaining routes routes
server.get('*', function (req, resp){
  resp.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// fire it up...
server.listen(config.SERVER.PORT);
console.log('*** ON PORT ' + config.SERVER.PORT + ' ***');
