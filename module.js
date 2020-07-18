const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')



var getConnection = mysql.createConnection({
        host: '34.87.83.81',
        user: 'tddakk',
        password: '0mqMw0Gis8I5zi2v',
        database: 'semo_2.0',
        port: '3306'
    })

const selectAllFruit = function(req, res){
    console.log('Get all product posts')
        const queryString = "SELECT title FROM `semo_2.0`.fruit; "
        getConnection.query(queryString, (err, rows) => {
            if (err) {
                console.log("faild to query for loai qua" + err)
            }
            const loaiqua = rows.map((row) => {
                return { loaiqua: row.title }
            })
            res.json(rows)
        })
        getConnection.end()
}

const insertNewFruit = function(req, res){
        console.log("how do we get form data")
        console.log("id:" + req.body.title)
        const title = req.body.title

        const queryString = "INSERT INTO `semo_2.0`.`fruit`(title) VALUES (?);"
        getConnection().query(queryString, [title], (err, rows, fields) => {
            if (err) {
                console.log("faild to query for loai qua" + err)
                res.sendStatus(500)
                return
            }
            console.log("insert a new loaiqua with id:" + rows.insertedId)
            res.end()
        })
        getConnection.end()
}

const deleteFruit = function(req, res){
    console.log("how do we get form data")
    console.log("id:" + req.body.title)
    const title = req.body.title

    const queryString = "DELETE FROM `semo_2.0`.`fruit` WHERE <>;;"
    getConnection().query(queryString, [title], (err, rows, fields) => {
        if (err) {
            console.log("faild to query for loai qua" + err)
            res.sendStatus(500)
            return
        }
        res.end()
    })
    getConnection.end()
}

const insertNewInformationOfFruit = function(req, res){
    console.log("try to create new user ....")
        console.log("how do we get form data")
        console.log("id:" + req.body.user_id)
        console.log("id:" + req.body.fruit_id)
        console.log("id:" + req.body.address_id)
        console.log("id:" + req.body.title)
        console.log("id:" + req.body.weight)

        const user_id = req.body.user_id
        const fruit_id = req.body.fruit_id
        const address_id = req.body.address_id
        const title = req.body.title
        const weight = req.body.weight

        const connection = getConnection()

        const queryString = " INSERT INTO `semo_2.0`.`product`(user_id,fruit_id,address_id,title,weight,fruit_pct,sugar_pct,weight_avg,diameter_avg,price_init,price_step,price_cur,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        getConnection().query(queryString, [user_id,fruit_id,address_id,title,weight,fruit_pct,sugar_pct,weight_avg,diameter_avg,price_init,price_step,price_cur,status], (err, rows, fields) => {
            if (err) {
                console.log("faild to query for loai qua" + err)
                res.sendStatus(500)
                return
            }
            console.log("insert a new loaiqua with id:" + rows.insertedId)
            getConnection.end()
        })
}

module.exports.insertNewInformationOfFruit = insertNewInformationOfFruit
module.exports.insertNewFruit = insertNewFruit
module.exports.selectAllFruit = selectAllFruit