const express = require('express')

const router = new express.Router()

const Subscription = require('mongoose').model('Subscription');
const Partner = require('mongoose').model('Partner');
const Product = require('mongoose').model('Product');



router.get('/subscriptions', async (req, res) => {

    Subscription.find().then(subscribtions => {
        res.status(200).json({
            success: true,
            message: 'Recieved user subscriptions',
            subscribtions: subscribtions
        });
    }).catch(e => {
        res.status(404).json({
            success: false,
            message: 'Could not find subscriptions',
        })
    })
})

router.post('/subscribe/partner/:id', async (req, res) => {
    let partnerId = req.params.id;

    let partner = await Partner.findById(partnerId);

    if (partner) {
        Subscription.create({
            subscriberEmail: req.user.email,
            subscribedTo: 'partner ' + partner.companyEmail
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
            message: 'Could not find partner'
        })
    }
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

router.delete('/subscribtion/cancel/:id', async (req, res) => {
    let subscrId = req.params.id;
    let subscr = await Subscription.findById(subscrId);

    if (subscr) {
        if (subscr.subscriberEmail === req.user.email) {
            Subscription.findOneAndRemove(subscrId)
            .then(subscription => {
                const io = require('../../index');

                Subscription.find().then(subs => {
                    for (let socketId in io.sockets.sockets) {
                        if (io.sockets.sockets[socketId].userEmail === 'admin@honeymarket.com') {
                            io.sockets.sockets[socketId].emit('subscriptions', subs);
                            break;
                        }
                    }
                })

            }).catch(e => {
                return res.status(404).json({
                    success: false,
                    message: 'Subscribtion could not be found'
                })
            })


            return res.status(200).json({
                success: true,
                message: 'Subscribtion canceled'
            })
        } else {

            return res.status(404).json({
                success: false,
                message: 'Subscriber email does not match'
            })
        }

    } else {
        return res.status(404).json({
            success: false,
            message: 'Could not find subscribtion'
        })
    }
})

module.exports = router
