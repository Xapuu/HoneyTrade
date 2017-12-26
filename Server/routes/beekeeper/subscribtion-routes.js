const express = require('express')

const router = new express.Router()

const Subscription = require('mongoose').model('Subscription');
const Honey = require('mongoose').model('Honey');
const Product = require('mongoose').model('Product');


router.post('/subscribe/honey/:id', async (req, res) => {
    let honeyId = req.params.id;

    let honey = await Honey.findById(honeyId);

    if (honey) {
        Subscription.create({
            subscriberEmail: req.user.email,
            subscribedTo: 'honey ' + honeyId
        }).then(subscription => {
            const io = require('../../index');

            Subscription.find().then(subs => {
                for (let socketId in io.sockets.sockets) {
                    if (io.sockets.sockets[socketId].userEmail === 'admin@honeymarket.com') {
                        io.sockets.sockets[socketId].emit('subscriptions', subs);
                        break;
                    }
                }
            })

        })

        return res.status(200).json({
            success: true,
            message: 'Subscribtion made'
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'Could not find honey'
        })
    }
})

router.post('/subscribe/new/honey', async (req, res) => {
 
        Subscription.create({
            subscriberEmail: req.user.email,
            subscribedTo: 'honey new'
        }).then(subscription => {
            const io = require('../../index');

            Subscription.find().then(subs => {
                for (let socketId in io.sockets.sockets) {
                    if (io.sockets.sockets[socketId].userEmail === 'admin@honeymarket.com') {
                        io.sockets.sockets[socketId].emit('subscriptions', subs);
                        break;
                    }
                }
            })

        })

        return res.status(200).json({
            success: true,
            message: 'Subscribtion made'
        })
    
})

module.exports = router
