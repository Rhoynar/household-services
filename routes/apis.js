var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/users');

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
            name: req.body.firstname,
            lastname: req.body.lastname,
            shiptype: req.body.shiptype,
            contact_no: req.body.contact_no,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            city: req.body.city,
            postal_code: req.body.postal_code,
            country: req.body.country,
            state: req.body.state,
            billmode: req.body.billmode
        }

    /*userModel.findByIdAndUpdate(req.body.id, updateAddDetails, function (err, updateRes) {
        if (err) {
            return res.json({ status: 'error', error: err });
        }
        else {
            return res.json({ status: 'success', msg: 'Address updated successfully' });
        }
    });*/
    return res.json({});
}

router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);
router.get('/getprofile/:id', getProfile);
router.post('/updateProfile', updateProfile);


module.exports = router;