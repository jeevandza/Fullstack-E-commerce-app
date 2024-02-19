const mongoose = require("mongoose");

const ProductModel = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  published: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
  createdBy: {
    id: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  updatedBy: {
    type: String,
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", ProductModel);

module.exports = Product;
