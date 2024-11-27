from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from routes import routes
from db_connection import MySQLConnection
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# MySQL Configuration
db = MySQLConnection(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE")
)
db.connect()

# Ensure the connection closes when app shuts down
@app.teardown_appcontext
def close_connection(exception):
    db.close()

# Register Blueprints
app.register_blueprint(routes, url_prefix="/api")

# Run the app
if __name__ == "__main__":
    app.run(debug=True)