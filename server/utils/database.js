const fs = require('fs');
const config = require('../config/database');

class Database {
    constructor() {
        this.students = [];
        this.users = [];
    }

    loadDatabases() {
        this.loadStudentsDatabase();
        this.loadUsersDatabase();
    }

    loadStudentsDatabase() {
        try {
            if (fs.existsSync(config.STUDENTS_DB_FILE)) {
                const data = fs.readFileSync(config.STUDENTS_DB_FILE, 'utf8');
                this.students = JSON.parse(data);
                console.log('✅ Students loaded:', this.students.length, 'records');
            } else {
                console.log('📝 No students file found, creating empty database');
                this.saveStudentsDatabase();
            }
        } catch (error) {
            console.error('❌ Error loading students:', error.message);
        }
    }

    loadUsersDatabase() {
        try {
            if (fs.existsSync(config.USERS_DB_FILE)) {
                const data = fs.readFileSync(config.USERS_DB_FILE, 'utf8');
                this.users = JSON.parse(data);
                console.log('✅ Users loaded:', this.users.length, 'records');
            } else {
                console.log('📝 No users file found, creating empty database');
                this.saveUsersDatabase();
            }
        } catch (error) {
            console.error('❌ Error loading users:', error.message);
        }
    }

    saveStudentsDatabase() {
        try {
            const data = JSON.stringify(this.students, null, 2);
            fs.writeFileSync(config.STUDENTS_DB_FILE, data);
            console.log('💾 Students saved to file');
        } catch (error) {
            console.error('❌ Error saving students:', error.message);
        }
    }

    saveUsersDatabase() {
        try {
            const data = JSON.stringify(this.users, null, 2);
            fs.writeFileSync(config.USERS_DB_FILE, data);
            console.log('💾 Users saved to file');
        } catch (error) {
            console.error('❌ Error saving users:', error.message);
        }
    }

    getStudents() {
        return this.students;
    }

    getUsers() {
        return this.users.map(({ password, ...user }) => user);
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudentsDatabase();
        return student;
    }

    updateStudent(idNumber, updatedStudent) {
        const index = this.students.findIndex(student => student.idNumber === idNumber);
        if (index === -1) return null;
        
        this.students[index] = updatedStudent;
        this.saveStudentsDatabase();
        return updatedStudent;
    }

    deleteStudent(idNumber) {
        const initialLength = this.students.length;
        this.students = this.students.filter(student => student.idNumber !== idNumber);
        
        if (this.students.length === initialLength) return false;
        
        this.saveStudentsDatabase();
        return true;
    }

    addUser(user) {
        this.users.push(user);
        this.saveUsersDatabase();
        const { password, ...safeUser } = user;
        return safeUser;
    }

    updateUser(userId, updatedUser) {
        const index = this.users.findIndex(user => user.userId === userId);
        if (index === -1) return null;
        
        this.users[index] = updatedUser;
        this.saveUsersDatabase();
        const { password, ...safeUser } = updatedUser;
        return safeUser;
    }

    deleteUser(userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter(user => user.userId !== userId);
        
        if (this.users.length === initialLength) return false;
        
        this.saveUsersDatabase();
        return true;
    }

    validateUser(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (!user) return null;
        
        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}

module.exports = new Database(); 