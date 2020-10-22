//users.js 
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct 22nd, 2020



let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
