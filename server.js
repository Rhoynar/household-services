var express=require('express');
var path = require('path');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
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
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash()); // use connect-flash for flash messages stored in session

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);


//set Static folder
app.use(express.static(path.join(__dirname,'client')));


//passport Js for facebook login
var passport = require('passport');

require('./config/passport')(passport); // pass passport for configuration



// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/',require('./routes/index'));
app.use('/api',require('./routes/apis'));



app.listen(port,function(){
    console.log('server Started on port'+port);
});