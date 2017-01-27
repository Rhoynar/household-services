var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var chargeSchema = new Schema({
    //serviceId: { type: Schema.Types.ObjectId, ref: 'Services' },
    serviceId: String,
    amount: String,
    clientId: String,
    stripeChargeId: String,
    chargeDetail: {},
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Charges', chargeSchema);
