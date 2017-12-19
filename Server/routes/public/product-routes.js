
const express = require('express');
const router = new express.Router();


const Product = require('mongoose').model('Product');
const Honey = require('mongoose').model('Honey');


router.get('/poducts/all', async (req, res) => {

    let products = await Product.find();

    let honeys = await Honey.find();
    honeys = honeys.map(h => h = h.type);

    return res.status(200).json({
        success: true,
        message: 'Recieved products.',
        products: products,
        honeyTypes: honeys
    })
})

router.get('/poducts/:honeyType', async (req, res) => {

    let honeyType = req.params.honeyType;

    let products = await Product.find({honeyType: honeyType});

    return res.status(200).json({
        success: true,
        message: 'Recieved products.',
        products: products,
        honeyTypes: honeys
    })
})


router.get('/poduct/:id', async (req, res) => {
    let id = req.params.id;

    Product.findById(id).then(prod => {
        return res.status(200).json({
            success: true,
            product: prod
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    })
})

module.exports = router;