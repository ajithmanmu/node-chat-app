const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  var rooms = users.getChatRooms();
  io.emit('getChatRooms', rooms);
  console.log('New user connected');
  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required')
    }
    var userList = users.getUserList(params.room.toLowerCase());
    if (userList.indexOf(params.name) > -1) {
      return callback('User Name already exists');
    }
    //Adding user to a room
    socket.join(params.room.toLowerCase());
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room.toLowerCase());
    io.to(params.room.toLowerCase()).emit('updateUserList', users.getUserList(params.room.toLowerCase()));
    //io.emit ==> Sends message to all Users
    //socket.broadcast.emit ==> Sends message to all Users except for the current one
    //socket.emit ==> Sends message to current user only
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.to(params.room.toLowerCase()).emit('newMessage',generateMessage('Admin', `${params.name} has joined.`));

    callback();
  });
  socket.on('createMessage', (newMessage, callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name,newMessage.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    var user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
})
