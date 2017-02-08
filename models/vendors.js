var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var vendorSchema = new Schema({
    name: String,
    email: String,
    created:Date,
    phone: String,
    addresslineone:String,
    addresslinetwo:String,
    zipcode:String,
    city:String,
    country:String,
});



module.exports = mongoose.model('Vendors', vendorSchema);
