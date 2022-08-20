const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
	userId:{
		type:String
	},
	order:[
		{
			totalAmount:{
				type:String
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
				},
				description:{
					type:String,
					
				}
				
			}
		],
			contact:{
				phoneNumber:{
					type:String
				},
				address:{
					type:String
				}
			},
			status:{
				type:String,
				enum:["Ordered","Delivered","Cancelled"],
				default:"Ordered"
			}
		
	}
	]
	
	
})

module.exports = mongoose.model('Order',OrderSchema)