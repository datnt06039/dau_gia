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

app.use(express.static('./public'))
app.set('view engine', 'ejs')

app.get('/sendApprovement/:admin_id', (req, res) => {
    res.json(req.params.admin_id)
    console.log("admin_id: " + req.params.admin_id)
})

app.get('/AdminReview/:productId', (req, res) => {
    mod.adminReview(req, res)
    res.sendfile('./public/ReviewPost.html')
})
app.get('/', (req, res) => {
    // const productId = req.params.productId
    // mod.adminReview(productId, req, res)
    res.sendfile('./public/ReviewPost.html')
})

app.get('/getTop6Post', (req, res)=>{
    mod.getTop6PostFromDb(res);
})

app.get('/loaiQua', (req, res)=>{
    mod.getFruits(req, res);
})

app.get('/newestPosts', (req, res)=>{
    mod.getNewestPosts(res);
})

app.get('/oldestPosts', (req, res)=>{
    mod.getOldestPost(res);
})
app.post('/ReviewPost', (req, res) => {
    mod.reviewPost(req, res);
    console.log('Review post done! :p')
})

// const product_update_request = class {
//     constructor(product_id, admin_id, title, weight, fruit_pct, sugar_pct, weight_avg
//         , diameter_avg, price_int, price_step, notes, date_created) {
//         this.product_id =product_id;
//         this.admin_id = admin_id;
//         this.title = title;
//         this.weight =weight;
//         this.fruit_pct = fruit_pct;
//         this.sugar_pct = sugar_pct;
//         this.weight_avg = weight_avg;
//         this.diameter_avg = diameter_avg;
//         this.price_int = price_int;
//         this.price_step = price_step;
//         this.notes = notes;
//         this.date_created = date_created;
//     }
// }

app.get('/?id', (req, res) => {
    const id = req.params.id;
    console.log("eeee id: " + id);
})

app.get('/PostDashboard', (req, res) => {
    const productId = req.params.productId
    mod.getAllProduct(req, res)
})

app.get('/userInfo/postedProducts', function(req, res){
    mod.getPostedProduct(res);
})

app.get('/pagingPostedProduct/:currentPage', (req, res)=>{
    mod.pagingPostedProduct(req, res);
})

app.get('/searchPostedProduct/:productName', (req, res)=>{
    mod.searchProductByName(req, res);
})

app.get('/deleteProductById/:productId', (req, res)=>{
    mod.deleteProductById(req, res);
})

//============================================//
//======== APIs for HOME-22 screen ===========//
//============================================//

//Get all bidding product by user id
app.get('/GetAllBiddingProduct/:userId', (req, res)=>{
    mod.getAllBiddingProductByUserId(req, res);
})

//Search product by name
app.post('/SearchBiddingProductByTitle', (req, res)=>{
    mod.SearchBiddingProductByTitle(req, res);
})

//Search product by name
app.get('/SearchByProductTitle.html', (req, res)=>{
    // app.render('./SearchByProductTitle')
})

//Get all bidding product by user id
app.get('/PagingForBiddingProduct/:currentPage', (req, res)=>{
    mod.PagingForBiddingProduct(req, res);
})

app.listen(3003)
