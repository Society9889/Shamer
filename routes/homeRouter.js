var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send("<h1> home </h>");
});

module.exports = router;