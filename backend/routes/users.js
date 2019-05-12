const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken");

router.post('/signup',async (req,res)=>{

let newUser = new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
});
let success
try{
    success = await newUser.save();
    if(!success) return res.send({success:0});
    res.send({success:1});
}
catch(err)
{
    res.send({success:0});
}
});

router.post('/login',async (req,res)=>{
let email = req.body.email;
let password = req.body.password;

let find =  await User.findOne({email:email});
if(!find)
    return res.send({success:0});
if(find.password!=password)
    return res.send({success:0}) ;

const token = jwt.sign({ find }, process.env.SECRET, {
        expiresIn: process.env.ONE_WEEK
      });
 return res.send({success:1 ,token:token,user:find});

});
//Moataz
router.post('/edit',async(req,res)=>{
 let success= await User.findOneAndUpdate({_id:req.body._id},{username:req.body.username,email:req.body.email,password:req.body.password});
 if(!success)
  return res.send({success:0});
 
  res.send({success:1});
});

router.post('/check',async (req,res)=>{
let filter =req.body.filter;
let data =req.body.data;
let query = {};
query[filter]=data;
let success
try{
  success =await User.findOne(query);
  if(!success)
  return res.send({found:0});
  res.send({found:1});
}
catch(err)
{
    res.send({found:0});
}

});
router.post('/changePasswordByID',async(req,res)=>{

    let success = await User.findOneAndUpdate({_id:req.body.id},{password:req.body.newPassword});
    if(!success)
    return res.send({success:'error'});
    res.send({success:'Successful'});
});

router.get('/',async (req,res) => {

    let t;
    try {
        t=await User.find({},'-password');
        let response={
            success:true,
            users:t
        };
        return res.send(response);
    }
    catch(err)
    {
        return res.send('err');
    }

});
module.exports= router;