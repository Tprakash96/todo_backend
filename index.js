const express = require('express')
const app = express();
const mysql = require('mysql');
var cors = require('cors');
var myParser = require("body-parser");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Ax1m$0ft@o!7',
    database: 'todo'
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

connection.query('SELECT * FROM users_list', (err, rows) => {
    if (err) throw err;
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/createUser', (req, res) => {
    const reqData = req.body;
    const values = [];
    values.push(reqData.user_name, reqData.email, reqData.password);
    console.log(values);
    const sql = 'INSERT INTO users_list(users_name,user_email,password,active) VALUES("' + reqData.user_name + '","' + reqData.email + '","' + reqData.password + '",0)';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
    });
    res.send("server detected");
})

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});