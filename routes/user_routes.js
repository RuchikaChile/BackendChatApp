//use express module
var express = require('express');
//use express.Router class to create modular, mountable route handler
var routes = express.Router();

//requiring files
var userCtrl = require('../controller/user_controller');
var tokenverify = require('../authentication/tokenverification');

//Calling API
routes.post('/register', userCtrl.registerController);
routes.post('/login', userCtrl.loginController);
routes.post('/forget',userCtrl.forgetController);
routes.post('/#/reset/:token',tokenverify.checkToken,userCtrl.resetController);
routes.get('/displayAllUser', userCtrl.displayAllUser);
routes.get('/getUserMessage',userCtrl.getUserMessage);


module.exports = routes;