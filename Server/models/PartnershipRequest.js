const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let partnershipRequestSchema = new mongoose.Schema({
    company: { type: ObjectId, ref: 'Buyer', required: true },
})

const PartnershipRequest = mongoose.model('PartnershipRequest', partnershipRequestSchema);

module.exports = PartnershipRequest;