const express = require('express');
const mysql = require('mysql');
const app = express();
const port=5000;
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'user_auth'
})
db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('Mysql Connected...')
    }
});
app.get("/",(req, res ) =>{ res.send ("<h1>HOMEPAGE</h1>")});
app.listen (port, () => {console.log (`Server started on port ${port}`);})