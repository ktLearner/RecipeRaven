const { Schema, model } = require("mongoose");

const schema = new Schema({
  imageUrl: String,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }],
  instructions: [{
    instructionText: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  }],
  cookTime: {
    type: Number,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  tags: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
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
  calories: Number,
  allergens: [String],
});