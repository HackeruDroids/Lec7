var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Students'
  });
});

/* GET Students page. */
router.get('/students', function (req, res, next) {
      pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        if (err) {
          return res.render('error', {
            error: err,
            message: err.message
          });
        }
        var SQL = "SELECT * FROM Students ORDER BY firstName";
        client.query(SQL, function (err, result) {
          if (err) {
            return res.render('error', {
              error: err,
              message: err.message
            });
          }

          done();
          // res.json({students:result.rows});
          res.render('students', {
            title: "Student List",
            students: result.rows
          });
        });
      });
});
      /* GET Add Student page. */
      router.get('/addStudent', function (req, res, next) {
        res.render('addStudent', {
          title: 'Add Student'
        });
      });

      /* POST Add Student page. */
      router.post('/addStudent', function (req, res, next) {
        //
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;

        pg.connect(process.env.DATABASE_URL, function (err, client, done) {
          if (err) {
            return res.render('error', {
              error: err,
              message: err.message
            });
          }
          var SQL = "INSERT INTO Students(firstName, lastName, email) VALUES($1, $2, $3);";
          client.query(SQL, [firstName, lastName, email], function (err, result) {
            if (err) {
              return res.render('error', {
                error: err,
                message: err.message
              });
            }
            done();
            res.render('index', {
              title: "succeesfully added student"
            });
          });
        });
      });



      /* GET Students page. */
      //router.get('/initDb', function (req, res, next) {
      // pg.connect(process.env.DATABASE_URL, function (err, client, done) {
      //   if (err) {
      //     return res.render('error', {
      //       error: err,
      //       message: err.message
      //     });
      //   }
      //   var SQL = "CREATE TABLE Students(id SERIAL UNIQUE, firstName TEXT, lastName TEXT, email TEXT)";
      //   client.query(SQL, function (err, result) {
      //     if (err) {
      //       return res.render('error', {
      //         error: err,
      //         message: err.message
      //       });
      //     }
      //     done();
      //     res.render('index', {title:"succeesfully added students table"});
      //   });
      // });
      //});

      module.exports = router;