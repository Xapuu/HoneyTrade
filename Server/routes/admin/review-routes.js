
const express = require('express');
const router = new express.Router();


const Review = require('mongoose').model('Review');


router.get('/reviews/all', async (req, res) => {

    let reviews = await Review.find();

    return res.status(200).json({
        success: true,
        message: 'Recieved products.',
        reviews: reviews,
    })
})


router.delete('/review/:id', async (req, res) => {
    let id = req.params.id;

    Review.findByIdAndRemove(id).then(e => {
        
        return res.status(200).json({
            success: true,
            message: 'Review product'
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Honey does not exist'
        })
    })
})

router.get('/review/:id', async (req, res) => {
    let id = req.params.id;

    Review.findById(id).then(rev => {
        return res.status(200).json({
            success: true,
            review: rev
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Honey not found'
        })
    })
})



module.exports = router;