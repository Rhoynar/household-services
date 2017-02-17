var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var vendorSchema = new Schema({
    name: String,
    email: String,
    password: String,
    created:Date,
    phone: String,
    addresslineone:String,
    addresslinetwo:String,
    zipcode:String,
    city:String,
    country:String,
});


vendorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

vendorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Vendors', vendorSchema);
