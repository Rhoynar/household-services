var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var passwordChangeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    created:{ type : Date, default: new Date() },
    validtill:Date,
    userIp:String,
    usedAt:Date,
    used:{ type : String, default: 'no' }
});




module.exports = mongoose.model('Passwordchange', passwordChangeSchema);
