import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

################################################################################### Concessions
# GET
@app.route('/concessions', methods=['GET', 'POST'])
def concessions():
    if request.method == 'GET':
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
    if request.method == 'POST':
        try:
            _json = request.json
            _SKU = _json['sku']
            _ItemName = _json['itemName']
            _Cost = _json['cost']
            _Quantity = _json['quantity']
            _Location = _json['location']

            sqlQuery = "INSERT INTO ConcessionsInventory (SKU, ItemName, Cost, Quantity, Location) VALUES(%s, %s, %s, %s, %s)"
            data = (_SKU, _ItemName, _Cost, _Quantity, _Location)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, data)
            conn.commit()
            res = jsonify('Concession created successfully.')
            res.status_code = 200
            return res
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()

# DELETE
@app.route('/concessions/<int:sku>', methods=['DELETE'])
def deleteConcession(sku):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM ConcessionsInventory WHERE SKU=%s", (sku))
        conn.commit()
        res = jsonify('Equipment deleted successfully.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()


################################################################################### Customer Info
# GET
@app.route('/customerinfo', methods=['GET', 'POST'])
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


################################################################################### Employee Info
# GET
@app.route('/employeeinfo', methods=['GET', 'POST'])
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


################################################################################### Equipment
# GET, POST
@app.route('/equipment', methods=['GET', 'POST'])
def equipment():
    if request.method == 'GET':
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
    if request.method == 'POST':
        try:
            _json = request.json
            _Eq_ID = _json['eqId']
            _Name = _json['name']
            _Location = _json['location']
            _Quantity = _json['quantity']

            sqlQuery = "INSERT INTO Equipment (Eq_ID, Name, Location, Quantity) VALUES(%s, %s, %s, %s)"
            data = (_Eq_ID, _Name, _Location, _Quantity)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, data)
            conn.commit()
            res = jsonify('Equipment created successfully.')
            res.status_code = 200
            return res
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()
# DELETE
@app.route('/equipment/<int:eqId>', methods=['DELETE'])
def deleteEquipment(eqId):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Equipment WHERE Eq_ID=%s", (eqId))
        conn.commit()
        res = jsonify('Equipment deleted successfully.')
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