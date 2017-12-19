
const express = require('express');
const router = new express.Router();


const CompanyInfo = require('mongoose').model('CompanyInfo');

router.get('/company/info', async (req, res) => {

    let info = await CompanyInfo.findOne();

    return res.status(200).json({
        success: true,
        message: 'Recieved company info.',
        info: info
    })
})

module.exports = router;