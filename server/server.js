const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage', {
    from:'aj@test.com',
    text:'Message from server',
    createdAt:123
  });

  socket.on('createMessage', (newMessage)=>{
    console.log('Message received from client', newMessage);
  });

  socket.on('disconnect', ()=>{
    console.log('User got disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
})
