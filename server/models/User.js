const { Schema, model, default: mongoose } = require("mongoose");
const { schema: recipeSchema } = require("./Recipe");
const schema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  uname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  pass: {
    type: String,
    required: true
  },
  avatar: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  favourites: [{
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  }]
});

const user = model("User", schema);

module.exports = user;