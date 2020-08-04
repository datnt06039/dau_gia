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

var con = mysql.createConnection({
    host: '34.87.83.81',
    user: 'tddakk',
    password: '0mqMw0Gis8I5zi2v',
    database: 'semo_2.0',
    port: '3306'
})

const selectAllFruit = function (req, res) {
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

const insertNewFruit = function (req, res) {
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

const deleteFruit = function (req, res) {
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

const insertNewInformationOfFruit = function (req, res) {
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
    getConnection().query(queryString, [user_id, fruit_id, address_id, title, weight, fruit_pct, sugar_pct, weight_avg, diameter_avg, price_init, price_step, price_cur, status], (err, rows, fields) => {
        if (err) {
            console.log("faild to query for loai qua" + err)
            res.sendStatus(500)
            return
        }
        console.log("insert a new loaiqua with id:" + rows.insertedId)
        getConnection.end()
    })
}

//Screen name: Review product - 1
//Function name: adminReview
//Description: Get product information by product id for admin to review
//Created by: HaPTH
exports.adminReview = function (req, res) {
    const productId = req.params.productId
    console.log('Get infomation about a post by id = ' + productId)
    var queryStr = "SELECT p.id, p.user_id, u.name, fruit_id, address_id, title, weight, fruit_pct, sugar_pct, weight_avg, diameter_avg, price_init, price_step, price_cur, p.status, p.date_created "
        + " FROM `semo_2.0`.product p"
        + " left join `semo_2.0`.user u"
        + " on p.user_id = u.id"
        + " where p.id = ? "
    con.query(queryStr, [productId],
        function (err, rows) {
            if (rows === undefined) {
                console.log('Error rows is undefined')
            } else {
                res.json(rows)
            }
        })
    //con.end()
}

//Screen name: Dashboard - 1
//Function name: reviewPost
//Description: Admin review the product and send comment
//Created by: HaPTH
exports.reviewPost = function (req, res) {
    var product_id = null;
    var admin_id = null;
    var weight = null;
    var fruit_pct = null;
    var sugar_pct = null;
    var weight_avg = null;
    var diameter_avg = null;
    var price_int = null;
    var price_step = null;
    var title = null;
    var notes = null;
    var date_created = null;
    if (req.body.product_id != '') {
        console.log('product_id: ' + req.body.product_id)
        product_id = parseInt(req.body.product_id)
    }
    if (req.body.admin_id != '') {
        admin_id = parseInt(req.body.admin_id)
    }
    if (req.body.weight != '') {
        weight = parseFloat(req.body.weight)
    }
    if (req.body.fruit_pct != '') {
        fruit_pct = parseFloat(req.body.fruit_pct)
    }
    if (req.body.sugar_pct != '') {
        sugar_pct = parseFloat(req.body.sugar_pct)
    }
    if (req.body.weight_avg != '') {
        weight_avg = parseFloat(req.body.weight_avg)
    }
    if (req.body.diameter_avg != '') {
        diameter_avg = parseFloat(req.body.diameter_avg)
    }
    if (req.body.price_int != '') {
        price_int = parseFloat(req.body.price_int)
    }
    if (req.body.price_step != '') {
        price_step = parseFloat(req.body.price_step)
    }
    if (req.body.title != '') {
        title = req.body.title
    }
    if (req.body.notes != '') {
        notes = req.body.notes
    }
    if (req.body.date_created != '') {
        date_created = req.body.date_created
    }
    var obj = new product_update_request(product_id, admin_id, title, weight, fruit_pct, sugar_pct, weight_avg
        , diameter_avg, price_int, price_step, notes, date_created);
    var queryStr = "INSERT INTO `semo_2.0`.`product_update_request`(`product_id`,`admin_id`,`title`,`weight`,`fruit_pct`,`sugar_pct`,`weight_avg`,`diameter_avg`,`price_int`,`price_step`,`notes`,`date_created`)"
        + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?) ;"
    con.query(queryStr, [obj.product_id, obj.admin_id, obj.title, obj.weight, obj.fruit_pct, obj.sugar_pct, obj.weight_avg
        , obj.diameter_avg, obj.price_int, obj.price_step, obj.notes, obj.date_created],
        (err, results, fields) => {
            if (err) {
                console.log("faild to insert into table product_update_request: " + err)
                res.sendStatus(500)
                return
            }
            res.json("Row inserted:" + results.affectedRows)
        })

    //con.end()
}

const product_update_request = class {
    constructor(product_id, admin_id, title, weight, fruit_pct, sugar_pct, weight_avg
        , diameter_avg, price_int, price_step, notes, date_created) {
        this.product_id = product_id;
        this.admin_id = admin_id;
        this.title = title;
        this.weight = weight;
        this.fruit_pct = fruit_pct;
        this.sugar_pct = sugar_pct;
        this.weight_avg = weight_avg;
        this.diameter_avg = diameter_avg;
        this.price_int = price_int;
        this.price_step = price_step;
        this.notes = notes;
        this.date_created = date_created;
    }
}

//Screen name: Dashboard - 1
//Function name: getAllProduct
//Description: Get all product for displaying
//Created by: HaPTH
exports.getAllProduct = function (req, res) {
    console.log('Function getAllProduct: Get all product information')

    var queryStr = "SELECT distinct p.fruit_id, p.title as 'Tiêu đề', f.title as 'fruit_name', u.name, p.date_created, p.status"
        + " FROM `semo_2.0`.product p"
        + " left join `semo_2.0`.fruit f on p.fruit_id = f.id"
        + " left join `semo_2.0`.user u on p.user_id = u.id"
    con.query(queryStr,
        function (err, rows) {
            if (rows === undefined) {
                console.log('Error rows is undefined')
            } else {
                console.log('rows length = ' + Object.keys(rows).length)
                res.json(rows)
            }
        })
    //con.end()
}

//Screen name: Dashboard - 1
//Function name: reviewPostById
//Description: Get product information by product id
//Created by: HaPTH
exports.reviewPostById = function (productId, req, res) {
    console.log('Function getAllProduct: Get all product information')

    var queryStr = "SELECT distinct p.fruit_id, p.title as 'Tiêu đề', f.title as 'fruit_name', u.name, p.date_created, p.status"
        + " FROM `semo_2.0`.product p"
        + " left join `semo_2.0`.fruit f on p.fruit_id = f.id"
        + " left join `semo_2.0`.user u on p.user_id = u.id where p.id = ?"
    con.query(queryStr, [productId],
        function (err, rows) {
            if (rows === undefined) {
                console.log('Error rows is undefined')
            } else {
                console.log('rows length = ' + Object.keys(rows).length)
                res.json('rows inserted successfully: ' + Object(rows).length)
            }
        })
    //con.end()
}

//Screen name: HOME
//Function name: getTop6PostFromDb
//Description: Get top 6 products which have the most views
//Created by: HaPTH
exports.getTop6PostFromDb = function (res) {
    console.log('getTop6PostFromDb function')
    var queryStr = "select  p.id as 'product_id', a.views, media_url, p.title, p.price_cur, datediff(a.date_closure, a.date_created) 'remain_day',"
        + " p.weight, ad.province  from `semo_2.0`.product p"
        + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
        + " left join `semo_2.0`.auction a on p.id = a.product_id"
        + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
        + " order by a.views desc"
        + " limit 6"

    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log('select data successfully, results: ' + results)
        res.json(results)
    })
    //con.end()
}

