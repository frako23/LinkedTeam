import os
import psycopg2

# Load the environment variables from .env
from dotenv import load_dotenv
load_dotenv()

# Get the connection string from the environment variable
db_url = os.getenv("DATABASE_URL")

if not db_url:
    print("DATABASE_URL environment variable is not set.")
else:
    print(f"Attempting to connect with URL: {db_url}")
    try:
        # Attempt to connect to the database
        conn = psycopg2.connect(db_url)
        print("Connection successful!")
        conn.close()
    except Exception as e:
        print("Connection failed.")
        print(e)
        print("---")
        print("Possible causes:")
        print("- The PostgreSQL service is not running.")
        print("- Incorrect username, password, host, or database name in your .env file.")
        print("- A firewall is blocking the connection.")