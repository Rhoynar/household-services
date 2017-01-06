var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Users = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    providerId: String,
    provider:String,
    created:Date,
    profile: Array
});

module.exports = mongoose.model('Users', Users);
