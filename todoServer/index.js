const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });

const express = require('express');
const cors = require('cors');
const dbconnection = require('./config/dbconnection');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/add', (req, res) => {
    const data = req.body;
    dbconnection.query('INSERT INTO tasks SET ?', data, (err, result, fields) => {
        err?res.send(err):res.send(result);
    });
});

app.get('/tasks', (req, res) => {
    dbconnection.query('SELECT * FROM tasks',(err, result) => {
        err?res.send(err):res.send(result);
    }); 
});

app.post('/taskComplete', (req, res) => {
    const data = req.body;
    dbconnection.query(`UPDATE tasks SET status='complete' WHERE ?`, data, (err, result) => {
        err?res.send(err):res.send(result);
    });
});

app.post('/deleteTask', (req, res) => {
    const data = req.body;
    dbconnection.query('DELETE FROM tasks WHERE ?', data, (err, result) => {
        err?res.send(err):res.send(result);
    });
});

app.post('/editTask', (req, res) => {
    // const data = req.body;
    dbconnection.query(`UPDATE tasks SET task=? WHERE taskID=?`, [req.body.task, req.body.taskID], (err, result) => {
        err?res.send(err):res.send(result);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);