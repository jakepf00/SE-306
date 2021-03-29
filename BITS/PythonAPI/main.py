import pymysql
from app import app
from config import mysql
from flask import jsonify
from flask import flash, request

################################################################################### Concessions
# GET, POST, PUT
@app.route('/concessions', methods=['GET', 'POST', 'PUT'])
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
    if request.method == 'PUT':
        try:
            _json = request.json
            _SKU = _json['sku']
            _ItemName = _json['itemName']
            _Cost = _json['cost']
            _Quantity = _json['quantity']
            _Location = _json['location']

            sql = "UPDATE ConcessionsInventory SET ItemName=%s, Cost=%s, Quantity=%s, Location=%s WHERE SKU=%s"
            data = (_ItemName, _Cost, _Quantity, _Location, _SKU)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            res = jsonify('Concession updated successfully.')
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
        res = jsonify('Concession deleted successfully.')
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
# GET, POST, PUT
@app.route('/equipment', methods=['GET', 'POST', 'PUT'])
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
    if request.method == 'PUT':
        try:
            _json = request.json
            _Eq_ID = _json['eqId']
            _Name = _json['name']
            _Location = _json['location']
            _Quantity = _json['quantity']

            sql = "UPDATE Equipment SET Name=%s, Location=%s, Quantity=%s WHERE Eq_ID=%s"
            data = (_Name, _Location, _Quantity, _Eq_ID)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            res = jsonify('Equipment updated successfully.')
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

################################################################################### Equipment
# GET, POST, PUT
@app.route('/reservations', methods=['GET', 'POST', 'PUT'])
def reservations():
    if request.method == 'GET':
        try:
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT * FROM reservations")
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
            _ID = _json['ID']
            _Name = _json['name']
            _Location = _json['location']
            _EventType = _json['eventType']
            _DateTime = _json['dateTime']
            _Equipment = _json['equipment']

            sqlQuery = "INSERT INTO Reservations (ID, Name, Location, EventType, DateTime, Equipment) VALUES(%s, %s, %s, %s, %s, %s)"
            data = (_ID, _Name, _Location, _EventType, _DateTime, _Equipment)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sqlQuery, data)
            conn.commit()
            res = jsonify('Reservation created successfully.')
            res.status_code = 200
            return res
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()
    if request.method == 'PUT':
        try:
            _json = request.json
            _ID = _json['ID']
            _Name = _json['name']
            _Location = _json['location']
            _EventType = _json['eventType']
            _DateTime = _json['dateTime']
            _Equipment = _json['equipment']

            sql = "UPDATE Reservations SET Name=%s, Location=%s, EventType=%s, DateTime=%s, Equipment=%s WHERE ID=%s"
            data = (_Name, _Location, _EventType, _DateTime, _Equipment, _ID)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            conn.commit()
            res = jsonify('Equipment updated successfully.')
            res.status_code = 200
            return res
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


# DELETE
@app.route('/reservations/<int:ID>', methods=['DELETE'])
def deleteReservation(ID):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Equipment WHERE ID=%s", (ID))
        conn.commit()
        res = jsonify('Reservation deleted successfully.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()


################################################################################### Other stuff
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