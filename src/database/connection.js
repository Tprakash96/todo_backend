const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'Ax1m$0ft@o!7',
//     database: 'todo'
// });

const connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12303011',
    password: 'W7I75ZeCsk',
    database: 'sql12303011'
});

connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;