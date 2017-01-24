var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var chargeSchema = new Schema({
    serviceId: String,
    amount: String,
    clientId: String,
    stripeChargeId: String,
    chargeDetail: {},
    created:Date
});

module.exports = mongoose.model('Charges', chargeSchema);
