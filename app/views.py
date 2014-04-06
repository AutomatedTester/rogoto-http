from flask import render_template, jsonify, request
from app import app
from rogoto import RogotoParser
from rogoto_core import rogoto


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
