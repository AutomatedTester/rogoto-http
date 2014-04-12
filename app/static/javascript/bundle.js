(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*jshint -W065 */
RogotoParser = require('rogoto-js');
mathext = require('mathext-js');

parser = new RogotoParser();

var logoCode = [];
var CENTRE_X = 100;
var CENTRE_Y = 100;
var penState = 'up';

var draw = function draw (logoCode) {
    var canvas = document.getElementById('logo');
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(CENTRE_X, CENTRE_Y);
        var currentX = CENTRE_X;
        var currentY = CENTRE_Y;
        var currentDirection = -90;
        for (var i = 0; i < logoCode.length; i++) {
            var cmd = logoCode[i].split(' ');
            switch (cmd[0]) {
                case 'pendown':
                    if (penState == 'up') {
                        penState = 'down';
                    }
                    break;
                case 'penup':
                    if (penState == 'down') {
                        penState = 'up';
                    }
                    break;
                case 'forward':
                    currentX += parseInt(cmd[1]) * Math.cos(mathext.toRadians(currentDirection));
                    currentY += parseInt(cmd[1]) * Math.sin(mathext.toRadians(currentDirection));
                    moveOrDraw(ctx, currentX, currentY);
                    break;
                case 'back':
                    currentX += parseInt(cmd[1]) * Math.cos(mathext.toRadians(currentDirection));
                    currentY += parseInt(cmd[1]) * Math.sin(mathext.toRadians(currentDirection));
                    moveOrDraw(ctx, currentX, currentY);
                    break;
                case 'left':
                    if (currentDirection <= 180 && currentDirection >= 0){
                        currentDirection += parseInt(cmd[1]);
                    } else {
                        currentDirection -= parseInt(cmd[1]);
                    }
                    break;
                case 'right':
                    if (currentDirection >= 180 && currentDirection <= 0){
                        currentDirection -= parseInt(cmd[1]);
                    } else {
                        currentDirection += parseInt(cmd[1]);
                        if (currentDirection == -180) currentDirection = 180;
                    }
                    break;
            }
            ctx.stroke();
        }

    }
};

var moveOrDraw = function (ctx, x, y) {
    if (penState == 'down') {
        ctx.lineTo(x, y);
    } else {
        ctx.moveTo(x, y);
    }
};

var clearCanvas = function (context, canvas) {
  context.clearRect(0,0,context.canvas.width,context.canvas.height);
};

var run = document.getElementById('run');
run.addEventListener('click', function (e) {
    e.preventDefault();
    var code = document.getElementById('code');
    logoCode = parser.parse(code.value);
    draw(logoCode);
});

var clear = document.getElementById('clear');
clear.addEventListener('click', function () {
    var code = document.getElementById('code');
    code.value = '';
    var canvas = document.getElementById('logo');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        clearCanvas(ctx, canvas);
    }
});

var post = function(url) {
    var httpRequest;
    var logoForm = document.getElementById('logoForm');
    logoForm.addEventListener('submit', function() {
        return false;
    });
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    }

    if (!httpRequest) {
        alert('Unfortunately we can\'t create a http request which means we can\'t drive the robot, sorry!');
        return false;
    }
    httpRequest.onreadystatechange = function() {
        alert('posted');
    };
    httpRequest.open('POST', url);
    httpRequest.send(new FormData(logoForm));
};

var driver = document.getElementById('driver');
driver.addEventListener('click', function() {
    post(document.location.href + "/drive");
});
},{"mathext-js":2,"rogoto-js":3}],2:[function(require,module,exports){
function Mathext () {
}

Mathext.prototype.toRadians = function(degrees) {
    return (degrees * (Math.PI/180)).toFixed(3);
};

Mathext.prototype.toDegrees = function(radians) {
    return (radians * (180/Math.PI)).toFixed(2);
};
module.exports = new Mathext();
},{}],3:[function(require,module,exports){
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