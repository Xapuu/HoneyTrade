const mongoose = require('mongoose');
const encryption = require('../../util/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId;

const buyerSchema = new mongoose.Schema({
    companyName: { type: mongoose.Schema.Types.String, required: true },
    companyLocation:  {country: String, city: String} ,
    companyInformation: {type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    //TODO: upload
    logoImageUrl : {type: String},
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
});

buyerSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const Buyer = mongoose.model('Buyer', buyerSchema);


module.exports = Buyer;
