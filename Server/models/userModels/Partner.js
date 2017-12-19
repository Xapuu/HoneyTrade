const mongoose = require('mongoose');
const encryption = require('../../util/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId;

const partnerSchema = new mongoose.Schema({
    companyEmail: { type: String },
    company: { type: ObjectId, ref: 'Buyer', required: true },
    orders: [{type: ObjectId, ref: 'Order'}],    
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
