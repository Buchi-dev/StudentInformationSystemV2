# Student Information System 📚

A modern web application designed to streamline the management of student records and user data through CRUD operations (Create, Read, Update, Delete).

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