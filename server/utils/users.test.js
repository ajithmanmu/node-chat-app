const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{

  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'1',
      name:'User 1',
      room:'Room A'
    },{
      id:'2',
      name:'User 2',
      room:'Room B'
    },{
      id:'3',
      name:'User 3',
      room:'Room A'
    }];
  })

  it('should add new user', ()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'Aj',
      room: 'Test Room'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', ()=>{
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });
  it('should not remove user', ()=>{
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', ()=>{
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });
  it('should not find user', ()=>{
    var userId = '99';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return names for Room A', ()=>{
    var userList = users.getUserList('Room A');
    expect(userList).toEqual(['User 1', 'User 3']);
  });
  it('should return names for Room B', ()=>{
    var userList = users.getUserList('Room B');
    expect(userList).toEqual(['User 2']);
  });

});
