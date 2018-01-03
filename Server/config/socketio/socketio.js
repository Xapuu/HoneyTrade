const Message = require('mongoose').model('Message');
const Notification = require('mongoose').model('Notification');
const Admin = require('mongoose').model('Admin');
const Subscription = require('mongoose').model('Subscription');


module.exports =  (server) => {
    let io = require('socket.io')(server);

    io.on('connection', socket => {

        socket.on('userEmail', userEmail => {
            socket['userEmail'] = userEmail;
            Message.find({ recieverEmail: socket.userEmail }).then(messages => {
                socket.emit('unreadMessageCount', messages.filter(m => m.isRead === false).length);
                Notification.find({ recieverEmail: socket.userEmail }).then(nots => {
                    socket.emit('notifications', nots);
                })
            })

            Admin.findOne({ email: userEmail }).then(a => {
                Subscription.find().then(subs => {
                    socket.emit('subscriptions', subs);
                })
            }).catch(e => { })
            
            socket.on('disconnect', () => {
                console.log(`Deleting socket: ${socket.id}`);
            });
        })

    });
    
    return io;
}