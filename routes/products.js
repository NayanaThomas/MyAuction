var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/auction');

router.get('/', function(req, res) {
    var collection = db.get('products');
    collection.find({}, function(err, products){
        if (err) throw err;
      	res.json(products);
    });
});

module.exports = router;