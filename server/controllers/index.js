//index.js
//Chandrika Rathna Karur
//Student ID: 301163364
//Oct 22nd, 2020


let express = require('express');
const { TooManyRequests } = require('http-errors');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create user model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

/* GET home page. */
module.exports.displayHomePage = (req, res, next) => {
  res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : ''})};



/* GET about page. */
module.exports.displayAboutPage = (req, res, next) => {  
    res.render('index', { title: 'About Me', displayName: req.user ? req.user.displayName : ''})};


/* GET projects page. */
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}


/* GET services page. */
module.exports.displayServicesPage = (req, res, next) => {
  res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

/* GET contact page. */
module.exports.displayContactsPage = (req, res, next) => {
  res.render('index', { title: 'Contact Me', displayName: req.user ? req.user.displayName : ''});
}

/* GET Login page. */
module.exports.displayLoginPage = (req, res, next) => {
  //check if user is already logged in
  if(!req.user)
  {
    res.render('auth/login',
    {
      title: "Login",
      messages: req.flash('loginMessage'),
      displayName: req.user ?       req.user.displayName : '' //using ternery operator to assign display name
    })
  }
  else{
    return res.redirect('/');
  }
}

/* Process login page. */
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    //server err?
    if(err)
    {
      return(next(err));
    }
    if(!user)
    {
      req.flash('loginMessage','Authentication Error');
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      //server err
      if(err)
      {
        return next(err);
      }
      return res.redirect('/bcontacts-list');
    });
  })(req,res,next);
}

/*Display Registration Page*/
module.exports.displayRegisterPage = (req,res, next) => {
  //check if the user is not already registered
  if(!req.user)
  {
    res.render('auth/register',
    {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
  else
  {
    return res.redirect('/');
  }
}

/* Process Register page. */
module.exports.processRegisterPage = (req, res, next) => {
//instabtitiate user object

let newUser = new User({
  username: req.body.username,
  password: req.body.password,
  email: req.body.email,
  displayName: req.body.displayName
});

User.register(newUser, req.body.password, (err) => {
  if(err)
  {
    console.log("Error: Inserting new user");
    if(err.name == "UserExistsError")
    {
      req.flash(
        'registerMessage',
        'Registration Error: User already Exists!'
      );
      console.log('Error: User already Exists!');
    }
    return res.render('auth/register',
    {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  }
  else
  {
    //if no error, registration is successful
    //redirect the user and authenticate them
    return passport.authenticate('local')(req, res, () =>{
      res.redirect('/bcontacts-list')
    });
  }
});

}

//process logout
module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}