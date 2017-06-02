const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin', 'new user joined'));

  socket.on('createMessage', (newMessage, callback)=>{
    console.log('Message received from client', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from,newMessage.text));
    callback('This is from the server');
  });

  socket.on('disconnect', ()=>{
    console.log('User got disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
})
