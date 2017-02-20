var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var serviceSchema = new Schema({
    title : String,
});

module.exports = mongoose.model('Services', serviceSchema);
