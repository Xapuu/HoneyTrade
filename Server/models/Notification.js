const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recieverEmail: { type: mongoose.Schema.Types.String, required: true },
    title: { type: mongoose.Schema.Types.String, required: true },
    text: { type: mongoose.Schema.Types.String, required: true }, 
    date: {type: String},  
    isRead: { type: mongoose.Schema.Types.Boolean, required: true }
});


const Notification = mongoose.model('Notification', notificationSchema);



module.exports = Notification;
