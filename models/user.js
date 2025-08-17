const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/authtestapp")
const userschema=mongoose.Schema({
  username :String,
  name:String,
  email:String,
  password:String,
  age:Number
});
module.exports=mongoose.model("user",userschema);