var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');
const async = require('async');
var mongoose = require('mongoose');
var Users = require('../models/users');
var TmpUsers= require('../models/tmpusers');
var Services = require('../models/services');
var Passwordchange = require('../models/passwordchange');
var Packages = require('../models/packages');
var Orders = require('../models/orders');
var Communities=require('../models/communities');
var stripe = require('stripe')('sk_test_CL79NO7nqpgs6DVlFYNtWIXs'); //test account
var moment = require('moment');

var multer  = require('multer');



var nev = require('email-verification')(mongoose);



nev.configure({
    verificationURL: 'http://ec2-184-73-127-34.compute-1.amazonaws.com:5000/email-verification/${URL}',
    URLLength: 48,

    // mongo-stuff
    persistentUserModel: Users,
    tempUserModel: TmpUsers,
    tempUserCollection: 'tmpusers',
    emailFieldName: 'email',
    passwordFieldName: 'password',
    URLFieldName: 'GENERATED_VERIFYING_URL',
    expirationTime: 86400,

    // emailing options
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'rakesh.s@cisinlabs.com',
            pass: 'n4tdvrt89'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <user@gmail.com>',
        subject: 'Confirm your account',
        html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
    shouldSendConfirmation: true,
    confirmMailOptions: {
        from: 'Do Not Reply <user@gmail.com>',
        subject: 'Successfully verified!',
        html: '<p>Your account has been successfully verified.</p>',
        text: 'Your account has been successfully verified.'
    },

    hashingFunction: null,
}, function(error, options){
    console.log(error);
});

// nev.generateTempUserModel(Users, function(err, tempUserModel) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
// });


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// var transporter = nodemailer.createTransport({
//     from: 'rakesh.s@cisinlabs.com',
//     options: {
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure:true,
//         auth: {
//             user: 'rakesh.s@cisinlabs.com',
//             pass: 'n4tdvrt89'
//         }
//     }
// });

