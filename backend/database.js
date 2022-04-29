const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    database:'pharm',
    user:'root',
    password:'password',
});

module.exports = connection;