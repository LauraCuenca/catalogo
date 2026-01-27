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

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html"), 404


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)