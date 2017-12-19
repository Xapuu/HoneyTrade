const Message = require('mongoose').model('Message');
const Notification = require('mongoose').model('Notification');


module.exports = server => {
    let io = require('socket.io')(server);

    io.on('connection', socket => {

        socket.on('userEmail', userEmail => {
            socket['userEmail'] = userEmail;
            Message.find({ recieverEmail: socket.userEmail }).then(messages => {

                socket.emit('unreadMessageCount', messages.length);
                Notification.find({ recieverEmail: socket.userEmail }).then(nots => {
                    socket.emit('notifications', nots);
                })

            })
        })

        socket.on('disconnect', () => {
            console.log(`Deleting socket: ${socket.id}`);
        });
    })

    return io;
};