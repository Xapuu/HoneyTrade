

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserRole = require('../models/userModels/UserRole');

const User = require('../models/userModels/User');
const Beekeeper = require('../models/userModels/Beekeeper');
const Buyer = require('../models/userModels/Buyer');
const Admin = require('../models/Admin/Admin');
const Partner = require('../models/userModels/Partner');
const CompanyInfo = require('../models/Admin/CompanyInfo');

const Honey = require('../models/Honey');
const Message = require('../models/Message');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Subscription = require('../models/Subscription');
const Review = require('../models/Review');
const Notification = require('../models/Notification');
const PartnershipRequest = require('../models/PartnershipRequest');


module.exports = config => {
    mongoose.connect(config.dbPath, {
        useMongoClient: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        Admin.seedAdminUser().then(() => {
            console.log('Database ready');                
        }).catch((reason) => {
            console.log('Something went wrong');
            console.log(reason);
        });
    });
    db.on('error', reason => {
        console.log(reason);
    });
};