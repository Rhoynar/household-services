var express = require('express');
var router = express.Router();
var passport = require('passport');

var Users = require('../models/users');
var Services = require('../models/services');
var Packages = require('../models/packages');
var Vendors = require('../models/vendors');
var Communities = require('../models/communities');
var Charges = require('../models/charges');
var PackageDeals = require('../models/packageDeals');
var stripe = require('stripe')('sk_test_CL79NO7nqpgs6DVlFYNtWIXs'); //test account

var authenticateUser = function (req, res, next) {
    console.log(req.body)
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

var getProfile = function (req, res) {
    //console.log(req.params.id);

    Users.findById(req.params.id, function (err, docs) {
        return res.status(200).json(docs)
        //return res.send();
    });

}



var updateProfile = function (req, res) {

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


var createStripeCust = function (req, res) {

    Users.findById(req.user.id, function (err, userDoc) {
        if (!userDoc.stripeCustomerId || userDoc.stripeCustomerId == '') {
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

                        return res.json({ status: 'success', msg: 'Customer and Card added succesfully' });
                    }
                });

            });
        } else {

            stripe.customers.createSource(
                userDoc.stripeCustomerId,
                {
                    source: {
                        object: 'card',
                        number: req.body.number,
                        exp_month: req.body.exp_month,
                        exp_year: req.body.exp_year,
                        cvc: req.body.cvc

                    }
                },
                function (err, card) {
                    userDoc.stripeCustomer.sources.total_count++;

                    userDoc.stripeCustomer.sources.data.push(card);
                    updateDetails =
                        {
                            stripeCustomer: userDoc.stripeCustomer
                        }

                    Users.findByIdAndUpdate(userDoc.id, updateDetails, function (err, updateRes) {

                        if (err) {

                            return res.json({ status: 'error', error: err });
                        }
                        else {

                            return res.json({ status: 'success', msg: 'Card added succesfully' });
                        }
                    });
                }
            );

        }
    });

}


