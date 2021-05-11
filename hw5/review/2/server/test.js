var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/log/debug.log', {flags : 'w'});


console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
};

console.log(123)
console.log(456)