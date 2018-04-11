var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var Products   = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
	Products.find(function(err, docs) {
		var productsChunks = [];
		var chunkSize = 7;
		for(var i=0;i<docs.length;i+=chunkSize) {
			productsChunks.push(docs.slice(i,i+ chunkSize));
		}
		res.render('product/index', { title: 'Online Auction',products: productsChunks});
	});
}); 

router.get('/user/signup', function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signup',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
	res.render('user/profile');
});

router.get('/user/signin', function(req, res, next) {
	var messages = req.flash('error');
	res.render('user/signin',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});

});
router.post('/user/signin', passport.authenticate('local.signin', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signin',
	failureFlash: true
}));

router.get('/products/add', function(req, res, next) {
	res.render('product/createproduct');
});

router.post('products/add', function(req, res, next) {
	var messages = req.flash('error');
	res.render('/products/add',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
	var myData = new Product(req.body);
    myData.save()
        .then(item => {
            res.send("Saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
    res.render('product/index', { title: 'Online Auction',products: productsChunks});
});
module.exports = router;
  