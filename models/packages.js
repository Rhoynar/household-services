var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var packageSchema = new Schema({
    name: String,
    title:String,
    postalcode:String,
    price:String,
    frequency:String,
    features:[],
    mon_mor_price:String,
  	mon_noon_price:String,
  	mon_eve_price:String,
  	tue_mor_price:String,
  	tue_noon_price:String,
  	tue_eve_price:String,
  	wed_mor_price:String,
  	wed_noon_price:String,
  	wed_eve_price:String,
  	thur_mor_price:String,
  	thur_noon_price:String,
  	thur_eve_price:String,
  	fri_mor_price:String,
  	fri_noon_price:String,
  	fri_eve_price:String,
  	sat_mor_price:String,
  	sat_noon_price:String,
  	sat_eve_price:String,
  	sun_mor_price:String,
  	sun_noon_price:String,
  	sun_eve_price:String,
    serviceId:{type: Schema.Types.ObjectId, ref: 'Services'},
    communityId:{type: Schema.Types.ObjectId, ref: 'Communities'},
    vendors:[{type: Schema.Types.ObjectId, ref: 'Users'}],
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Packages', packageSchema);
