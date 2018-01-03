const express = require('express')

const router = new express.Router()

const Subscription = require('mongoose').model('Subscription');
const Notification = require('mongoose').model('Notification');
const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');



router.get('/orders', async (req, res) => {
    Order.find({ customer: req.user.companyEmail })
        .populate('product')
        .then(orders => {
            return res.status(200).json({
                success: true,
                message: 'Recieved orders',
                orders: orders
            })
        }).catch(e => {
            return res.status(400).json({
                success: true,
                message: e.message
            })
        })
})

router.get('/order/:id', async (req, res) => {
    Order.findById(req.params.id)
        .populate('product')
        .then(order => {
            return res.status(200).json({
                success: true,
                message: 'Recieved orders',
                order: order
            })
        }).catch(e => {
            return res.status(400).json({
                success: true,
                message: e.message
            })
        })
})

router.post('/order/create', async (req, res) => {
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    if (!productId || typeof productId !== 'string') {
        return res.status(404).json({
            success: false,
            message: 'ProductId must be a string'
        })
    }
    if (!quantity || typeof quantity !== 'number' || quantity < 0) {
        return res.status(404).json({
            success: false,
            message: 'Quantity must be a positive number'
        })
    }
    let date = new Date();
    Product.findById(productId)
        .then(prod => {
            Order.create({
                customer: req.user.companyEmail,
                product: prod._id,
                date: date,
                quantity: quantity,
                price: quantity * prod.price,
                status: 'Pending'
            }).then(async function(order){
                let orders = await Order.find({customer: req.user.companyEmail});
                                
                let n = orders.filter(o => o.product+ '' === order.product + '').length;
                
                if(n < 2){
                    Subscription.find({
                        $or: [{ subscribedTo: 'partner ' + req.user.companyEmail },  { subscribedTo: 'product ' + order.product }]
                    }).then(async function (subs) {n
                        for (let sub of subs) {
                            let not =  await Notification.create({
                                recieverEmail: sub.subscriberEmail,
                                title: 'New Product',
                                text: req.user.company.companyName + ' just bought new product - ' + prod.name,
                                date: new Date(),
                                isRead: false
                            })
    
                            await Notification.find({ recieverEmail: sub.subscriberEmail }).then(nots => {
                                const io = require('../../index');
        
                                for (let socketId in io.sockets.sockets) {
                                    if (io.sockets.sockets[socketId].userEmail === sub.subscriberEmai) {
                                        io.sockets.sockets[socketId].emit('notifications', nots);
                                        break;
                                    }
                                }
                                return res.status(200).json({
                                    success: true,
                                    message: 'Order created'
                                })
                            })
                        }
                    }).catch(e => {
                        return res.status(404).json({
                            success: false,
                            message: 'Product could not be found'
                        })
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        message: 'Order created'
                    })
                }
                

            }).catch(e => {
                return res.status(404).json({
                    success: false,
                    message: 'Product could not be found to make order'
                })
            });
        });
});

module.exports = router
