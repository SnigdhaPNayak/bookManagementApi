//import of the express package
//---const app = require('express')();---
const express = require('express');
var cors = require('cors');
const app = express();
const PORT = 8080;

//To add a middleware - [To be able to get the value from the request body]
app.use(express.json())
//To enable cross origin
app.use(cors());

//To initialize it in the server
app.listen(
    PORT,
    //Call back to let us know when the api is ready 
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

//Database Connection
const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bookManagement'
})

//Get api for the list of book
var data
app.get('/books', (req, res) => {

    connection.connect()
    connection.query('select * from books;', (err, res) => {
        data = res
    })

    console.log("List of avaliable books...")
    console.log(data)

    res.status(200).send({
        data
    })

});


app.put('/updateList/1', (req, res) => {

    // const fetchID = req.params.id
    const { bookID } = req.body;

    console.log("BookID, that needs to be updated: "+bookID)

    connection.connect()
    connection.query(`UPDATE books SET selected = true WHERE bookID=${bookID};`, (error, result) => {

    })
    
    res.status(200).send({
        message: "UPDATED"
    })

})

/*  To create a project -
cretae a folder
npm init -y
npm install express

To run the project -
node .

Call back functions are being used to handle the api requests [It sends JSON object by default]

Express doesn't parse JSON in the body, by default [We need to set a middleware for it]

To add mysql packages
npm install mysql2
*/