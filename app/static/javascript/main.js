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
        var currentDirection = 0;
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
                        currentDirection -= parseInt(cmd[1]);
                    } else {
                        currentDirection += parseInt(cmd[1]);
                    }
                    break;
                case 'right':
                    if (currentDirection >= 180 && currentDirection <= 0){
                        currentDirection += parseInt(cmd[1]);
                    } else {
                        currentDirection -= parseInt(cmd[1]);
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
run.addEventListener('click', function () {
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