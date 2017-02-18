var express = require('express');
var router = express.Router();
var passport = require('passport');
const async = require('async');
var mongoose = require('mongoose');
var Users = require('../models/users');

var authenticateUser = function (req, res, next) {
    
    passport.authenticate('local-login', function (err, user, info) {
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

var checkUniqueEmail = function (req, res) {


    // Users.where('age').gte(25)
    //     .where('tags').in(['movie', 'music', 'art'])
    //     .select('name', 'age', 'tags')
    //     .skip(20)
    //     .limit(10)
    //     .asc('age')
    //     .slaveOk()
    //     .hint({ age: 1, name: 1 })
    //     .exec(callback);




    var query = Users.find({});

    if (req.body.id) {
        id = req.body.id;
        query.where('_id').ne(id);
    }

    email = req.body.email;

    query.where('email').eq(email);
    query.exec(function (err, docs) {

        if (err) {

            return res.json({ status: 'error', error: err });
        } else if (docs.length <= 0) {

            return res.json({ status: 'success', msg: 'available' });
        } else {
            return res.json({ status: 'success', msg: 'notavailable' });
        }
    });

}

var userRegister = function (req, res, next) {
    
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
            newUser.role = 'user';
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

var checkUniqueEmail = function (req, res) {


    // Users.where('age').gte(25)
    //     .where('tags').in(['movie', 'music', 'art'])
    //     .select('name', 'age', 'tags')
    //     .skip(20)
    //     .limit(10)
    //     .asc('age')
    //     .slaveOk()
    //     .hint({ age: 1, name: 1 })
    //     .exec(callback);




    var query = Users.find({});

    if (req.body.id) {
        id = req.body.id;
        query.where('_id').ne(id);
    }

    email = req.body.email;

    query.where('email').eq(email);
    query.exec(function (err, docs) {

        if (err) {

            return res.json({ status: 'error', error: err });
        } else if (docs.length <= 0) {

            return res.json({ status: 'success', msg: 'available' });
        } else {
            return res.json({ status: 'success', msg: 'notavailable' });
        }
    });

}

var getProfile = function (req, res) {

    Users.findById(req.params.id, function (err, docs) {
        return res.status(200).json(docs)
    });

}

var updateProfile = function (req, res) {

    var profile = req.body;
    
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

        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {

            return res.json({ status: 'success', msg: 'User updated successfully' });
        }
    });
}

router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);
router.post('/userregister',userRegister);
router.post('/checkUniqueEmail', checkUniqueEmail);
router.get('/profile/:id', getProfile);
router.put('/profile',updateProfile);


module.exports = router;