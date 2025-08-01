# Use a specific Python version as the base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Pipfile and Pipfile.lock to the container
COPY Pipfile Pipfile.lock ./

# Install dependencies using pipenv
RUN pip install pipenv && pipenv install --system --deploy

# Copy the rest of your application code
COPY . .

# Expose the port your Flask app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["pipenv", "run", "flask", "run", "--host=0.0.0.0", "--port=5000"]