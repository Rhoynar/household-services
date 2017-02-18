var express = require('express');
var router = express.Router();
var passport = require('passport');

var getTemplate = function (req, res) {
    res.render('index.html');
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


// route middleware to make sure a user is logged in
var isUserLoggedIn=function(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {

        switch (req.user.role) {
            case 'admin':
                res.redirect('/admin/dashboard');
                return false;    
                break;
            case 'vendor':
                res.redirect('/vendor/dashboard');
                return false;    
                break;
            case 'user':
                return next();    
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

var logout=function (req, res) {
    req.logout();
    res.redirect('/');
}

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.get('/googlelogin', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/googleloginreturn',
    passport.authenticate('google',
        {
            successRedirect: '/createtoken',
            failureRedirect: '/login'
        }
    ),
    function (req, res) {
        //console.log(req.user);
        res.redirect('/dashboard');
    });

router.get('/facebooklogin',
    passport.authenticate('facebook',
        {
            authType: 'rerequest',
            scope: ['email', 'user_friends', 'manage_pages']
        }
    )
);

router.get('/facebookloginreturn',
    passport.authenticate('facebook',
        {
            successRedirect: '/createtoken',
            failureRedirect: '/login'
        }
    ),
    function (req, res) {
        res.redirect('/dashboard');
    }
);




router.get('/', forGuestOnly, getTemplate);
router.get('/login', forGuestOnly, getTemplate);
router.get('/logout', logout);
router.get('/dashboard', isUserLoggedIn, getTemplate);
router.get('/profile', isUserLoggedIn, getTemplate);
router.get('/createtoken', isUserLoggedIn, getTemplate);
module.exports = router;