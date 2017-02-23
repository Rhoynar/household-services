var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serviceSchema = new Schema({
    title : String,
    created:{ type : Date, default: new Date() }
});

module.exports = mongoose.model('Services', serviceSchema);
