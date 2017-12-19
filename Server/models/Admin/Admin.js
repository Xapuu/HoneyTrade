const mongoose = require('mongoose');
const encryption = require('../../util/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserRole = require('mongoose').model('UserRole');

const adminSchema = new mongoose.Schema({
    companyName: { type: mongoose.Schema.Types.String, required: true },
    companyLocation: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
});

adminSchema.method({
    authenticate: function (password) {
        
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass + '';
    }
});

const Admin = mongoose.model('Admin', adminSchema);

Admin.seedAdminUser = async () => {
    try {
        let users = await Admin.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
        await UserRole.create({
            email: 'admin@honeymarket.com',
            role: 'admin'
        })
        return Admin.create({
            companyName: 'HoneyMarket',
            companyLocation: 'Plovdiv',
            email: 'admin@honeymarket.com',
            hashedPass,            
            salt,
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = Admin;
