var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/users');
var Users = require('../models/users');

var authenticateUser = function (req, res, next) {
    console.log(req.body)
    passport.authenticate('local-login', function (err, user, info) {
        if (err) { return next(err); }
        console.log(user + 'test me');
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
        res.send();
    } else {
        res.status(200);
        res.json({});
        res.send();
    }

}

var getProfile = function (req, res) {
    //console.log(req.params.id);

    userModel.findById(req.params.id, function (err, docs) {
        return res.status(200).json(docs)
        //return res.send();
    });

}

var updateProfile = function (req, res) {
    console.log(req.body)
    var profile = req.body;
    //res.render('index.html');
    //userModel.
    updateDetails =
        {
            name: req.body.username,
            email: req.body.useremail,
            phone: req.body.userphone,
            addresslineone: req.body.addresslineone,
            addresslinetwo: req.body.addresslinetwo,
            city: req.body.usercity,
            country: req.body.usercountry,
        }

    Users.findByIdAndUpdate(req.body.id, updateDetails, function (err, updateRes) {
        console.log(updateRes);
        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {
            
            return res.json({ status: 'success', msg: 'User updated successfully' });
        }
    });
    //return res.json({});
}

router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);
router.get('/getprofile/:id', getProfile);
router.post('/updateProfile', updateProfile);


module.exports = router;