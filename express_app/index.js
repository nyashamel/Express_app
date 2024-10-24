const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');

});

//set up mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test123',
    database: 'express_app'
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// CRUD Operations

// GET all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
        if (err) throw err;
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// PUT (update a user)
app.put('/users/:id', (req, res) => {
    const updatedUser = req.body;
    const userId = req.params.id;
    db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully.');
    });
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', userId, (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
