var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
  socket.emit('createMessage', {
    from:'test@client.com',
    text:'Message from client'
  });
});

socket.on('newMessage', function (message){
  console.log('Message received from server',message);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
