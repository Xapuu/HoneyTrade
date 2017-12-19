
const express = require('express');
const router = new express.Router();


const Honey = require('mongoose').model('Honey');

router.get('/honeyTypes', async (req, res) => {

    let honeyTypes = await Honey.find();

    return res.status(200).json({
        success: true,
        message: 'Recieved products.',
        honeyTypes: honeyTypes
    })
})

module.exports = router;