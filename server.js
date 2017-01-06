var express=require('express');
var path = require('path');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rhoynar');

var Users = require('./models/users');
var Clients = require('./models/clients');


require('dotenv').config();



var port=3000;

var app=express();

//Body parser
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);



var index=require('./routes/index');
var apis=require('./routes/apis');

//set Static folder
app.use(express.static(path.join(__dirname,'client')));


//passport Js for facebook login
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;




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
  cb(null, obj);
});




// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/',index);
app.use('/api',apis);



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




app.listen(port,function(){
    console.log('server Started on port'+port);
});
