var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var communitySchema = new Schema({
    name: String,
    city: String,
    country: String,
    phone: String,
});

module.exports = mongoose.model('Communities', communitySchema);
