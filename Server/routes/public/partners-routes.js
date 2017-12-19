
const express = require('express');
const router = new express.Router();


const Partner = require('mongoose').model('Partner');


router.get('/partners', async (req, res) => {

    Partner.find().populate('company', '_id companyName companyLocation companyInformation email logoImageUrl').then(partners => {

        return res.status(200).json({
            success: true,
            message: 'Recieved partners.',
            partners: partners,
        })
    })


})


router.get('/partner/:id', async (req, res) => {
    
        Partner.find().populate('company', '_id companyName companyLocation companyInformation email logoImageUrl').then(partners => {
    
            return res.status(200).json({
                success: true,
                message: 'Recieved partners.',
                partners: partners,
            })
        })
    
    
    })


module.exports = router;