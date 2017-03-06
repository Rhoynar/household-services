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
var isAdminLoggedIn=function(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {

        switch (req.user.role) {
            case 'admin':
                return next();    
                break;
            case 'vendor':
                res.redirect('/vendor/dashboard');
                return false;    
                break;
            case 'user':
                res.redirect('/admin/dashboard');
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

router.get('/', isAdminLoggedIn, getTemplate);
router.get('/dashboard', isAdminLoggedIn, getTemplate);
router.get('/vendors', isAdminLoggedIn, getTemplate);
router.get('/waitingvendors', isAdminLoggedIn, getTemplate);
router.get('/packages', isAdminLoggedIn, getTemplate);
router.get('/packages/new', isAdminLoggedIn, getTemplate);
router.get('/package/edit/:id',isAdminLoggedIn,getTemplate);

router.get('/community/new', isAdminLoggedIn, getTemplate);

router.get('/services', isAdminLoggedIn, getTemplate);
router.get('/services/:id',isAdminLoggedIn,getTemplate);
router.get('/services/new',isAdminLoggedIn,getTemplate);

router.get('/orders', isAdminLoggedIn, getTemplate);




module.exports = router;