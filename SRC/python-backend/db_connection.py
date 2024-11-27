import mysql.connector
from mysql.connector import Error

class MySQLConnection:
    def __init__(self, host, user, password, database): 
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = None

    def connect(self):
        try: 
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password, 
                database=self.database 
            )
            if self.connection.is_connected(): 
                print("Connected to MySQL database")
        except Exception as e: 
            print(f"Error: {e}")

    def execute_query(self, query, params=None): 
        if not self.connection: 
            raise Exception("No database connection")
        cursor = self.connection.cursor()
        try: 
            cursor.execute(query, params or ())
        
            # Handle SELECT queries
            if query.strip().lower().startswith("select"):
                return cursor.fetchall()
        
            # For INSERT/UPDATE/DELETE queries, commit and return affected rows
            self.connection.commit()
            return cursor.rowcount
        except Exception as e: 
            print(f"Error executing query: {e}")
        finally: 
            cursor.close()

    def close(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()

    # Add predefined query methods
    def login(self, studentID, password):
        query = f"SELECT studentID FROM STUDENT WHERE password = password;"
        return self.execute_query(query)