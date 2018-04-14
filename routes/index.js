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




module.exports = router;
  