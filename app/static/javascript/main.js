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
                        penState = 'down'
                    }
                    break;
                case 'penup':
                    if (penState == 'down') {
                        penState = 'up';
                    }
                    break;
                case 'forward':
                    if (currentDirection == 0) {
                        currentY -= (cmd[1]*1);
                    } else if (currentDirection == -90) {
                        currentX -= (cmd[1]*1);
                    } else if (currentDirection == 180) {
                        currentY += (cmd[1]*1);
                    } else if (currentDirection == 90) {
                        currentX += (cmd[1]*1);
                    }
                    moveOrDraw(ctx, currentX, currentY);
                    break;
                case 'back':
                    if (currentDirection == 0) {
                        currentY += (cmd[1]*1);
                    } else if (currentDirection == -90) {
                        currentX += (cmd[1]*1);
                    } else if (currentDirection == 180) {
                        currentY -= (cmd[1]*1);
                    } else if (currentDirection == 90) {
                        currentX -= (cmd[1]*1);
                    }
                    moveOrDraw(ctx, currentX, currentY);
                    break;
                case 'left':
                    if (currentDirection <= 180 && currentDirection >= 0){
                        currentDirection -= (cmd[1] * 1);
                    } else {
                        currentDirection += (cmd[1] * 1);
                    }
                    break;
                case 'right':
                    if (currentDirection >= 180 && currentDirection <= 0){
                        currentDirection += (cmd[1] * 1);
                    } else {
                        currentDirection -= (cmd[1] * 1);
                    }
                    break;
            }
        }
        ctx.stroke();
    }
}

var moveOrDraw = function (ctx, x, y) {
    if (penState == 'down') {
        ctx.lineTo(x, y);
    } else {
        ctx.moveTo(x, y);
    }
}
