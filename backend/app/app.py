
import re
import os
from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

app.secret_key = 'abcdefgh'

app.config['MYSQL_HOST'] = 'db'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'cs353hw4db'

mysql = MySQL(app)


@app.route('/')
@app.route('/data', methods=['GET'])
def get_time():
    x = datetime.datetime.now()
    response = {'Name': "pompa",
                              "Age": "22",
                              "Date": x,
                              "programming": "sucks ass"}
    return response


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)


# Running app
if __name__ == '__main__':
    app.run(debug=True)
