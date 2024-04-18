const { Schema, model } = require("mongoose");

const schema = new Schema({
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
});

const user = model("User", schema);

module.exports = user;