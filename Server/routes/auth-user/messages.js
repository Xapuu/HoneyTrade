const express = require('express')

const router = new express.Router()

const Message = require('mongoose').model('Message');

router.get('/message/create', async (req, res) => {
    
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
