
/*
 * GET home page.
 */

var user = require('./user');

var index = function(req, res){
  res.render('index', { title: 'Express' });
};

module.exports = function(app){
  app.get('/', index);
  app.get('/user', user.list);
};

