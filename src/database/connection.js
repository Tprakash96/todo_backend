const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Ax1m$0ft@o!7',
    database: 'todo'
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;