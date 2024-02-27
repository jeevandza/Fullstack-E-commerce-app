const { Schema, mongoose } = require("mongoose");

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
  typOfProduct: {
    type: Schema.Types.ObjectId,
    ref: "product_types",
    required: false,
  },
  brandCategory: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
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
  otherDetails: {
    type: [mongoose.Schema.Types.Mixed],
    require: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Product =
  mongoose.models.products || mongoose.model("products", ProductModel);

module.exports = Product;