//Screen name: HOME - 1
//Function name: getFruits
//Description: Get all kind of fruits, order by date created
//Created by: HaPTH
exports.getFruits = function (req, res) {
    console.log('Access function getFruits')
    var queryStr = "SELECT id, title, icon_url FROM `semo_2.0`.fruit"
        + " order by date_created desc"
    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Exception: ' + err)
            //con.end()
        }
        res.json(results)
        //con.end()
    })
}

//Screen name: HOME - 1
//Function name: getNewestPost
//Description: Get top 6 newest posts, order by date created descending
//Created by: HaPTH
exports.getNewestPosts = function (res) {
    console.log('Access function getNewestPost')
    var queryStr = "select  p.id as 'product_id', a.views, media_url, p.title, p.price_cur, datediff(a.date_closure, a.date_created) 'remain_day', "
    + " p.weight, ad.province  from `semo_2.0`.product p"
    + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
    + " left join `semo_2.0`.auction a on p.id = a.product_id"
    + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
    + " where display_first = 1 and auction_status = 1"
    + " order by a.date_created desc"
    + " limit 6"

    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log('select data successfully, results: ' + results)
        res.json(results)
    })

}

//Screen name: HOME - 1
//Function name: getNewestPost
//Description: Get Get oldest post, order by date created ascending
//Created by: HaPTH
exports.getOldestPost = function (res) {
    console.log('Access function getOldestPost')
    var queryStr = "select  p.id as 'product_id', a.views, media_url, p.title, p.price_cur, datediff(a.date_closure, a.date_created) 'remain_day', "
    + " p.weight, ad.province  from `semo_2.0`.product p"
    + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
    + " left join `semo_2.0`.auction a on p.id = a.product_id"
    + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
    + " where display_first = 1 and auction_status = 1"
    + " order by a.date_created asc"
    + " limit 6"

    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log('select data successfully, results: ' + results)
        res.json(results)
    })

}

