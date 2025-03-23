const path = require('path');

const config = {
    STUDENTS_DB_FILE: path.join(__dirname, '..', 'data', 'students.json'),
    USERS_DB_FILE: path.join(__dirname, '..', 'data', 'users.json')
};

module.exports = config; 