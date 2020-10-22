//bcontacts.js model
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct 22nd, 2020



let mongoose = require('mongoose');

//create mongoose db
let bcontactsmodel = mongoose.Schema({
    name: String,
    phone: Number,
    email: String
},
{
    collection: "bcontacts"
});


module.exports = mongoose.model('bcontacts', bcontactsmodel);