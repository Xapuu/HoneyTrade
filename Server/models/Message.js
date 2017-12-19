const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderEmail: { type: mongoose.Schema.Types.String, required: true },
    recieverEmail: { type: mongoose.Schema.Types.String, required: true },
    text: { type: mongoose.Schema.Types.String, required: true },
    date: { type: mongoose.Schema.Types.Date, required: true },
    isRead: { type: mongoose.Schema.Types.Boolean, required: true }
});


const Message = mongoose.model('Message', messageSchema);



module.exports = Message;
