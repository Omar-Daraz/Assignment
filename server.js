const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 4000


const allowedOrigins = [
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:4200',
    'http://localhost:8100',
  ];
  
  // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
  
  // Enable preflight requests for all routes
 
 app.use(cors(corsOptions))
 app.options('*', cors(corsOptions));
  
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')


mongoose.connect("mongodb+srv://omar:forbidenlove123@cluster0.b5qkeez.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    {
        console.log("Db connected")
    }
}).catch(err => {
    console.log(err.message)
})



app.use(bodyParser.json())
app.get("/", (req, res) => {
    res.send("Running")
})

app.use("/auth", userRoutes)
app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/order", orderRoutes)
app.use("/payment", paymentRoutes)

app.listen(port, (req, res) => console.log(`Server is running at ${port}`))