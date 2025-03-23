# Student Information System

A comprehensive web-based Student Information Management System built with modern technologies to efficiently manage student data, academic records, and administrative tasks.

## Features

- User Authentication and Authorization
- Student Profile Management
- Course Management
- Grade Management
- Administrative Dashboard
- Responsive Design

## Tech Stack

### Frontend
- React.js
- Vite (Build tool)
- Modern UI components
- Responsive design

### Backend
- Node.js
- Express.js
- File-based Storage System (JSON files)
- RESTful API architecture

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd StudentInformationSystem
```

2. Install dependencies for all components (client, server, and root):
```bash
npm run install-all
```

## Running the Application

To run both the client and server concurrently:
```bash
npm start
```

To run them separately:
- For the backend server:
```bash
npm run server
```

- For the frontend client:
```bash
npm run client
```

The frontend will be available at `http://localhost:5173`
The backend API will be running at `http://localhost:3000`

## Project Structure

```
StudentInformationSystem/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── data/            # JSON files for data storage
│   └── index.js          # Server entry point
└── package.json          # Root dependencies and scripts
```

## Data Storage

The application uses a file-based storage system where data is stored in JSON files:
- `data/students.json` - Student records
- `data/courses.json` - Course information
- `data/grades.json` - Grade records
- `data/users.json` - User accounts and authentication data

## API Documentation

The API endpoints are organized around the following resources:
- `/api/auth` - Authentication endpoints
- `/api/students` - Student management
- `/api/courses` - Course management
- `/api/grades` - Grade management
- `/api/users` - User management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

Project Link: [repository-url]