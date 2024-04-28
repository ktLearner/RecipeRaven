const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    name:{type:String,required:true},
    ingrediants:{type:String,required:true},
    likes:{type:Number,},
    area:{type:String,},
    cuisine:{type:String,},
    season:{type:String,},
    calories:{type:Number,},
})

module.exports=mongoose.model("recipes",schema);