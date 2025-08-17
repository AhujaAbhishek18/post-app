const mongoose=require('mongoose');
const user = require('./user');

const userschema=mongoose.Schema({
  user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:user
  },
  date:{
    type:date,
    default:Date.now
  },
  content:String,
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:user
    }
  ]

});
module.exports=mongoose.model("user",userschema);