//bcontacts.js controller
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct 22nd, 2020


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create reference to the model
let bcontacts = require('../models/bcontacts');


//controllers for contacts table page - read operation
let mysort = {name: 1};//to sort the table by name field
module.exports.displaybcontactsList = (req, res, next) => {
    bcontacts.find((err, bcontactsList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BContactsList);
            res.render('bcontacts/list', 
            {title:'Business Contacts', 
            BContactsList: bcontactsList, 
            displayName: req.user ? req.user.displayName: ''});
        }
    }).sort(mysort);//sorts data by name field
}

//controller for displaying the add page - create operation
module.exports.displayAddbcontacts = (req, res, next) => {
    res.render('bcontacts/add', {title: 'Add Contact', displayName: req.user ? req.user.displayName: ''})
}


//controller for processing the add page - create operation
module.exports.displayAddProcess = (req, res, next) => {
    let newbcontacts = bcontacts({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });

    bcontacts.create(newbcontacts, (err, bcontacts) =>{
        if(err)
        {
            console.log(err);
        }
        else
        {
                //refresh bcontacts list
                res.redirect('/bcontacts-list');
        }
    });

}

//Controller for displaying the update page - update operation
module.exports.displayEditbcontacts = (req, res, next) => {
    let id = req.params.id;

    bcontacts.findById(id, (err, bcontactsToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show edit page view
            res.render('bcontacts/edit', {title: 'Edit Contact', bcontacts: bcontactsToEdit, displayName: req.user ? req.user.displayName: ''})
        }
    });
}

//controller for processing the update page - update operation
module.exports.displayEditProcess = (req, res, next) => {
    let id = req.params.id;

    let updatedbcontacts = bcontacts({
        "_id": id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });

    bcontacts.updateOne({_id: id}, updatedbcontacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the bcontacts-list page
            res.redirect('/bcontacts-list');
        }
    });
}

//Controller for displaying the delete page - delete operation
module.exports.displayDelete = (req, res, next) => {
    let id = req.params.id;

    bcontacts.remove({'_id': id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the bcontacts-list page
            res.redirect('/bcontacts-list');
        }
    });
}
