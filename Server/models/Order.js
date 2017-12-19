const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.String, required: true },
    product:{ type: Object, required: true },
    date: { type: mongoose.Schema.Types.Date, required: true },    
    quantity: { type: mongoose.Schema.Types.Number, required: true },
    status: {type: String, required: true, default: 'Pending'}
})


const Order = mongoose.model('Order', orderSchema);




module.exports = Order;