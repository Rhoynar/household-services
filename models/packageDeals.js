var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var chargeSchema = new Schema({
    //serviceId: { type: Schema.Types.ObjectId, ref: 'Services' },
    packageId: { type: Schema.Types.ObjectId, ref: 'Packages' },
    amount: String,
    clientId: { type: Schema.Types.ObjectId, ref: 'Users' },
    vendorId: { type: Schema.Types.ObjectId, ref: 'Vendors' },
    stripeChargeId: String,
    chargeDetail: {},
    tokenDetail: {},
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Packagedeals', chargeSchema);