//Screen name: UserInfo - 1
//Function name: getPostedProduct
//Description: List all products which user created
//Created by: HaPTH
exports.getPostedProduct = function (res) {
    console.log('Access function getPostedProduct')
    var queryStr = "select p.id as 'product_id', a.views, media_url, p.title, p.price_cur, a.date_created,"
        + " p.weight, ad.province  from `semo_2.0`.product p"
        + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
        + " left join `semo_2.0`.auction a on p.id = a.product_id"
        + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
        + " order by a.date_created desc"

    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log('select data successfully, results: ' + results)
        res.json(results)
    })
}

//Screen name: UserInfo - 1
//Function name: pagingPostedProduct
//Description: List all products which user created
//Param(s): current page
//Created by: HaPTH
exports.pagingPostedProduct = function (req, res) {
    var currentPage = req.params.currentPage
    
    console.log(currentPage )
    var recordPerPage = 3
    var ignoreNumRows = currentPage*recordPerPage + 1
    if (currentPage == 1) {
        ignoreNumRows = 0
    }
    console.log('Access function getPostedProduct')
    var queryStr = "select p.id as 'product_id', a.views, media_url, p.title, p.price_cur, a.date_created,"
        + " p.weight, ad.province  from `semo_2.0`.product p"
        + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
        + " left join `semo_2.0`.auction a on p.id = a.product_id"
        + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
        + " order by p.id asc"
        + " limit ? offset ?"
        
        console.log(currentPage )
        // res.json(currentPage)

    con.query(queryStr, [recordPerPage, ignoreNumRows],
        function (err, results) {
            if (err) {
                throw err
                console.log('Error ocurr when access the database, err message: ' + err)
                //con.end()
            }
            console.log('select data successfully, results: ' + results)
            res.json(results)
        })
}

//Screen name: UserInfo - 1
//Function name: searchProductByName
//Description: Search product by name
//Created by: HaPTH
exports.searchProductByName = function (req, res) {
    var productName = req.params.productName
    console.log('Access function searchProductByName')
    var queryStr = "select p.id as 'product_id', a.views, media_url, p.title, p.price_cur, a.date_created,"
        + " p.weight, ad.province  from `semo_2.0`.product p"
        + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
        + " left join `semo_2.0`.auction a on p.id = a.product_id"
        + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
        + " where p.title like '%" + productName + "%'"
        + " order by a.date_created desc"

    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log(results)
        res.json(results)
    })
}

//Screen name: UserInfo - 1
//Function name: deleteProductById
//Description: Delete a row in product table by product id
//Created by: HaPTH
exports.deleteProductById = function (req, res) {
    var productId = req.params.productId
    console.log('Access function deleteProductById')
    var queryStr = "delete from `semo_2.0`.product where `semo_2.0`.product.id = ?"
    con.query(queryStr, [productId], function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log(results.affectedRows)
        res.json(results.affectedRows)
    })
}

