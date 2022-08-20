const Cart = require('../models/Cart')

module.exports.addItem = (req,res)=>{
	const userId = req.params.userId
	const {_id,
			name,
			price,
			color,
			imageUrl,
			}=req.body
	Cart.findOne({userId},function(err,doc){
		if(err)  return  res.json(err.message)
		if(doc){
			const index = doc.items.findIndex(item=>item.productId === _id)
			doc.totalAmount=doc.totalAmount+parseFloat(price)
			// console.log("doc items",doc.items)
			// console.log("index",index)
			if(index>=0){
				doc.items[index].productQty = doc.items[index].productQty+1
			}
			else{
				const newItem = {
					productId:_id,
					productQty:1,
					name,
					price,
					color,
					imageUrl,

				}
				doc.items.push(newItem)

			}
			doc.save(function(err,result){
				if(err)  return  res.json(err.message)
				// console.log("results:",result)
				const index1 = result.items.findIndex(item=>item.productId === _id)
				 return  res.json(result.items[index1])
			})
			// console.log("DOC",doc)
			//  return res.json(doc)
		}
		else{
			const newItem = [{
				productId:_id,
				productQty:1,
				name,
				price,
				color,
				imageUrl,
			}]
			const totalAmount = parseFloat(price)
			// console.log("Item Added")
			const newItemInCart = new Cart({
				userId,
				totalAmount,
				items:newItem
			})
			newItemInCart.save(function(err,result){
				if(err)  return  res.json(err.message)
				// console.log("Items::",result.items)
				 return res.json(result.items[0])
			})
			//  return  res.json(newItem)
		}
		
	})


}

module.exports.listAllItems = (req,res)=>{
	const userId = req.params.userId
	Cart.findOne({userId},function(err,doc){
		if(err)  return  res.json(err.message)
		// console.log("result",doc)
		 return res.json(doc)
	})
}

module.exports.removeItem = (req,res)=>{
	const userId = req.params.userId
	const itemId = req.params.itemId
	Cart.findOne({userId},function(err,doc){
		if(err)  return  res.json(err.message)

		const index = doc.items.findIndex(d=>d.productId == itemId)
		// console.log("Index",index)
		if(index>=0){
			doc.totalAmount = doc.totalAmount - (doc.items[index].price)*(doc.items[index].productQty)
			doc.items.splice(index,1)
			doc.save(function(err,result){
			if(err)  return  res.json(err.message)
			 return res.json(result)
		})
		}

		
	})
}

module.exports.updateItem = (req,res)=>{
	const userId = req.params.userId
	const itemId = req.params.itemId
	const qty = req.body.qty
	// console.log("userId",userId)
	// console.log("itemId",itemId)
	// console.log("type",type)
	Cart.findOne({userId},function(err,doc){
		if(err)  return  res.json(err.message)
		
		const index = doc.items.findIndex(d=>d.productId== itemId)
		if(index>=0 && qty>doc.items[index].productQty){
			doc.items[index].productQty = qty;
			doc.totalAmount = doc.items[index].price * qty
			
		}
		
		else if(index>=0 && qty < doc.items[index].productQty && doc.items[index].productQty>1){
			doc.items[index].productQty =qty
			doc.totalAmount =doc.items[index].price * qty
		}
		
		doc.save(function(err,result){
			if(err)  return  res.json(err.message)

			 return res.json(result)
		})
	})
}

module.exports.removeAllItems = async (req,res)=>{
	const userId = req.params.userId
	const result = await Cart.deleteMany({userId})
	// console.log("result at deleteMany",result)
	 return res.json(result)

}
