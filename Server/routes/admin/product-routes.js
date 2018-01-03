const express = require('express')

const router = new express.Router()
const Product = require('mongoose').model('Product');
const Subscription = require('mongoose').model('Subscription');
const Notification = require('mongoose').model('Notification');

const authCheck = require('../../middleware/auth-check');



router.post('/product/create', async (req, res) => {
    let isValid = true;
    let errors = {};

    let reqProduct = req.body.product;

    if (!reqProduct || typeof reqProduct.name !== 'string' || reqProduct.name.trim().length <= 1) {
        isValid = false;
        errors.name = 'Product name must be longer';
    }

    if (!reqProduct || typeof reqProduct.honeyType !== 'string' || reqProduct.honeyType.trim().length <= 1) {
        isValid = false;
        errors.honeyType = 'Product honey type must be longer';
    }

    if (!reqProduct || typeof reqProduct.weight !== 'object') {
        isValid = false;
        errors.weight = 'weight must be object';
    }

    if (!reqProduct || typeof reqProduct.weight.value !== 'number' || reqProduct.weight.value <= 0) {
        isValid = false;
        errors.weightValue = 'Product weight must be bigger';
    }

    if (!reqProduct || typeof reqProduct.weight.unit !== 'string' || reqProduct.weight.unit.trim().length <= 0) {
        isValid = false;
        errors.weightUnit = 'Product weight must be longer';
    }

    if (!reqProduct || typeof reqProduct.price !== 'number' || reqProduct.price <= 0) {
        isValid = false;
        errors.price = 'Product price must be bigger';
    }

    if (!reqProduct || typeof reqProduct.description !== 'string' || reqProduct.description.trim().length <= 1) {
        isValid = false;
        errors.description = 'Product description must be longer';
    }

    if (!reqProduct || typeof reqProduct.imageUrl !== 'string' || reqProduct.imageUrl.trim().length <= 1) {
        isValid = false;
        errors.imageUrl = 'Product imageUrl must be longer';
    }

    if (!isValid) {
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }

    let prod = await Product.create({
        name: reqProduct.name,
        honeyType: reqProduct.honeyType,
        weight: reqProduct.weight,
        price: reqProduct.price,
        description: reqProduct.description,
        imageUrl: reqProduct.imageUrl
    });

    Subscription.find({ subscribedTo: 'honey new' }).then(async function (subs) {n
        for (let sub of subs) {
            let not =  await Notification.create({
                recieverEmail: sub.subscriberEmail,
                title: 'New Prduct',
                text: 'We are buying new product - ' + prod.name,
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
            })
        }
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Product could not be found'
        })
    })


    return res.status(200).json({
        success: true,
        message: 'Created new product',
        product: prod
    })
})

router.put('/product/:id/update', async (req, res) => {
    let isValid = true;
    let errors = {};

    let id = req.params.id;


    Product.findById(id).then(prod => {

        if (!prod) {
            return res.status(404).json({
                success: false,
                message: "Unexisting product"
            })
        }

        let reqProduct = req.body.product;

        if (!reqProduct || typeof reqProduct.name !== 'string' || reqProduct.name.trim().length <= 1) {
            isValid = false;
            errors.name = 'Product name must be longer';
        }

        if (!reqProduct || typeof reqProduct.honeyType !== 'string' || reqProduct.honeyType.trim().length <= 1) {
            isValid = false;
            errors.honeyType = 'Product honey type must be longer';
        }

        if (!reqProduct || typeof reqProduct.weight !== 'object') {
            isValid = false;
            errors.weight = 'weight must be object';
        }

        if (!reqProduct || typeof reqProduct.weight.value !== 'number' || reqProduct.weight.value <= 0) {
            isValid = false;
            errors.weightValue = 'Product weight must be bigger';
        }

        if (!reqProduct || typeof reqProduct.weight.unit !== 'string' || reqProduct.weight.unit.trim().length <= 0) {
            isValid = false;
            errors.weightUnit = 'Product weight must be longer';
        }

        if (!reqProduct || typeof reqProduct.price !== 'number' || reqProduct.price <= 0) {
            isValid = false;
            errors.price = 'Product price must be bigger';
        }

        if (!reqProduct || typeof reqProduct.description !== 'string' || reqProduct.description.trim().length <= 1) {
            isValid = false;
            errors.description = 'Product description must be longer';
        }

        if (!reqProduct || typeof reqProduct.imageUrl !== 'string' || reqProduct.imageUrl.trim().length <= 1) {
            isValid = false;
            errors.imageUrl = 'Product imageUrl must be longer';
        }

        if (!isValid) {
            return res.status(400).json({
                success: false,
                errors: errors
            })
        }

        prod.name = reqProduct.name;
        prod.honeyType = reqProduct.honeyType;
        prod.weight = reqProduct.weight;
        prod.price = reqProduct.price;
        prod.description = reqProduct.description;
        prod.imageUrl = reqProduct.imageUrl;

        prod.save().then(p => {
            Subscription.find({ subscribedTo: 'product ' + prod._id }).then(async function (subs) {                
                for (let sub of subs) {                    
                    let not =  await Notification.create({
                        recieverEmail: sub.subscriberEmail,
                        title: 'New Product price',
                        text: prod.name + ' is now ' + prod.price,
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
                    })
                }
            }).catch(e => {
                return res.status(404).json({
                    success: false,
                    message: 'Honey could not be found'
                })
            })
            return res.status(200).json({
                success: true,
                message: 'Updated product',
                product: prod
            })
        })

    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Unexisting product'
        })
    })
})

router.delete('/product/:id', async (req, res) => {
    let id = req.params.id;

    Product.findByIdAndRemove(id).then(p => {
        Subscription.find({ subscribedTo: 'product ' + p._id }).then(async function (subs) {                
            for (let sub of subs) {                    
                let not =  await Notification.create({
                    recieverEmail: sub.subscriberEmail,
                    title: 'Honey deleted',
                    text: 'We are not making ' + p.name + ' anymore',
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
                })
            }
        }).catch(e => {
            return res.status(404).json({
                success: false,
                message: 'Product could not be found'
            })
        })
        return res.status(200).json({
            success: true,
            message: 'Deleted product'
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Product does not exist.'
        })
    })
})

router.get('/product/:id', async (req, res) => {
    let id = req.params.id;

    Product.findById(id).then(prod => {
        return res.status(200).json({
            success: true,
            product: prod
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    })
})

router.get('/products/all', async (req, res) => {
   
    Product.find({}).then(products => {
        return res.status(200).json({
            success: true,
            products: products
        })
    }).catch(e => {
        return res.status(400).json({
            success: false,
            message: 'Bad request when getting all products'
        })
    })
})

module.exports = router
