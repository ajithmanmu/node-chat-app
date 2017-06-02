var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=>{
    var obj = generateMessage('test@test.com','Test text');
    expect(obj.from).toBe('test@test.com');
    expect(obj.text).toBe('Test text');
    expect(obj.createdAt).toBeA('number');
    expect(obj).toInclude({
      from: 'test@test.com'
      ,text: 'Test text'
    });
  });

});

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    var obj = generateLocationMessage('Ajith',1,2);
    expect(obj.from).toBe('Ajith');
    expect(obj.url).toBe('https://www.google.com/maps?q=1,2');
    expect(obj.createdAt).toBeA('number');
  });
});
