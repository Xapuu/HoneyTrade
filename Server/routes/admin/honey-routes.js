const express = require('express')

const router = new express.Router()
const Honey = require('mongoose').model('Honey');



router.post('/honey/create', async (req, res) => {
    let isValid = true;
    let errors = {};

    let reqHoney = req.body.honey;

    if (!reqHoney || typeof reqHoney.type !== 'string' || reqHoney.type.trim().length <= 1) {
        isValid = false;
        errors.type = 'Honey type must be longer';
    }

    if (!reqHoney || typeof reqHoney.price !== 'number' || reqHoney.price <= 0) {
        isValid = false;
        errors.price = 'Honey price must be bigger';
    }


    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }

    let honey = await Honey.create({
        type: reqHoney.type,
        price: reqHoney.price
    });


    return res.status(200).json({
        success: true,
        message: 'Created new honey',
        honey: honey
    })
})

router.put('/honey/:id/update', async (req, res) => {
    let isValid = true;
    let errors = {};

    let id = req.params.id;


    Honey.findById(id).then(honey => {

        if (!honey) {
            return res.status(404).json({
                success: false,
                message: "Unexisting honey"
            })
        }

        let reqHoney = req.body.honey;


        if (!reqHoney || typeof reqHoney.type !== 'string' || reqHoney.type.trim().length <= 1) {
            isValid = false;
            errors.type = 'Honey type must be longer';
        }

        if (!reqHoney || typeof reqHoney.price !== 'number' || reqHoney.price <= 0) {
            isValid = false;
            errors.price = 'Honey price must be bigger';
        }


        if (!isValid) {
            return res.status(400).json({
                success: false,
                errors: errors
            })
        }

        honey.type = reqHoney.type;
        honey.price = reqHoney.price;
       

        honey.save().then(h => {
            return res.status(200).json({
                success: true,
                message: 'Updated honey',
                honey: honey
            })
        })

    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Unexisting honey'
        })
    })
})

router.delete('/honey/:id', async (req, res) => {
    let id = req.params.id;

    Honey.findByIdAndRemove(id).then(e => {
        
        return res.status(200).json({
            success: true,
            message: 'Deleted product'
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Honey does not exist'
        })
    })
})

router.get('/honey/:id', async (req, res) => {
    let id = req.params.id;

    Honey.findById(id).then(honey => {
        return res.status(200).json({
            success: true,
            honey: honey
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Honey not found'
        })
    })
})

router.get('/honeys/all', async (req, res) => {

    Honey.find({}).then(honeys => {
        return res.status(200).json({
            success: true,
            honeys: honeys
        })
    }).catch(e => {
        return res.status(400).json({
            success: false,
            message: 'Bad request when getting all honeys'
        })
    })
})

module.exports = router
