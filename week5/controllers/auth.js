const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT email FROM users WHERE email = ?', [email], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      });
    });

    if (result.length > 0) {
      return res.render('register', {
        message: 'This email is already registered..'
      });
    } else if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Passwords don\'t match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    
    db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(results);
        
        return res.render('register', {
          message: 'User registered successfully!'
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ?', [email], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result[0]);
      });
    });

    if (!user) {
      return res.render('login', {
        message: 'User not found. Please register.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('login', {
        message: 'Incorrect password. Please try again.'
      });
    }

    // Store the user data in the session
    req.session.user = user;

    // Redirect to the profile page
    res.redirect('/profile');

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.logout = (req, res) => {

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      
      res.redirect('/');
    }
  });
};
exports.profile = (req, res) => {
  
  const user = req.session.user;

  if (!user) {
    
    return res.redirect('/login');
  }
  res.render('profile', { email: user.email });
};





