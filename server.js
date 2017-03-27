var express=require('express');
var path = require('path');
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var session      = require('express-session');

var Zoho = require('zoho');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, function (error) {
    if (error) {
        console.log(error);
    }
}); // connect to our database

var crm = new Zoho.CRM({
  authtoken: 'bad18eba1ff45jk7858b8ae88a77fa30'
});

// crm.getRecords('Leads', function (err, data) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log(data);
// });

require('dotenv').config();



var port=4000;

var app=express();

//Body parser
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true,limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.json());
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
app.use('/api',require('./routes/api'));
app.use('/admin',require('./routes/admin'));
app.use('/vendor',require('./routes/vendor'));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'views/index.html')); });


app.listen(port,function(){
    console.log('server Started on port'+port);
});
