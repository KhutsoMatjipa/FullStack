const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const bodyparser = require('body-parser');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

var app = express();
app.use(bodyparser.json());
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'minedb'
})

con.connect((err) => {
    if (!err) {
        console.log("DB connection succeded");
    }
    else {
        console.log("Connected!");
        con.query("CREATE DATABASE minedb", function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });

        var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Table created");
        });
    }
});

app.listen(3000, () => console.log('Express server is running at port 3000'));

//GET all Boreholes
app.get('/boreholes', (req, res) => {
    con.query('SELECT * FROM Boreholes', (err, rows, field) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
})

//GET a Borehole
app.get('/borehole/:id', (req, res) => {
    con.query('SELECT * FROM Boreholes WHERE borehole_id = ?', [req.params.id], (err, rows, field) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
})

//DELETE a Borehole
app.delete('/borehole/:id', (req, res) => {
    con.query('DELETE FROM Boreholes WHERE borehole_id = ?', [req.params.id], (err, rows, field) => {
        if (!err) {
            res.send('Deleted successfully');
        }
        else {
            console.log(err);
        }
    });
})