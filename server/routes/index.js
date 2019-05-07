'use strict';
var path = require('path');

var usersRouter = require('./user_route');
var videoRouter = require('./video_route');

module.exports = function (app) {

  app.use('/api/users', usersRouter);
  app.use('/api/videos', videoRouter);

  /* GET home page. */
  app.get('/*', function (req, res) {
    var root = path.join(__dirname + '../../../public');
    res.sendFile('/index.html', {
      root: root
    });
  });

}