var transporter = nodemailer.createTransport(smtpTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: 'rakesh.s@cisinlabs.com',
                pass: 'n4tdvrt89'
              }
            }));





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

            /*newUser.save(function (err) {
                if (err) {
                    res.status(400);
                    res.json({ msg: err });  // handle errors!
                } else {
                    res.status(200);
                    res.json({ msg: 'User Added succesfully' });  // handle errors!
                }
            });*/






            nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
            // some sort of error
                if (err) {
                    return res.status(404).send('ERROR: creating temp user FAILED');
                }
                    // handle error...

                // user already exists in persistent collection...
                // user already exists in persistent collection
                if (existingPersistentUser) {
                    return res.json({status:'sucess',sort_msg:'alreadyexist',
                      msg: 'You have already signed up and confirmed your account. Did you forget your password?'
                    });
                }

                // a new user
                if (newTempUser) {
                    var URL = newTempUser[nev.options.URLFieldName];
                    nev.sendVerificationEmail(newUser.email, URL, function(err, info) {
                        if (err) {
                            return res.status(404).send(err);
                        }

                        res.json({
                            status:'sucess',sort_msg:'emailsent',
                            msg: 'An email has been sent to you. Please check it to verify your account.',
                            info: info
                        });


                    });

                // user already exists in temporary collection...
                } else {
                    // res.json({
                    //     msg: 'You have already signed up. Please check your email to verify your account.'
                    // });

                    nev.resendVerificationEmail(newUser.email, function(err, userFound) {
                          if (err) {
                            return res.status(404).send('ERROR: resending verification email FAILED');
                          }
                          if (userFound) {
                            res.json({
                              status:'sucess',sort_msg:'emailsentagain',
                              msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                            });
                          } else {
                            res.json({
                                status:'fail',sort_msg:'code-expired',
                              msg: 'Your verification code has expired. Please sign up again.'
                            });
                          }
                    });

                }
            });


















        }
    });

    //passport.authenticate('local-login');
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
            zipcode: req.body.zipcode
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

    Services.find({}).populate('communityId').exec(function (err, serviceDocs) {
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
            res.json({ msg: 'User with this email Already exits' });
        } else {
            var newUser = new Users();
            newUser.email = profile.useremail;
            newUser.name = profile.username;
            newUser.password = newUser.generateHash(profile.userpass);
            newUser.provider = 'local';
            newUser.role = 'vendor';
            newUser.services = profile.serviceList;
            newUser.created = Date.now();
            newUser.created = 0;

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

var vendorbystatus = function (req, res) {

    if (req.user) {
        var statusCondition=[{'status':req.params.status}];
        if(req.params.status==0){
            statusCondition.push({'status':null});    
            statusCondition.push({'status':''});    
        }
        
        Users.find({ 'role': 'vendor',$or:statusCondition }).populate('services').exec(function (err, vendorDoc) {
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

approveVendor= function (req, res) {
    if (req.user) {
        var profile = req.body;

        updateDetails =
            {
                status:1,
            }

        Users.findByIdAndUpdate(profile.vendorId, updateDetails, function (err, updateRes) {

            if (err) {

                return res.json({ status: 'error', error: err });
            }
            else {

                return res.json({ status: 'success', msg: 'vendor Approved successfully' });
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
    
    packageDetails.communityId = req.body.communityId;
    packageDetails.mon_mor_price = req.body.mon_mor_price;
    packageDetails.mon_noon_price = req.body.mon_noon_price;
    packageDetails.mon_eve_price = req.body.mon_eve_price;
    packageDetails.tue_mor_price = req.body.tue_mor_price;
    packageDetails.tue_noon_price = req.body.tue_noon_price;
    packageDetails.tue_eve_price = req.body.tue_eve_price;
    packageDetails.wed_mor_price = req.body.wed_mor_price;
    packageDetails.wed_noon_price = req.body.wed_noon_price;
    packageDetails.wed_eve_price = req.body.wed_eve_price;
    packageDetails.thur_mor_price = req.body.thur_mor_price;
    packageDetails.thur_noon_price = req.body.thur_noon_price;
    packageDetails.thur_eve_price = req.body.thur_eve_price;
    packageDetails.fri_mor_price = req.body.fri_mor_price;
    packageDetails.fri_noon_price = req.body.fri_noon_price;
    packageDetails.fri_eve_price = req.body.fri_eve_price;
    packageDetails.sat_mor_price = req.body.sat_mor_price;
    packageDetails.sat_noon_price = req.body.sat_noon_price;
    packageDetails.sat_eve_price = req.body.sat_eve_price;
    packageDetails.sun_mor_price = req.body.sun_mor_price;
    packageDetails.sun_noon_price = req.body.sun_noon_price;
    packageDetails.sun_eve_price = req.body.sun_eve_price;


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

    packageDetails.communityId = req.body.communityId;
    packageDetails.mon_mor_price = req.body.mon_mor_price;
    packageDetails.mon_noon_price = req.body.mon_noon_price;
    packageDetails.mon_eve_price = req.body.mon_eve_price;
    packageDetails.tue_mor_price = req.body.tue_mor_price;
    packageDetails.tue_noon_price = req.body.tue_noon_price;
    packageDetails.tue_eve_price = req.body.tue_eve_price;
    packageDetails.wed_mor_price = req.body.wed_mor_price;
    packageDetails.wed_noon_price = req.body.wed_noon_price;
    packageDetails.wed_eve_price = req.body.wed_eve_price;
    packageDetails.thur_mor_price = req.body.thur_mor_price;
    packageDetails.thur_noon_price = req.body.thur_noon_price;
    packageDetails.thur_eve_price = req.body.thur_eve_price;
    packageDetails.fri_mor_price = req.body.fri_mor_price;
    packageDetails.fri_noon_price = req.body.fri_noon_price;
    packageDetails.fri_eve_price = req.body.fri_eve_price;
    packageDetails.sat_mor_price = req.body.sat_mor_price;
    packageDetails.sat_noon_price = req.body.sat_noon_price;
    packageDetails.sat_eve_price = req.body.sat_eve_price;
    packageDetails.sun_mor_price = req.body.sun_mor_price;
    packageDetails.sun_noon_price = req.body.sun_noon_price;
    packageDetails.sun_eve_price = req.body.sun_eve_price;

    
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
        order.serviceDate = new Date(req.body.serviceDate.year, req.body.serviceDate.month - 1, req.body.serviceDate.day + 1,0,0,0);
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


var upComingUserOrder=function(req,res){
    if (req.user) {
        var condition = {};
        //if (req.body.postalCode != '') {
            condition = { 
                clientId: req.user.id
             };
        //}

        var sDate=moment(new Date()).format("YYYY-MM-DD");
        var eDate=moment(new Date()).add(1, 'days').format("YYYY-MM-DD");
        condition.serviceDate={ "$gte": sDate, "$lt": eDate };
        
        Orders.find(condition).sort({serviceDate: 1}).populate('vendorId').populate('packageId').populate({
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
var userOrder = function (req, res) {
    if (req.user) {
        var condition = {};
        //if (req.body.postalCode != '') {
            condition = { 
                clientId: req.user.id
             };
        //}

        
        
        Orders.find(condition).sort({serviceDate: 1}).populate('vendorId').populate('packageId').populate({
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

var upcomingVendorOrder = function (req, res) {
    if (req.user) {
        var condition = {};
        
        condition = { vendorId: req.user.id };
        

        var sDate=moment(new Date()).format("YYYY-MM-DD");
        var eDate=moment(new Date()).add(1, 'days').format("YYYY-MM-DD");
        condition.serviceDate={ "$gte": sDate, "$lt": eDate };

        Orders.find(condition).sort({serviceDate: 1}).populate('clientId').populate('packageId').populate({
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

        var sDate=moment(new Date()).format("YYYY-MM-DD");
        var eDate=moment(new Date()).add(1, 'days').format("YYYY-MM-DD");
        //condition.serviceDate={ "$gte": sDate, "$lt": eDate };

        Orders.find(condition).sort({serviceDate: 1}).populate('clientId').populate('packageId').populate({
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
                communityId : req.body.communityId
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
        serviceDetails.communityId = req.body.communityId;
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
                    order.serviceDate = new Date(orderDetails.serviceDate.year, orderDetails.serviceDate.month - 1, orderDetails.serviceDate.day + 1,0,0,0);
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

var forgotpass= function (req, res) {
    //if user is logged in
    var profile = req.body;
    //res.render('index.html');
    Users.findOne({ email: profile.useremail }, function (err, user) {
        if (err) {
            res.status(400);
            res.json({ msg: err });  // handle errors!
        }

        if(user){
            
            var newChangeReq = new Passwordchange();
            
            newChangeReq.userId = user._id;
            var thirdyMinutesLater = new Date();
            thirdyMinutesLater.setMinutes(thirdyMinutesLater.getMinutes() + 30);
            newChangeReq.validtill=thirdyMinutesLater,
            

            newChangeReq.save(function (err,data) {
                if (err) {
                    res.status(400);
                    res.json({ msg: err });  // handle errors!
                } else {
                    

                    var verificationURL='/orders/resetpass/'+data._id;
                    let mailOptions = {
                        from: 'Do Not Reply <user@gmail.com>', // sender address
                        to: user.email, // list of receivers
                        subject: 'Password Change request', // Subject line
                        text: 'Hello '+user.name+' we have received your password change request. please change it by clicking following link or copying and pasting it into your browser'+verificationURL, // plain text body
                        html: '<b>Hello '+user.name+'</b><p>we have received your password change request.</p><p>please change it by clicking <a href="'+verificationURL+'">this link</a></p>If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>'+verificationURL+'</p>'
                    };
                    
                    
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            res.status(400);
                            res.json({msg:err});
                            //res.json({ msg: "Unable to send email , please try later" });  // handle errors!
                        }else{
                            res.status(200);
                            res.json({ msg: 'Change Request generated succesfully' });  // handle errors!    
                        }
                        transporter.close();
                        
                    });
                    
                }
            });
        }else{
            res.status(400);
            res.json({ msg: 'Profile with this email is not found' });  // handle errors!
        }
    });
    
    
}

var getForgotReq = function (req, res) {
    var condition = {};
    var forgotReqId = req.params.id;
    if (forgotReqId != '') {
        Passwordchange.findById(forgotReqId).populate('userId').exec(function (err, changeReq) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch Change request , please try later', error: err });
            } else {
                res.send({ status: 'success', result: changeReq });
            }
        });
    } else {
        res.status(403);
        res.json({ status: 'error', msg: 'some error occured' });
        return res.send();
    }
}

var resetpass =function (req, res) {
    //if user is logged in
    var userData = req.body;
    //res.render('index.html');
    //Users.findOne({ email: profile.useremail }, function (err, user) {
    Passwordchange.findById(userData.id).populate('userId').exec(function (err, changeData) {
        if (err) {
            res.status(400);
            res.json({ msg: err,msgType:"unexpected" });  // handle errors!
        }
        
        if(changeData){
            if(changeData.validtill<new Date || changeData.used=="yes"){
                res.status(400).json({ msg: "Change request Expired or already used",msgType:"expiredLink" }); 
            }else{


                async.series(
            [
                function (callback) {
                    var updateDetails ={used:"yes"};
                    Passwordchange.findByIdAndUpdate(userData.id, updateDetails, function (err, updateRes) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback();
                        }
                    }); 
                },
                function (callback) {

                    var newUser=new Users();
                    updateDetails ={
                        password: newUser.generateHash(userData.userpass),
                    }
                    Users.findByIdAndUpdate(userData.userId, updateDetails, function (err, updateRes) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback();
                        }
                    }); 
                }
            ],
            function (error, result) {
                if (error) {
                    return res.json({ status: 'error', error: err ,msgType:"unexpected"});
                }
                else {
                    return res.json({ status: 'success', msg: 'Password updated successfully',msgType:"allgood" });
                }

            });


                   
            }

            
        }else{
            res.status(400);
            res.json({ msg: 'No Change request found',msgType:"notfound" });  // handle errors!
        }

        
    });
    
    
}


router.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
        console.log(user);
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        res.json({
          msg: 'CONFIRMED!',
          info: info
        });
      });
    } else {
        console.log(err);
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
});


var addCommunity = function (req, res) {


    var communityDetails = new Communities();
    //res.render('index.html');
    //userModel.

    communityDetails.title = req.body.title;
    communityDetails.addressLineOne = req.body.addressLineOne;
    communityDetails.addressLineTwo = req.body.addressLineTwo;
    communityDetails.postcode = req.body.postcode;
    communityDetails.phone = req.body.phone;
    communityDetails.communityLogo = req.body.commLogo;
    communityDetails.save(function (err) {
        if (err) {
            return res.json({ status: 'error', error: err });
        } else {
            return res.json({ status: 'success', msg: 'Community added successfully' });
        }
    });


    //return res.json({});
}


var getAllCommunity = function (req, res) {

    
        Communities.find({}).exec(
            function (err, communityDoc) {
                if (err) {
                    res.send({ status: 'error', msg: 'Unable to fetch community , please try later', error: err });
                } else {
                    res.send({ status: 'success', result: communityDoc });
                }
            });

     
}

var getCommunityCalender=function(req, res){
    
    var calenderDetails={};
    async.series(
            [
                function (callback) {
                    Communities.findOne({}).exec(
                        function (err, communityDoc) {
                            if (err) {
                                callback(err);
                            } else {
                                calenderDetails.community=communityDoc;
                                callback(null, communityDoc);
                            }
                        });

                },
                function (callback) {
                    Services.find({communityId:calenderDetails.community._id}).exec(
                        function (err, serviceDoc) {
                            if (err) {
                                callback(err);
                            } else {
                                calenderDetails.services=serviceDoc;
                                callback(null, serviceDoc);
                            }
                        });
                },
                function (callback) {
                    
                    calenderDetails.packages=[];
                    if(calenderDetails.services.length>0){
                        async.forEach(calenderDetails.services, function(eachService, callback) { //The second argument, `callback`, is the "task callback" for a specific `messageId`
                            Packages.findOne({"frequency" : "daily","serviceId":eachService._id}).exec(
                                function (err, packageDoc) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        calenderDetails.packages.push(packageDoc);
                                        callback();
                                    }
                                });
                        }, function(err) {
                            if (err) return callback(err);
                            //Tell the user about the great success
                            callback();
                        });
                    }else{
                        callback();
                    }
                    
                }
            ],
            function (error, result) {
                
                    if (error) {
                        return res.json({ status: 'error', error: error });
                    } else {
                        return res.json({ status: 'success', result:calenderDetails });
                    }
                

            });
}

var deleteCommunity=function (req, res) {
    if (req.user) {
        var communityId = req.params.id;
        Communities.remove({ _id: communityId }, function (err, removeBrand) {
            if (err) {
                return res.json({ status: 'error', error: err, msg: "Some error occured please try later" });
            } else {
                return res.json({ status: 'success', msg: 'Community Deleted successfully' });
            }
        });
    } else {
         res.status(401);
         res.json({ status: 'error', msg: 'some error occured' });
         return res.send();
     }

}

var getCommunityByid = function (req, res) {
    
    var communityId = req.params.id;
    if (communityId != '') {
        Communities.findById(communityId).exec(function (err, packageDoc) {
            if (err) {
                res.send({ status: 'error', msg: 'unable to fetch Community , please try later', error: err });
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


/*var updateCommunity = function (req, res) {

    var communityDetails = {};

    communityDetails.title = req.body.title;
    communityDetails.addressLineOne = req.body.addressLineOne;
    communityDetails.addressLineTwo = req.body.addressLineTwo;
    communityDetails.postcode = req.body.postcode;
    communityDetails.phone = req.body.phone;
console.log(req.body);
    Communities.findByIdAndUpdate(req.body.id, communityDetails, function (err, updateRes) {

        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {

            return res.json({ status: 'success', msg: 'Community updated successfully' });
        }
    });

    //return res.json({});
}*/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/uploads/community/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  },
  fileFilter: function (req, file, cb) {
    console.log(file);
     if (path.extname(file.originalname) !== '.jpeg' &&  path.extname(file.originalname) !== '.jpg') {
       return cb(new Error('Only jpg are allowed'))
     }

    cb(null, true)
  }
})

var upload = multer({ storage: storage })


//var upload = multer({ dest: 'uploads/' });
var updateCommunity= function (req, res, next) {
//app.post('/profile', upload.single('communityLogo'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  //console.log(req.file);

    
    var communityDetails = {};

    communityDetails.title = req.body.title;
    communityDetails.addressLineOne = req.body.addressLineOne;
    communityDetails.addressLineTwo = req.body.addressLineTwo;
    communityDetails.postcode = req.body.postcode;
    communityDetails.phone = req.body.phone;
    communityDetails.communityLogo = req.body.commLogo;
    
    Communities.findByIdAndUpdate(req.body.id, communityDetails, function (err, updateRes) {

        if (err) {

            return res.json({ status: 'error', error: err });
        }
        else {

            return res.json({ status: 'success', msg: 'Community updated successfully' });
        }
    });

  
};



router.post('/authenticate', authenticateUser);
router.get('/createtoken', createtoken);

router.put('/user', userRegister);
router.get('/userbyrole/:roleType', getUsersByRole);
router.get('/vendorbystatus/:status',vendorbystatus);
router.delete('/deleteuser/:id', deleteUser);

router.post('/checkUniqueEmail', checkUniqueEmail);

router.get('/profile/:id', getProfile);
router.put('/profile', updateProfile);

router.put('/approveVendor',approveVendor);



router.put('/vendor', addVendor);


router.get('/getAllPackage', getAllPackage);
router.post('/addPackage', addPackage);
router.delete('/package/:id', deletePackage);
router.post('/updatePackage', updatePackage);
router.post('/getPackageByid', getPackageByid);
router.post('/getPackageByZipcode', getPackageByZipcode);


router.get('/getAllCommunity', getAllCommunity);
router.post('/addCommunity', addCommunity);
router.delete('/community/:id', deleteCommunity);
router.get('/community/:id', getCommunityByid);
router.post('/updateCommunity',upload.single('communityLogo'), updateCommunity);
router.get('/getCommunityCalender',getCommunityCalender);

router.post('/createOrder', createOrder);
router.get('/userOrder', userOrder);
router.get('/vendorOrder', vendorOrder);
router.get('/getAllOrder', getAllOrder);
router.get('/upComingUserOrder',upComingUserOrder);
router.get('/upcomingVendorOrder',upcomingVendorOrder);

router.get('/service', getAllService);
router.get('/service/:id', getServiceById);
router.post('/service', addService);
router.put('/service', updateService);
router.delete('/service/:id', deleteService);

router.post('/forgotpass',forgotpass);
router.get('/forgotpass/:id',getForgotReq);
router.post('/resetpass',resetpass);
//striperoutes
router.get('/getUserStripeCard', getUserStripeCard);
//router.post('/payFromExistingCard', payFromExistingCard);
//router.post('/payFromExistingCard', payFromExistingCard);
router.post('/makePayment', makePayment);

//https://github.com/kekeh/mydatepicker
module.exports = router;