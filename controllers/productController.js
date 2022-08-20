const Product = require('../models/Product')


//api of adding the product
module.exports.addProduct = (req,res)=>{
	const {name,qty,price,color,imageUrl,addDate,category,description}=req.body
	if(!(name||qty||price||color||imageUrl||addDate||category||description)){
		return res.send("Enter All the feilds");
	}
	const newProduct = new Product(req.body)
	newProduct.save(function(err,result){
		if(err) return res.json(err.message)
		return res.json(result)
	})
}

//api of showing all the products
module.exports.listAllProducts = (req,res)=>{
	Product.find(function(err,result){
		if(err) return res.json(err.message)
		return res.json(result)
	})
}

module.exports.editProduct = (req,res)=>{

	const productId = req.params.productId
	Product.findOneAndUpdate({_id:productId}, req.body, {upsert: true}, function(err, result) {
    if(err) return res.json(err.message)
    
	Product.findById({_id:productId},function(err,result){
		if(err) return res.json(err.message)
    	return res.json(result)
	})
});

}

module.exports.filterProduct = (req,res)=>{
	const productCategory = req.params.category
	Product.find({category:productCategory},function(err,result){

		if(err) return res.json(err.message)
    	return res.json(result)
	});

}

module.exports.findProduct = (req,res)=>{
	const productId = req.params.productId
	Product.findById({_id:productId},function(err,result){
		if(err) return res.json(err.message)
    	return res.json(result)
	});

}

module.exports.deleteProduct = (req,res)=>{
	const productId = req.params.productId
	Product.findOneAndRemove({_id:productId},function(err,result){
		if(err) return res.json(err.message)
		// console.log("Response::",result)
		return res.json(result)
	})
}