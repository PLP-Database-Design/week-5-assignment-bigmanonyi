const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


db.connect((err) => {
    if (err) {
        return console.log('ERROR CONNECTING TO DATABASE: ', err)
    }
    console.log('CONNECTION SUCCESSFUL: ', db.threadId)
})


app.get('/patients', (req, res) => {
    patient = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients`
    db.query(patient, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send(result)
    })
})

app.get('/providers', (req, res) => {
    provide = `SELECT first_name, last_name, provider_specialty FROM providers`;
    db.query(provide, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send(result)
    })
})

app.get('/firstname', (req, res) => {
    first = `SELECT first_name FROM patients`;
    db.query(first, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(400).send(result)
    })
})


app.get('/specialty', (req, res)  => {
    special =  `SELECT provider_specialty, GROUP_CONCAT(first_name SEPARATOR ', ') AS providers FROM providers
    GROUP BY provider_specialty;`
    db.query(special, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send(result)
    })
})