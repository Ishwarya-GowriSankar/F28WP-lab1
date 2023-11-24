const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const secret = '1234';

dotenv.config({ path: './.env' });

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Mysql Connected...');
  }
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware to check if user is authenticated
const checkAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated && req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  
// Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

// Profile route
app.get('/profile', checkAuthenticated, (req, res) => {
  res.render('profile', { user: req.session.user });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
