var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Students' });
});


router.get('/students', function(req, res, next) {
  res.render('students', { title: 'Students' });
});

module.exports = router;
