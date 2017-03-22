var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var communitySchema = new Schema({
    
    zipcode: String,
  	email: String,
  	created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('ServiceDemand', communitySchema);
