var express = require('express');
var router = express.Router();
var passport = require('passport');
const async = require('async');
var mongoose = require('mongoose');
var Users = require('../models/users');
var Services = require('../models/services');
var Packages = require('../models/packages');
var Orders = require('../models/orders');
var stripe = require('stripe')('sk_test_CL79NO7nqpgs6DVlFYNtWIXs'); //test account

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

var getAllService = function (req, res) {

    Services.find({}, function (err, serviceDocs) {
        if (err) {
            res.send({ status: 'error', msg: 'unable to fetch Services , please try later', error: err });
        } else {
            res.send({ status: 'success', result: serviceDocs });
        }
    });


}

var addVendor = function (req, res, next) {

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
            newUser.role = 'vendor';
            newUser.services = profile.serviceList;
            newUser.created = Date.now();

            newUser.save(function (err) {
                if (err) {
                    res.status(400);
                    res.json({ msg: err });  // handle errors!
                } else {
                    res.status(200);
                    res.json({ msg: 'Vendor Added succesfully' });  // handle errors!
                }
            });
        }
    });

    //passport.authenticate('local-login');
}
var getUsersByRole = function (req, res) {

    if (req.user) {
        Users.find({ 'role': req.params.roleType }, function (err, vendorDoc) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch data , please try later', error: err });
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

deleteUser = function (req, res) {
    if (req.user) {
        var vendorId = req.params.id;
        Users.remove({ _id: vendorId }, function (err, removeBrand) {
            if (err) {
                return res.json({ status: 'error', error: err, msg: "Some error occured please try later" });
            } else {
                return res.json({ status: 'success', msg: 'Deleted successfully' });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var getAllPackage = function (req, res) {

    //if (req.user) {
        Packages.find({}).populate('serviceId').exec(
            function (err, vendorDoc) {
                if (err) {
                    res.send({ status: 'error', msg: 'Unable to fetch packages , please try later', error: err });
                } else {
                    res.send({ status: 'success', result: vendorDoc });
                }
            });

    // } else {
    //     res.status(401);
    //     res.json({ status: 'error', msg: 'some error occured' });
    //     return res.send();
    // }
}

var addPackage = function (req, res) {


    var packageDetails = new Packages();
    //res.render('index.html');
    //userModel.

    packageDetails.title = req.body.title;
    packageDetails.postalcode = req.body.postcode;
    packageDetails.serviceId = req.body.serviceId;
    packageDetails.price = req.body.price;
    packageDetails.frequency = req.body.frequency;
    packageDetails.created = Date.now();
    packageDetails.features = [];
    packageDetails.vendors = [];
    req.body.featureList.forEach(function (eachFeature) {
        packageDetails.features.push(eachFeature.feature);
    });
    req.body.vendorList.forEach(function (eachVendor) {
        packageDetails.vendors.push(eachVendor.vendor);
    });

    packageDetails.save(function (err) {
        if (err) {
            return res.json({ status: 'error', error: err });
        } else {
            return res.json({ status: 'success', msg: 'Package added successfully' });
        }
    });


    //return res.json({});
}

var updatePackage = function (req, res) {


    var packageDetails = {};
    //res.render('index.html');
    //userModel.

    packageDetails.title = req.body.title;
    packageDetails.serviceId = req.body.serviceId;
    packageDetails.postalcode = req.body.postcode;
    packageDetails.price = req.body.price;
    packageDetails.frequency = req.body.frequency;
    packageDetails.created = Date.now();
    packageDetails.features = [];
    packageDetails.vendors = [];
    req.body.featureList.forEach(function (eachFeature) {
        packageDetails.features.push(eachFeature.feature);
    });
    req.body.vendorList.forEach(function (eachVendor) {
        packageDetails.vendors.push(eachVendor.vendor);
    });


    Packages.findByIdAndUpdate(req.body.id, packageDetails, function (err, updateRes) {

        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {

            return res.json({ status: 'success', msg: 'Package updated successfully' });
        }
    });




    //return res.json({});
}

var deletePackage = function (req, res) {
    var packageId = req.params.id;
    Packages.remove({ _id: packageId }, function (err, removeBrand) {
        if (err) {
            return res.json({ status: 'error', error: err, msg: "Some error occured please try later" });
        } else {
            return res.json({ status: 'success', msg: 'Package Deleted successfully' });
        }
    });

}

var getPackageByid = function (req, res) {
    var condition = {};
    if (req.body.packageId != '') {
        Packages.findById(req.body.packageId).populate('serviceId').exec(function (err, packageDoc) {
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

var getPackageByZipcode = function (req, res) {
    var condition = {};
    if (req.body.postalCode) {
        condition = { postalcode: req.body.postalCode };
    }
    Packages.find(condition).populate('serviceId').exec(function (err, packageDoc) {
        if (err) {
            res.send({ status: 'error', msg: 'unable to fetch packages , please try later', error: err });
        } else {
            res.send({ status: 'success', result: packageDoc });
        }
    });

}

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var createOrder = function (req, res) {
    if (req.user) {
        now = new Date(req.body.serviceDate.year, req.body.serviceDate.month - 1, req.body.serviceDate.day + 1);

        var order = new Orders();
        order.packageId = req.body.packageId;
        order.amount = '';
        order.clientId = req.user.id;
        order.vendorId = '';
        //order.stripeChargeId='';
        //order.chargeDetail='';
        //order.tokenDetail='';
        order.serviceDate = new Date(req.body.serviceDate.year, req.body.serviceDate.month - 1, req.body.serviceDate.day + 1);
        order.instruction = req.body.instruction;
        order.serviceType = req.body.serviceType;
        order.created = Date.now();

        async.series(
            [
                function (callback) {
                    Packages.findById(order.packageId).lean().exec(function (err, packageDoc) {
                        if (err) {
                            callback(err);
                        } else {
                            order.amount = packageDoc.price;

                            var vendorIndex = randomIntInc(0, packageDoc.vendors.length - 1);
                            order.vendorId = packageDoc.vendors[vendorIndex];
                            callback(null, packageDoc);
                        }
                    });

                }
            ],
            function (error, result) {
                order.save(function (err) {
                    if (err) {
                        return res.json({ status: 'error', error: err });
                    } else {
                        return res.json({ status: 'success', msg: 'Order added successfully' });
                    }
                });

            });

    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var userOrder = function (req, res) {
    if (req.user) {
        var condition = {};
        if (req.body.postalCode != '') {
            condition = { clientId: req.user.id };
        }
        Orders.find(condition).populate('vendorId').populate('packageId').populate({
            path: 'packageId',
            model: 'Packages',
            populate: {
                path: 'serviceId',
                model: 'Services'
            }
        }).exec(function (err, orderDocs) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch orders , please try later', error: err });
            } else {
                res.send({ status: 'success', result: orderDocs });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }

}

var vendorOrder = function (req, res) {
    if (req.user) {
        var condition = {};
        if (req.body.postalCode != '') {
            condition = { vendorId: req.user.id };
        }
        Orders.find(condition).populate('clientId').populate('packageId').populate({
            path: 'packageId',
            model: 'Packages',
            populate: {
                path: 'serviceId',
                model: 'Services'
            }
        }).exec(function (err, orderDocs) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch orders , please try later', error: err });
            } else {
                res.send({ status: 'success', result: orderDocs });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }

}

var getAllOrder = function (req, res) {
    if (req.user) {

        Orders.find({}).populate('clientId').populate('vendorId').populate('packageId').populate({
            path: 'packageId',
            model: 'Packages',
            populate: {
                path: 'serviceId',
                model: 'Services'
            }
        }).exec(function (err, orderDocs) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch orders , please try later', error: err });
            } else {
                res.send({ status: 'success', result: orderDocs });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }

}

var deleteService = function (req, res) {
    if (req.user) {
        var serviceId = req.params.id;
        Services.remove({ _id: serviceId }, function (err, removeService) {
            if (err) {
                return res.json({ status: 'error', error: err, msg: "Some error occured please try later" });
            } else {
                return res.json({ status: 'success', msg: 'Service Deleted successfully' });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }

}

var updateService = function (req, res) {

    if (req.user) {
        var updateDetails =
            {
                title: req.body.title,
            }

        Services.findByIdAndUpdate(req.body.id, updateDetails, function (err, updateRes) {

            if (err) {
                return res.json({ status: 'error', error: err });
            }
            else {
                return res.json({ status: 'success', msg: 'Service updated successfully' });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var addService = function (req, res) {

    if (req.user) {
        var serviceDetails = new Services();

        serviceDetails.title = req.body.title;

        serviceDetails.created = Date.now();

        serviceDetails.save(function (err) {
            if (err) {
                return res.json({ status: 'error', error: err });
            } else {
                return res.json({ status: 'success', msg: 'Service added successfully' });
            }
        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }


    //return res.json({});
}

var getServiceById = function (req, res) {
    var condition = {};
    var serviceId = req.params.id;
    if (serviceId != '') {
        Services.findById(serviceId).exec(function (err, packageDoc) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch Service , please try later', error: err });
            } else {
                res.send({ status: 'success', result: packageDoc });
            }
        });
    } else {
        res.status(403);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}


var getUserStripeCard = function (req, res) {
    //if user is logged in
    if (req.user) {
        Users.findById(req.user.id, function (err, userDoc) {
            //if user is allready registered on stripe as customer
            if (userDoc.stripeCustomerId && userDoc.stripeCustomerId != '') {
                stripe.customers.listCards(userDoc.stripeCustomerId,
                    function (err, cards) {
                        // asynchronously called
                        if (cards) {
                            res.send({ status: 'success', stripe_cus_id: userDoc.stripeCustomerId, result: cards.data });
                        } else {
                            res.send({ status: 'error', stripe_cus_id: userDoc.stripeCustomerId, result: [], msg: err });
                        }
                    });
            } else {
                //else send no cards available
                res.send({ status: 'error', stripe_cus_id: userDoc.stripeCustomerId, result: [] });
            }

        });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();

    }
}



var getUserForStripe = function (userId, callback) {
    Users.findById(userId, function (err, userDoc) {
        if (err) return callback(err);
        callback(null, userDoc);
    });
}

var createStripeCharge = function (stripeReqObject, callback) {
    stripe.charges.create(stripeReqObject, function (err, charge) {
        if (err) return callback(err);
        callback(null, charge);
    });
}


var payFromExistingCard = function (req, res) {

    if (req.user) {
        var cardDetails = req.body.cardDetails;
        var orderDetails = req.body.orderDetails;

        var userDetails = {};
        var chargeDetails = {};
        async.series(
            [
                function (callback) {
                    getUserForStripe(req.user.id, function (err, result) {
                        if (err) return callback(err);
                        userDetails = result;
                        if (typeof (userDetails.stripeCustomerId) == 'undefined' || userDetails.stripeCustomerId == '') {
                            callback("Stripe customer id not Found");
                        } else {
                            callback();
                        }

                    });
                },
                function (callback) {
                    Packages.findById(orderDetails.packageId).lean().exec(function (err, packageDoc) {
                        if (err) {
                            callback(err);
                        } else {
                            orderDetails.amount = packageDoc.price;

                            var vendorIndex = randomIntInc(0, packageDoc.vendors.length - 1);
                            orderDetails.vendorId = packageDoc.vendors[vendorIndex];
                            callback(null, packageDoc);
                        }
                    });

                },
                function (callback) {
                    var stripeReqObject = {
                        amount: orderDetails.amount * 100,
                        currency: "usd",
                        receipt_email: userDetails.email,
                        source: cardDetails.id, // obtained with Stripe.js
                        description: "Charge for package " + orderDetails.packageId,
                        customer: userDetails.stripeCustomerId
                    };

                    createStripeCharge(stripeReqObject, function (err, result) {
                        if (err) return callback(err);
                        chargeDetails = result
                        callback(null, result);
                    });
                }

            ],
            function (error, result) {
                if (error) {
                    res.status(200);
                    res.send({ status: 'error', msg: "Some error occured please try later", result: [], error: error });
                } else {


                    var order = new Orders();
                    order.packageId = orderDetails.packageId;
                    order.amount = orderDetails.amount;
                    order.clientId = req.user.id;
                    order.vendorId = orderDetails.vendorId;
                    order.stripeChargeId = chargeDetails.id;
                    order.chargeDetail = chargeDetails;
                    //order.tokenDetail='';
                    order.serviceDate = new Date(orderDetails.serviceDate.year, orderDetails.serviceDate.month - 1, orderDetails.serviceDate.day + 1);
                    order.instruction = orderDetails.instruction;
                    order.serviceType = orderDetails.serviceType;
                    order.created = Date.now();
                    order.save(function (err) {
                        if (err) {
                            return res.json({ status: 'error', error: err });
                        } else {
                            return res.json({ status: 'success', msg: 'Order added successfully' });
                        }
                    });
                }

            });

    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var payWithNewCard = function (req, res) {

    if (req.user) {
        var cardDetails = req.body.cardDetails;
        var orderDetails = req.body.orderDetails;

        var userDetails = {};
        var chargeDetails = {};

        async.series(
            [
                function (callback) {
                    getUserForStripe(req.user.id, function (err, result) {
                        if (err) return callback(err);
                        userDetails = result;
                        callback();
                    });
                },
                function (callback) {
                    if (typeof (userDetails.stripeCustomerId) == 'undefined' || userDetails.stripeCustomerId == '') {
                        createStripeCustomer(userDetails, function (err, result) {
                            if (err) return callback(err);
                            userDetails.stripeCustomerId = result.id;
                            userDetails.stripeCustomer = result;
                            var updateDetails =
                                {
                                    stripeCustomerId: result.id,
                                    stripeCustomer: result
                                }

                            Users.findByIdAndUpdate(req.user.id, updateDetails, function (err, updateRes) {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    callback();
                                }
                            });
                        })
                    } else {
                        callback();
                    }
                },
                function (callback) {
                    Packages.findById(orderDetails.packageId).lean().exec(function (err, packageDoc) {
                        if (err) {
                            callback(err);
                        } else {
                            orderDetails.amount = packageDoc.price;

                            var vendorIndex = randomIntInc(0, packageDoc.vendors.length - 1);
                            orderDetails.vendorId = packageDoc.vendors[vendorIndex];
                            callback(null, packageDoc);
                        }
                    });

                },
                function (callback) {
                    cardDetails.object = 'card';
                    createCardSource(userDetails.stripeCustomerId, cardDetails, function (err, result) {
                        if (err) return callback(err);
                        userDetails.stripeCustomer.sources.total_count++;

                        userDetails.stripeCustomer.sources.data.push(result);
                        updateDetails = { stripeCustomer: userDetails.stripeCustomer }
                        cardDetails.id = result.id;
                        Users.findByIdAndUpdate(req.user.id, updateDetails, function (err, updateRes) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback();
                            }
                        });
                    });
                },
                function (callback) {
                    var stripeReqObject = {
                        amount: orderDetails.amount * 100,
                        currency: "usd",
                        receipt_email: userDetails.email,
                        source: cardDetails.id, // obtained with Stripe.js
                        description: "Charge for package " + orderDetails.packageId,
                        customer: userDetails.stripeCustomerId
                    };

                    createStripeCharge(stripeReqObject, function (err, result) {
                        if (err) return callback(err);
                        chargeDetails = result
                        callback(null, result);
                    });
                }


            ],
            function (error, result) {

                if (error) {
                    res.status(200);
                    res.send({ status: 'error', msg: "Some error occured please try later", result: [], error: error });
                } else {


                    var order = new Orders();
                    order.packageId = orderDetails.packageId;
                    order.amount = orderDetails.amount;
                    order.clientId = req.user.id;
                    order.vendorId = orderDetails.vendorId;
                    order.stripeChargeId = chargeDetails.id;
                    order.chargeDetail = chargeDetails;
                    //order.tokenDetail='';
                    order.serviceDate = new Date(orderDetails.serviceDate.year, orderDetails.serviceDate.month - 1, orderDetails.serviceDate.day + 1);
                    order.instruction = orderDetails.instruction;
                    order.serviceType = orderDetails.serviceType;
                    order.created = Date.now();
                    order.save(function (err) {
                        if (err) {
                            return res.json({ status: 'error', error: err });
                        } else {
                            return res.json({ status: 'success', msg: 'Order added successfully' });
                        }
                    });
                }

            });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }

}



var createStripeCustomer = function (userDetails, callback) {
    stripe.customers.create({
        description: 'Customer ' + userDetails.email,
        email: userDetails.email
    }, function (err, customer) {
        if (err) return callback(err);
        callback(null, customer);
    });
}

var createCardSource = function (stripeCustomerId, cardDetails, callback) {

    stripe.customers.createSource(
        stripeCustomerId,
        {
            source: cardDetails
        }, function (err, card) {
            if (err) return callback(err);
            callback(null, card);
        });
}

var makePayment = function (req, res) {

    if (req.user) {
        var cardDetails = req.body.cardDetails;
        var orderDetails = req.body.orderDetails;
        var newCard = req.body.newCard;
        var saveCard = req.body.saveCard;
        var userDetails = {};
        var chargeDetails = {};
        var tokenDetails = {};

        async.series(
            [
                function (callback) {
                    getUserForStripe(req.user.id, function (err, result) {
                        if (err) return callback(err);
                        userDetails = result;
                        callback();
                    });
                },
                function (callback) {

                    //if card is new , and dont want to save card, no need to create stripe cust
                    if (!saveCard) {
                        return callback();
                    }
                    if (typeof (userDetails.stripeCustomerId) == 'undefined' || userDetails.stripeCustomerId == '') {
                        createStripeCustomer(userDetails, function (err, result) {
                            if (err) return callback(err);
                            userDetails.stripeCustomerId = result.id;
                            userDetails.stripeCustomer = result;
                            var updateDetails =
                                {
                                    stripeCustomerId: result.id,
                                    stripeCustomer: result
                                }

                            Users.findByIdAndUpdate(req.user.id, updateDetails, function (err, updateRes) {
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    callback();
                                }
                            });
                        })
                    } else {
                        callback();
                    }
                },
                function (callback) {
                    Packages.findById(orderDetails.packageId).lean().exec(function (err, packageDoc) {
                        if (err) {
                            callback(err);
                        } else {
                            orderDetails.amount = packageDoc.price;

                            var vendorIndex = randomIntInc(0, packageDoc.vendors.length - 1);
                            orderDetails.vendorId = packageDoc.vendors[vendorIndex];
                            callback(null, packageDoc);
                        }
                    });

                },
                function (callback) {
                    //if dont want to save card, no need to create source
                    if (!saveCard) {
                        return callback();
                    }
                    cardDetails.object = 'card';
                    createCardSource(userDetails.stripeCustomerId, cardDetails, function (err, result) {
                        if (err) return callback(err);
                        userDetails.stripeCustomer.sources.total_count++;

                        userDetails.stripeCustomer.sources.data.push(result);
                        updateDetails = { stripeCustomer: userDetails.stripeCustomer }
                        cardDetails.id = result.id;
                        Users.findByIdAndUpdate(req.user.id, updateDetails, function (err, updateRes) {
                            if (err) {
                                callback(err);
                            }
                            else {
                                callback();
                            }
                        });
                    });
                }, function (callback) {
                    //if want to save card, no need to create token
                    if (!newCard || saveCard) {
                        return callback();
                    }
                    //cardDetails.object = 'card';
                    createCardToken(cardDetails, function (err, result) {
                        if (err) return callback(err);

                        tokenDetails = result;
                        cardDetails.id = result.id;
                        callback();

                    });
                },
                function (callback) {
                    var stripeReqObject = {
                        amount: orderDetails.amount * 100,
                        currency: "usd",
                        receipt_email: userDetails.email,
                        source: cardDetails.id, // obtained with Stripe.js
                        description: "Charge for package " + orderDetails.packageId

                    };

                    if (!newCard || saveCard) {
                        stripeReqObject.customer = userDetails.stripeCustomerId;
                    }
                    createStripeCharge(stripeReqObject, function (err, result) {
                        if (err) return callback(err);
                        chargeDetails = result
                        callback(null, result);
                    });
                }


            ],
            function (error, result) {

                if (error) {
                    res.status(200);
                    res.send({ status: 'error', msg: "Some error occured please try later", result: [], error: error });
                } else {


                    var order = new Orders();
                    order.packageId = orderDetails.packageId;
                    order.amount = orderDetails.amount;
                    order.clientId = req.user.id;
                    order.vendorId = orderDetails.vendorId;
                    order.stripeChargeId = chargeDetails.id;
                    order.chargeDetail = chargeDetails;
                    order.tokenDetail = tokenDetails;
                    order.serviceDate = new Date(orderDetails.serviceDate.year, orderDetails.serviceDate.month - 1, orderDetails.serviceDate.day + 1);
                    order.instruction = orderDetails.instruction;
                    order.serviceType = orderDetails.serviceType;
                    order.created = Date.now();
                    order.save(function (err) {
                        if (err) {
                            return res.json({ status: 'error', error: err });
                        } else {
                            return res.json({ status: 'success', msg: 'Order added successfully' });
                        }
                    });
                }

            });
    } else {
        res.status(401);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }

}

var createCardToken = function (cardDetails, callback) {

    stripe.tokens.create({
        card: cardDetails
    }, function (err, tokenObject) {
        if (err) return callback(err);
        callback(null, tokenObject);
    });
}

router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);

router.put('/user', userRegister);
router.get('/userbyrole/:roleType', getUsersByRole);
router.delete('/deleteuser/:id', deleteUser);

router.post('/checkUniqueEmail', checkUniqueEmail);

router.get('/profile/:id', getProfile);
router.put('/profile', updateProfile);



router.put('/vendor', addVendor);


router.get('/getAllPackage', getAllPackage);
router.post('/addPackage', addPackage);
router.delete('/package/:id', deletePackage);
router.post('/updatePackage', updatePackage);
router.post('/getPackageByid', getPackageByid);
router.post('/getPackageByZipcode', getPackageByZipcode);

router.post('/createOrder', createOrder);
router.get('/userOrder', userOrder);
router.get('/vendorOrder', vendorOrder);
router.get('/getAllOrder', getAllOrder);

router.get('/service', getAllService);
router.get('/service/:id', getServiceById);
router.post('/service', addService);
router.put('/service', updateService);
router.delete('/service/:id', deleteService);

//striperoutes
router.get('/getUserStripeCard', getUserStripeCard);
router.post('/payFromExistingCard', payFromExistingCard);
router.post('/payFromExistingCard', payFromExistingCard);
router.post('/makePayment', makePayment);

//https://github.com/kekeh/mydatepicker
module.exports = router;