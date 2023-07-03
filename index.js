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

//Post api for login
app.post('/login', (req, res) => {

    const { userName } = req.body;
    const { password } = req.body;

    connection.connect()
    connection.query(`Select userID from users where userName = "${userName}" && password = "${password}"`, (error, result) => {
        console.log(result)
        if (result.length == 0) {
            res.status(400).send({ result: 'Invalid Input' })
        } else {
const val=result[0]
            res.status(200).send({
                val
            })

        }

    })

})

//Get api for the list of book
var value
app.get('/books/:id', (req, res) => {

    const fetchID = req.params.id
    connection.connect()
    connection.query(`SELECT books.bookID as bookID, books.bookName as bookName, data.selected as selected FROM books INNER JOIN data ON books.bookID=data.bookID where data.userID=${fetchID};`, (err, result) => {
        value = result

        console.log("List of avaliable books...")
        console.log(value)

        res.status(200).send({
            value
        })

    })

});

//Put api for data update
app.put('/updateList/:id', (req, res) => {

    const fetchID = req.params.id
    const { bookID } = req.body;

    console.log("BookID, that needs to be updated: " + bookID)

    connection.connect()
    connection.query(`UPDATE data SET selected = true WHERE bookID=${bookID} AND userID=${fetchID}`, (error, result) => {

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

To create models
npm i mongoose
*/