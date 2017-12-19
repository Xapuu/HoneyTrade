const express = require('express')

const router = new express.Router()
const CompanyInfo = require('mongoose').model('CompanyInfo');

const authCheck = require('../../middleware/auth-check');



router.post('/company/info/update', async (req, res) => {
    let isValid = true;
    let errors = {};

    let info = req.body.info;
    let contacts = req.body.contacts;

    if (!info || typeof info !== 'string' || info.trim().length <= 1) {
        isValid = false;
        errors.info = 'Information must be longer';
    }

    if (!contacts || typeof contacts !== 'object') {
        isValid = false;
        errors.contacts = 'Invalid contacts.';
    }

    if (!contacts.office || typeof contacts.office !== 'object') {
        isValid = false;
        errors.office = 'Invalid contacts.Must have office info';
    }

    if (!contacts.office.address || typeof contacts.office.address !== 'string' || contacts.office.address.trim().length <= 0) {
        isValid = false;
        errors.officeAddress = 'Invalid contacts. must have office adress.';
    }
    if (!contacts.office.phoneNumber || typeof contacts.office.phoneNumber !== 'string' || contacts.office.phoneNumber.trim().length <= 0) {
        isValid = false;
        errors.officePhoneNumber = 'Invalid contacts. must have office phoneNumber.';
    }
    if (!contacts.office.email || typeof contacts.office.email !== 'string' || contacts.office.email.trim().length <= 0) {
        isValid = false;
        errors.officeEmail = 'Invalid contacts. must have office email.';
    }

    if (!contacts.factory || typeof contacts.factory !== 'object') {
        isValid = false;
        errors.factory = 'Invalid contacts.Must have factory info';
    }

    if (!contacts.factory.address || typeof contacts.factory.address !== 'string' || contacts.factory.address.trim().length <= 0) {
        isValid = false;
        errors.factoryAddress = 'Invalid contacts. must have factory address.';
    }

    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }

    let information = await CompanyInfo.findOne();
    

    if (!information) {
        information = await CompanyInfo.create({
            info: req.body.info,
            contacts: {
                office: {
                    address: req.body.contacts.office.address,
                    phoneNumber: req.body.contacts.office.phoneNumber,
                    fax: req.body.contacts.office.fax,
                    email: req.body.contacts.office.email
                },
                factory: {
                    address: req.body.contacts.factory.address,
                    phoneNumber: req.body.contacts.factory.phoneNumber
                }
            }
        })
    } else {
        information.info = req.body.info;
        information.contacts = {
                office: {
                    address: req.body.contacts.office.address,
                    phoneNumber: req.body.contacts.office.phoneNumber,
                    fax: req.body.contacts.office.fax,
                    email: req.body.contacts.office.email
                },
                factory: {
                    address: req.body.contacts.factory.address,
                    phoneNumber: req.body.contacts.factory.phoneNumber
                }
            };
        

        await information.save();        
    }

    return res.status(200).json({
        success: true,
        message: 'Updated company info.',
        info: information
    })
})

router.get('/company/info', async (req, res) => {
    
        let info = await CompanyInfo.findOne();
    
        return res.status(200).json({
            success: true,
            message: 'Recieved company info.',
            info: info
        })
    })

module.exports = router
