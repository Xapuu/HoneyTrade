const express = require('express')

const router = new express.Router()

const PartnershipRrequest = require('mongoose').model('PartnershipRequest');
const Partner = require('mongoose').model('Partner');



router.post('/request/create', async (req, res) => {
    let userId = req.user._id;
    
    let request = await PartnershipRrequest.findOne({company: userId});
    let partner = await Partner.findOne({ company: userId })
    if(request ){
        return res.status(401).json({
            success: false,
            message: 'Request has already been sent.'
        })
    }

    if(partner ){
        return res.status(401).json({
            success: false,
            message: 'User is already a partner.'
        })
    }
    PartnershipRrequest.create({
        company: userId
    }).then(data => {
        res.status(200).json({
            success: true,
            message: 'New partnership request added'
        })
    }).catch(e => {
        res.status(400).json({
            success: false,
            message: 'Could not craate partnership request'
        })
    })
})

module.exports = router
