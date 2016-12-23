var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongo = require('mongodb');
var session = require('express-session');
var Post = require('../models/posts.js');

// GET Index featured articles
router.get('/', function(req, res, next) {
  console.log('current user is ' + req.user.name);
  Post.find({}, function(err, posts) {
    if (err) throw err;
      // console.log(docs);
    res.render('index', { title: 'Pirate Portal', posts: posts });
  });
});

module.exports = router;
