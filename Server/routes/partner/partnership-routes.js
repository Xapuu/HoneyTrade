const express = require('express')

const router = new express.Router()

const Subscription = require('mongoose').model('Subscription');
const Partner = require('mongoose').model('Partner');
const Product = require('mongoose').model('Product');


router.delete('/partnership/cancel/:id', async (req, res) => {
    let partnerId = req.params.id;
    let partner = await Partner.findById(partnerId);

    if (partner) {
        Partner.findOneAndRemove(partnerId)
            .then(subscription => {

                return res.status(200).json({
                    success: true,
                    message: 'Partnership canceled'
                })

            }).catch(e => {
                return res.status(404).json({
                    success: false,
                    message: 'Partner could not be found'
                })
            })

    } else {
        return res.status(404).json({
            success: false,
            message: 'Could not find subscribtion'
        })
    }
})

module.exports = router
