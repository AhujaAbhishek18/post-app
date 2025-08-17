const express=require("express")
const app=express();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const path=require('path')
const usermodel=require('./models/user')
const cookieparser=require('cookie-parser');

app.set('view engine',"ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieparser());

app.get("/",(req,res)=>{
  res.render("index")
})
app.post("/register", async (req,res)=>{
  let {email,username,password,name,age}=req.body;
  let user=await usermodel.findOne({email:email});
 
  if(user){
    console.log("2")
    return res.status(500).send("user already registered") 
  }
   
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
      const usercreated=await usermodel.create({
        username,
        age,
        email,
        name,
        password:hash
      })
    })
  })


})
app.listen(3000);