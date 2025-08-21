const express=require("express")
const app=express();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const path=require('path')
const usermodel=require('./models/user')
const postmodel=require('./models/post')
const cookieparser=require('cookie-parser');

app.set('view engine',"ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieparser());

app.get("/",(req,res)=>{
  res.render("index")
})
app.get("/login",(req,res)=>{
  res.render("login")
})
app.get("/profile",isloggedin, async(req,res)=>{
  let user= await usermodel.findOne({email:req.user.email})
  console.log(user)
  res.render("profile",{user})

})
app.post("/register", async (req,res)=>{
  let {email,username,password,name,age}=req.body;
  let user=await usermodel.findOne({email:email});
 
  if(user){
   
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
      let token=jwt.sign({email:email,userid:usercreated._id},"shhhh")
      res.cookie("token",token)
      res.send("registered")
    })
  })


})
app.post("/login", async (req,res)=>{
  let {username,password}=req.body;
  let user=await usermodel.findOne({username:username});
 
  if(!user){
    
    return res.status(500).send("username or password incorrect") 
  }

  bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
      
      let token=jwt.sign({email:user.email,userid:user._id},"shhhh")
      res.cookie("token",token)
      res.render("profile")
    }
    else{
      res.redirect("/login");
    }
  })
   


})
app.get("/logout",(req,res)=>{
  res.cookie("token","");
  res.redirect("/login")
})
function isloggedin(req,res,next){
  if(req.cookies.token===""){
    res.redirect("/login")
  }
  else{
    let data=jwt.verify(req.cookies.token,"shhhh");
    req.user=data
    next();
  }
}
app.listen(3000);