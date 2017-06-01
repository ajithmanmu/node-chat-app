var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

// socket.on('Welcome', function(message){
//   console.log('Welcome', message);
// });
//
// socket.on('NewUserJoined', function (message){
//   console.log('NewUserJoined', message);
// });

socket.on('newMessage', function (message){
  console.log('Message received from server',message);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});
