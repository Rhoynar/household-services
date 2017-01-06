var express=require('express');
var passport = require('passport');
var Users = require('../models/users');
var Clients = require('../models/clients');



var router=express.Router();

router.get('/',function(req,res,next){
    res.render('index.html');
});

router.get('/login',function(req,res,next){
    res.render('index.html');
});

router.get('/signup',function(req,res,next){
    res.render('index.html');
});

router.post('/signup',function(req,res,next){
    var profile=req.body;
    
    //res.render('index.html');
    Users.findOne({ email: profile.useremail }, function(err, user) {
            if(err) {
                res.status(400);
                res.json({msg:err});  // handle errors!
            }

            if (!err && user !== null) {
                res.status(400);
                res.json({msg:'User Already exits'});
            } else {

                user = new Users({
                    email:profile.useremail,
                    name: profile.username,
                    provider:'local',
                    created: Date.now()
                });
                user.save(function(err) {
                    if(err) {
                        res.status(400);
                        res.json({msg:err});  // handle errors!
                    } else {
                        res.status(200);
                        res.json({msg:'User Added succesfully'});  // handle errors!
                    }
                });
            }


       
    });
});

router.get('/dashboard',function(req,res,next){
    res.render('index.html');
});

router.get('/facebook',function(req,res,next){
    res.render('index.html');
});

router.get('/packages',function(req,res,next){
    res.render('index.html');
});

router.get('/profile',function(req,res,next){
    res.render('index.html');
});

router.get('/facebooklogin',
  passport.authenticate('facebook',{ authType: 'rerequest', scope: ['email','user_friends', 'manage_pages'] }));

router.get('/facebookloginreturn', 
  passport.authenticate('facebook', { successRedirect: '/dashboard',failureRedirect: '/login' }),
  function(req, res) {
      //console.log(req.user);
    res.redirect('/dashboard');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('index.html', { user: req.user });
});
module.exports=router;