
const express = require('express');
const router = new express.Router();


const Review = require('mongoose').model('Review');


router.get('/reviews', async (req, res) => {

    let reviews = await Review.find();

    return res.status(200).json({
        success: true,
        message: 'Recieved products.',
        reviews: reviews,
    })
})

router.post('/review/create', async (req, res) => {


    let isValid = true;
    let errors = {};

    let reqReview = req.body.review;

    if (!reqReview || typeof reqReview.author !== 'string' || reqReview.author.trim().length <= 1) {
        isValid = false;
        errors.name = 'Review  must have author.';
    }

    if (!reqReview || typeof reqReview.text !== 'string' || reqReview.text.trim().length <= 1) {
        isValid = false;
        errors.honeyType = 'Review text must be longer';
    }



    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }

    let date = new Date();
    let prod = await Review.create({
        name: reqReview.name,
        honeyType: reqReview.honeyType,
        date: date
    });


    return res.status(200).json({
        success: true,
        message: 'Added review.',
        review: review,
    })
})

module.exports = router;