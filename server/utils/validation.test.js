const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should reject non string values', ()=>{
    var bValue = isRealString(434);
    expect(bValue).toBe(false);
  });
  it('should reject string with only spaces', ()=>{
    var bValue = isRealString('     ');
    expect(bValue).toBe(false);
  });
  it('should allow string with non space characters', ()=>{
    var bValue = isRealString('test');
    expect(bValue).toBe(true);
  });

});
