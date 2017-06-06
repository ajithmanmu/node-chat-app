//ES6 Classes

// class Person {
// //contructor is called by default when the instance is created
//     constructor (name, age) {
//       this.name = name;
//       this.age = age;
//     }
//     //Create methods
//     getUserDescription(){
//       return `${this.name} is ${this.age} old`;
//     }
// }
//
// var me  = new Person('Aj', 10);
// var description = me.getUserDescription();
// console.log(description);
const _ = require('lodash');

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.users.filter((user) => user.id === id)[0];
    if(user){
      this.users = this.users.filter((user)=> user.id !== id);
    }
    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

  getChatRooms(){
    var roomsArray = this.users
                .map((user) => user.room)
                .filter(function (item, pos, self) {
                  return self.indexOf(item) == pos;
                });
    return roomsArray;
  }
}

module.exports = {Users};
