from flask import render_template, jsonify, request
from app import app
from rogoto import RogotoParser
try:
    from rogoto_core import rogoto
except:
    # Likely that something went wrong with the install
    print """Could not import rogoto core. It is likely the
    serial port can't be accessed on your Raspberry Pi or
    you are not running this on a Raspberry Pi."""
    rogoto = object()


@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")


@app.route('/logo')
def control():
    return render_template("logo.html")


@app.route('/logo/drive', methods=['POST'])
def drive():
    parser = RogotoParser()
    codes = parser.parse(request.form['code'])
    for code in codes:
        mthd = getattr(rogoto, code)
        mthd_args = code.split(' ')
        if len(mthd_args) > 1:
            mthd(mthd_args[1])
        else:
            mthd()
