import sqlite3

def checkAppInteg(conn = None):
    if conn == None:
        raise Exception("Ping function expects a SQLite3 connection!")
    # check if app is already installed
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM ping")
        return True
    except sqlite3.OperationalError:
        return False

def installApp(conn = None):
    if conn == None:
        raise Exception("Ping function expects a SQLite3 connection!")
    try:
        cursor = conn.cursor()
        with open("./db.sql", 'r') as sql_file:
            sql_script = sql_file.read()
        cursor.executescript(sql_script)
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print("Error: \n", e, "\n")
        # return {
        #     "status": 500,
        #     "message": "Internal Server Error: Can't initiate app installation at the moment!"
        # }
        return False