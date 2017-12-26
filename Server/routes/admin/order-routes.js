const express = require('express')

const router = new express.Router()

const Subscription = require('mongoose').model('Subscription');
const Product = require('mongoose').model('Product');
const Order = require('mongoose').model('Order');



router.get('/orders', async (req, res) => {
    Order.find()
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
            }).then(order => {
                return res.status(200).json({
                    success: true,
                    message: 'Order created'
                })
            }).catch(e => {
                return res.status(400).json({
                    success: true,
                    message: e.message
                })
            })

        }).catch(e => {
            return res.status(404).json({
                success: false,
                message: 'Product could not be found'
            })
        })

})



module.exports = router
