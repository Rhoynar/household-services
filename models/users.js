var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    providerId: String,
    provider:String,
    created:Date,
    profile: Array,
    phone: String,
    role:String,
    addresslineone:String,
    addresslinetwo:String,
    city:String,
    country:String,
    stripeCustomerId:String,
    stripeCustomer:{},
    services:[{ type: Schema.Types.ObjectId, ref: 'Services' }],
    cummunityId:{ type: Schema.Types.ObjectId, ref: 'Communities' },
    status:String,
    zipcode:String
});


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);
