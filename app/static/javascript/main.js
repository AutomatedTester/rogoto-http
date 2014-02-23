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
