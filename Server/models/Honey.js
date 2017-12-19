const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const honeySchema = new mongoose.Schema({
    type: { type: mongoose.Schema.Types.String, required: true },
    price: { type: mongoose.Schema.Types.Number, required: true },
});

const Honey = mongoose.model('Honey', honeySchema);

module.exports = Honey;
