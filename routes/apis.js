var express=require('express');
var router=express.Router();
var passport = require('passport');
var Users = require('../models/users');

var authenticateUser=function (req, res, next) {
  console.log(req.body)
    passport.authenticate('local-login', function (err, user, info) {
        if (err) { return next(err); }
        console.log(user+'test me');
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
            return res.json({'token':user});
        });

    })(req, res, next);
}

var createtoken=function(req,res){
    if (req.user){
      res.status(200);
      res.json({'token':req.user}); 
      res.send();
    }else{
      res.status(401);
      res.send();
    }
    
}


router.post('/authenticate', authenticateUser);

router.get('/createtoken',createtoken);



module.exports=router;