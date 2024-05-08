const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    name:{type:String,required:true},
    ingrediants:{type:String,required:true},
    likes:{type:Number,},
    area:{type:String,},
    cuisine:{type:String,},
    season:{type:String,},
    calories:{type:String,},
    imageUrl: Buffer,
    origin:{type:String,},
    taste:{type:String,},
    famous:{type:String,},
    description: {
        type: String,
        required: true
      },
     ratings: [{
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rating: {
          type: Number,
          min: 1,
          max: 5
        },
        review: String
      }],

})

module.exports=mongoose.model("recipes",schema);