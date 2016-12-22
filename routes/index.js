var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongo = require('mongodb');
var session = require('express-session');
var User = require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.find({}, function (err, docs) {
    if (err) throw err;
      // console.log(docs);
      res.render('index', { title: 'Pirate Portal', docs: docs });
  	  console.log('This is the index.js file')
  });
});

module.exports = router;
