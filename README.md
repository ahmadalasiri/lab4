# Lab 4

## Installation

1. **Clone the Repository**:

- git clone repository-url
- cd repository-name

2. **Install Dependencies**:

- npm install

3. **Create a `.env` file and add the following variables**:

- ACCESS_TOKEN_SECRET=<your_jwt_secret>

## Running the Application

- node .\src\server.js

## To add users run the following command:

- node .\src\createUsers.js

## Usage

1. Open your web browser and navigate to `http://localhost:8000`.
2. Use the `/register` route to create a new user.
3. Use the `/identify` route to log in.
4. After logging in, you can access the `/granted` route and your profile.
5. Use the `/users/:id` route to view your details.
