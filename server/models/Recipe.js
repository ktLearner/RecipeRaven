const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    imageUrl: Buffer,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: [
      {
        instructionText: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    cuisine: {
      type: String,
      required: true,
    },
    tags: [String],
    createdBy: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        ref: "User",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ratings: [
      {
        user: {
          uname: String,
          avatar: String,
          uid: Schema.Types.ObjectId,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
      },
    ],
    calories: String,
    allergens: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: {
      avgRating: {
        get() {
          let sum = 0;
          this.ratings.forEach((r) => (sum += r.rating));
          if (!this.ratings.length) return 0;
          return +(sum / this.ratings.length).toFixed(2);
        },
      },
      totalReviews: {
        get() {
          return this.ratings.length;
        }
      }
    },
  }
);

const recipe = model("Recipe", schema);

module.exports = recipe;
