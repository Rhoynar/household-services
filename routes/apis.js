var express = require('express');
var router = express.Router();
var passport = require('passport');

var Users = require('../models/users');
var stripe = require('stripe')('sk_test_CL79NO7nqpgs6DVlFYNtWIXs'); //test account

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
        //res.send();
    } else {
        res.status(200);
        res.json({});
        //res.send();
    }

}

var getProfile = function (req, res) {
    //console.log(req.params.id);

    Users.findById(req.params.id, function (err, docs) {
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

        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {

            return res.json({ status: 'success', msg: 'User updated successfully' });
        }
    });
    //return res.json({});
}

var checkUniqueEmail = function (req, res) {
    console.log(req.body)

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
        console.log(docs);
        if (err) {

            return res.json({ status: 'error', error: err });
        } else if (docs.length <= 0) {

            return res.json({ status: 'success', msg: 'available' });
        } else {
            return res.json({ status: 'success', msg: 'notavailable' });
        }
    });

}


var createStripeCust = function (req, res) {

    stripe.customers.create({
        description: 'Customer ' + req.user.email,
        email: req.user.email,
        source: {
            object: 'card',
            number: req.body.number,
            exp_month: req.body.exp_month,
            exp_year: req.body.exp_year,
            cvc: req.body.cvc

        } // obtained with Stripe.js
    }, function (err, customer) {

        if (err) {
            res.json({ status: 'error', msg: err.message });
        }

        updateDetails =
            {
                stripeCustomerId: customer.id,
                stripeCustomer: customer
            }

        Users.findByIdAndUpdate(req.user.id, updateDetails, function (err, updateRes) {

            if (err) {

                return res.json({ status: 'error', error: err });
            }
            else {

                return res.json({ status: 'success', msg: 'Card added succesfully' });
            }
        });

    });

}

var getStripeCard = function (req, res) {



    Users.findById(req.user.id, function (err, user) {
        stripe.customers.listCards(user.stripeCustomerId,
        function (err, cards) {
            // asynchronously called
            res.send({ status: 'success', result: cards.data });
        });
        
    });



}

router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);
router.get('/getprofile/:id', getProfile);
router.post('/updateProfile', updateProfile);
router.post('/checkUniqueEmail', checkUniqueEmail);
router.post('/createStripeCust', createStripeCust);
router.get('/getStripeCard', getStripeCard);


module.exports = router;