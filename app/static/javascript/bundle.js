(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
RogotoParser = require('rogoto-js');

parser = new RogotoParser();

var run = document.getElementById('run');
var logoCode = [];
run.addEventListener('click', function () {
    var code = document.getElementById('code');
    logoCode = parser.parse(code.value);
    draw(logoCode);
});
var CENTRE_X = 100;
var CENTRE_Y = 100;


var draw = function draw (logoCode) {
    var canvas = document.getElementById('logo');
    if (canvas.getContext) {
        var penState = 'up';
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(CENTRE_X, CENTRE_Y);
        var currentX = CENTRE_X;
        var currentY = CENTRE_Y;
        for (var i = 0; i < logoCode.length; i++) {
            var cmd = logoCode[i].split(' ');
            switch (cmd[0]) {
                case 'pendown':
                    if (penState == 'up') {
                        penState = 'down'
                    }
                    break;
                case 'penup':
                    if (penState == 'down') {
                        penState = 'up';
                    }
                    break;
                case 'forward':
                    currentY -= (cmd[1]*1);
                    if (penState == 'down') {
                        ctx.lineTo(currentX, currentY);
                    } else {
                        ctx.moveTo(currentX, currentY);
                    }
                    break;
                case 'back':
                    currentY += (cmd[1]*1);
                    if (penState == 'down') {
                        ctx.lineTo(currentX, currentY);
                    } else {
                        ctx.moveTo(currentX, currentY);
                    }
            }
        }
        ctx.stroke();
    }
}

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
    this.codeToExecute = [];
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