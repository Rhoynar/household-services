var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var packageSchema = new Schema({
    name: String,
    title:String,
    postalcode:String,
    price:String,
    frequency:String,
    features:[],
    serviceId:{type: Schema.Types.ObjectId, ref: 'Services'},
    vendors:[{type: Schema.Types.ObjectId, ref: 'Users'}],
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Packages', packageSchema);
