var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serviceSchema = new Schema({
    title : String,
    dailyPackageId:{type: Schema.Types.ObjectId, ref: 'Packages'},
	monthlyPackageId:{type: Schema.Types.ObjectId, ref: 'Packages'},
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Services', serviceSchema);
