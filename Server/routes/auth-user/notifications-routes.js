const express = require('express')

const router = new express.Router()

const Buyer = require('mongoose').model('Buyer');
const Partner = require('mongoose').model('Partner');
const Notification = require('mongoose').model('Notification');

router.get('/notifications', async (req, res) => {
    
    Notification.find({recieverEmail: req.user.email}).then(notifications => {
        res.status(200).json({
            success: true,
            message: 'Recieved user notifications',
            notificatoins: notifications
        });
    }).catch(e => {
        res.status(404).json({
            success: false,
            message: 'Could not find notifications',
        })
    })
})

module.exports = router
