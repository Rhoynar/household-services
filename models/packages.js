var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var packageSchema = new Schema({
    name: String,
    title:String,
    postalcode:String,
    price:String,
    frequency:String,
    features:[],
    created:Date
});

module.exports = mongoose.model('Packages', packageSchema);
