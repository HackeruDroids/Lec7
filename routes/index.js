var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Students'
  });
});

/* GET Students page. */
router.get('/students', function (req, res, next) {
  res.render('students', {
    title: 'Students'
  });
});

var pg = require('pg');

/* GET Students page. */
router.get('/initDb', function (req, res, next) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return res.render('error', {
        error: err,
        message: err.message
      });
    }
    var SQL = "CREATE TABLE Students(id SERIAL UNIQUE, firstName TEXT, lastName TEXT, email TEXT)";
    client.query(SQL, function (err, result) {
      if (err) {
        return res.render('error', {
          error: err,
          message: err.message
        });
      }
      res.render('index', {title:"succeesfully added students table"});
    });
  });
  res.render('index', {
    title: 'Students'
  });
});

module.exports = router;