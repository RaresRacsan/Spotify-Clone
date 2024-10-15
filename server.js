const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Set up SQLite database in memory
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve login.html when user accesses the /login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve register.html when user accesses the /register route
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
  });
  

  app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Check if the user already exists
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (user) {
        return res.status(400).json({ error: 'User already exists.' });
      }
  
      // Hash the password and store the new user
      const hashedPassword = bcrypt.hashSync(password, 8);
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
        if (err) {
          return res.status(500).send({ error: 'Error registering user.' });
        }
        res.status(200).send({ id: this.lastID });
      });
    });
  });
  

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: 'User not found.' });  // Respond with JSON
      }
  
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials.' });  // Respond with JSON
      }
  
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
      return res.status(200).json({ auth: true, token });
    });
  });
  

// Fallback route to send index.html for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
