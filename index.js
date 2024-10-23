// Importing the required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Database } = require('sqlite3');

// Initialize express app
const app = express();

// Set up the db
const db = new sqlite3.Database('./db.sqlite');

// Middleware configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret:'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 24 * 60 * 60 * 1000}
}));

// Serve static files from "view" and "public" directories
app.use(express.static('views'));
app.use(express.static('public'));

// Create "users" if it doesn't exist
db.run(`create table if not exists users (
    id integer primary key autoincrement,
    username text not null unique,
    password text not null,
    email text not null unique
)`, (err) =>{
    if(err) console.error("Error creating table!", err.message);
    else    console.log("Users table created succesfully!");
})

// Checking if the user is authentificated
function isAuthentificated(req, res, next){
    if(req.session.userId)  return next();  // if authentificated, go to next middleware
    res.redirect('/login.html');            // if not, return to login page
}

// Redirect to login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Register route
app.post('/register', async (req, res) => {
    const {username, password, email} = req.body;

    // Check if the user already exists
    db.get('select * from users where username = ? or email = ?', [username, email], async(err, row) => {
        // Error the user already has an account
        if(row) return res.redirect('/register.html?error=User already exists!');

        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(`insert into users (username, password, email) values (?, ?, ?)`, [username, hashedPassword, email], (err) => {
            // Error registering
            if(err) return res.redirect('/register.html?error=Error registering user!');

            // Successful registration
            res.redirect('/login.html?success=Registration succesfull, now you can log in!');
        });
    });
});

// Login route
app.post('/login', async(req, res) => {
    const {username, password} = req.body;

    // Find user in database
    db.get('select * from users where username = ?', [username], async(err, row) => {
        // No user with that username
        if(!row)    return res.redirect('/login.html?error=User not found!');

        const isValid = await bcrypt.compare(password, row.password);

        // Checking the entered password with the one paired to the account
        if(!isValid)    return res.redirect('/login.html?error=Incorrect password!');

        req.session.userId = row.id;
        req.session.username = row.username;

        // Redirecting to main page
        res.redirect('/main');
    });
});

// Protected main page route
app.get('/main', isAuthentificated, (req, res) => {
    res.sendFile(__dirname + '/views/main.html');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});