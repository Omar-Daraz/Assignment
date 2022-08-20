const express = require('express')
const router = express.Router()

const {addProduct, listAllProducts, editProduct, deleteProduct,findProduct,filterProduct} = require("../controllers/productController")

router.post("/add",addProduct)

router.get("/getProductById/:productId",findProduct)

router.get("/getProductByCategory/:category",filterProduct)

router.get("/listall",listAllProducts)

router.patch("/edit/:productId",editProduct)

router.delete("/delete/:productId",deleteProduct)

module.exports = router