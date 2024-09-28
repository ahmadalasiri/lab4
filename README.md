# Lab 4: Role-Based Access Control

## Description

This project is a simple web application built with Node.js and Express. It includes user authentication and role-based access control, allowing users to log in and access different pages based on their roles.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   In the root directory, create a file named `.env` and add your environment variables. Here’s an example:
   ```env
   PORT=8000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

## Running the Application

You can run the application in development mode using `nodemon` or in production mode.

- **Development Mode**:

  ```bash
  npm run start:dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

The application will start and be accessible at `http://localhost:8000`.

## Usage

1. Open your web browser and navigate to `http://localhost:8000`.
2. Use the `/identify` route to log in with your credentials.
3. After logging in, you can access the `/granted` route and other role-based routes.
4. Use the `/users/:id` route to view user details. Only you can access your own details.
5. Log out using the `/logout` route.

## Routes

- `/` - Home page
- `/identify` - Log in
- `/granted` - Access granted
- `/users/:id` - View user details
- `/logout` - Log out
- `/admin` - Admin page (only accessible to admin users)
- `/teacher` - Teacher page (only accessible to teacher and admin users)
- `/student` - Student page (only accessible to student, teacher, and admin users)

## Project Structure

```
/src
│
├── /controllers
│ ├── authController.js
│ ├── userController.js
│ └── adminController.js
│
├── /models
│ └── userModel.js
│
├── /middlewares
│ ├── authMiddleware.js
│
├── /routes
│ ├── authRoutes.js
│ ├── userRoutes.js
│ └── adminRoutes.js
│
├── /views
│ ├── identify.ejs
│ ├── granted.ejs
│ ├── admin.ejs
│ ├── student1.ejs
│ ├── student2.ejs
│ ├── teacher.ejs
│ ├── register.ejs
│ ├── userProfiles.ejs
│ └── userProfile.ejs
│
├── /public
│ └── (static files like CSS, JS, images, etc.)
│
├── .env
├── .gitignore
├── package.json
└── server.js
```
