//index.js - routing
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct 22nd, 2020


let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactsPage);

/* GET Login page. 
router.get('/login', indexController.displayLoginPage);*/

//get route for displaying the Login page - access operation
router.get('/login', indexController.displayLoginPage);

//get route for displaying the Login page - access operation
router.post('/login', indexController.processLoginPage);

//get route for displaying the register page
router.get('/register', indexController.displayRegisterPage);

//get route for displaying the Register page
router.post('/register', indexController.processRegisterPage);

//get route perform user logout page
router.get('/logout', indexController.performLogout);

module.exports = router;
