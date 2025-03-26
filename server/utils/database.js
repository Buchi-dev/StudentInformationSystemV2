const fs = require('fs');
const config = require('../config/database');

class Database {
    constructor() {
        this.students = [];
        this.users = [];
    }

    loadDatabases() {
        this.loadDatabase('students', config.STUDENTS_DB_FILE);
        this.loadDatabase('users', config.USERS_DB_FILE);
    }

    loadDatabase(type, filePath) {
        try {
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                this[type] = JSON.parse(data);
                console.log(`✅ ${type} loaded:`, this[type].length, 'records');
            } else {
                console.log(`📝 No ${type} file found, creating empty database`);
                this.saveDatabase(type, filePath);
            }
        } catch (error) {
            console.error(`❌ Error loading ${type}:`, error.message);
        }
    }

    saveDatabase(type, filePath) {
        try {
            const data = JSON.stringify(this[type], null, 2);
            fs.writeFileSync(filePath, data);
            console.log(`💾 ${type} saved to file`);
        } catch (error) {
            console.error(`❌ Error saving ${type}:`, error.message);
        }
    }

    saveStudentsDatabase() {
        this.saveDatabase('students', config.STUDENTS_DB_FILE);
    }

    saveUsersDatabase() {
        this.saveDatabase('users', config.USERS_DB_FILE);
    }

    getStudents() {
        return this.students;
    }

    getUsers() {
        // return this.users.map(({ password, ...user }) => user);
        return this.users;
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