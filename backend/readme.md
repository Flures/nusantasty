Nusantasty Backend
==============

An API service for managing recipes, user profiles, and authentication built with Node.js, Express, MySQL, Firebase Auth, and Google Cloud Storage.

Features
--------

-   User authentication with Firebase
-   Profile management with photo upload
-   Recipe management (save, delete, list)
-   Swagger API documentation
-   MySQL database integration
-   Google Cloud Storage for file uploads
-   Docker support
-   Google Cloud Platform deployment ready

Tech Stack
----------

-   Node.js & Express
-   MySQL
-   Firebase Authentication
-   Google Cloud Storage
-   Swagger UI
-   Docker

Prerequisites
-------------

-   Node.js 18 or higher
-   MySQL database
-   Firebase project credentials
-   Google Cloud Storage bucket
-   Docker (optional)

Installation
------------
    
1.  Install dependencies:
```
npm install
```
1.  Configure environment variables: Create a .env file with the following variables:
```
PORT=3000
MYSQL_HOST=your-mysql-host
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=your-database-name
FIREBASE_SERVICE_ACCOUNT_KEY=path/to/firebase-credentials.json      BUCKET_NAME=your-gcs-bucket-name
```
Running the Application
-----------------------

### Development
```
npm start
```
### Docker
```
docker build -t your-build-name . docker run -p 3000:3000 your-build-name
```
API Documentation
-----------------
Access the Swagger documentation at /api-docs

### Available Endpoints

#### Authentication

-   POST /signup - Register new user

#### Profile

-   GET /profile/:uid - Get user profile
-   POST /save-profile - Update user profile with photo

#### Recipes

-   POST /save-recipe - Save a recipe
-   DELETE /delete-recipe/:recipe_id - Delete a recipe
-   GET /saved-recipes - Get user's saved recipes

Database Schema
---------------

### Users Table
```
CREATE TABLE users ( uid VARCHAR(255) PRIMARY KEY, email VARCHAR(255) NOT NULL, name VARCHAR(255), photo_url TEXT );
```
### Recipes Table
```
CREATE TABLE recipes ( recipe_id VARCHAR(255) PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, category VARCHAR(255), image_url TEXT, ingredient_groups TEXT, instructions TEXT, ratings FLOAT, status VARCHAR(50), total_time VARCHAR(100), yields VARCHAR(100) );
```
### Recipe Histories Table
```
CREATE TABLE recipe_histories ( uid VARCHAR(255), recipe_id VARCHAR(255), created_at DATETIME, PRIMARY KEY (uid, recipe_id) );