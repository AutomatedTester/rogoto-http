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
        // TODO: must keep state
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
                    if (penState == 'down') {
                        ctx.lineTo(CENTRE_X, CENTRE_Y - cmd[1]);
                    } else {
                        ctx.moveTo(CENTRE_X, CENTRE_Y - cmd[1]);
                    }
                    break;
                case 'back':
                    if (penState == 'down') {
                        ctx.lineTo(CENTRE_X, CENTRE_Y + cmd[1]);
                    } else {
                        ctx.moveTo(CENTRE_X, CENTRE_Y + cmd[1]);
                    }
            }
        }
        ctx.stroke();
    }
}
