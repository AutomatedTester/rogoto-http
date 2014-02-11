(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
rogoto = require('rogoto-js');

},{"rogoto-js":2}],2:[function(require,module,exports){
function RogotoParserException (message) {
    this.message = message;
    this.name = "RogotoParserException";
}

function RogotoParser () {
    this.codeToExecute = [];
    this.penState = 'up';
}

RogotoParser.prototype.parse = function(logoCode) {
    if (!logoCode) {
        throw new RogotoParserException("You need to pass in a string of code");
    }

    var codeRegex = /pendown|pd|penup|pu|forward \d+|fd \d+|back \d+|bk \d+|right \d+|rt \d+|left \d+|lt \d+/;
    commands = logoCode.split('\n');
    for (var i = 0; i < commands.length; i++) {
      var match = codeRegex.exec(commands[i]);
      if (!match) {
        throw new RogotoParserException("You need to pass in valid syntax");
      }
      var cmd = match[0].split(' ');
      switch (cmd[0]) {
        case 'pendown':
        case 'pd':
          this.codeToExecute.push('pendown');
          this.penState = 'down';
          break;
        case 'penup':
        case 'pu':
          this.codeToExecute.push('penup');
          this.penState = 'up';
          break;
        case 'forward':
        case 'fd':
          var command = match[0].split(' ')[0] == 'forward'? match[0] : 'forward ' + cmd[1];
          this.codeToExecute.push(command);
          break;
        case 'back':
        case 'bk':
          var command = match[0].split(' ')[0] == 'back'? match[0] : 'back ' + cmd[1];
          this.codeToExecute.push(command);
          break;
        case 'right':
        case 'rt':
          var command = match[0].split(' ')[0] == 'right'? match[0] : 'right ' + cmd[1];
          this.codeToExecute.push(command);
          break;
        case 'left':
        case 'lt':
          var command = match[0].split(' ')[0] == 'left'? match[0] : 'left ' + cmd[1];
          this.codeToExecute.push(command);
          break;
      }
    };
    return this.codeToExecute;
};

RogotoParser.prototype.clean = function() {
    this.codeToExecute = [];
};

module.exports = RogotoParser;
},{}]},{},[1])