//bcontacts.js - routing to bcontacts page require authentication
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct 22nd, 2020

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//connect to business contact list
//let bcontacts = require('../models/bcontacts');

let bcontactsController = require('../controllers/bcontacts');

//helper function for gaurd purpose
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//get route for contacts table page - read operation
router.get('/', requireAuth, bcontactsController.displaybcontactsList);

//get route for displaying the add page - create operation
router.get('/add', requireAuth, bcontactsController.displayAddbcontacts);

//get route for displaying the add page - create operation
router.post('/add', requireAuth, bcontactsController.displayAddProcess);

//get route for displaying the update page - update operation
router.get('/edit/:id', requireAuth, bcontactsController.displayEditbcontacts);

//post route for processing the update page - update operation
router.post('/edit/:id', requireAuth, bcontactsController.displayEditProcess);

//get route for displaying the delete page - delete operation
router.get('/delete/:id', requireAuth, bcontactsController.displayDelete);


module.exports = router;