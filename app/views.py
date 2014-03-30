from flask import render_template, jsonify
from app import app


@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")


@app.route('/logo')
def control():
    return render_template("logo.html")


@app.route('/logo/drive', methods=['POST'])
def drive():
    pass