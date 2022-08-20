const User = require("../models/User")
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');

module.exports.userLogin = [
	body("email","Email is required").isEmail(),
	body("password","Minimum 5 char password is required").isLength({min:5}),
	(req,res)=>{
		// console.log("Body::",req.body)
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			// console.log("inside validation errors")
			return res.json({error:errors.errors[0].msg})
		}
		else{
			const {email,password} = req.body
			console.log(email,password)
			User.findOne({email}).exec(function(err,user){
				if(err) return  res.json(err.message)
				if(!user){
					// console.log("inside not user,",user)
					return res.json({"error":"User not found"})
				}
				else{
					// console.log("here")
					const {_id,firstName,lastName,email} = user
					bcrypt.compare(password,user.password,function(err,result){
						if(err) return  res.json(err.message)
						if(!result){
							return res.json({"error":"Invalid username or password"})
						}
						else{
							const token=jwt.sign({_id:user._id,tokenId:uuidv4()},"vikassharma")
							return res.json({token,user:{_id,firstName,lastName,email}}).status(200)
						}
					})
				}
			})
		}
	}
]

module.exports.userSignup = [
	body("firstName","Invalid firstName").not().isEmpty().trim().escape(),
	body("lastName","Invalid lastName").not().isEmpty().trim().escape(),
	body("email","Email is required").isEmail(),
	body("password","Minimum 5 char long password is required").isLength({min:5}),
	(req,res)=>{
		// console.log(req.body)
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.json({"error":errors.errors[0].msg})
		}
		else{
			const {firstName,lastName,email,password} = req.body
			User.findOne({email}).exec(function(err,user){
				if(err) return  res.json(err.message)
				if(user){
					return res.json({"error":"User already exists!"})
				}
				else{
					const newUser = new User(req.body)
					bcrypt.hash(password,10,function(err,hash){
						newUser.password=hash
						newUser.save(function(err,result){
							if(err) return  res.json(err.message)
							return res.json(result)
						})
					})
				}
			})
		}
		
	}
]

module.exports.userLogout = (req,res)=>{
	res.send("userLogout")
}
