const mod = require('./module')
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))

app.get('/selectAllFruit', (req, res) => {
    mod.selectAllFruit(req, res)
})

app.get('/insertNewFruit', (req, res) => {
    mod.insertNewFruit(req, res)
})


app.get('/insertNewInformationOfFruit', (req, res) => {
    mod.insertNewInformationOfFruit(req, res)
})

app.listen(3003)

