var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Users = require('../models/users');
var TmpUsers= require('../models/tmpusers');


var nev = require('email-verification')(mongoose);

nev.configure({
    verificationURL: 'http://ec2-54-165-12-165.compute-1.amazonaws.com:5000/email-verification/${URL}',
    URLLength: 48,

    // mongo-stuff
    persistentUserModel: Users,
    tempUserModel: TmpUsers,
    tempUserCollection: 'tmpusers',
    emailFieldName: 'email',
    passwordFieldName: 'password',
    URLFieldName: 'GENERATED_VERIFYING_URL',
    expirationTime: 86400,

    // emailing options
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'rakesh.s@cisinlabs.com',
            pass: 'n4tdvrt89'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <user@gmail.com>',
        subject: 'Confirm your account',
        html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
    shouldSendConfirmation: true,
    confirmMailOptions: {
        from: 'Do Not Reply <user@gmail.com>',
        subject: 'Successfully verified!',
        html: '<p>Your account has been successfully verified.</p>',
        text: 'Your account has been successfully verified.'
    },

    hashingFunction: null,
}, function(error, options){
    console.log(error);
});

// nev.generateTempUserModel(Users, function(err, tempUserModel) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
// });


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    from: 'replyemail@example.com',
    options: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'rakesh.s@cisinlabs.com',
            pass: 'n4tdvrt89'
        }
    }
});


var getTemplate = function (req, res) {
    res.render('index.html');
}

var forGuestOnly = function (req, res, next) {
    
    // if no user seesion is there, show page
    if (typeof(req.user)=="undefined" || !req.isAuthenticated()   ) {
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
                res.redirect('/logout');
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
router.get('/services', getTemplate);
router.get('/learnmore', getTemplate);
router.get('/forgotpass',forGuestOnly, getTemplate);
router.get('/resetpass/:id',forGuestOnly,getTemplate);
router.get('/dashboard', isUserLoggedIn, getTemplate);
router.get('/profile', isUserLoggedIn, getTemplate);
router.get('/createtoken', isUserLoggedIn, getTemplate);
router.get('/package/search',isUserLoggedIn, getTemplate);
router.get('/package',isUserLoggedIn, getTemplate);
router.get('/order',isUserLoggedIn, getTemplate);
// user accesses the link that is sent
router.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
        console.log(user);
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          //return res.status(404).send('ERROR: sending confirmation email FAILED');
          res.redirect('/login');
        }
        res.json({
          msg: 'CONFIRMED!',
          info: info
        });
      });
    } else {
        console.log(err);
        res.redirect('/login');
      //return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
});
module.exports = router;