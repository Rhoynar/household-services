var express = require('express');
var passport = require('passport');
var Users = require('../models/users');
var Clients = require('../models/clients');



var router = express.Router();

router.get('/',isNotLoggedIn, function (req, res) {
    res.render('index.html');
});

router.get('/login',isNotLoggedIn, function (req, res) {
    res.render('index.html');
});

getToken = function (headers) {
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

/*router.post('/login', passport.authenticate('local-login', {
        //successRedirect : '/dashboard', // redirect to the secure profile section
        //failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages,
        session:true
    }), function(req, res,next) {
        
        //var decoded = passport.decode(token, config.secret);
        console.log(req);
        //res.send(req.user);
        
    });*/

router.post('/login', function (req, res, next) {
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
});

router.get('/signup',isNotLoggedIn, function (req, res) {
    res.render('index.html');
});

router.get('/logout',isLoggedIn, function (req, res) {
  req.logout();
  res.redirect('/');
});



// process the signup form


router.post('/signup', function (req, res, next) {
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
});


router.get('/isloggedin',function(req,res){
    if (req.isAuthenticated()){
        res.status(200);
        res.json({ msg: 'loggedIn' });
    }else{
        res.status(401);
        res.json({ msg: 'no session' });
    }
});

router.get('/dashboard',isLoggedIn, function (req, res) {
    res.render('index.html');
});

router.get('/facebook', function (req, res, next) {
    res.render('index.html');
});

router.get('/packages',isLoggedIn, function (req, res) {
    //res.send(req.user);
    res.render('index.html');
});

router.get('/profile',isLoggedIn, function (req, res) {
    res.render('index.html');
});

router.get('/facebooklogin',
    passport.authenticate('facebook', { authType: 'rerequest', scope: ['email', 'user_friends', 'manage_pages'] }));

router.get('/facebookloginreturn',
    passport.authenticate('facebook', { successRedirect: '/dashboard', failureRedirect: '/login' }),
    function (req, res) {
        //console.log(req.user);
        res.redirect('/dashboard');
    });

router.get('/profile',isLoggedIn, function (req, res) {
        res.render('index.html', { user: req.user });
    });


    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
} 
function isNotLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/dashboard');
} 
module.exports = router;