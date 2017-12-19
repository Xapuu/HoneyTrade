
module.exports = server => {
    let io = require('socket.io')(server);
    
    io.on('connection', socket => {
        console.log('connected');
    
        socket.on('userEmail', userEmail => {
            console.log('recieved email -' + userEmail);          
            socket['userEmail'] = userEmail; 
        })
      
        socket.on('disconnect', () => {
            console.log(`Deleting socket: ${socket.id}`);
        });
    })

    return io;
};