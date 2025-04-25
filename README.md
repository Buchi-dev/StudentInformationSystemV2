# Student Information System 📚

![GitHub repo size](https://img.shields.io/github/repo-size/username/StudentInformationSystem?color=blue&style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/username/StudentInformationSystem?color=green&style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/username/StudentInformationSystem?color=yellow&style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/username/StudentInformationSystem?color=orange&style=flat-square)

A modern web application designed to streamline the management of student records and user data through CRUD operations (Create, Read, Update, Delete).

![Demo GIF](https://user-images.githubusercontent.com/demo.gif) <!-- Replace with actual GIF URL -->

## ✨ Key Features

### Student Management
- **Create** new student profiles with personal information
- **Read** student details and records
- **Update** student information
- **Delete** student records when necessary
- View student listings and search functionality

### User Management
- **Create** new user accounts with role assignment
- **Read** user profile information
- **Update** user details and access permissions
- **Delete** user accounts
- Role-based access control (Admin/Regular User)

### System Features
- Secure authentication and authorization
- User-friendly dashboard interface
- Responsive design for all devices
- Data validation and error handling
- Simple JSON file-based storage
- RESTful API architecture

## 🛠️ Technology Stack

### Frontend (Client)
- **React.js** - Modern UI library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **Modern UI Components** - Beautiful and responsive design elements
- **CSS3** - For styling and animations

### Backend (Server)
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **JSON File Storage** - Lightweight data storage system
- **RESTful API** - For seamless client-server communication

## 📋 Prerequisites

Make sure you have these installed on your system:
- **Node.js** - Version 14.0 or higher
- **npm** (Node Package Manager) - Usually comes with Node.js

## 🚀 Getting Started

### 1. Setting Up the Project

Clone and navigate to the project:
```bash
git clone [repository-url]
cd StudentInformationSystem
```

Install all dependencies (this will install packages for both client and server):
```bash
npm run install-all
```

### 2. Running the Application

#### Option 1: Run Everything Together
Start both frontend and backend servers:
```bash
npm start
```

#### Option 2: Run Separately
Start backend server:
```bash
npm run server
```

Start frontend development server:
```bash
npm run client
```

### 3. Accessing the Application
- Frontend (Web Interface): Open `http://localhost:5173` in your browser
- Backend (API Server): Runs on `http://localhost:3000`

## 📁 Project Structure Explained

```
StudentInformationSystem/
├── client/                 # Frontend Application
│   ├── src/               # React source files
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   └── assets/       # Images, styles, etc.
│   ├── public/           # Static files
│   └── package.json      # Frontend dependencies
│
├── server/               # Backend Application
│   ├── config/          # Server configuration
│   ├── controllers/     # Request handlers
│   ├── routes/          # API endpoints
│   ├── utils/           # Helper functions
│   ├── data/           # Data storage (JSON files)
│   └── index.js        # Server entry point
│
└── package.json         # Root dependencies and scripts
```

## 💾 Data Storage System

The application uses a simple but effective JSON-based file storage system:

| File | Purpose | Contains |
|------|---------|----------|
| `students.json` | Student Records | Personal info, enrollment status |
| `users.json` | User Accounts | Login credentials, roles |

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Student Management
- `GET /api/students` - List all students
- `POST /api/students` - Add new student
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student info
- `DELETE /api/students/:id` - Delete student

### User Management
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact Information

**Author:** Tristan Justine M. Yuzon  
**Email:** hed-tjyuzon@smu.edu.ph

---
Made with ❤️ for better educational management

## System Requirements

- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)
- npm (v6.x or higher)

## Setup Instructions

### 1. MongoDB Setup

1. Install MongoDB on your system: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service:
   - Windows: Run MongoDB as a service or use `mongod` command
   - macOS/Linux: `sudo systemctl start mongod`
3. Verify MongoDB is running: `mongosh` or using MongoDB Compass

### 2. Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run dev
   ```

4. The API server will run on http://localhost:3000

### 3. Client Setup

1. Open a new terminal and navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the client:
   ```
   npm run dev
   ```

4. The client application will run on http://localhost:5173

## API Routes

### Student Routes

- `GET /api/fetchstudents` - Get all students
- `POST /api/addstudents` - Add a new student
- `PUT /api/editstudent/:idNumber` - Update student information
- `DELETE /api/deletestudent/:idNumber` - Delete a student

### User Routes

- `GET /api/fetchusers` - Get all users
- `POST /api/adduser` - Add a new user
- `PUT /api/edituser/:userId` - Update user information
- `DELETE /api/deleteuser/:userId` - Delete a user
- `POST /api/login` - User login

## Data Models

### Student Model

```javascript
{
  idNumber: String,  // Required, Unique
  firstName: String, // Required
  lastName: String,  // Required
  middleName: String,
  course: String,    // Required
  year: String,      // Required
  section: String,
  dateAdded: Date    // Default: current date
}
```

### User Model

```javascript
{
  userId: String,    // Required, Unique
  firstName: String, // Required
  lastName: String,  // Required
  middleName: String,
  username: String,  // Required, Unique
  password: String,  // Required
  role: String,      // Default: 'user'
  dateAdded: Date    // Default: current date
}
```

## Security Considerations

- The system implements basic password hashing using SHA-256 with salt.
- For production use, consider upgrading to stronger algorithms like bcrypt or Argon2.
- Implement JWT-based authentication for better security.
- Add HTTPS for encrypted communication.

## Future Improvements

- Add more comprehensive data validation
- Implement role-based access control
- Add automated tests
- Add password reset functionality

## MongoDB Setup - Super Simple

This project now uses MongoDB instead of file storage. Here's all you need to know:

### Installation
1. Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install it following the basic steps
3. Make sure MongoDB is running before starting the app

### Code Already Set Up
All database code is already set up and very simple:
- Connection is made in server/index.js
- Student and user data stored in MongoDB
- No complex configuration needed!

### Start Everything

#### Server:
```
cd server
npm install
npm run dev
```

#### Client:
```
cd client
npm install
npm run dev
```

That's it! Your app is now using MongoDB instead of files.

## Need Help?

If you're new to MongoDB, here are some helpful resources:
- [MongoDB Basics Tutorial](https://www.mongodb.com/basics)
- [MongoDB Documentation](https://docs.mongodb.com/)