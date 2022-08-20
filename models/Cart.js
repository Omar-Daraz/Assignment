const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
	userId:{
		type:String
	},
	totalAmount:{
		type:Number,
		default:0
	},
	items:[
		{
			productId:{
				type:String
			},
			productQty:{
				type:Number
			},
			name:{
				type:String
			},
			price:{
				type:Number
			},
			color:{
				type:String
			},
			imageUrl:{
				type:String
			},
			category:{
				type:String,
			}
		}
	]
})

module.exports = mongoose.model('Cart',CartSchema)
