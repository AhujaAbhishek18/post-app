const express=require("express")
const app=express();
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
app.listen(3000);