//Screen name: HOME - 22
//Function name: getAllBiddingProductByUserId
//Description: Get all bidding product by user id
//Created by: HaPTH
exports.getAllBiddingProductByUserId = function (req, res) {
    var userId = req.params.userId
    console.log('Access function getAllBiddingProductByUserId')
    var queryStr = "select distinct u.id as user_id, p.id as 'product_id', p.title, p.price_cur as 'current_price', datediff(a.date_closure, a.date_created) 'remain_day'"
    + " , p.weight, ad.province, a.views, "
    + " 	case when ab.amount = p.price_cur "
    + " 	then 'Bạn đang là người trả giá cao nhất' "
    + " 	else 'Bạn không phải là người trả giá cao nhất' "
    + " 	end"
    + "     as 'status'"
    + " from `semo_2.0`.user u "
    + " left join `semo_2.0`.product p on p.user_id = u.id"
    + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
    + " left join `semo_2.0`.auction a on p.id = a.product_id"
    + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
    + " left join `semo_2.0`.auction_bid ab on u.id = ab.bidder_user_id"
    + " where u.id = ? and p.status = 3"
    + " order by u.id asc"
    con.query(queryStr, [userId], function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log(results)
        res.json(results)
    })
}

//Screen name: HOME - 22
//Function name: SearchBiddingProductByTitle
//Description: Search product by name
//Created by: HaPTH
exports.SearchBiddingProductByTitle = function (req, res) {
    var userId = req.body.userId
    var productTitle =req.body.productTitle
    console.log('Access function SearchBiddingProductByTitle')
    // res.json(userId + " " + productTitle)
    var queryStr = "select distinct u.id as user_id, p.id as 'product_id', p.title, p.price_cur as 'current_price', datediff(a.date_closure, a.date_created) 'remain_day'"
    + " , p.weight, ad.province, a.views, "
    + " 	case when ab.amount = p.price_cur "
    + " 	then 'Bạn đang là người trả giá cao nhất' "
    + " 	else 'Bạn không phải là người trả giá cao nhất' "
    + " 	end"
    + "     as 'status'"
    + " from `semo_2.0`.user u "
    + " left join `semo_2.0`.product p on p.user_id = u.id"
    + " left join `semo_2.0`.product_media pm on p.id = pm.product_id"
    + " left join `semo_2.0`.auction a on p.id = a.product_id"
    + " left join `semo_2.0`.address ad on p.user_id = ad.user_id"
    + " left join `semo_2.0`.auction_bid ab on u.id = ab.bidder_user_id"
    + " where u.id = ? and p.status = 3 and p.title like '%"  + productTitle +"%'"
    + " order by u.id asc"
    con.query(queryStr, [userId], function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
            //con.end()
        }
        console.log(results)
        res.json(results)
    })
}

//Screen name: UserInfo - 1, UserInfo - 3
//Function name: PagingProduct
//Description: List all products which user created
//Param(s): current page
//Created by: HaPTH
exports.PagingProduct = function (productList,req, res) {
    console.log('Access function PagingProduct')
    var destinationPage = req.params.destinationPage
    var recordPerPage = req.params.recordPerPage
    var elementFrom = (destinationPage-1) * recordPerPage
    var elementTo = (destinationPage-1) * recordPerPage + recordPerPage - 1

    var getRows = [{}];
    for(var i = elementFrom; i < Object.keys(productList).length && i <= elementTo; i++){
        getRows.push(productList[i]);
    }
    res.json(getRows)
}

//=============================//
//===Sản phẩm bạn mua==========//
//=============================//

//Screen name: UserInfo - 3
//Function name: getAllBiddedProduct
//Description: List all products which user created
//Param(s): userId
//Created by: HaPTH
exports.getAllBiddedProduct = function(req, res){
    var userId = req.params.userId
    console.log('Access function getAllBiddedProduct')
    var queryStr = "select distinct u.id as user_id, p.id as 'product_id', p.title, p.price_cur as 'current_price', datediff(a.date_closure, a.date_created) 'remain_day'"
    +" , p.weight, ad.province, a.date_created, p.status"
    +" from `semo_2.0`.user u "
    +" left join `semo_2.0`.product p on p.user_id = u.id"
    +" left join `semo_2.0`.product_media pm on p.id = pm.product_id"
    +" left join `semo_2.0`.auction a on p.id = a.product_id"
    +" left join `semo_2.0`.address ad on p.user_id = ad.user_id"
    +" left join `semo_2.0`.auction_bid ab on u.id = ab.bidder_user_id"
    +" where u.id = ? and p.status = 4 or p.status = 5"
    +" order by a.date_created desc"
    con.query(queryStr, [userId], function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
        }
        console.log(results)
        res.json(results)
    })
}