var getStripeCard = function (req, res) {
    if (req.user) {
        Users.findById(req.user.id, function (err, userDoc) {

            if (userDoc.stripeCustomerId && userDoc.stripeCustomerId != '') {
                stripe.customers.listCards(userDoc.stripeCustomerId,
                    function (err, cards) {
                        // asynchronously called
                        if (cards) {
                            res.send({ status: 'success', stripe_cus_id: userDoc.stripeCustomerId, result: cards.data });
                        } else {
                            res.send({ status: 'error', stripe_cus_id: userDoc.stripeCustomerId, result: [] ,msg:err});
                        }


                    });
            } else {
                res.send({ status: 'error', stripe_cus_id: userDoc.stripeCustomerId, result: [] });
            }

        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();

    }


}

var deleteStripeCards = function (req, res) {
    stripe.customers.deleteCard(
        req.body.customerId,
        req.body.cardId,
        function (err, confirmation) {
            // asynchronously called
            if (err) {
                res.send({ status: 'error', msg: 'Unable to delete, please try again later' });
            } else {
                res.send({ status: 'success', msg: 'Card Deleted succesfully' });
            }
        }
    );
}


var getAllCommunities = function (req, res) {

    Communities.find({}, function (err, communityDoc) {
        if (err) {
            res.send({ status: 'error', msg: 'unable to fetch communities , please try later', error: err });
        } else {
            res.send({ status: 'success', result: communityDoc });
        }
    });

}

var getAllServices = function (req, res) {
    var condition = {};
    if (req.body.id != '') {
        condition = { communityId: req.body.id };
    }
    Services.find(condition, function (err, serviceDoc) {
        if (err) {
            res.send({ status: 'error', msg: 'unable to fetch communities , please try later', error: err });
        } else {
            res.send({ status: 'success', result: serviceDoc });
        }
    });

}



var _internalCreateCharge = function (userDoc, selectedService, cardDetails, res) {
    stripe.charges.create({
        amount: 2000,
        currency: "usd",
        receipt_email: userDoc.email,
        customer: userDoc.stripeCustomerId,
        source: cardDetails.id, // obtained with Stripe.js
        description: "Charge for community service " + selectedService._id
    }, function (err, charge) {
        // asynchronously called

        if (charge) {
            var newCharge = new Charges();
            newCharge.serviceId = selectedService._id;
            newCharge.amount = 2000;
            newCharge.clientId = userDoc._id;
            newCharge.stripeChargeId = charge.id;
            newCharge.chargeDetail = charge;
            newCharge.created = Date.now();
            return newCharge.save(function (err) {
                if (err) {
                    //return { statuscode: 400, msg: err };  // handle errors!
                    res.status(400);
                    res.send({ statuscode: 400, msg: err });
                } else {

                    //return { statuscode: 200, status: 'success', stripe_charge_id: charge.id, result: charge, msg: "Charge created successfuly" };
                    res.status(200);
                    res.send({ statuscode: 200, status: 'success', stripe_charge_id: charge.id, result: charge, msg: "Charge created successfuly" });
                }
            });

        } else {
            res.status(200);
            res.send({ statuscode: 200, status: 'error', result: [], msg: "Some error occured please try later" });
            //return { statuscode: 200, status: 'error', result: [], msg: "Some error occured please try later" };
        }

    });
}

var createCharges = function (req, res) {

    if (req.user) {
        var cardDetails = req.body.cardDetails;
        var selectedService = req.body.selectedService;

        Users.findById(req.user.id, function (err, userDoc) {

            if (userDoc.stripeCustomerId && userDoc.stripeCustomerId != '') {
                _internalCreateCharge(userDoc, selectedService, cardDetails, res);

            } else {
                res.status(401);
                res.send({ status: 'error', msg: "Some error occured please try later", result: [] });
            }

        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}



var addandcreateCharges = function (req, res) {

    if (req.user) {
        var cardObject = req.body.cardDetails;
        var selectedService = req.body.selectedService;
        Users.findById(req.user.id, function (err, userDoc) {
            if (!userDoc.stripeCustomerId || userDoc.stripeCustomerId == '') {
                stripe.customers.create({
                    description: 'Customer ' + req.user.email,
                    email: req.user.email,
                    source: {
                        object: 'card',
                        number: cardObject.number,
                        exp_month: cardObject.exp_month,
                        exp_year: cardObject.exp_year,
                        cvc: cardObject.cvc

                    } // obtained with Stripe.js
                }, function (err, customer) {

                    if (err) {
                        res.json({ status: 'error', msg: err.message });
                    } else {
                        updateDetails =
                            {
                                stripeCustomerId: customer.id,
                                stripeCustomer: customer
                            }

                        Users.findByIdAndUpdate(req.user.id, updateDetails, function (err, updateRes) {
                            if (err) {
                                return res.json({ status: 'error', error: err, msg: 'Card is added, but Unable to update user record' });
                            }
                            else {
                                cardDetails = customer.sources[0];
                                _internalCreateCharge(userDoc, selectedService, cardDetails, res);
                            }
                        });
                    }



                });
            } else {

                stripe.customers.createSource(
                    userDoc.stripeCustomerId,
                    {
                        source: {
                            object: 'card',
                            number: cardObject.number,
                            exp_month: cardObject.exp_month,
                            exp_year: cardObject.exp_year,
                            cvc: cardObject.cvc

                        }
                    },
                    function (err, card) {
                        userDoc.stripeCustomer.sources.total_count++;

                        userDoc.stripeCustomer.sources.data.push(card);
                        updateDetails ={stripeCustomer: userDoc.stripeCustomer};

                        Users.findByIdAndUpdate(userDoc.id, updateDetails, function (err, updateRes) {

                            if (err) {
                                return res.json({ status: 'error', error: err });
                            }else {
                                _internalCreateCharge(userDoc, selectedService, card, res);
                            }
                        });
                    }
                );

            }
        });

    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}



var getMyServices = function (req, res) {
    if (req.user) {

        /*Charges.find({ clientId: req.user.id }).lean().exec()
            .then(function (chargeDoc) {

                var i = -1;
                var next = function () {

                    i++;

                    if (i < chargeDoc.length) {

                        Services.findById(chargeDoc[i].serviceId).lean().exec()
                            .then(function (serviceDocs) {


                                chargeDoc[i].serviceDetails = serviceDocs;

                                next();
                            }).catch(function (err) {

                            });

                    } else {
                        console.log(result);
                        res.status(200);
                        res.send({ statuscode: 200, status: 'success', result: chargeDoc });
                    }
                }
                next();


            })
            .then(undefined, function (err) {
                //Handle error
            })*/
            /*Charges.find({ clientId: req.user.id }).lean().exec(function (err, chargeDoc) {
            if (err) {
                res.status(401);
                res.json({ status: 'error', msg: 'some error occured' });
                return res.send();
            } else {
                var i = -1;
                var next = function () {

                    i++;

                    if (i < chargeDoc.length) {

                        Services.findById(chargeDoc[i].serviceId).lean().exec(function (err, serviceDoc) {
                            */
        PackageDeals.find({ clientId: req.user.id }).lean().exec(function (err, chargeDoc) {
            if (err) {
                res.status(401);
                res.json({ status: 'error', msg: 'some error occured' });
                return res.send();
            } else {
                var i = -1;
                var next = function () {

                    i++;

                    if (i < chargeDoc.length) {

                        Packages.findById(chargeDoc[i].packageId).lean().exec(function (err, serviceDoc) {

        
                            if (err) {
                                res.status(401);
                                res.json({ status: 'error', msg: 'some error occured' });
                                return res.send();
                            } else {
                                chargeDoc[i].serviceDetails = serviceDoc;
                                next();
                            }
                        });
                    } else {

                        res.status(200);
                        res.send({ statuscode: 200, status: 'success', result: chargeDoc });
                    }
                }
                next();

            }

        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var getPackageByZipcode = function (req, res) {
    var condition = {};
    if (req.body.postalCode != '') {
        condition = { postalcode: req.body.postalCode, frequency: req.body.frequency };
    }
    Packages.find(condition, function (err, packageDoc) {
        if (err) {
            res.send({ status: 'error', msg: 'unable to fetch packages , please try later', error: err });
        } else {
            res.send({ status: 'success', result: packageDoc });
        }
    });

}

var getPackageByid = function (req, res) {
    var condition = {};
    if (req.body.packageId != '') {
        Packages.findById(req.body.packageId).lean().exec(function (err, packageDoc) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch package , please try later', error: err });
            } else {
                res.send({ status: 'success', result: packageDoc });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }


}


var _internalPackageCreateCharge = function (userDoc, selectedService, cardDetails, res,sourceType) {

    var stripeReqObject={
        amount: selectedService.price*100,
        currency: "usd",
        receipt_email: userDoc.email,
        source: cardDetails.id, // obtained with Stripe.js
        description: "Charge for package " + selectedService._id
    };

    if(sourceType!='token'){
        stripeReqObject.customer=userDoc.stripeCustomerId;
    }
    ///create charges
    stripe.charges.create(stripeReqObject, function (err, charge) {
        // asynchronously called

        ////save returned charge into database
        if (charge) {
            var newPackageCharge = new PackageDeals();
            newPackageCharge.packageId = selectedService._id;
            newPackageCharge.amount = selectedService.price*100;
            newPackageCharge.clientId = userDoc._id;
            newPackageCharge.stripeChargeId = charge.id;
            newPackageCharge.chargeDetail = charge;
            if(sourceType=='token'){
                newPackageCharge.tokenDetail = cardDetails;
            }
            newPackageCharge.created = Date.now();
            return newPackageCharge.save(function (err) {
                if (err) {
                    //return { statuscode: 400, msg: err };  // handle errors!
                    res.status(400);
                    res.send({ statuscode: 400, msg: err });
                } else {

                    //return { statuscode: 200, status: 'success', stripe_charge_id: charge.id, result: charge, msg: "Charge created successfuly" };
                    res.status(200);
                    res.send({ statuscode: 200, status: 'success', stripe_charge_id: charge.id, result: charge, msg: "Charge created successfuly" });
                }
            });

        } else {
            res.status(200);
            res.send({ statuscode: 200, status: 'error', result: [], msg: "Some error occured please try later",error:err });
        }

    });
}


// pay with saved cards 
var createPackageCharges = function (req, res) {

    if (req.user) {
        var cardDetails = req.body.cardDetails;
        var selectedService = req.body.selectedService;
        var isNewCard = req.body.isNewCard;
        var doSave = req.body.doSave;

        Users.findById(req.user.id, function (err, userDoc) {
            if(err){
                res.status(200);
                res.send({ status: 'error', msg: "Some error occured please try later", result: [] ,error:err});
            }else if(userDoc.stripeCustomerId && userDoc.stripeCustomerId != '') { //if stripecustomerid is there in database
                if(isNewCard=='no'){
                    _internalPackageCreateCharge(userDoc, selectedService, cardDetails, res,'source');    
                }else{
                    cardDetails.object='card';
                    stripe.customers.createSource(
                                userDoc.stripeCustomerId,
                                {
                                    source: cardDetails
                                },
                                function (err, card) {
                                    userDoc.stripeCustomer.sources.total_count++;

                                    userDoc.stripeCustomer.sources.data.push(card);
                                    updateDetails =
                                        {
                                            stripeCustomer: userDoc.stripeCustomer
                                        }

                                    Users.findByIdAndUpdate(userDoc.id, updateDetails, function (err, updateRes) {

                                        if (err) {

                                            return res.json({ status: 'error', error: err });
                                        }
                                        else {
                                            _internalPackageCreateCharge(userDoc, selectedService, card, res,'source');    
                                            //return res.json({ status: 'success', msg: 'Card added succesfully' });
                                        }
                                    });
                                }
                            );
                    
                }
            } else {
                cardDetails.object='card';
                stripe.customers.create({
                    description: 'Customer ' + userDoc.email,
                    email: userDoc.email,
                    source: cardDetails // obtained with Stripe.js
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

                            _internalPackageCreateCharge(userDoc, selectedService, customer.sources.data[0], res,'source');    

                            //return res.json({ status: 'success', msg: 'Customer and Card added succesfully' });
                        }
                    });

                });

                //as there was no stripecustomer in database , this will card type
                _internalPackageCreateCharge(userDoc, selectedService, cardDetails, res,'card');    
            }

        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}


// pay with cards but dont save cards in user profile
var payPackageWithToken = function (req, res) {

    if (req.user) {
        var cardObject = req.body.cardDetails;
        var selectedService = req.body.selectedService;
        Users.findById(req.user.id, function (err, userDoc) {
            createStripeTokenandPay(err, userDoc,cardObject,selectedService,res)
        });

    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var createStripeTokenandPay=function(err, userDoc,cardObject,selectedService,res){
    if(err){
        res.json({ status: 'error', msg: 'some error occured',error:err });
        return res.send();
    }else{
        stripe.tokens.create({
            card: {
                number: cardObject.number,
                exp_month: cardObject.exp_month,
                exp_year: cardObject.exp_year,
                cvc: cardObject.cvc

            } // obtained with Stripe.js
        }, function (err, tokenObject) {

            if (err) {
                res.json({ status: 'error', msg: err.message });
            } else {
                _internalPackageCreateCharge(userDoc, selectedService, tokenObject, res,'token');
            }
        });
    }
}


// pay with cards but dont save cards in user profile
var getAllVendors = function (req, res) {

    if (req.user) {
        Vendors.find({}, function (err, vendorDoc) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch vendors , please try later', error: err });
            } else {
                res.send({ status: 'success', result: vendorDoc });
            }
        });

    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}



var addVendor= function (req, res) {

    
    var vendorProfile = new Vendors();
    //res.render('index.html');
    //userModel.
    
    vendorProfile.name= req.body.vendorName;
    vendorProfile.email= req.body.vendorEmail;
    vendorProfile.phone= req.body.userphone;
    vendorProfile.addresslineone= req.body.addresslineone;
    vendorProfile.addresslinetwo= req.body.addresslinetwo;
    vendorProfile.city= req.body.vendorcity;
    vendorProfile.country= req.body.vendorcountry;
    vendorProfile.zipcode= req.body.vendorzip;
    vendorProfile.created = Date.now();

    vendorProfile.save(function (err) {
        if (err) {
            return res.json({ status: 'error', error: err });
        } else {
            return res.json({ status: 'success', msg: 'Vendor added successfully' });
        }
    });

    
    //return res.json({});
}


var getAllPackage= function (req, res) {

    if (req.user) {
        Packages.find({}, function (err, vendorDoc) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch packages , please try later', error: err });
            } else {
                res.send({ status: 'success', result: vendorDoc });
            }
        });

    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var addPackage= function (req, res) {

    
    var packageDetails = new Packages();
    //res.render('index.html');
    //userModel.
    
    packageDetails.title= req.body.title;
    packageDetails.postalcode= req.body.postcode;
    packageDetails.price= req.body.price;
    packageDetails.frequency= req.body.frequency;
    packageDetails.created = Date.now();
    packageDetails.features=[];
    req.body.featureList.forEach(function(eachFeature) {
        packageDetails.features.push(eachFeature.feature);
    });

    packageDetails.save(function (err) {
        if (err) {
            return res.json({ status: 'error', error: err });
        } else {
            return res.json({ status: 'success', msg: 'package added successfully' });
        }
    });

    
    //return res.json({});
}

var deletePackage = function(req, res) {
  var packageId = req.params.id;
  Packages.remove({_id:packageId},function(err,removeBrand){
    if (err) {
            return res.json({ status: 'error', error: err,msg:"Some error occured please try later" });
        } else {
            return res.json({ status: 'success', msg: 'package Deleted successfully' });
        }
  });
  
}

var updatePackage= function (req, res) {

    
    var packageDetails={};
    //res.render('index.html');
    //userModel.
    
    packageDetails.title= req.body.title;
    packageDetails.postalcode= req.body.postcode;
    packageDetails.price= req.body.price;
    packageDetails.frequency= req.body.frequency;
    packageDetails.created = Date.now();
    packageDetails.features=[];
    req.body.featureList.forEach(function(eachFeature) {
        packageDetails.features.push(eachFeature.feature);
    });

    Packages.findByIdAndUpdate(req.body.id, packageDetails, function (err, updateRes) {

        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {

            return res.json({ status: 'success', msg: 'User updated successfully' });
        }
    });

    

    
    //return res.json({});
}

router.post('/deleteCards', deleteStripeCards);

router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);
router.get('/getprofile/:id', getProfile);
router.post('/updateProfile', updateProfile);
router.post('/checkUniqueEmail', checkUniqueEmail);
router.post('/createStripeCust', createStripeCust);
router.get('/getStripeCard', getStripeCard);
router.get('/getAllCommunities', getAllCommunities);
router.post('/getAllServices', getAllServices);
router.post('/createCharges', createCharges);
router.post('/addandcreateCharges', addandcreateCharges);
router.get('/getMyServices', getMyServices);
router.post('/getPackageByZipcode', getPackageByZipcode);
router.post('/getPackageByid', getPackageByid);
router.post('/createPackageCharges',createPackageCharges);
router.post('/payPackageWithToken',payPackageWithToken);
router.get('/getAllVendors',getAllVendors);
router.post('/addVendor',addVendor);
router.get('/getAllPackage',getAllPackage);
router.post('/addPackage',addPackage);
router.delete('/package/:id', deletePackage);
router.post('/updatePackage',updatePackage);


module.exports = router;