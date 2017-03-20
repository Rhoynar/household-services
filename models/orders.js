var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var orderSchema = new Schema({
    //serviceId: { type: Schema.Types.ObjectId, ref: 'Services' },
    packageId: { type: Schema.Types.ObjectId, ref: 'Packages' },
    amount: String,
    clientId: { type: Schema.Types.ObjectId, ref: 'Users' },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Users' },
    stripeChargeId: String,
    chargeDetail: {},
    tokenDetail: {},
    serviceDate:{ type : Date },
    instruction:String,
    serviceType:String,
    instruction:String,
    packageType:String,
    packageDay:String,
    packageMeridian:String,
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Orders', orderSchema);
