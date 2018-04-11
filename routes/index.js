var express = require('express');
var router = express.Router();

var Products   = require('../models/product');


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



router.get('/products/add', function(req, res, next) {
	res.render('product/createproduct');
});

router.post('/products/add', function(req, res, next) {
	var messages = req.flash('error');
	//res.render('/',{csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length>0});
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
  