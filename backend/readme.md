# 🌟 Node-Express Boilerplate 🌟

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

A comprehensive Node.js and Express.js boilerplate for building scalable and maintainable web applications.

## 📜 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Available Routes](#-available-routes)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- Modular architecture with feature-based structure
- User authentication and authorization
- JWT-based secure authentication
- MongoDB integration using Mongoose
- Centralized error handling
- Middleware for validation and error handling
- Environment-based configuration
- Scalable and maintainable codebase

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Token for authentication
- **Day.js** - Lightweight JavaScript date library

## 🏗️ Project Structure

```plaintext
/src
├── modules
│   ├── users
│   │   ├── controllers
│   │   │   └── userController.js
│   │   ├── models
│   │   │   └── userModel.js
│   │   ├── routes
│   │   │   └── userRoutes.js
│   │   ├── services
│   │   │   └── userService.js
│   │   └── index.js
│   │
│   ├── auth
│   │   ├── controllers
│   │   │   └── authController.js
│   │   ├── models
│   │   │   └── authModel.js
│   │   ├── routes
│   │   │   └── authRoutes.js
│   │   ├── services
│   │   │   └── authService.js
│   │   └── index.js
│   └── index.js
├── config
│   └── db.js
│
├── middleware
│   └── authMiddleware.js
├── utils
│   └── errorHandler.js
├── app.js
├── index.js
└── server.js


```

## 🛠️ Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/nur-it/express-js-boilerplate.git
   cd express-js-boilerplate
   ```

2. **Install backend dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:

   ```plaintext
   MONGODB_URI=your_mongo_URI
   JWT_SECRET=your_jwt_secret
   PORT=  your_app_port
   ```

4. **Start the backend server:**
   ```sh
   npm start
   ```

## 🌐 Available Routes

### Users

- **GET /api/v1/users**: Get all users
- **POST /api/v1/users**: Create a new user

### Auth

- **POST /api/v1/auth/login**: Login user
- **POST /api/v1/auth/register**: Register a new user

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding! 🚀
