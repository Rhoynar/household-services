var express = require('express');
var router = express.Router();
var passport = require('passport');
const async = require('async');
var mongoose = require('mongoose');
var Users = require('../models/users');

var getTemplate = function (req, res) {
    res.render('index.html');
}

// route middleware to make sure a user is logged in
var isVendorLoggedIn=function(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {

        switch (req.user.role) {
            case 'admin':
                res.redirect('/admin/dashboard');
                return false;    
                break;
            case 'vendor':
                return next();    
                break;
            case 'user':
                res.redirect('/dashboard');
                return false;    
                break;
            default:
                res.redirect('/');
                return false;
        }
        
    } else {
        // if they aren't redirect them to the home page
        res.redirect('/');
        return false;
    }

}

var forGuestOnly = function (req, res, next) {
    // if no user seesion is there, show page
    if (!req.isAuthenticated()) {
        return next();
    } else { //else redirect them to respective url
        switch (req.user.role) {
            case 'admin':
                res.redirect('/admin/dashboard');
                break;
            case 'vendor':
                res.redirect('/vendor/dashboard');
                break;
            case 'user':
                res.redirect('/dashboard');
                break;
            default:
                res.redirect('/dashboard');
        }
    }
    // if they aren't redirect them to the home page
}

router.get('/', isVendorLoggedIn, getTemplate);
router.get('/signup', forGuestOnly, getTemplate);
router.get('/dashboard', isVendorLoggedIn, getTemplate);
router.get('/orders', isVendorLoggedIn, getTemplate);
router.get('/packages', isVendorLoggedIn, getTemplate);




module.exports = router;