
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


router.get('/partners/:id', async (req, res) => {
    
    let id = req.params.id;
        Partner.findById(id).populate('company', '_id companyName companyLocation companyInformation email logoImageUrl').then(partners => {
    
            return res.status(200).json({
                success: true,
                message: 'Recieved partner.',
                partner: partners,
            })
        })
    
    
})


module.exports = router;