//Screen name: UserInfo - 3
//Function name: searchInBiddedProduct
//Description: Search product by product tilte from bidded product
//Param(s): userId, productTitle
//Created by: HaPTH
exports.searchInBiddedProduct = function(req, res){
    var userId = req.body.userId
    var productTitle = req.body.productTitle
    console.log('Access function searchInBiddedProduct')
    var queryStr = "select distinct u.id as user_id, p.id as 'product_id', p.title, p.price_cur as 'current_price', datediff(a.date_closure, a.date_created) 'remain_day'"
    +" , p.weight, ad.province, a.date_created, p.status"
    +" from `semo_2.0`.user u "
    +" left join `semo_2.0`.product p on p.user_id = u.id"
    +" left join `semo_2.0`.product_media pm on p.id = pm.product_id"
    +" left join `semo_2.0`.auction a on p.id = a.product_id"
    +" left join `semo_2.0`.address ad on p.user_id = ad.user_id"
    +" left join `semo_2.0`.auction_bid ab on u.id = ab.bidder_user_id"
    +" where u.id = ? and (p.status = 4 or p.status = 5)  and p.title like '%" + productTitle + "%'"
    +" order by a.date_created desc"
    con.query(queryStr, [userId], function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
        }
        console.log(results)
        res.json(results)
    })
}


//Screen name: None
//Function name: selectFromDepositById
//Description: Get row from deposit table by id
//Param(s): None
//Created by: HaPTH
exports.selectFromDepositById = function(req, res){
    var depositId = req.params.depositId
    console.log('Access function selectFromDepositById')
    var queryStr = "SELECT * FROM `semo_2.0`.deposit where id like '%"+ depositId +"%'"
    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
        }
        console.log(results)
        res.json(results)
    })
}

//Screen name: None
//Function name: selectAllFromDeposit
//Description: Get all row from deposit table
//Param(s): None
//Created by: HaPTH
exports.selectAllFromDeposit = function(req, res){
    var depositId = req.params.depositId
    console.log('Access function selectAllFromDeposit')
    var queryStr = "SELECT * FROM `semo_2.0`.deposit"
    con.query(queryStr, function (err, results) {
        if (err) {
            throw err
            console.log('Error ocurr when access the database, err message: ' + err)
        }
        console.log(results)
        res.json(results)
    })
}

//Screen name: None
//Function name: insertRowsDepositTable
//Description: Insert many row into deposit table
//Param(s): None
//Created by: HaPTH
exports.insertRowsDepositTable = function(req, res){
    var queryGetMaxId = "select max(id) from `semo_2.0`.deposit"
    var depositId;
    con.query(queryGetMaxId, function(err, result){
        if(err){
            console.log('Error ocurr when access the database, err message: ' + err)
            throw err
        }
        depositId = result[0]['max(id)'] + 1;
    }) 
    console.log(depositId)

    // res.json(depositId)

    ////Insert new row
    // var insertQueryStr = "INSERT INTO `semo_2.0`.`deposit`(`id`,`src_wallet_id`,`product_id`,`amount`,`notes`,`date_created`)"
    // + " VALUES(?,1,1,100000,'Note 11','2020/07/2 22:22:00') "
    // con.query(insertQueryStr, [depositId],
    //     function(err, result){
    //         if(err){
    //             console.log('Error ocurr when access the database, err message: ' + err)
    //             throw err
    //         }
    //         console.log(result.affectedRows)
    //         res.json(result.affectedRows)
    //     })
}

module.exports.insertNewInformationOfFruit = insertNewInformationOfFruit
module.exports.insertNewFruit = insertNewFruit
module.exports.selectAllFruit = selectAllFruit