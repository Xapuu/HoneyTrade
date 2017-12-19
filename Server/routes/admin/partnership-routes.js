const express = require('express')

const router = new express.Router()


const Buyer = require('mongoose').model('Buyer');
const Partner = require('mongoose').model('Partner');
const Notification = require('mongoose').model('Notification');

const PartnershipRrequest = require('mongoose').model('PartnershipRequest');


router.get('/partnership/requests', async (req, res) => {
    PartnershipRrequest.find().populate('company', '_id companyName companyLocation companyInformation email ').then(requests => {
        res.status(200).json({
            success: true,
            message: 'Recieved partnership requests',
            requests: requests
        });
    }).catch(e => {
        res.status(404).json({
            success: false,
            message: 'Could not find requests',
        })
    })
})

router.post('/partnership/accept/:id', async (req, res) => {
    let id = req.params.id;

    PartnershipRrequest.findByIdAndRemove(id).populate('company', '_id email').then(data => {

        Partner.create({
            companyEmail: data.company.email,
            company: data.company._id,
            orders: []
        }).then(p => {
            Notification.create({
                recieverEmail: p.companyEmail,
                title: 'Partnership accepted!',
                text: 'Your partnership request has been accepted.Looking forward to working with you!',
                isRead: false
            }).then(n => {
                Notification.find({ recieverEmail: p.companyEmail }).then(nots => {
                    const io = require('../../index');

                    for (let socketId in io.sockets.sockets) {
                        if (io.sockets.sockets[socketId].userEmail === p.companyEmail) {
                            io.sockets.sockets[socketId].emit('notifications', nots);
                            break;
                        }
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Partner added',
                        partner: p,
                    })
                })
            }).catch(e => {
                return res.status(400).json({
                    success: false,
                    message: 'Could not create notification'
                })
            })

        }).catch(e => {
            return res.status(400).json({
                success: false,
                message: 'Could not create partner.'
            })
        })
    }).catch(e => {
        return res.status(404).json({
            success: false,
            message: 'Could not find request.'
        })
    })
})


router.post('/partnership/decline/:id', async (req, res) => {
    let id = req.params.id;

    PartnershipRrequest.findByIdAndRemove(id).then(data => {

        Notification.create({
            recieverEmail: data.companyEmail,
            title: 'Partnership declined!',
            text: 'Your partnership request has been declined.',
            isRead: false
        }).then(n => {
            Notification.find({ recieverEmail: p.companyEmail }).then(nots => {
                const io = require('../../index');
                for (let socketId in io.sockets.sockets) {
                    if (io.sockets.sockets[socketId].userEmail === p.companyEmail) {
                        io.sockets.sockets[socketId].emit('notifications', nots);
                        break;
                    }
                }
                return res.status(200).json({
                    success: true,
                    message: 'Request has been declined.',
                    notification: n
                })
            }).catch(e => {
                return res.status(400).json({
                    success: false,
                    message: 'Could not create notification'
                })
            })
        }).catch(e => {
            return res.status(404).json({
                success: false,
                message: 'Could not find request.'
            })
        })
    })


    module.exports = router
