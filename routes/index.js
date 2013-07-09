
/*
 * GET home page.
 */

var index = function(req, res){
  res.render('index', { title: 'Express' });
};

var admin = require('./admin');
var room = require('./room');

module.exports = function(app){
  app.get('/', index);
  app.get('/admin', admin.handler);
  app.get('/room/*?', room.handler);
};

