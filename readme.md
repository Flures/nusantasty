Nusantasty
==========

Nusantasty is a web application that allows users to discover, save, and manage recipes based on the ingredients they have. The application consists of a frontend built with React and a backend built with Node.js and Express, integrated with Firebase for authentication and MySQL for data storage.

Features
--------

-   User authentication with Firebase
-   Profile management with photo upload
-   Recipe management (save, delete, list)
-   Ingredient-based recipe recommendations
-   Responsive design with Tailwind CSS
-   Swagger API documentation
-   Docker support

Tech Stack
----------

-   **Frontend:** React, Tailwind CSS, Axios, Firebase
-   **Backend:** Node.js, Express, MySQL, Firebase Admin SDK, Multer, Swagger
-   **Database:** MySQL
-   **Cloud Storage:** Google Cloud Storage
-   **Deployment:** Docker, Google Cloud Platform

Prerequisites
-------------

-   Node.js 18 or higher
-   MySQL database
-   Firebase project credentials
-   Google Cloud Storage bucket
-   Docker (optional)

Installation
------------

### Backend

1.  Clone the repository:
```
    git clone https://github.com/your-repo/nusantasty.git

    cd nusantasty/backend
```
2.  Install dependencies:
```
    npm install
```
3.  Configure environment variables: Create a `.env` file with the following variables:
```
    PORT=3000

    MYSQL_HOST=your-mysql-host

    MYSQL_USER=your-mysql-user

    MYSQL_PASSWORD=your-mysql-password

    MYSQL_DATABASE=your-database-name

    FIREBASE_SERVICE_ACCOUNT_KEY=path/to/firebase-credentials.json

    BUCKET_NAME=your-gcs-bucket-name
```
4.  Start the backend server:
```
    npm start
```
### Frontend

1.  Navigate to the frontend directory:
```
    cd ../frontend
```
2.  Install dependencies:
```
    npm install
```
3.  Configure environment variables: Create a `.env` file with the following variables:
```
    REACT_APP_FIREBASE_API_KEY=your-firebase-api-key

    REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain

    REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id

    REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket

    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id

    REACT_APP_FIREBASE_APP_ID=your-firebase-app-id

    REACT_APP_BACKEND_API_URL=http://localhost:3000

    REACT_APP_MODEL_API_URL=http://localhost:5000
```
4.  Start the frontend development server:
```
    npm start
```
Running the Application
-----------------------

### Development

To run the application in development mode, start both the backend and frontend servers as described in the installation steps.

### Docker

To run the application using Docker:

1.  Build the Docker image:
```
    docker build -t nusantasty-backend ./backend
```
2.  Run the Docker container:
```
    docker run -p 3000:3000 nusantasty-backend
```
API Documentation
-----------------

Access the Swagger documentation at `/api-docs`.

### Available Endpoints

#### Authentication

-   `POST /signup` - Register new user

#### Profile

-   `GET /profile/:uid` - Get user profile
-   `POST /save-profile` - Update user profile with photo

#### Recipes

-   `POST /save-recipe` - Save a recipe
-   `DELETE /delete-recipe/:recipe_id` - Delete a recipe
-   `GET /saved-recipes` - Get user's saved recipes

Database Schema
---------------

### Users Table
```
CREATE TABLE users (

  uid VARCHAR(255) PRIMARY KEY,

  email VARCHAR(255) NOT NULL,

  name VARCHAR(255),

  photo_url TEXT

);
```
### Recipes Table
```
CREATE TABLE recipes (

  recipe_id VARCHAR(255) PRIMARY KEY,

  title VARCHAR(255) NOT NULL,

  description TEXT,

  category VARCHAR(255),

  image_url TEXT,

  ingredient_groups TEXT,

  instructions TEXT,

  ratings FLOAT,

  status VARCHAR(50),

  total_time VARCHAR(100),

  yields VARCHAR(100)

);
```
### Recipe Histories Table

```
CREATE TABLE recipe_histories (

  uid VARCHAR(255),

  recipe_id VARCHAR(255),

  created_at DATETIME,

  PRIMARY KEY (uid, recipe_id)

);