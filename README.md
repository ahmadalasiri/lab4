# Lab 4

## Installation

1. **Clone the Repository**:

- git clone https://github.com/ahmadalasiri/lab4.git
- cd lab4

2. **Install Dependencies**:

- npm install

3. **Create a `.env` file and add the following variables**:

- ACCESS_TOKEN_SECRET=<your_jwt_secret>
- MONGO_URI=<your_mongodb_uri>

## Running the Application

- node .\src\server.js
- nodemon .\src\server.js

## To create initial users in the database

- node .\src\createUsers.js

## Usage

1. Open your web browser and navigate to `http://localhost:8000`.
2. Use the `/register` route to create a new user.
3. Use the `/identify` route to log in.
4. After logging in, you can access the `/granted` route and your profile.
5. Use the `/users/:id` route to view your details.
