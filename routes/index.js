var express = require('express');
var passport = require('passport');
var Users = require('../models/users');
var Clients = require('../models/clients');



var router = express.Router();

var getTemplate=function (req, res) {
    res.render('index.html');
}

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

var login=function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            res.status(400);
            res.json({ msg: 'User Not found or invalid password' }); return res.send();
        }

        req.logIn(user, function (err) {
            if (err) {
                res.status(400);
                res.json({ msg: 'some error occured' }); return res.send();
            }
            return res.json(user);
        });

    })(req, res, next);
}

var signup=function (req, res, next) {
    console.log(req.body)
    var profile = req.body;
    //res.render('index.html');
    Users.findOne({ email: profile.useremail }, function (err, user) {
        if (err) {
            res.status(400);
            res.json({ msg: err });  // handle errors!
        }

        if (!err && user !== null) {
            res.status(400);
            res.json({ msg: 'User Already exits' });
        } else {
            var newUser = new Users();
            newUser.email = profile.useremail;
            newUser.name = profile.username;
            newUser.password = newUser.generateHash(profile.userpass);
            newUser.provider = 'local';
            newUser.created = Date.now();

            newUser.save(function (err) {
                if (err) {
                    res.status(400);
                    res.json({ msg: err });  // handle errors!
                } else {
                    res.status(200);
                    res.json({ msg: 'User Added succesfully' });  // handle errors!
                }
            });
        }
    });

    passport.authenticate('local-login');
}

    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    }else{
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
     
} 

function isNotLoggedIn(req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/dashboard');
} 



router.get('/',isNotLoggedIn, getTemplate);

router.get('/login',isNotLoggedIn, getTemplate);

router.get('/dashboard',isLoggedIn, getTemplate);

router.get('/createtoken',isLoggedIn, getTemplate);

router.get('/facebook', getTemplate);

router.get('/packages',isLoggedIn, getTemplate);

router.get('/profile',isLoggedIn, getTemplate);

router.get('/editprofile',isLoggedIn, getTemplate);

router.post('/login', login);

router.get('/signup',isNotLoggedIn, getTemplate);

router.get('/logout',isLoggedIn, function (req, res) {
  req.logout();
  res.redirect('/');
});

// process the signup form
router.post('/signup', signup);

router.get('/isloggedin',function(req,res){
    if (req.isAuthenticated()){
        res.status(200);
        res.json({ msg: 'loggedIn' });
    }else{
        res.status(401);
        res.json({ msg: 'no session' });
    }
})

router.get('/facebooklogin',
    passport.authenticate('facebook', { authType: 'rerequest', scope: ['email', 'user_friends', 'manage_pages'] }));

router.get('/facebookloginreturn',
    passport.authenticate('facebook', { successRedirect: '/createtoken', failureRedirect: '/login' }),
    function (req, res) {
        //console.log(req.user);
        res.redirect('/dashboard');
    })


module.exports = router;