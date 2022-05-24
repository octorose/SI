const express = require('express');
//const fileupload = require("express-fileupload");
const cors = require("cors");
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser');
const { read } = require('fs');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "CRUDDB"
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

app.post('/register', (req, res) => {

    const email = req.body.emailreg;
    const password = req.body.passwordreg;

     const sql = "INSERT INTO users (email, password) VALUES (?,?)"
    db.query(sql,[email, password],
    (err, result) => {
      console.log(err);
    })
});
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

     const sql = "SELECT * FROM users WHERE email = ? AND password = ?;"
    db.query(sql,[email, password],
    (err, result) => {
        if (err) {  
            res.send({message: "fiw"})
        }
        if(result.length > 0){
            // console.log(result);
            res.send(result);
        }else{
            res.send({message: "wrong username or password"});
        }
    })
});
// app.post('/registerorder', (req, res) => {

//     const email = req.body.emailord;
//     const password = req.body.passwordord;

//      const sql = "INSERT INTO users (email, password) VALUES (?,?)"
//     db.query(sql,[email, password],
//     (err, result) => {
//       console.log(err);
//     })
// });

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter=(req, file, cb) =>{
    if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'){
        callBack(null, true);
    }else{
    callBack(new Error('Unsupported files'), false);
    }
}
 
var upload = multer({
    storage: storage,
    limits : {
        fileSize : 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

//@type   POST
//route for post data
app.post("/upload", (req, res) => {
    var type = "";
    var price = "";
    nameorder  = req.body.name;
    phonenumberorder = req.body.phonenumber;
    emailorder = req.body.email;
    Productsorder = req.body.Products;
    fileorder = req.body.file;
    Quantity = req.body.Quantity;
    // response = req.body.response;


    // console.log(nameorder);
    // console.log(phonenumberorder);
    // console.log(emailorder);
        if (Productsorder == "30") {
            type = "Flayer";
            price = 30 * Quantity;
    }
        else if (Productsorder == "15") {
            type = "Paper";
            price = 15 * Quantity;
    }
        else if (Productsorder == "7") {
            type = "Business card";
            price = 7 * Quantity;
    }
        else if (Productsorder == "130") {
            type = "Poster";
            price = 130 * Quantity;
    };
    // // console.log(Productsorder);
    // console.log(type);
    // console.log(fileorder);
    // console.log(Quantity);
    // console.log(price);
    const sql = "INSERT INTO commandes (nameorder, phonenumberorder,emailorder, type, Quantity, fileorder, price) VALUES (?,?,?,?,?,?,?);"
    db.query(sql,[nameorder, phonenumberorder,emailorder, type, Quantity, fileorder, price],
    (err, result) => {
        if (err) {  
                res.send({ message: "commande non effectuée" });  
                  
        }
        if (result){
            // console.log(result);
            res.send({ message: "commande effectuée" })
        }else {
            
            res.send({message: "commande non effectuée"});
            
        }
    })
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})