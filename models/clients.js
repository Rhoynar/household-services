var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Clients = new Schema({
    name: String
    
});

module.exports = mongoose.model('Clients', Clients);
