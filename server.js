const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'users_db', // Database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Endpoint for user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query to check user credentials
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error querying the database' });
        }
        
        if (results.length > 0) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ message: 'Invalid username or password' });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
