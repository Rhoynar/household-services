var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serviceSchema = new Schema({
    communityId : String,
    serviceName : String,
    description : String
});

module.exports = mongoose.model('Services', serviceSchema);
