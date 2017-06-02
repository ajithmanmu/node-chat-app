//UNIX Time stamp: Jan 1st 1970 00:00:00 AM --> 0
var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());
// console.log(date.getDate());

var date = moment();
date.add(1, 'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY'));

var createdAt = 23324343;
var hour = moment(createdAt);
console.log(hour.format('h:mm a'));
