const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')



mongoose.connect("mongodb://127.0.0.1:27017/mcomm",{ useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err.message);
});




app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json())
app.get("/",(req,res)=>{
	res.send("Running")
})

app.use("/auth",userRoutes)
app.use("/product",productRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)
app.use("/payment",paymentRoutes)

app.listen(port,(req,res)=>console.log(`Server is running at ${port}`))