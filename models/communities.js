var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var communitySchema = new Schema({
    
    title: String,
  	addressLineOne: String,
  	addressLineTwo: String,
  	postcode: String,
  	phone: String,
  	communityLogo:String,
  	services:[{type: Schema.Types.ObjectId, ref: 'Services'}],
  	created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Communities', communitySchema);
