const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true },
    honeyType: { type: mongoose.Schema.Types.String, required: true },
    weight: { value: Number, unit: String },
    price:  { type: mongoose.Schema.Types.Number, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    //TODO: upload images
    imageUrl: { type: mongoose.Schema.Types.String, required: true },
});


const Product = mongoose.model('Product', productSchema);



module.exports = Product;
