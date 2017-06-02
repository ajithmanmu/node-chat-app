var expect = require('expect');
var {generateMessage} = require('./message');

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
