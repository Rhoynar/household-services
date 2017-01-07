// config/passport.js

// load all the things we need
var Strategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var Users            = require('../models/users');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  In a
    // production-quality application, this would typically be as simple as
    // supplying the user ID when serializing, and querying the user record by ID
    // from the database when deserializing.  However, due to the fact that this
    // example does not have a database, the complete Facebook profile is serialized
    // and deserialized.
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        Users.findById(obj, function(err, user) {
            cb(err, user);
        });
        //cb(null, obj);
    });



    // Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.BASE_URL+'/facebookloginreturn',
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos'] 
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
     Users.findOne({ email: profile.email }, function(err, user) {
            if(err) {
                console.log(err);  // handle errors!
            }

            if (!err && user !== null) {
                cb(null, user);
            } else {
                //console.log(profile);
               // res.json(profile);
                user = new Users({
                    providerId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    provider:'facebook',
                    created: Date.now(),
                    profile:profile
                });
                user.save(function(err) {
                if(err) {
                    console.log(err);  // handle errors!
                } else {
                    console.log("saving user ...");
                    cb(null, user);
                }
                });
            }


       
    });
    
    
}));


    
    
     // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'useremail',
        passwordField : 'userpass',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Users.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            
            return done(null, user);
        });

    }));
}; 