const express = require('express')

const router = new express.Router()

const Message = require('mongoose').model('Message');
const UserRole = require('mongoose').model('UserRole');

const emailPattern = /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

router.post('/message/send', async (req, res) => {

    const errors = {}
    let isFormValid = true
    let message = ''

    if(req.user.email === req.body.recieverEmail){
       return res.status(404).json({
            success: false,
            message: 'Can not send message to yourself!',
        })
    }

    let reciever = await UserRole.findOne({ email: req.body.recieverEmail });
    
    if (!reciever) {
       return res.status(404).json({
            success: false,
            message: 'Could not find reciever',
        })
    }
    let messageForm = req.body;


    if (!messageForm || !messageForm.recieverEmail || typeof messageForm.recieverEmail !== 'string' || messageForm.recieverEmail.trim().length <= 0 || messageForm.recieverEmail.match(emailPattern) == null) {
        isFormValid = false
        errors.email = 'Please provide a correct reciever email address.'
    }

    if (!messageForm || !messageForm.text ||  typeof messageForm.text !== 'string' || messageForm.text.trim().length <= 0) {
        
        isFormValid = false
        errors.text = 'Please provide text.'
    }

    if (!isFormValid) {
        
    message = 'Check the form for errors.'
       return  res.status(404).json({
            success: isFormValid,
            message,
            errors
        })
    }

    let date = new Date().toLocaleDateString();

    Message.create({
        senderEmail: req.user.email,
        recieverEmail: req.body.recieverEmail,
        text: req.body.text,
        date: date,
        isRead: false
    }).then(m => {
        Message.find({ recieverEmail: reciever.email }).then(messages => {
            const io = require('../../index');
            
            messages = messages.filter(m => m.isRead === false);
        
            for (let socketId in io.sockets.sockets) {
               
                if (io.sockets.sockets[socketId].userEmail === reciever.email) {                    
                    io.sockets.sockets[socketId].emit('unreadMessageCount', messages.length); 
                    break;
                }
            }

           return res.status(200).json({
                success: true,
                message: 'Message sent',
                messageSent: m
            });

        })
    }).catch(e => {
       return res.status(404).json({
            success: false,
            message: 'Could not proccess message',
        })
    })
})

router.get('/messages', (req, res) => {
    let userEmail = req.user.email;
    Message.find({
        $or: [ { recieverEmail: userEmail }, { senderEmail: userEmail }]
    }).then(messages => {
        return res.status(200).json({
            success: true,
            message: 'Messages recieved',
            messages: messages
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Messages not found',
        })
    })
})

module.exports = router
