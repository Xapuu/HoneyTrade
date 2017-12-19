const jwt = require('jsonwebtoken');
const UserRole = require('mongoose').model('UserRole');

const Admin = require('mongoose').model('Admin');


module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: 'You are unauthorized'
        })
    }


    const type = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1]

    if (type !== 'Admin') {
        return res.status(401).json({
            success: false,
            message: 'You are unauthorized'
        })
    }


    return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'You are unauthorized'
            })
        }

        const userEmail = decoded.sub

        Admin.findOne({ email: userEmail }).then(user => {

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'You are unauthorized'
                })
            }

            req.user = user;

            return next()

        });

    })
}

