const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let subscriptionSchema = new mongoose.Schema({
    subscriberEmail: { type: mongoose.Schema.Types.String },
    subscribedTo: { type: mongoose.Schema.Types.String }
})


const Subscription = mongoose.model('Subscription', subscriptionSchema);




module.exports = Subscription;