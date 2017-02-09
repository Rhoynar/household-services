var express = require('express');
var router = express.Router();
var passport = require('passport');

var Users = require('../models/users');
var Services = require('../models/services');
var Packages = require('../models/packages');
var Communities = require('../models/communities');
var Charges = require('../models/charges');
var PackageDeals = require('../models/packageDeals');
var stripe = require('stripe')('sk_test_CL79NO7nqpgs6DVlFYNtWIXs'); //test account

var getTemplate = function (req, res) {
    //res.json({});
    res.render('index.html');
}

// route middleware to make sure a user is logged in
function isAdminLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        if(req.user.role!='admin'){
            res.redirect('/');
            return false;    
        }else{
            return next();    
        }
        
    } else {
        // if they aren't redirect them to the home page
        res.redirect('/admin/login');
        return false;
    }

}

function isNotAdminLoggedIn(req, res, next) {
    
    // if user is not authenticated in the session, carry on 
    if (!req.isAuthenticated()){
        return next();
    }else{
        // if they aren't redirect them to the home page
        if(req.user.role=='admin'){
            res.redirect('/admin/dashboard');
            
        }else{
            res.redirect('/dashboard');
        }
        
    }

    
}



var authenticateUser = function (req, res, next) {
    passport.authenticate('admin-local-login', function (err, user, info) {
        if (err) { return next(err); }

        if (!user) {
            res.status(400);
            res.json({ msg: 'User Not found or invalid password' });
            return res.send();
        }

        req.logIn(user, function (err) {
            if (err) {
                res.status(401);
                res.json({ msg: 'some error occured' });
                return res.send();
            }
            res.status(200);
            return res.json({ 'token': user });
        });

    })(req, res, next);
}

var createtoken = function (req, res) {
    if (req.user) {
        res.status(200);
        res.json({ 'token': req.user });
        //res.send();
    } else {
        res.status(200);
        res.json({});
        //res.send();
    }

}


//get requests
router.get('/',isNotAdminLoggedIn,getTemplate);
router.get('/login',isNotAdminLoggedIn,getTemplate);
router.get('/dashboard',isAdminLoggedIn,getTemplate);
router.get('/vendors',isAdminLoggedIn,getTemplate);
router.get('/vendor/new',isAdminLoggedIn,getTemplate);
router.get('/packages',isAdminLoggedIn,getTemplate);
router.get('/package/new',isAdminLoggedIn,getTemplate);
router.get('/package/edit/:id',isAdminLoggedIn,getTemplate);

//post requests
router.post('/login',authenticateUser);
module.exports = router;