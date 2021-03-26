import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

@app.route('/concessions/get')
def getConcessions():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM concessionsinventory")
        rows = cursor.fetchall()
        res = jsonify(rows)
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/customerinfo/get')
def getCustomerInfo():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM customerinfo")
        rows = cursor.fetchall()
        res = jsonify(rows)
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/employeeinfo/get')
def getEmployeeInfo():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM employeeinfo")
        rows = cursor.fetchall()
        res = jsonify(rows)
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/equipment/get')
def getEquipment():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM equipment")
        rows = cursor.fetchall()
        res = jsonify(rows)
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'There is no record: ' + request.url,
    }
    res = jsonify(message)
    res.status_code = 404

    return res

if __name__ == "__main__":
    app.run()