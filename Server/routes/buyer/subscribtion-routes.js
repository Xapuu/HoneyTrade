const express = require('express')

const router = new express.Router()

const Subscription = require('mongoose').model('Subscription');
const Partner = require('mongoose').model('Partner');
const Product = require('mongoose').model('Product');

router.post('/subscribe/new/product', async (req, res) => {
 
    
        Subscription.create({
            subscriberEmail: req.user.email,
            subscribedTo: 'product new'
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

router.post('/subscribe/product/:id', async (req, res) => {
    let productId = req.params.id;
    let product = await Product.findById(productId);

    if (product) {
        Subscription.create({
            subscriberEmail: req.user.email,
            subscribedTo: 'product ' + productId
        }).then(subscription => {
            const io = require('../../index');

            Subscription.find().then(subs => {
                for (let socketId in io.sockets.sockets) {
                    if (io.sockesocketsts.sockets[socketId].userEmail === 'admin@honeymarket.com') {
                        io.sockets[socketId].emit('subscriptions', subs);
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
            message: 'Could not find product'
        })
    }
})

module.exports = router
