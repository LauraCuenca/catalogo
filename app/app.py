import os
import json
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/guia')
def guia():
    return render_template('guia.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/tote')
def tote_bag():
    return render_template('tote.html')


if __name__ == '__main__':
    app.run(debug=True)