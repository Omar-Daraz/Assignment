const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true,
		trim:true
	},
	color:{
		type:String,
		required:true,
		trim:true
	},
	price:{
		type:String,
		required:true
	},
	qty:{
		type:String,
		required:true,
		default:1
	},
	imageUrl:{
		type:String,
		required:true
	},
	addDate:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	}
})

module.exports = mongoose.model('Product',ProductSchema)