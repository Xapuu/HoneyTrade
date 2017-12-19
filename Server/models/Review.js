const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.String, required: true },
    text: { type: mongoose.Schema.Types.String, required: true },
    date: { type: mongoose.Schema.Types.Date, required: true },    
});


const Review = mongoose.model('Review', reviewSchema);



module.exports = Review;
