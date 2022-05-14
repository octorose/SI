const express = require('express');
const fileupload = require("express-fileupload");
const cors = require("cors");
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hallouch",
    database: "CRUDDB"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './public/images/')     // './public/images/' directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// var upload = multer({
//     storage: storage
// });

app.post('/register', (req, res) => {

    const email = req.body.emailreg;
    const password = req.body.passwordreg;

     const sql = "INSERT INTO users (email, password) VALUES (?,?)"
    db.query(sql,[email, password],
    (err, result) => {
      console.log(err);
    })
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})