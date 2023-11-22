const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
const path = require('path');
const app = express();
const port=5000;
const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user :  process.env.DATABASE_USER,
    password :  process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
})
db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('Mysql Connected...')
    }
});
//const publicDirectory = path.join(__dirname, './public');
//app.set('view engine', 'hbs');
//app.use(express.static(publicDirectory));
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/profile', (req, res) => {
    res.render('profile', { title: 'My Express App' });
});
app.get('/register', (req, res) => {
    res.render('register', { title: 'My Express App' });
});
app.get('/', (req, res) => {
    res.render('home', { title: 'My Express App' });
});

app.listen (port, () => {console.log (`Server started on port ${port}`);})